export interface AuthUser {
    id: string
    name: string
    email: string
    createdAt: string
}

// 全局单例状态
const user = ref<AuthUser | null>(null)
const initialized = ref(false)

export function useAuth() {
    const router = useRouter()

    /** 初始化：从服务器拉取当前登录用户（仅拉取一次） */
    async function init() {
        if (initialized.value) return
        initialized.value = true
        try {
            const data = await $fetch<{ user: AuthUser }>('/api/auth/me')
            user.value = data.user
        }
        catch {
            user.value = null
        }
    }

    /** 注册 */
    async function register(name: string, email: string, password: string) {
        const data = await $fetch<{ user: AuthUser }>('/api/auth/register', {
            method: 'POST',
            body: { name, email, password }
        })
        user.value = data.user
        await router.push('/dashboard')
    }

    /** 登录 */
    async function login(email: string, password: string) {
        const data = await $fetch<{ user: AuthUser }>('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        })
        user.value = data.user
        await router.push('/dashboard')
    }

    /** 退出 */
    async function logout() {
        await $fetch('/api/auth/logout', { method: 'POST' })
        user.value = null
        await router.push('/login')
    }

    const isLoggedIn = computed(() => !!user.value)

    return { user: readonly(user), isLoggedIn, init, login, register, logout }
}
