function checkEmpty(paramether: string | number): boolean {
  if (typeof paramether === 'string') {
      paramether = paramether.trim()
  }

  return ((paramether === "") || (paramether === undefined))
}

function checkEmptyFields(paramethers: any): any {
  const paramether = paramethers[0]

  if (paramethers.length <= 1) {
      return ((paramether === "") || (paramether === undefined))
  } else {
      paramethers.shift()
      return ((paramether === "") || (paramether === undefined)) || checkEmptyFields(paramethers)
  }
}

function checkStringEmpty(paramether: string): boolean {
  return paramether === undefined || paramether === null || paramether.trim() === ''
}

function checkNumberEmpty(paramether: number): boolean {
  return paramether === undefined || paramether === null || Number.isNaN(paramether)
}

function checkEmptyList(paramether: Array<any>): boolean {
  return paramether === undefined || paramether === null || paramether.length === 0
}

function validateEmail(email: string): boolean {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkEmptyDate(paramether: Date): boolean {
  return paramether === undefined || paramether === null
}

function checkNotExistEnum(enumType: any, value: any): boolean {
  return !Object.values(enumType)
      .map((v) => typeof (v) === 'string' ? v.toLowerCase() : v)
      .includes(typeof (value) === 'string' ? value.toLowerCase() : value)
}

function checkBooleanEmpty(e: boolean): boolean {
  return e === undefined || e === null
}

export {
  checkEmpty,
  checkStringEmpty,
  checkNumberEmpty,
  validateEmail,
  checkEmptyFields,
  checkEmptyList,
  checkEmptyDate,
  checkNotExistEnum,
  checkBooleanEmpty
}
