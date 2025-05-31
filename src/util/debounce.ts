export default function debounce<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  ms: number = 300
): (...args: TArgs) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: TArgs): void {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}
