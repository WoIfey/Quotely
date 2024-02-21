import FilterLength from '@/components/filterlength'
import Refresh from '@/components/refresh'
import DeleteAll from '@/components/deleteallmodal'
import Quotes from '@/components/quotes'
import Header from '@/components/header'
import { getData } from '@/utils/handleDatabase'

export default async function Home() {
	let data = await getData()
	data.sort((a, b) => a.id - b.id)
	/* 	const filteredId = data.filter(e => e.id < 20)
	const filteredData = data.filter(e => e.quote == '') */
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/" />
			<div className="mt-6 xl:mt-8 divide-y divide-white/5">
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
					<div className="md:col-span-4 text-white">
						<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-5">
							<div className="sm:col-span-6">
								<div className="flex items-center gap-3">
									<h2 className="text-3xl font-bold leading-7 tracking-widest italic">
										QUOTES
									</h2>
									<Refresh />
									<DeleteAll />
								</div>
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="sort" className="block text-md leading-6 text-white">
									Sort
								</label>
								<select
									id="sort"
									name="sort"
									className="bg-slate-700  mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									<option>Sort by oldest</option>
									<option>Sort by newest</option>
								</select>
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="filter" className="block text-md leading-6 text-white">
									Filter
								</label>
								<select
									id="filter"
									name="filter"
									className="bg-slate-700 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
								>
									<option>Filter by most liked</option>
									<option>Filter by least liked</option>
								</select>
							</div>
							<FilterLength />
						</div>
						<Quotes data={data} />
					</div>
				</div>
			</div>
		</div>
	)
}
