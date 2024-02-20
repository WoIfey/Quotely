"use server"
import { deleteData, saveData, updateData, deleteAllData } from "@/utils/handleDatabase"
import { revalidatePath } from "next/cache"

export const create = async (formData: FormData) => {
    const quote = formData.get('quote') as string
    const author = formData.get('author') as string
    await saveData(quote, author)
    revalidatePath('/')
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

export const removeall = async () => {
    await deleteAllData()
    revalidatePath('/')
}

export const refresh = async () => {
    revalidatePath('/')
}

export const like = async () => {
    revalidatePath('/')
}