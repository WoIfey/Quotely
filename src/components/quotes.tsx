'use client'
import Delete from '@/components/deletemodal'
import Update from '@/components/updatemodal'
import Likes from '@/components/likes'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function quotes({ data }: { data: any[] }) {
	/* const router = useRouter()
	const [quotes, setQuotes] = useState(data)
	function handleSort() {
		const sortedData = quotes.sort((a: any, b: any) => a.id - b.id)
		setQuotes(sortedData)
		router.refresh()
	} */
	return (
		<>
			{/* <button onClick={handleSort}>Sort</button> */}
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
				{data.map(q => (
					<div
						key={q.id}
						className="relative flex flex-col bg-slate-800 rounded-xl p-4"
					>
						<div className="flex justify-between gap-4">
							<div className="text-lg italic w-2/3 break-all">"{q.quote}"</div>
							<div className="text-base font-thin w-1/3 flex items-end break-all">
								— {q.author}
							</div>
						</div>
						<div className="group flex items-end mt-2 h-full gap-1.5 justify-between">
							<Likes />
							<div className="flex items-end gap-1.5">
								<Delete id={q.id} />
								<Update quote={q.quote} author={q.author} id={q.id} />
								<span className="absolute inset-0" />
							</div>
						</div>
						<div className="flex gap-1 mt-2">
							<div className="text-xs font-extralight bg-slate-900 rounded px-1">
								{new Date(q.createdAt).toLocaleString()}
							</div>
							{new Date(q.createdAt).toDateString() !==
								new Date(q.updatedAt).toDateString() && (
								<div className="relative group flex text-[10px] font-medium z-20">
									<h1 className="bg-slate-900 text-slate-200 rounded px-1 relative cursor-default">
										edited
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
