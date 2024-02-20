'use client'
import { useState } from 'react'
import { removeall } from '@/app/actions'
import Image from 'next/image'

export default function DeleteModal() {
	const [toggleModal, setToggleModal] = useState(false)

	const showModal = () => {
		setToggleModal(true)
	}

	const cancel = () => {
		setToggleModal(false)
	}

	const confirm = () => {
		setToggleModal(false)
	}
	return (
		<>
			<button
				type="button"
				onClick={showModal}
				className="flex items-center justify-center h-10 w-10 rounded-md bg-red-600 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
			>
				<Image
					src="/eraser.svg"
					alt="Delete All"
					width={32}
					height={32}
					className="p-1"
				/>
			</button>
			{toggleModal && (
				<>
					<div className="z-50 fixed inset-0 bg-black opacity-90"></div>
					<div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0">
						<div className="relative p-4 w-full max-w-md max-h-full">
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
								<div className="p-4 md:p-5 text-center">
									<h3 className="mb-3 text-lg font-normal text-white">
										Do you really want to delete{' '}
										<span className="font-extrabold tracking-widest">ALL</span> quotes?
									</h3>
									<div className="flex justify-center items-center">
										<form onSubmit={() => confirm()} action={removeall}>
											<button
												type="submit"
												className="h-10 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 me-2"
											>
												Yes, do it!
											</button>
										</form>
										<button
											onClick={cancel}
											type="button"
											className="h-10 rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
										>
											No, abort!
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}
