/**
 * 使用 Web Crypto API (PBKDF2) 进行密码哈希
 * 原生支持 Bun、Node.js、Edge Runtime，无需额外依赖
 */

const ITERATIONS = 100_000
const HASH_ALG = 'SHA-256'
const KEY_LENGTH = 32

function bufToHex(buf: ArrayBuffer): string {
    return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}

function hexToBuf(hex: string): Uint8Array {
    const bytes = new Uint8Array(hex.length / 2)
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
    }
    return bytes
}

/** 哈希明文密码，返回 "salt:hash" 格式字符串 */
export async function hashPassword(plain: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16))
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(plain),
        'PBKDF2',
        false,
        ['deriveBits']
    )
    const derived = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: salt.buffer as ArrayBuffer, iterations: ITERATIONS, hash: HASH_ALG },
        keyMaterial,
        KEY_LENGTH * 8
    )
    return `${bufToHex(salt.buffer)}:${bufToHex(derived)}`
}

/** 验证明文密码是否匹配哈希字符串 */
export async function verifyPassword(plain: string, stored: string): Promise<boolean> {
    const [saltHex, hashHex] = stored.split(':')
    if (!saltHex || !hashHex) return false

    const salt = hexToBuf(saltHex)
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(plain),
        'PBKDF2',
        false,
        ['deriveBits']
    )
    const derived = await crypto.subtle.deriveBits(
        { name: 'PBKDF2', salt: salt.buffer as ArrayBuffer, iterations: ITERATIONS, hash: HASH_ALG },
        keyMaterial,
        KEY_LENGTH * 8
    )

    // 使用时间恒定比较防止时序攻击
    const a = new Uint8Array(derived)
    const b = hexToBuf(hashHex)
    if (a.length !== b.length) return false
    let diff = 0
    for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!
    return diff === 0
}
