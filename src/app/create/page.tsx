import { saveData } from '@/utils/handleDatabase'
import { revalidateTag } from 'next/cache'
import Link from 'next/link'

const nav = [
	{ name: 'Quotes', href: '/', current: false },
	{ name: 'Create', href: '/create', current: true },
]

export default async function Create() {
	const create = async (formData: FormData) => {
		'use server'
		const quote = formData.get('quote') as string
		const author = formData.get('author') as string
		await saveData(quote, author)
		revalidateTag('quote')
		console.log('Created')
	}
	return (
		<div className="bg-slate-950 min-h-dvh">
			<div>
				<header className="border-b border-white/5">
					<nav className="z-40 flex overflow-x-auto py-4 bg-slate-900 w-full">
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

				<div className="divide-y divide-white/5 xl:pl-72">
					<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
						<div>
							<h2 className="text-base font-semibold leading-7 text-white">
								Create quote
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">
								Add a author and quote.
							</p>
						</div>

						<form action={create} className="md:col-span-2">
							<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-3">
								<div className="sm:col-span-3 sm:w-1/2">
									<label
										htmlFor="author"
										className="block text-sm font-medium leading-6 text-white"
									>
										Author
									</label>
									<div className="mt-2">
										<input
											type="text"
											id="author"
											name="author"
											placeholder="Martin Luther King Jr."
											className="outline-none block w-full rounded-md border-0 bg-white/5 p-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="col-span-full">
									<label
										htmlFor="quote"
										className="block text-sm font-medium leading-6 text-white"
									>
										Quote
									</label>
									<div className="mt-2">
										<textarea
											id="quote"
											name="quote"
											placeholder="something meaningful..."
											className="min-h-10 max-h-60 outline-none block w-full rounded-md border-0 bg-white/5 p-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>

								<div className="mt-4 flex">
									<button className="px-3 py-2 text-white rounded-md bg-indigo-600 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
										Add Quote
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
