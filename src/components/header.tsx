import Link from 'next/link'

const nav = [
	{ name: 'Quotes', href: '/', current: false },
	{ name: 'Create', href: '/create', current: false },
]

export default function Header({ currentPage }: { currentPage: string }) {
	return (
		<header className="border-b border-white/5">
			<nav className="z-40 fixed flex overflow-x-auto py-4 bg-gray-800 w-full">
				<ul
					role="list"
					className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
				>
					{nav.map(item => (
						<li key={item.name}>
							<Link
								href={item.href}
								className={`p-4 ${currentPage === item.href ? 'text-indigo-400' : ''}`}
							>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
