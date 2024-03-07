'use client'
import { useState, useEffect } from 'react'
import { refresh } from '@/app/actions'

export default function Sort() {
	const [sortPreference, setSortPreference] = useState('')

	useEffect(() => {
		const storedSortPreference = localStorage.getItem('sortPreference')
		if (storedSortPreference) {
			setSortPreference(storedSortPreference)
		}
	}, [])

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortPreference(event.target.value)
	}

	const handleSort = () => {
		localStorage.setItem('sortPreference', sortPreference)
	}

	return (
		<div className="sm:col-span-2">
			<label htmlFor="sort" className="block text-md leading-6 text-white">
				Sort
			</label>
			<select
				id="sort"
				name="sort"
				value={sortPreference}
				onChange={handleSortChange}
				className="bg-slate-700 mt-2 block w-full rounded-md border-0 py-1 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option value="">Sort by default</option>
				<option value="new">Sort by newest</option>
				<option value="old">Sort by oldest</option>
				<option value="most">Sort by most likes</option>
				<option value="least">Sort by least likes</option>
			</select>
			<form action={refresh}>
				<button
					onClick={handleSort}
					className="mt-2 px-1 py-0.5 text-white rounded-md bg-indigo-600 text-sm shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Apply Sort
				</button>
			</form>
		</div>
	)
}
