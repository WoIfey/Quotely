'use client'
import { useState, useEffect } from 'react'
import { refresh } from '@/app/actions'

export default function Filter() {
	const [filterPreference, setFilterPreference] = useState('')

	useEffect(() => {
		const storedFilterPreference = localStorage.getItem('filterPreference')
		if (storedFilterPreference) {
			setFilterPreference(storedFilterPreference)
		}
	}, [])

	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFilterPreference(event.target.value)
	}

	const handleFilter = () => {
		localStorage.setItem('filterPreference', filterPreference)
	}

	return (
		<div className="sm:col-span-2">
			<label htmlFor="filter" className="block text-md leading-6 text-white">
				Filter
			</label>
			<select
				id="filter"
				name="filter"
				value={filterPreference}
				onChange={handleFilterChange}
				className="bg-slate-700 mt-2 block w-full rounded-md border-0 py-1 px-0.5 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option value="">Filter by default</option>
				<option value="liked">Filter by likes</option>
				<option value="disliked">Filter by dislikes</option>
			</select>
			<form action={refresh}>
				<button
					onClick={handleFilter}
					className="mt-2 px-1.5 py-0.5 text-white rounded-md bg-indigo-600 text-sm shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Apply Filter
				</button>
			</form>
		</div>
	)
}
