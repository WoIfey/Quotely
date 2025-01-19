import { prisma } from '@/lib/prisma'

export async function getData() {
    return await prisma.quotes.findMany()
}

export async function saveData(quote: string, author: string) {
    try {
        await prisma.quotes.create({
            data: {
                author,
                quote
            }
        })
        return 'Saved Quote'
    } catch (error) {
        console.log(error)
        return 'Something went wrong'
    }
}

export async function updateData(id: number, author: string, quote: string) {
    try {
        await prisma.quotes.update({
            where: { id },
            data: { author, quote }
        })
        return 'Updated Quote'
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

export async function incrementLikes(id: number) {
    try {
        await prisma.quotes.update({
            where: { id },
            data: { likes: { increment: 1 } }
        })
        return 'Liked Quote'
    } catch (error) {
        console.log(error)
        return 'Something went wrong'
    }
}

export async function decrementLikes(id: number) {
    try {
        await prisma.quotes.update({
            where: { id },
            data: { likes: { decrement: 1 } }
        })
        return 'Disliked Quote'
    } catch (error) {
        console.log(error)
        return 'Something went wrong'
    }
}

