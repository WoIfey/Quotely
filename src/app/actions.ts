'use server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function getData() {
    return await prisma.quotes.findMany({
        include: {
            user: true
        }
    })
}

export async function saveData(quote: string, author: string, id: string) {
    try {
        await prisma.quotes.create({
            data: {
                author,
                quote,
                userId: id
            }
        })
        return 'Saved Quote'
    } catch (error) {
        console.log(error)
        return 'Something went wrong'
    }
}

export async function deleteData(id: number) {
    try {
        await prisma.quotes.delete({
            where: { id }
        })
        return 'Deleted Quote'
    } catch (error) {
        console.log(error)
        return 'Something went wrong'
    }
}

export async function incrementLikes(id: number, userId: string) {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingVote = await tx.quoteLike.findUnique({
                where: {
                    quoteId_userId: {
                        quoteId: id,
                        userId: userId
                    }
                }
            });

            if (existingVote) {
                if (existingVote.value === 1) {
                    await tx.quoteLike.delete({
                        where: { id: existingVote.id }
                    });

                    const updatedQuote = await tx.quotes.update({
                        where: { id },
                        data: { likes: { decrement: 1 } }
                    });
                    return updatedQuote;
                } else {
                    await tx.quoteLike.update({
                        where: { id: existingVote.id },
                        data: { value: 1 }
                    });

                    const updatedQuote = await tx.quotes.update({
                        where: { id },
                        data: { likes: { increment: 2 } }
                    });
                    return updatedQuote;
                }
            } else {
                await tx.quoteLike.create({
                    data: {
                        quoteId: id,
                        userId: userId,
                        value: 1
                    }
                });

                const updatedQuote = await tx.quotes.update({
                    where: { id },
                    data: { likes: { increment: 1 } }
                });
                return updatedQuote;
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function decrementLikes(id: number, userId: string) {
    try {
        return await prisma.$transaction(async (tx) => {
            const existingVote = await tx.quoteLike.findUnique({
                where: {
                    quoteId_userId: {
                        quoteId: id,
                        userId: userId
                    }
                }
            });

            if (existingVote) {
                if (existingVote.value === -1) {
                    await tx.quoteLike.delete({
                        where: { id: existingVote.id }
                    });

                    const updatedQuote = await tx.quotes.update({
                        where: { id },
                        data: { likes: { increment: 1 } }
                    });
                    return updatedQuote;
                } else {
                    await tx.quoteLike.update({
                        where: { id: existingVote.id },
                        data: { value: -1 }
                    });

                    const updatedQuote = await tx.quotes.update({
                        where: { id },
                        data: { likes: { decrement: 2 } }
                    });
                    return updatedQuote;
                }
            } else {
                await tx.quoteLike.create({
                    data: {
                        quoteId: id,
                        userId: userId,
                        value: -1
                    }
                });

                const updatedQuote = await tx.quotes.update({
                    where: { id },
                    data: { likes: { decrement: 1 } }
                });
                return updatedQuote;
            }
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getUserVote(quoteId: number, userId: string) {
    try {
        const vote = await prisma.quoteLike.findUnique({
            where: {
                quoteId_userId: {
                    quoteId,
                    userId
                }
            }
        });
        return vote?.value || 0;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export async function getFilteredData(filter: FilterParams, sort: SortOption) {
    const query: Prisma.QuotesFindManyArgs = {
        include: {
            user: true
        },
        where: {},
        orderBy: {}
    }

    switch (filter.filterType) {
        case 'likes':
            query.where = { likes: { gte: 0 } }
            break
        case 'dislikes':
            query.where = { likes: { lt: 0 } }
            break
        case 'author':
            if (filter.authorFilter?.trim()) {
                query.where = {
                    author: {
                        contains: filter.authorFilter.trim(),
                        mode: 'insensitive'
                    }
                }
            }
            break
    }

    switch (sort) {
        case 'new':
            query.orderBy = { createdAt: 'desc' }
            break
        case 'old':
            query.orderBy = { createdAt: 'asc' }
            break
        case 'most':
            query.orderBy = { likes: 'desc' }
            break
        case 'least':
            query.orderBy = { likes: 'asc' }
            break
        default:
            query.orderBy = { createdAt: 'desc' }
    }

    return await prisma.quotes.findMany(query)
}