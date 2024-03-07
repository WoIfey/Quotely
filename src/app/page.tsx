import FilterLength from '@/components/filterlength'
import Refresh from '@/components/refresh'
import DeleteAll from '@/components/deleteallmodal'
import Quotes from '@/components/quotes'
import Header from '@/components/header'
import Filter from '@/components/filter'
import Sort from '@/components/sort'
import { getData } from '@/utils/handleDatabase'

export default async function Home() {
	let data = await getData()
	/* data.sort((a, b) => a.id - b.id) */
	return (
		<div className="bg-slate-950 min-h-dvh">
			<Header currentPage="/" />
			<div className="mt-10 sm:mt-8 divide-y divide-white/5">
				<div className="absolute sm:fixed bg-slate-900 grid grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 md:grid-cols-3 sm:px-8 z-30 w-full">
					<div className="md:col-span-4 text-white">
						<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-5">
							<div className="sm:col-span-6">
								<div className="flex items-center sm:flex-row flex-col gap-4">
									<h2 className="text-3xl font-bold leading-7 tracking-widest italic">
										QUOTES
									</h2>
									<div className="flex gap-4">
										<Refresh />
										<DeleteAll />
									</div>
								</div>
							</div>
							<Sort data={data} />
							<Filter data={data} />
							<FilterLength data={data} />
						</div>
					</div>
				</div>
				<div className="pt-[29rem] sm:pt-56">
					<Quotes data={data} />
				</div>
			</div>
		</div>
	)
}
