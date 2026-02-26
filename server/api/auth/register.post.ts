export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { name, email, password } = body

    // 参数校验
    if (!name || !email || !password) {
        throw createError({ statusCode: 400, statusMessage: '姓名、邮箱和密码不能为空' })
    }
    if (password.length < 6) {
        throw createError({ statusCode: 400, statusMessage: '密码至少 6 位' })
    }

    // 检查邮箱是否已注册
    if (db.users.findByEmail(email)) {
        throw createError({ statusCode: 409, statusMessage: '该邮箱已被注册' })
    }

    // 哈希密码并创建用户
    const passwordHash = await hashPassword(password)
    const user = db.users.create({ name, email, passwordHash })

    // 签发 Token 并写入 httpOnly Cookie
    const token = await signToken({ userId: user.id, email: user.email })
    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 天
    })

    setResponseStatus(event, 201)
    return {
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
    }
})
