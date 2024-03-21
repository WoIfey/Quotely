'use client'
import Delete from '@/components/deleteQuote'
import Update from '@/components/editQuote'
import Copy from '@/components/copyQuote'
import Likes from '@/components/likes'
import Refresh from '@/components/refreshQuotes'
import DeleteAll from '@/components/deleteAllQuotes'
import Filter from '@/components/filterQuotes'
import Sort from '@/components/sortQuotes'
import { useEffect, useState } from 'react'

export default function quotes({ data }: { data: any[] }) {
	const [quotes, setQuotes] = useState(data)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const sortPreference = localStorage.getItem('sortPreference')
		const filterPreference = localStorage.getItem('filterPreference')

		let sortedData = [...data]

		if (sortPreference === 'new') {
			sortedData.sort((a: any, b: any) => b.id - a.id)
		} else if (sortPreference === 'old') {
			sortedData.sort((a: any, b: any) => a.id - b.id)
		} else if (sortPreference === 'least') {
			sortedData.sort((a: any, b: any) => a.likes - b.likes)
		} else if (sortPreference === 'most') {
			sortedData.sort((a: any, b: any) => b.likes - a.likes)
		}

		if (filterPreference === 'likes') {
			sortedData = sortedData.filter(quote => !/^-/.test(quote.likes))
		} else if (filterPreference === 'dislikes') {
			sortedData = sortedData.filter(quote => /^-/.test(quote.likes))
		}
		setQuotes(sortedData)
		setIsLoading(false)
	}, [data])

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-dvh text-white gap-4">
				<div role="status">
					<svg
						aria-hidden="true"
						className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-500 fill-blue-500"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</div>
				<div>Loading...</div>
			</div>
		)
	}
	return (
		<>
			<div className="sm:fixed bg-slate-900 px-6 sm:mt-[55px] pb-6 py-2 pt-6 sm:px-8 z-30 w-full text-white">
				<div className="flex items-center sm:flex-row flex-col gap-4 justify-between">
					<div className="flex flex-col justify-center items-center sm:justify-normal sm:items-start gap-3">
						<h2 className="text-3xl font-bold leading-7 tracking-widest italic">
							QUOTES{' '}
							<span className="not-italic tracking-normal">({quotes.length})</span>
						</h2>
						<div className="flex gap-3">
							<Refresh />
							<DeleteAll />
						</div>
					</div>
					<div className="flex flex-col w-full sm:flex-row sm:w-auto gap-6 sm:gap-3">
						<Sort />
						<Filter />
					</div>
				</div>
			</div>
			<div className="sm:pt-52 text-white sm:p-8 sm:pb-6 p-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{quotes.length === 0 && (
					<p className="italic text-gray-400">There are currently no quotes!</p>
				)}
				{quotes.map(q => (
					<div
						key={q.id}
						className="max-h-96 overflow-y-auto relative flex flex-col bg-slate-800 rounded-lg p-4"
					>
						<div className="flex flex-col justify-between gap-1.5 h-full">
							<div className="flex flex-col justify-between h-full flex-grow">
								<p className="text-lg italic break-all">“{q.quote}”</p>
								<p className="text-base font-thin text-end self-end break-all">
									— {q.author}
								</p>
							</div>
							<div className="group flex min-[300px]:flex-row flex-col sm:items-end mt-3 gap-1.5 justify-between">
								<Likes id={q.id} likes={q.likes} />
								<div className="flex items-end gap-1.5">
									<Copy quote={q.quote} id={q.id} />
									<Delete id={q.id} />
									<Update quote={q.quote} author={q.author} id={q.id} />
								</div>
								<span className="absolute inset-0" />
							</div>
						</div>
						<div className="flex gap-1 mt-2">
							<div className="text-xs font-extralight bg-slate-900 rounded px-1">
								{new Date(q.createdAt).toLocaleString()}
							</div>
							{new Date(q.createdAt).toLocaleString() !==
								new Date(q.updatedAt).toLocaleString() && (
								<div className="relative group flex text-[10px] font-medium z-20">
									<h1 className="bg-slate-900 text-slate-200 rounded px-1 relative cursor-default">
										Edited
									</h1>
									<span
										className="pointer-events-none group-hover:opacity-100 transition-opacity bg-gray-700 px-2 py-1 text-xs rounded-md absolute  
  -translate-x-1/2 -translate-y-14 opacity-0 m-4 mx-auto top-1/2 left-1/2 min-w-max transform"
									>
										{new Date(q.updatedAt).toLocaleString()}
									</span>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	)
}
