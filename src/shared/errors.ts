export class ParseError extends Error {
  constructor(name: string) {
    super(
      `Failed to parse ${name} data: invalid data format. Please ensure all fields are correctly typed.`
    );
  }
}
