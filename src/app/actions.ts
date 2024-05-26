"use server"
import { deleteData, saveData, updateData, incrementLikes, decrementLikes } from "@/utils/handleDatabase"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const create = async (formData: FormData) => {
    const quote = formData.get('quote') as string
    const author = formData.get('author') as string
    await saveData(quote, author)
    redirect('/')
}

export const update = async (formData: FormData) => {
    const id = formData.get('id') as string
    const quote = formData.get('quote') as string
    const author = formData.get('author') as string
    await updateData(id, author, quote)
    revalidatePath('/')
}

export const remove = async (formData: FormData) => {
    const id = formData.get('id') as string
    await deleteData(id)
    revalidatePath('/')
}

export const refresh = async () => {
    revalidatePath('/')
}

export const likeQuote = async (id: string) => {
    await incrementLikes(id)
    revalidatePath('/')
}

export const dislikeQuote = async (id: string) => {
    await decrementLikes(id)
    revalidatePath('/')
}