export interface IFileAccess {
  read(fileAddress: string): Promise<Buffer>
  write(fileAddress: string, data: string): Promise<void>
  overWrite(fileAddress: string, data: string): Promise<void>
  remove(fileAddress: string): Promise<void>
}
