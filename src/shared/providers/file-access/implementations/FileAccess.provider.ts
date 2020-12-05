import fs from 'fs'
import { promisify } from 'util'

import { IFileAccess } from '../IFileAccess.provider'

export class FileAccess implements IFileAccess {
  private readonly readFile: (fileAddress: string) => Promise<Buffer>
  private readonly appendFile: (fileAddress: string, data: string | Buffer) => Promise<void>
  private readonly writeFile: (fileAddress: string, data: string | Buffer) => Promise<void>
  private readonly unlinkFile: (fileAddress: string) => Promise<void>

  constructor () {
    this.readFile = promisify(fs.readFile)
    this.appendFile = promisify(fs.appendFile)
    this.unlinkFile = promisify(fs.unlink)
    this.writeFile = promisify(fs.writeFile)
  }

  read (fileAddress: string): Promise<Buffer> {
    return this.readFile(fileAddress)
  }

  write (fileAddress: string, data: string): Promise<void> {
    return this.appendFile(fileAddress, data)
  }

  remove (fileAddress: string): Promise<void> {
    return this.unlinkFile(fileAddress)
  }

  overWrite (fileAddress: string, data: string): Promise<void> {
    return this.writeFile(fileAddress, data)
  }
}
