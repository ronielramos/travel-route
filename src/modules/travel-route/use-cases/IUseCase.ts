export interface IUseCase<INPUT, OUTPUT> {
  execute(data: INPUT): OUTPUT | Promise<OUTPUT>
}
