import Image from 'next/image'
import Link from 'next/link'
import Delete from '@/components/deletemodal'
import Update from '@/components/updatemodal'
import { deleteData, getData, updateData } from '@/utils/handleDatabase'
import { revalidateTag } from 'next/cache'

const nav = [
	{ name: 'Quotes', href: '/', current: true },
	{ name: 'Create', href: '/create', current: false },
]

export default async function Home() {
	let data = await getData()
	data = data.sort((a, b) => a.id - b.id)
	return (
		<div className="bg-slate-950 min-h-dvh">
			<div>
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
										className={item.current ? 'text-indigo-400' : ''}
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</header>

				<div className="mt-14 divide-y divide-white/5 xl:pl-72">
					<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
						<div className="md:col-span-2 text-white">
							<h2 className="text-2xl font-bold leading-7">Quotes</h2>
							{data.map(q => (
								<div
									key={q.id}
									className="group relative mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-8"
								>
									<div className="sm:col-span-3">
										<p className="block text-md font-light">Author</p>
										<div className="mt-2">{q.author}</div>
									</div>

									<div className="sm:col-span-3">
										<p className="block text-md font-light">Quote</p>
										<div className="mt-2 italic">"{q.quote}"</div>
									</div>

									<div className="flex items-center gap-4">
										<div>
											<Delete id={q.id} />
										</div>

										<div>
											<Update quote={q.quote} author={q.author} id={q.id} />
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
