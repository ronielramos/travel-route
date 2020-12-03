type Answer = string

export interface IConsoleAccess {
  ask(question: string): Promise<Answer>
  close(): void
}
