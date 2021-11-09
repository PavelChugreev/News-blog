export enum ValidationCodes {
  REQUIRED = 'required',
  EMAIL = 'email',
  MIN = 'minlength',
}

export const validationMessages: {[prop: string]: string} = {
  [ValidationCodes.REQUIRED]: 'Обязательное поле',
  [ValidationCodes.EMAIL]: 'Некорректный email',
  [ValidationCodes.MIN]: 'Некорректное количество символов'
}