import Add from '@/components/addQuote'
import Header from '@/components/header'
import { getData } from '@/utils/handleDatabase'

export default async function Create() {
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/create" />
			<Add />
		</div>
	)
}
