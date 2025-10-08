class CampaignAssociation {
  public campaignID: string
  public userName: string
  public messages: string
  public scheduledAt: Date
  public status: string
  public createdAt: Date
  public updatedAt: Date

  constructor(campaignID: string, userName: string, messages: string,
    scheduledAt: Date, status: string, createdAt: Date, updatedAt: Date) {
    this.campaignID = campaignID
    this.userName = userName
    this.messages = messages
    this.scheduledAt = scheduledAt
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

class ContactAssociation {
  public contactID: string
  public userID: string
  public phoneNumber: string
  public name: string
  public tags: string[] | null
  public createdAt: Date
  public updatedAt: Date

  constructor(
    contactID: string,
    userID: string,
    phoneNumber: string,
    name: string,
    tags: string[] | null,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.contactID = contactID
    this.userID = userID
    this.phoneNumber = phoneNumber
    this.name = name
    this.tags = tags
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

class MessageAssociation {
  public messageID: string | null
  public content: string
  public status: string
  public createdAt: Date
  public updatedAt: Date
  constructor(
    messageID: string | null,
    content: string,
    status: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.messageID = messageID
    this.content = content
    this.status = status
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

class UserAssociation {
  public userID: string | null
  public name: string
  public email: string
  public passwordHash: string
  public createdAt: Date
  public updatedAt: Date

  constructor(
    userID: string | null,
    name: string,
    email: string,
    passwordHash: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.userID = userID
    this.name = name
    this.email = email
    this.passwordHash = passwordHash
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}

class GetLoginUserAssociation {
  public email: string
  public passwordHash: string

  constructor(email: string, passwordHash: string) {
    this.email = email,
    this.passwordHash = passwordHash
  }
}

export {
  CampaignAssociation, ContactAssociation, MessageAssociation, UserAssociation, GetLoginUserAssociation
}