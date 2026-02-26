/**
 * 客户端路由守卫：未登录时重定向到 /login
 * 在需要保护的页面顶部添加：definePageMeta({ middleware: 'auth' })
 */
export default defineNuxtRouteMiddleware(async () => {
    const { isLoggedIn, init } = useAuth()
    await init()
    if (!isLoggedIn.value) {
        return navigateTo('/login')
    }
})
