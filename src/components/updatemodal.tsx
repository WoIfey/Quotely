'use client'
import Image from 'next/image'
import { useState } from 'react'
import { update } from '@/app/actions'
import { useRouter } from 'next/navigation'

export default function UpdateModal({
	quote: initialQuote,
	author: initialAuthor,
	id,
}: {
	quote: string
	author: string
	id: number
}) {
	/* const router = useRouter() */
	const [toggleModal, setToggleModal] = useState(false)
	const [quote, setQuote] = useState(initialQuote)
	const [author, setAuthor] = useState(initialAuthor)
	const [updateHover, setUpdateHover] = useState(false)

	const showModal = () => {
		setToggleModal(true)
	}

	const cancel = () => {
		setToggleModal(false)
	}

	const confirm = () => {
		setToggleModal(false)
		/* router.refresh() */
	}
	return (
		<>
			<div className="hidden group-hover:block z-10">
				<button
					onClick={showModal}
					onMouseEnter={() => setUpdateHover(true)}
					onMouseLeave={() => setUpdateHover(false)}
					className="flex items-center justify-center h-8 w-8 rounded-md bg-gray-600 text-sm font-semibold shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
				>
					<div className="relative group flex text-[10px] font-medium z-20">
						<Image
							src="/gear.svg"
							alt="Update"
							width={32}
							height={32}
							className="p-1"
						/>
						<span
							className={`pointer-events-none transition-opacity bg-gray-700 px-2 py-1 text-xs rounded-md absolute   
                            -translate-x-1/2 -translate-y-16 ${
																													updateHover ? 'opacity-100' : 'opacity-0'
																												} m-4 mx-auto top-1/2 left-1/2 min-w-max transform`}
						>
							Update
						</span>
					</div>
				</button>
			</div>
			{toggleModal && (
				<>
					<div className="z-50 fixed inset-0 bg-black opacity-90"></div>
					<div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0">
						<div className="relative p-4 w-full max-w-md max-h-full">
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
								<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
									<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
										Update Quote
									</h3>
									<button
										type="button"
										onClick={cancel}
										className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<Image
											src="x.svg"
											alt="x"
											width={32}
											height={32}
											className="h-5 w-5"
										/>
										<span className="sr-only">Close modal</span>
									</button>
								</div>
								<div className="p-5 pb-6">
									<form onSubmit={() => confirm()} action={update}>
										<input name="id" type="hidden" value={id} />
										<label
											htmlFor="author"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Author
										</label>
										<input
											type="text"
											id="author"
											name="author"
											maxLength={40}
											value={author}
											onChange={e => setAuthor(e.target.value)}
											required
											placeholder="Martin Luther King Jr."
											className="mb-4 outline-none block w-full rounded-md border-0 bg-white/10 p-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										/>
										<label
											htmlFor="quote"
											className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Quote
										</label>
										<textarea
											id="quote"
											name="quote"
											maxLength={255}
											value={quote}
											onChange={e => setQuote(e.target.value)}
											required
											placeholder="Something meaningful..."
											className="mt-2 min-h-10 max-h-60 outline-none block w-full rounded-md border-0 bg-white/10 p-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										/>
										<button
											type="submit"
											className="mt-5 h-10 rounded-md bg-indigo-600 w-full px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Update
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}
