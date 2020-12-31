export class PromiseSignal<T> {
  readonly promise: Promise<T>;

  resolve = (value: T | PromiseLike<T>): void => {
    throw value;
  };
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
