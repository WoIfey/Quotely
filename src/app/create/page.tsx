import Add from '@/components/createquote'
import Header from '@/components/header'
import { getData } from '@/utils/handleDatabase'

export default async function Create() {
	let data = await getData()
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/create" />
			<Add data={data} />
		</div>
	)
}
