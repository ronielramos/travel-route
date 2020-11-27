import readline, { Interface } from 'readline'

export default class TravelRouteController {
  private readLineInterface: Interface

  constructor () {
    this.readLineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  private ask (question: string): Promise<string> {
    return new Promise<string>((resolve) => {
      this.readLineInterface.question(question, (answer) => resolve(answer))
    })
  }

  async execute (): Promise<void> {
    const route = await this.ask('Please enter the route:')

    const originAndDestiny = route
      .split('-')
      .map(route => route.trim())

    const [origin, destiny] = originAndDestiny
  }
}
