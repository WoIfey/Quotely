'use client'
import Image from 'next/image'
import { useState } from 'react'
import { refresh } from '@/app/actions'

export default function refreshComponent() {
	const [refreshHover, setRefreshHover] = useState(false)
	return (
		<form action={refresh}>
			<button
				type="submit"
				onMouseEnter={() => setRefreshHover(true)}
				onMouseLeave={() => setRefreshHover(false)}
				className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
			>
				<Image
					src="/arrows-clockwise.svg"
					alt="Refresh"
					width={32}
					height={32}
					className="p-1"
				/>
				<div className="relative group flex text-[10px] font-medium z-20">
					<span
						className={`pointer-events-none transition-opacity bg-gray-700 px-2 py-1 text-xs rounded-md absolute   
                            -translate-x-3/4 translate-y-2 ${
																													refreshHover ? 'opacity-100' : 'opacity-0'
																												} m-4 mx-auto top-1/2 left-1/2 min-w-max transform`}
					>
						Refresh
					</span>
				</div>
			</button>
		</form>
	)
}
