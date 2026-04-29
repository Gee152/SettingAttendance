class Dependent {
  public name: string
  public birthDate: Date
  public relationship: string
  public cpf: string
  public rg: string

  constructor(
    name: string,
    birthDate: Date,
    relationship: string,
    cpf: string,
    rg: string
  ) {
    this.name = name
    this.birthDate = birthDate
    this.relationship = relationship
    this.cpf = cpf
    this.rg = rg
  }
}

export {
  Dependent
}