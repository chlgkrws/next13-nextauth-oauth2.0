import { NextResponse } from 'next/server'

/**
 * 로그인/로그아웃 후 호출되는 API
 */
export async function GET(request) {
	// ...후처리 작업

	return NextResponse.json(null)
}
