import fs from 'fs'
import { promisify } from 'util'

import { IFileAccess } from '../IFileAccess'

export class FileAccess implements IFileAccess {
  private readonly readFile: (pathToFile: string) => Promise<Buffer>
  private readonly writeFile: (pathToFile: string, data: string | Buffer) => Promise<void>

  constructor () {
    this.readFile = promisify(fs.readFile)
    this.writeFile = promisify(fs.writeFile)
  }

  read (file: string): Promise<Buffer> {
    return this.readFile(file)
  }

  write (file: string, data: Buffer | string): Promise<void> {
    return this.writeFile(file, data)
  }
}
