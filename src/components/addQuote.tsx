'use client'
import { useState } from 'react'
import { create } from '@/app/actions'

export default function CreateQuote() {
	const [author, setAuthor] = useState('')
	const [quote, setQuote] = useState('')
	const [status, setStatus] = useState<string | null>(null)
	const [createdHover, setCreatedHover] = useState(false)

	const message = () => {
		try {
			setAuthor('')
			setQuote('')
		} catch (error) {
			console.log(error)
			setStatus('Failed to add quote.')
		}
	}

	return (
		<div className="pt-6 sm:pt-20">
			<div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-9 md:grid-cols-3">
				<div>
					<h2 className="text-lg font-semibold leading-7 text-white">
						Create Quote
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-400">
						Insert an author and quote.
					</p>
				</div>

				<div className="md:col-span-2">
					<form onSubmit={message} action={create}>
						<div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-3">
							<div className="sm:col-span-3 sm:w-1/2">
								<label
									htmlFor="author"
									className="block text-base font-medium leading-6 text-white"
								>
									Author
								</label>
								<div className="mt-2">
									<input
										type="text"
										id="author"
										name="author"
										placeholder="William Shakespeare"
										maxLength={40}
										value={author}
										onChange={e => setAuthor(e.target.value)}
										required
										className={`outline-none block w-full rounded-md border-0 bg-white/10 p-2.5 text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${
											author.length === 40 ? 'ring-red-500 focus:ring-red-700' : ''
										}`}
									/>
									<div className="text-white mt-3 text-xs">
										<span className={`${author.length === 40 ? 'text-red-500' : ''}`}>
											{author.length}/40
										</span>
									</div>
								</div>
							</div>

							<div className="col-span-full">
								<label
									htmlFor="quote"
									className="block text-base font-medium leading-6 text-white"
								>
									Quote
								</label>
								<div className="mt-2">
									<textarea
										id="quote"
										name="quote"
										placeholder="“Better three hours too soon than a minute too late.”"
										maxLength={255}
										value={quote}
										onChange={e => {
											const newValue = e.target.value
											if (!newValue.includes('"')) {
												setQuote(newValue)
											}
										}}
										required
										className={`min-h-28 max-h-40 outline-none block w-full rounded-md border-0 bg-white/10 p-2.5 text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${
											quote.length === 255 ? 'ring-red-500 focus:ring-red-700' : ''
										}`}
									/>
									<div className="text-white mt-3 text-xs">
										<span className={`${quote.length === 255 ? 'text-red-500' : ''}`}>
											{quote.length}/255
										</span>
									</div>
								</div>
							</div>

							<div className="sm:mt-2 flex">
								<button
									onMouseEnter={() => setCreatedHover(true)}
									onMouseLeave={() => setCreatedHover(false)}
									className="px-3 sm:px-4 py-3 sm:py-2 w-full sm:w-auto text-white rounded-md bg-indigo-600 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Add Quote
								</button>
							</div>
						</div>
						{status && (
							<div className="relative group flex text-[10px] font-medium z-20">
								<span
									className={`pointer-events-none transition-opacity bg-gray-700 text-white px-2 py-1 text-xs rounded-md absolute   
                            -translate-x-1/2 -translate-y-16 ${
																													createdHover ? 'opacity-100' : 'opacity-0'
																												} m-4 mx-auto top-14 left-12 sm:-top-5 sm:left-[3.2rem] min-w-max transform`}
								>
									{status}
								</span>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}
