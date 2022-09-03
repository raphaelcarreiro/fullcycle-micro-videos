export interface UseCase<Input, Output> {
  execute(imput: Input): Output | Promise<Output>;
}
