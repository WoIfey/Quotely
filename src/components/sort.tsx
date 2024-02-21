'use client'

export default function sort({ data }: { data: any[] }) {
	/* const sortNew = data.sort((a, b) => b.id - a.id) */
	return (
		<div className="sm:col-span-2">
			<label htmlFor="sort" className="block text-md leading-6 text-white">
				Sort
			</label>
			<select
				id="sort"
				name="sort"
				className="bg-slate-700 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option>Sort by oldest</option>
				<option>Sort by newest</option>
			</select>
		</div>
	)
}
