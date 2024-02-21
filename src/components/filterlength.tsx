'use client'

export default function FilterLength({ data }: { data: any[] }) {
	return (
		<div className="sm:col-span-2">
			<label htmlFor="filter" className="block text-md leading-6 text-white">
				Length
			</label>
			<input type="range" min="0" max="255" className="mt-2" />
		</div>
	)
}
