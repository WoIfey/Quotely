import Link from 'next/link'
import CreateQuote from './AddQuote'
import QuoteFilters from './FilterQuotes'
import Profile from './Profile'

export default function Header({
	quotes,
	onFilterChange,
}: {
	quotes: Quote[]
	onFilterChange: (filters: {
		filterType: FilterOption
		sortBy: SortOption
	}) => void
}) {
	return (
		<div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 border-b">
			<div className="container mx-auto py-3 px-4">
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2">
							<Link href="https://github.com/WoIfey/Quotely" target="_blank">
								<h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
									Quotely
								</h2>
							</Link>
						</div>
						<QuoteFilters onFilterChange={onFilterChange} />
						<div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-full">
							<span className="text-sm font-medium text-primary">{quotes.length}</span>
							<span className="text-xs text-primary/80">quotes</span>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<CreateQuote />
						<Profile />
					</div>
				</div>
			</div>
		</div>
	)
}
