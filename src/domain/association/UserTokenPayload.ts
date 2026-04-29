export class UserTokenPayload {
  userID: string | null
  name: string
  email: string

  constructor(userID: string | null, name: string, email: string) {
    this.userID = userID
    this.name = name
    this.email = email
  }
}
