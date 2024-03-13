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
		handleSort()
	}, [])

	useEffect(() => {
		handleSort()
	}, [sortPreference])

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortPreference(event.target.value)
	}

	const handleSort = () => {
		localStorage.setItem('sortPreference', sortPreference)
		refresh()
	}

	return (
		<div className="sm:col-span-2">
			<label
				htmlFor="sort"
				className="px-1.5 py-1 sm:py-0.5 text-white rounded-md bg-gray-700 text-sm shadow-sm"
			>
				Sort by
			</label>
			<select
				id="sort"
				name="sort"
				value={sortPreference}
				onChange={handleSortChange}
				className="bg-slate-700 mt-1.5 block w-full sm:w-40 rounded-md border-0 py-1 px-0.5 ring-1 ring-inset outline-none focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option value="">Default</option>
				<option value="new">Newest</option>
				<option value="old">Oldest</option>
				<option value="most">Most likes</option>
				<option value="least">Least likes</option>
			</select>
		</div>
	)
}
