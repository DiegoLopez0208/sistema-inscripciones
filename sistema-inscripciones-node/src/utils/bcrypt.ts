import { compare, hashSync } from 'bcrypt'

const encrypt = (password: string) => {
  const passwordHash = hashSync(password, 10)
  return passwordHash
}

const verified = async (password: string, hash: string): Promise<boolean> => {
  return await compare(password, hash)
}

export { encrypt, verified }
