export function prepare(text: string, font: string): unknown;
export function layout(
  handle: unknown,
  maxWidth: number,
  lineHeight: number
): { height: number; lineCount: number };
