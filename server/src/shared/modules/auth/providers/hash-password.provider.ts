export interface IHashPassword {
  hash(password: string, salt?: number | string): Promise<string>
  compare(password: string, hashPassword: string): Promise<boolean>
}
