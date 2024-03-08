import Add from '@/components/addQuote'
import Header from '@/components/header'

export default async function Create() {
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/create" />
			<Add />
		</div>
	)
}
