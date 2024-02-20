'use client'
import Image from 'next/image'

export default function Likes() {
	return (
		<div className="flex gap-2 z-10">
			<p className="rounded-md bg-gray-600 flex justify-center items-center w-8 h-8 text-sm font-semibold shadow-sm">
				0
			</p>
			<div className="hidden group-hover:block">
				<div className="flex gap-2">
					<button className="rounded-md bg-green-600 w-8 h-8 text-sm font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
						<Image
							src="/thumbs-up.svg"
							alt="Like"
							width={32}
							height={32}
							className="p-1"
						/>
					</button>
					<button className="rounded-md bg-red-600 w-8 h-8 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
						<Image
							src="/thumbs-down.svg"
							alt="Dislike"
							width={32}
							height={32}
							className="p-1"
						/>
					</button>
				</div>
			</div>
		</div>
	)
}
