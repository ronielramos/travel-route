export interface IFileAccess {
  read(fileAddress: string): Promise<Buffer>
  write(fileAddress: string, data: Buffer | string): Promise<void>
}
