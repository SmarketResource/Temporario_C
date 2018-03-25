export class Estudante {
  constructor(
      public studentId: string = '',
      public name: string = '',
      public phone: string = '',
      public email: string = '',
      public nickName: string = '',
      public dateCreate: any = null,
      public dateModified: any = null
    ) {
  }
}
