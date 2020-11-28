export class PromiseSignal<T> {
  readonly promise: Promise<T>;

  resolve = () => {};
  reject = (reason?: any): void => {
    throw reason;
  };

  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}
