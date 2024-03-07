'use client'
import { refresh } from '@/app/actions'
import { useState } from 'react'

export default function Sort() {
	const [sortPreference, setSortPreference] = useState('')

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSortPreference(event.target.value)
	}

	const handleSort = () => {
		if (sortPreference === 'Sort by newest') {
			localStorage.setItem('sortPreference', 'new')
		} else if (sortPreference === 'Sort by oldest') {
			localStorage.setItem('sortPreference', 'old')
		} else if (sortPreference === 'Sort by default') {
			localStorage.removeItem('sortPreference')
		}
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
				className="bg-slate-700 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option>Sort by default</option>
				<option>Sort by newest</option>
				<option>Sort by oldest</option>
			</select>
			<form action={refresh}>
				<button
					onClick={handleSort}
					className="bg-slate-700 mt-2 block rounded-md border-0 px-1 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
				>
					Apply Sort
				</button>
			</form>
		</div>
	)
}
