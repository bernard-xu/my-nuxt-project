export default defineEventHandler((event) => {
    // 清除 auth Cookie
    deleteCookie(event, 'auth_token')
    return { message: '已退出登录' }
})
