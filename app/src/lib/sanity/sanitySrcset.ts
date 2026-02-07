export default function sanitySrcset(url: string, sizes: number[]): string {
  if (!url.includes('?')) {
    url += '?auto=format'
  }
  return sizes.map((size) => `${url}&w=${size} ${size}w`).join(',')
}
