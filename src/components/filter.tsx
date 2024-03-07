'use client'
import { refresh } from '@/app/actions'
import { useState } from 'react'

export default function Filter() {
	const [filterPreference, setFilterPreference] = useState('')

	const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFilterPreference(event.target.value)
	}

	const handleFilter = () => {
		if (filterPreference === 'Filter out disliked') {
			localStorage.setItem('filterPreference', 'disliked')
		} else if (filterPreference === 'Filter out liked') {
			localStorage.setItem('filterPreference', 'liked')
		} else if (filterPreference === 'Filter out nothing') {
			localStorage.setItem('filterPreference', 'nothing')
		}
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
				className="bg-slate-700 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option>Filter out nothing</option>
				<option>Filter out disliked</option>
				<option>Filter out liked</option>
			</select>
			<form action={refresh}>
				<button
					onClick={handleFilter}
					className="bg-slate-700 mt-2 block rounded-md border-0 px-1 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
				>
					Apply Filter
				</button>
			</form>
		</div>
	)
}
