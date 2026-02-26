import { SignJWT, jwtVerify } from 'jose'

export interface JWTPayload {
    userId: string
    email: string
}

function getSecret() {
    const config = useRuntimeConfig()
    return new TextEncoder().encode(config.jwtSecret)
}

/** 签发 JWT Token，默认有效期 7 天 */
export async function signToken(payload: JWTPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(getSecret())
}

/** 验证并解析 JWT Token */
export async function verifyToken(token: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as JWTPayload
}
