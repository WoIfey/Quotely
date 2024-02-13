'use client'
import { useState } from 'react'
import { create } from '@/app/actions'

export default function CreateQuote() {
	const [author, setAuthor] = useState('')
	const [quote, setQuote] = useState('')
	const [status, setStatus] = useState<string | null>(null)

	const message = () => {
		try {
			setAuthor('')
			setQuote('')
			setStatus('Quote added!')
			setTimeout(() => {
				setStatus('')
			}, 2000)
		} catch (error) {
			setStatus('Failed to add quote.')
		}
	}
	return (
		<>
			<form onSubmit={message} action={create}>
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
								value={author}
								onChange={e => setAuthor(e.target.value)}
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
								value={quote}
								onChange={e => setQuote(e.target.value)}
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
				{status && <p className="text-white mt-8">{status}</p>}
			</form>
		</>
	)
}
