import Link from 'next/link'

const nav = [
	{ name: 'Quotes', href: '/', current: false },
	{ name: 'Create', href: '/create', current: false },
]

export default function Header({ currentPage }: { currentPage: string }) {
	return (
		<>
			<header>
				<nav className="z-30 sm:fixed flex overflow-x-auto py-4 bg-gray-800 w-full">
					<ul
						role="list"
						className="flex min-w-full flex-none gap-x-6 px-5 text-sm font-semibold leading-6 text-gray-400"
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
		</>
	)
}
