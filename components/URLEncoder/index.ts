export function URLEncoder(raw: string): string {
  return encodeURIComponent(raw);
}

export function URLDecoder(raw: string): string {
  return decodeURIComponent(raw);
}
