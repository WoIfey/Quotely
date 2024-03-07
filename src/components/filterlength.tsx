'use client'

import { useState } from 'react'

export default function FilterLength({ data }: { data: any[] }) {
	const [length, setLength] = useState(255)

	return (
		<div className="sm:col-span-2">
			<label htmlFor="filter" className="block text-nowrap leading-6 text-white">
				Quote Length ({length})
			</label>
			<input
				type="range"
				min="0"
				max="255"
				value={length}
				className="mt-2 cursor-not-allowed"
			/>
		</div>
	)
}
