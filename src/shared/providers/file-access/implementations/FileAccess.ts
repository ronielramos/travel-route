import fs from 'fs'
import { promisify } from 'util'

import { IFileAccess } from '../IFileAccess'

export class FileAccess implements IFileAccess {
  private readonly readFile: (pathToFile: string) => Promise<Buffer>
  private readonly appendFile: (pathToFile: string, data: string | Buffer) => Promise<void>

  constructor () {
    this.readFile = promisify(fs.readFile)
    this.appendFile = promisify(fs.appendFile)
  }

  read (file: string): Promise<Buffer> {
    return this.readFile(file)
  }

  write (file: string, data: string): Promise<void> {
    return this.appendFile(file, data + '\n')
  }

  copy (origin: string, destination: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const readStream = fs.createReadStream(origin)
      const writeStream = fs.createWriteStream(destination)

      readStream
        .pipe(writeStream)
        .on('end', () => resolve())
        .on('error', (error) => reject(error))
    })
  }
}
