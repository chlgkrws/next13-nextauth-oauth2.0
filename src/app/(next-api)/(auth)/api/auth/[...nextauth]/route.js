/**
 * Next Auth 라이브러리를 사용하기 위한 js
 *
 */
import NextAuth from 'next-auth'
import KakaoProvider from 'next-auth/providers/kakao'
import NaverProvider from 'next-auth/providers/naver'
import GoogleProvider from 'next-auth/providers/google'

/**
 * OAuth 카카오 Provider 설정
 */
const kakaoProfileOAuthConfig = KakaoProvider({
	clientId: process.env.OAUTH_KAKAO_CLIENT_ID,
	clientSecret: process.env.OAUTH_KAKAO_CLIENT_SECRET,
	authorization: { params: { scope: 'account_email' } },
	profile(profile) {
		return {
			id: profile.id,
			name: profile.properties.nickname,
			email: profile.kakao_account.email,
			gender: profile.kakao_account.gender,
			age_range: profile.kakao_account.age_range,
		}
	},
})

/**
 * OAuth 네이버 Provider 설정
 */
const naverProfileOAuthConfig = NaverProvider({
	clientId: process.env.OAUTH_NAVER_CLIENT_ID,
	clientSecret: process.env.OAUTH_NAVER_CLIENT_SECRET,
	profile(profile) {
		return {
			id: profile.response.id,
			name: profile.response.nickname,
			email: profile.response.email,
			gender: profile.response.gender,
		}
	},
})

/**next
 * OAuth 구글 Provider 설정
 */
const googleProfileOAuthConfig = GoogleProvider({
	clientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
	clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
	profile(profile) {
		return {
			id: profile.sub,
			name: profile.name,
			email: profile.email,
			gender: profile.gender,
		}
	},
})

export const authOptions = {
	providers: [
		kakaoProfileOAuthConfig,
		naverProfileOAuthConfig,
		googleProfileOAuthConfig,
	],
	/**
	 * 콜백은 작업이 수행될 때 발생하는 작업을 제어하는 데 사용할 수 있는 비동기 함수입니다.
	 */
	callbacks: {
		/**
		 * json 웹 토큰(next-auth가 생성)이 생성되거나 업데이트 됐을 때 실행되는 콜백함수
		 * - /api/auth/signin, /api/auth/session에 대한 요청과 getSession(), getServerSession(), useSession()에 대한 호출 시에도 실행 됨
		 * - 로그인에 대한 jwt 콜백 호출은 account와 user 정보를 가지고 있음 (해당 값이 존재하면 로그인에 의한 콜백호출임)
		 * - return 값은 암호화되어 쿠키에 저장됨
		 *
		 * @Reference: https://next-auth.js.org/configuration/callbacks#jwt-callback
		 */
		async jwt({ account, user, profile, token }) {
			if (account && user) {
				// ... 인증결과 처리
			}
			return token
		},
		/**
		 * 세션 콜백은 세션이 확인될 때마다 호출됩니다. 기본적으로 보안을 강화하기 위해 토큰의 하위 집합만 반환됩니다
		 * - 세션 확인 - getSession(), useSession(), /api/auth/session
		 * - jwt 콜백을 사용하는 경우, 세션 콜백 호출전 jwt 콜백이 호출되므로 jwt 콜백에서 추가한 내용을 session 콜백에서 사용할 수 있음
		 * @Reference: https://next-auth.js.org/configuration/callbacks#session-callback
		 */
		async session({ session, token, user }) {
			return session
		},
		/**
		 * 리디렉션 콜백은 사용자가 콜백 URL(예: 로그인 또는 로그아웃 시)로 리디렉션될 때마다 호출됩니다.
		 * - 기본적으로 사이트와 동일한 URL에 있는 URL만 허용되므로 리디렉션 콜백을 사용하여 해당 동작을 사용자 지정할 수 있습니다.
		 *
		 * @Reference: https://next-auth.js.org/configuration/callbacks#redirect-callback
		 */
		async redirect({ url, baseUrl }) {
			return Promise.resolve('/auth-support')
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
