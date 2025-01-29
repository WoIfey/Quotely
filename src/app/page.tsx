import Quotes from '@/components/Quotes'
import { getData } from './actions'
import { connection } from 'next/server'

export default async function Home() {
	await connection()
	const data = await getData()

	return <Quotes data={data as Quote[]} />
}
