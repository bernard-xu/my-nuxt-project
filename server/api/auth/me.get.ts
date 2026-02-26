export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token')

    if (!token) {
        throw createError({ statusCode: 401, statusMessage: '未登录' })
    }

    let payload
    try {
        payload = await verifyToken(token)
    }
    catch {
        throw createError({ statusCode: 401, statusMessage: 'Token 无效或已过期' })
    }

    const user = db.users.findById(payload.userId)
    if (!user) {
        throw createError({ statusCode: 401, statusMessage: '用户不存在' })
    }

    return {
        user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
    }
})
