import Add from '@/components/createquote'
import Link from 'next/link'

const nav = [
	{ name: 'Quotes', href: '/', current: false },
	{ name: 'Create', href: '/create', current: true },
]

export default async function Create() {
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

			<div className="mt-8 xl:mt-12 divide-y divide-white/5 xl:pl-72">
				<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
					<div>
						<h2 className="text-lg font-semibold leading-7 text-white">
							Create Quote
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-400">
							Insert an author and quote.
						</p>
					</div>

					<div className="md:col-span-2">
						<Add />
					</div>
				</div>
			</div>
		</div>
	)
}
