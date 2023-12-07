'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * 로그인/로그아웃 후 호출되는 페이지
 */
export default function AuthSupport() {
	const router = useRouter()

	useEffect(() => {
		fetch('/auth-support/process').then((res) => {
			if (res.ok) {
				router.push('/')
			}
		})
	}, [])

	return <>로그인/로그아웃 후 호출되는 페이지</>
}
