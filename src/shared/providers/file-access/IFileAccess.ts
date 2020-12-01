export interface IFileAccess {
  read(fileAddress: string): Promise<Buffer>
  write(fileAddress: string, data: string): Promise<void>
}
