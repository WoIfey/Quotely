'use client'

import { authClient } from '@/lib/auth-client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Loader2, User, LogIn, AlertCircle, Trash2, LogOut } from 'lucide-react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Google from './ui/google'
import Github from './ui/github'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { deleteAccount } from '@/app/actions'

export default function Profile() {
	const { data: session, isPending } = authClient.useSession()
	const { setTheme, resolvedTheme } = useTheme()

	const googleSignIn = async () => {
		await authClient.signIn.social({
			provider: 'google',
		})
	}

	const githubSignIn = async () => {
		await authClient.signIn.social({
			provider: 'github',
		})
	}

	const anonymousSignIn = async () => {
		await authClient.signIn.anonymous()
	}

	const handleSignOut = async () => {
		await authClient.signOut()
	}

	const handleDeleteAccount = async () => {
		await deleteAccount(session?.user?.id || '')
		await authClient.signOut()
	}

	if (session) {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="size-10 rounded-full p-0">
						<Avatar className="size-10 [&_svg]:size-5">
							<AvatarImage
								src={session.user?.image || ''}
								alt={session.user?.name || ''}
							/>
							<AvatarFallback>
								<User />
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{session.user?.name}</p>
							<p className="text-xs leading-none text-muted-foreground truncate">
								{session.user?.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={e => {
							e.preventDefault()
							setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
						}}
						className="flex items-center justify-between cursor-pointer"
					>
						<span className="flex items-center gap-2">Theme</span>
						<span className="relative size-6">
							<Sun
								className={`absolute top-1 left-0 size-6 text-yellow-500 transition-opacity duration-300 ${
									resolvedTheme === 'light' ? 'opacity-100' : 'opacity-0'
								}`}
							/>
							<Moon
								className={`absolute top-1 left-0 size-6 text-blue-500 transition-opacity duration-300 ${
									resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'
								}`}
							/>
						</span>
					</DropdownMenuItem>
					{session?.user?.isAnonymous && (
						<>
							<DropdownMenuItem
								onClick={googleSignIn}
								className="flex items-center gap-2"
							>
								<Google />
								Link with Google
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={githubSignIn}
								className="flex items-center gap-2"
							>
								<Github className="invert dark:invert-0" />
								Link with GitHub
							</DropdownMenuItem>
						</>
					)}
					{session?.user?.isAnonymous ? (
						<AlertDialog>
							<AlertDialogTrigger asChild>
								<DropdownMenuItem
									onSelect={e => e.preventDefault()}
									className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
								>
									<LogOut className="size-4" />
									Sign out
								</DropdownMenuItem>
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle className="flex items-center gap-2">
										<AlertCircle className="size-5 text-yellow-500" /> Are you sure?
									</AlertDialogTitle>
									<AlertDialogDescription>
										You wont be able to sign into this anonymous account anymore and wont
										be able to manage your quotes.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={handleDeleteAccount}>
										Sign out
									</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					) : (
						<>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<DropdownMenuItem
										onSelect={e => e.preventDefault()}
										className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
									>
										<Trash2 className="size-4" />
										Delete Account
									</DropdownMenuItem>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle className="flex items-center gap-2">
											<AlertCircle className="size-5 text-red-500" /> Are you sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											Your account will be deleted but your quotes will stay intact as
											anonymous and wont be able to be managed.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={handleDeleteAccount}>
											Delete Account
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							<DropdownMenuItem onClick={handleSignOut}>
								<LogOut className="size-4" />
								Sign out
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		)
	}

	return (
		<>
			{isPending ? (
				<Loader2 className="animate-spin" />
			) : (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="sm">
							<LogIn className="size-4" />
							Sign In
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>Sign In</DialogTitle>
							<DialogDescription>
								Choose either sign in method to manage your quotes
							</DialogDescription>
						</DialogHeader>
						<div className="flex flex-col gap-4 py-4">
							<Button
								onClick={googleSignIn}
								className="w-full gap-2"
								variant="outline"
							>
								<Google />
								Sign in with Google
							</Button>
							<Button
								onClick={githubSignIn}
								className="w-full gap-2"
								variant="outline"
							>
								<Github className="invert dark:invert-0" />
								Sign in with GitHub
							</Button>
							<Button onClick={anonymousSignIn} className="w-full gap-2">
								<User className="size-4" />
								Continue as Anonymous
							</Button>
						</div>
						<DialogFooter className="place-self-start text-xs text-muted-foreground">
							You can continue as Anonymous without signing in
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}
