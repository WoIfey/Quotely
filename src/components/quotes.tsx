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
	}, [data])
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
						className="relative flex flex-col bg-slate-800 rounded-lg p-4"
					>
						<div className="flex flex-col justify-between gap-1.5">
							<div className="text-lg italic break-all">“{q.quote}”</div>
							<div className="text-base font-thin text-end break-all">
								— {q.author}
							</div>
						</div>
						<div className="group flex min-[300px]:flex-row flex-col sm:items-end mt-3 h-full gap-1.5 justify-between">
							<Likes id={q.id} likes={q.likes} />
							<div className="flex items-end gap-1.5">
								<Copy quote={q.quote} id={q.id} />
								<Delete id={q.id} />
								<Update quote={q.quote} author={q.author} id={q.id} />
							</div>
							<span className="absolute inset-0" />
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
