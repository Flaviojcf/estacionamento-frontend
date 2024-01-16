interface IErrorData {
  Message: string
  Status: number
}

export interface ICustomError {
  TraceId: string
  Errors: IErrorData[]
}
