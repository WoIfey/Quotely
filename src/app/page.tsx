import Quotes from '@/components/quotes'
import Header from '@/components/header'
import { getData } from './data'

export default async function Home() {
	const data = await getData()
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/" />
			<Quotes data={data} />
		</div>
	)
}
