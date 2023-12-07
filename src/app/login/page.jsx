'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import googleIcon from '/public/login/googleIcon.png'
import kakaoIcon from '/public/login/kakaoIcon.png'
import naverIcon from '/public/login/naverIcon.png'

export default function Home() {
	return (
		<>
			<div
				className={`flex h-screen flex-col items-center justify-center`}
			>
				<button
					className={`mx-auto mb-5 h-14 w-80 sm:h-14 sm:w-[460px]`}
					onClick={() => signIn('google')}
				>
					<div className="flex h-full items-center justify-between rounded border border-[#e0e0e0] bg-white px-5 sm:h-14 sm:px-5">
						<Image className={`x-6 h-6`} src={googleIcon}></Image>
						<p className="flex-1 text-center text-sm font-medium text-black sm:text-lg">
							Google로 로그인하기
						</p>
					</div>
				</button>
				<button
					className={`mx-auto mb-5 h-14 w-80 sm:h-14 sm:w-[460px]`}
					onClick={() => signIn('kakao')}
				>
					<div className="flex h-full items-center justify-between rounded bg-[#fede02] px-5 sm:h-14 sm:px-5">
						<Image className={`x-6 h-6`} src={kakaoIcon}></Image>
						<p className="flex-1 text-center text-sm font-medium text-black sm:text-lg">
							카카오로 로그인하기
						</p>
					</div>
				</button>
				<button
					className={`mx-auto mb-5 h-14 w-80 sm:h-14 sm:w-[460px]`}
					onClick={() => signIn('naver')}
				>
					<div className="flex h-full items-center justify-between rounded bg-[#03c75a] px-5 sm:h-14 sm:px-5">
						<Image className={`x-6 h-6`} src={naverIcon}></Image>
						<p className="flex-1 text-center text-sm font-medium text-white sm:text-lg">
							네이버로 로그인하기
						</p>
					</div>
				</button>
			</div>
		</>
	)
}
