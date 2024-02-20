import Link from 'next/link'
import Image from 'next/image'
import Filter from '@/components/filterlength'
import DeleteAll from '@/components/deleteallmodal'
import Quotes from '@/components/quotes'
import { getData } from '@/utils/handleDatabase'
import { refresh } from '@/app/actions'

const nav = [
	{ name: 'Quotes', href: '/', current: true },
	{ name: 'Create', href: '/create', current: false },
]

export default async function Home() {
	let data = await getData()
	data.sort((a, b) => a.id - b.id)
	/* 	const filteredId = data.filter(e => e.id < 20)
	const filteredData = data.filter(e => e.quote == '') */
	return (
		<div className="bg-slate-950 min-h-dvh">
			<header className="border-b border-white/5">
				<nav className="z-40 fixed flex overflow-x-auto py-4 bg-slate-900 w-full">
					<ul
						role="list"
						className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
					>
						{nav.map(item => (
							<li key={item.name}>
								<Link
									href={item.href}
									className={item.current ? 'text-indigo-400 p-4' : 'p-4'}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>

			<div className="mt-6 xl:mt-8 divide-y divide-white/5">
				<div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
					<div className="md:col-span-4 text-white">
						<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-5">
							<div className="sm:col-span-6">
								<div className="flex items-center gap-3">
									<h2 className="text-3xl font-bold leading-7 tracking-widest italic">
										QUOTES
									</h2>
									<form action={refresh}>
										<button
											type="submit"
											className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
										>
											<Image
												src="/arrows-clockwise.svg"
												alt="Refresh"
												width={32}
												height={32}
												className="p-1"
											/>
										</button>
									</form>
									<DeleteAll />
								</div>
							</div>
							<div className="sm:col-span-2">
								<label htmlFor="sort" className="block text-md leading-6 text-white">
									Sort (WIP)
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
									Filter (WIP)
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
							<Filter />
						</div>
						<Quotes data={data} />
					</div>
				</div>
			</div>
		</div>
	)
}
