export interface UUID {
  generate(): string;
  validate(uuid: string): boolean;
}
