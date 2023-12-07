'use client'

import { signOut } from 'next-auth/react'

export default function LogoutButton() {
	return (
		<button
			className="flex h-full items-center justify-between rounded border bg-white px-5 sm:h-14 sm:px-5"
			onClick={() =>
				signOut({
					callbackUrl: process.env.NEXT_PUBLIC_CALLBACKURL,
				})
			}
		>
			<p className="flex-1 text-center text-sm font-medium text-black sm:text-lg">
				로그아웃
			</p>
		</button>
	)
}
