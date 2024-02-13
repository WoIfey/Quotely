"use server"
import { deleteData, saveData, updateData } from "@/utils/handleDatabase"
import { revalidatePath } from "next/cache"

export const create = async (formData: FormData) => {
    const quote = formData.get('quote') as string
    const author = formData.get('author') as string
    await saveData(quote, author)
    revalidatePath('/')
    console.log('Created')
}

export const update = async (formData: FormData) => {
    const id = formData.get('id') as string
    const quote = formData.get('quote') as string
    const author = formData.get('author') as string
    const data = await updateData(id, author, quote)
    console.log(data)
    revalidatePath('/')
}

export const remove = async (formData: FormData) => {
    const id = formData.get('id') as string
    const data = await deleteData(id)
    console.log(data)
    revalidatePath('/')
}