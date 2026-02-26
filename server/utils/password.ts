import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 12

/** 哈希明文密码 */
export async function hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, SALT_ROUNDS)
}

/** 验证明文密码是否匹配哈希值 */
export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash)
}
