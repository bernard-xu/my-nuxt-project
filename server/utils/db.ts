/**
 * 内存模拟数据库
 * ⚠️  生产环境请替换为真实数据库（如 Prisma + PostgreSQL）
 *     重启服务后数据会清空
 */

export interface User {
    id: string
    name: string
    email: string
    passwordHash: string
    createdAt: string
}

// 全局用户存储 Map（email → User）
const users = new Map<string, User>()

export const db = {
    users: {
        findByEmail(email: string): User | undefined {
            return users.get(email.toLowerCase())
        },

        findById(id: string): User | undefined {
            for (const user of users.values()) {
                if (user.id === id) return user
            }
        },

        create(data: Omit<User, 'id' | 'createdAt'>): User {
            const user: User = {
                ...data,
                id: crypto.randomUUID(),
                email: data.email.toLowerCase(),
                createdAt: new Date().toISOString()
            }
            users.set(user.email, user)
            return user
        }
    }
}
