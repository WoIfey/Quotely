import Add from '@/components/createquote'
import Header from '@/components/header'

export default function Create() {
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/create" />
			<Add />
		</div>
	)
}
