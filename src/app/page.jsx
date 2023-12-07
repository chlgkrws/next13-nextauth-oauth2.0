import Link from 'next/link'
import LogoutButton from '@/app/components/LogoutButton'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/(next-api)/(auth)/api/auth/[...nextauth]/route'

export default async function Home() {
	const session = await getServerSession(authOptions)

	return (
		<>
			<div
				className={`flex h-screen flex-col items-center justify-center`}
			>
				{!session && (
					<div className="flex h-full items-center justify-between rounded border bg-white px-5 sm:h-14 sm:px-5">
						<Link
							className="flex-1 text-center text-sm font-medium text-black sm:text-lg"
							href={'/login'}
						>
							로그인 페이지로 이동
						</Link>
					</div>
				)}

				{session && (
					<>
						<p className="mb-4">환영합니다.</p>
						<LogoutButton />
					</>
				)}
			</div>
		</>
	)
}
