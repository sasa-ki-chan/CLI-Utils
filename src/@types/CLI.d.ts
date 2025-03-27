declare namespace CLI {
  type Option = {
    long: string;
    short: string;
    effect: (arg?: string) => any;
    description?: string;
  }
}