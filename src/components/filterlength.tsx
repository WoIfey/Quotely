'use client'

export default function FilterLength() {
	return (
		<div className="sm:col-span-2">
			<label htmlFor="filter" className="block text-md leading-6 text-white">
				Length
			</label>
			<input type="range" min="0" max="10" className="mt-2" />
		</div>
	)
}
