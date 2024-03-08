import Refresh from '@/components/refreshQuotes'
import DeleteAll from '@/components/deleteAllQuotes'
import Quotes from '@/components/quotes'
import Header from '@/components/header'
import Filter from '@/components/filterQuotes'
import Sort from '@/components/sortQuotes'
import { getData } from '@/utils/handleDatabase'

export default async function Home() {
	let data = await getData()
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/" />
			<div className="divide-y divide-white/5">
				<div className="sm:fixed bg-slate-900 grid grid-cols-1 px-6 sm:mt-[55px] pb-6 py-2 md:grid-cols-3 sm:px-8 z-30 w-full">
					<div className="md:col-span-4 text-white">
						<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-5">
							<div className="sm:col-span-6">
								<div className="flex items-center sm:flex-row flex-col gap-4">
									<h2 className="text-3xl font-bold leading-7 tracking-widest italic">
										QUOTES{' '}
										<span className="not-italic tracking-normal">({data.length})</span>
									</h2>
									<div className="flex gap-3">
										<Refresh />
										<DeleteAll />
									</div>
								</div>
							</div>
							<Sort />
							<Filter />
						</div>
					</div>
				</div>
				<div className="sm:pt-64">
					<Quotes data={data} />
				</div>
			</div>
		</div>
	)
}
