export interface IUseCase {
  execute<INPUT, OUTPUT>(data: INPUT): OUTPUT | Promise<OUTPUT>
}
