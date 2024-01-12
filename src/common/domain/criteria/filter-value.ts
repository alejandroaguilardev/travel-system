export class FilterValue {
  constructor(private readonly value: unknown) {}

  getValue(): unknown {
    return this.value;
  }
}
