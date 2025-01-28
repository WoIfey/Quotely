import Quotes from '@/components/Quotes'
import { getData } from './actions'

export default async function Home() {
	const data = await getData()
	return (
		<div className="bg-slate-50 dark:bg-slate-950 min-h-dvh">
			<Quotes data={data as Quote[]} />
		</div>
	)
}
