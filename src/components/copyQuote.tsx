import { useState } from 'react'
import Image from 'next/image'

export default function Copy({
	quote: initialQuote,
	id,
}: {
	quote: string
	id: number
}) {
	const [copyHover, setCopyHover] = useState(false)
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(initialQuote)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch (err) {
			console.error('Could not copy text: ', err)
		}
	}

	return (
		<>
			<input name="id" type="hidden" value={id} />
			<div className="hidden group-hover:block z-10">
				<button
					onMouseEnter={() => setCopyHover(true)}
					onMouseLeave={() => setCopyHover(false)}
					onClick={handleCopy}
					className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-sm font-semibold shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
				>
					<div className="relative group flex text-[10px] font-medium z-20">
						<Image
							src="/copy.svg"
							alt="Update"
							width={32}
							height={32}
							className="p-1"
						/>
						<span
							className={`pointer-events-none transition-opacity bg-gray-700 px-2 py-1 text-xs rounded-md absolute   
                                 -translate-x-1/2 -translate-y-[3.7rem] ${
																																		copyHover ? 'opacity-100' : 'opacity-0'
																																	} m-4 mx-auto top-1/2 left-1/2 min-w-max transform`}
						>
							{copied ? 'Copied!' : 'Copy Quote'}
						</span>
					</div>
				</button>
			</div>
		</>
	)
}
