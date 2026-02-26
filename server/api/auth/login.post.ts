export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { email, password } = body

    if (!email || !password) {
        throw createError({ statusCode: 400, statusMessage: '邮箱和密码不能为空' })
    }

    // 查找用户
    const user = db.users.findByEmail(email)
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: '邮箱或密码错误' })
    }

    // 验证密码
    const valid = await verifyPassword(password, user.passwordHash)
    if (!valid) {
        throw createError({ statusCode: 401, statusMessage: '邮箱或密码错误' })
    }

    // 签发 Token 并写入 httpOnly Cookie
    const token = await signToken({ userId: user.id, email: user.email })
    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 天
    })

    return {
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
    }
})
