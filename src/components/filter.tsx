'use client'

export default function filter({ data }: { data: any[] }) {
	/* 	const filteredId = data.filter(e => e.id < 20) // filter by id
	const filteredData = data.filter(e => e.quote == '') // filter by text */
	return (
		<div className="sm:col-span-2">
			<label htmlFor="filter" className="block text-md leading-6 text-white">
				Filter
			</label>
			<select
				id="filter"
				name="filter"
				className="bg-slate-700 mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 ring-slate-500 focus:ring-indigo-600 sm:text-sm sm:leading-6"
			>
				<option>Filter by none</option>
				<option>Filter by most liked</option>
				<option>Filter by least liked</option>
			</select>
		</div>
	)
}
