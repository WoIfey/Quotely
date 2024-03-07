'use client'
import { dislikeQuote, likeQuote } from '@/app/actions'
import Image from 'next/image'
import { useState } from 'react'

export default function Likes({ id, likes }: { id: string; likes: number }) {
	const [likesHover, setLikesHover] = useState(false)
	const [likeHover, setLikeHover] = useState(false)
	const [DislikesHover, setDislikesHover] = useState(false)

	const handleLike = async () => {
		await likeQuote(id)
	}

	const handleDislike = async () => {
		await dislikeQuote(id)
	}

	return (
		<div className="flex gap-1.5 z-10">
			<div className="relative group flex text-[10px] font-medium z-20">
				<span
					className={`rounded-md flex justify-center items-center w-8 h-8 text-sm font-semibold shadow-sm cursor-default ${
						likes < 0 ? 'bg-red-600' : likes > 0 ? 'bg-green-600' : 'bg-gray-600'
					}`}
					onMouseEnter={() => setLikesHover(true)}
					onMouseLeave={() => setLikesHover(false)}
				>
					{likes >= 10000
						? `${Math.floor(likes / 1000)}k`
						: likes >= 1000
						? `${Math.floor(likes / 1000)}.${Math.floor((likes % 1000) / 100)}k`
						: likes <= -10000
						? `-${Math.floor(Math.abs(likes) / 1000)}k`
						: likes <= -1000
						? `-${Math.floor(Math.abs(likes) / 1000)}.${Math.floor(
								(Math.abs(likes) % 1000) / 100
						  )}k`
						: likes}
				</span>
				<span
					className={`pointer-events-none transition-opacity bg-gray-700 px-2 py-1 text-xs rounded-md absolute   
					-translate-x-1/2 -translate-y-16 ${
						likesHover ? 'opacity-100' : 'opacity-0'
					} m-4 mx-auto top-1/2 left-1/2 min-w-max transform`}
				>
					Likes
				</span>
			</div>
			<div className="hidden group-hover:block">
				<div className="flex gap-1.5">
					<button
						onMouseEnter={() => setLikeHover(true)}
						onMouseLeave={() => setLikeHover(false)}
						onClick={handleLike}
						className="rounded-md bg-green-600 w-8 h-8 text-sm font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
					>
						<div className="relative group flex text-[10px] font-medium z-20">
							<Image
								src="/thumbs-up.svg"
								alt="Like"
								width={32}
								height={32}
								className="p-1"
							/>
							<span
								className={`pointer-events-none transition-opacity bg-gray-700 px-2 py-1 text-xs rounded-md absolute   
                            -translate-x-1/2 -translate-y-16 ${
																													likeHover ? 'opacity-100' : 'opacity-0'
																												} m-4 mx-auto top-1/2 left-1/2 min-w-max transform`}
							>
								Like
							</span>
						</div>
					</button>
					<button
						onMouseEnter={() => setDislikesHover(true)}
						onMouseLeave={() => setDislikesHover(false)}
						onClick={handleDislike}
						className="rounded-md bg-red-600 w-8 h-8 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
					>
						<div className="relative group flex text-[10px] font-medium z-20">
							<Image
								src="/thumbs-down.svg"
								alt="Dislike"
								width={32}
								height={32}
								className="p-1"
							/>
							<span
								className={`pointer-events-none transition-opacity bg-gray-700 px-2 py-1 text-xs rounded-md absolute   
                            -translate-x-1/2 -translate-y-16 ${
																													DislikesHover ? 'opacity-100' : 'opacity-0'
																												} m-4 mx-auto top-1/2 left-1/2 min-w-max transform`}
							>
								Dislike
							</span>
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}
