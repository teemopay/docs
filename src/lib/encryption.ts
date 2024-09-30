// 导入所需的加密模块和工具函数
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

// 定义加密算法
const algorithm = 'aes-256-ctr';
// 将 scrypt 函数转换为 Promise 版本
const scryptAsync = promisify(scrypt);

// 生成加密密钥
async function getKey(): Promise<Buffer> {
  // 使用 scrypt 函数生成密钥，salt 为固定值 'salt'，密钥长度为 32 字节
  return scryptAsync(import.meta.env.ENCRYPTION_SECRET_KEY, 'salt', 32) as Promise<Buffer>;
}

// 加密函数
export async function encrypt(text: string): Promise<string> {
  // 生成随机的初始化向量
  const iv = randomBytes(16);
  // 获取加密密钥
  const key = await getKey();
  // 创建加密器
  const cipher = createCipheriv(algorithm, key, iv);
  // 加密数据
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  // 返回加密结果，格式为 "iv:加密内容"
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

// 解密函数
export async function decrypt(hash: string): Promise<string> {
  try {
    const [ivHex, content] = hash.split(':');
    if (!ivHex || !content) {
      throw new Error('Invalid encrypted text format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const key = await getKey();
    const decipher = createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(content, 'hex')),
      decipher.final()
    ]);
    return decrypted.toString();
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt: ' + (error as Error).message);
  }
}