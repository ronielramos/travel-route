import readline from 'readline'

import { IConsoleAccess } from '../IConsoleAccess.provider'

export class ConsoleAccess implements IConsoleAccess {
  readLineInterface: readline.Interface

  constructor () {
    this.readLineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  ask (question: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.readLineInterface.question(question, (answer) => {
        resolve(answer)
      })
    })
  }

  close () {
    this.readLineInterface.close()
  }
}
