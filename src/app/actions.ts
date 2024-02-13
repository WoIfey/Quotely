"use server"
import { deleteData, updateData } from "@/utils/handleDatabase"
import { revalidateTag } from "next/cache"

export const update = async (formData: FormData) => {
    const id = formData.get('id') as string
    const quote = formData.get('quote') as string
    const author = formData.get('author') as string
    const data = await updateData(id, author, quote)
    console.log(data)
    revalidateTag('quote')
}

export const remove = async (formData: FormData) => {
    const id = formData.get('id') as string
    const data = await deleteData(id)
    console.log(data)
    revalidateTag('quote')
}