export function setLocalStorage<T>(key: string, value: T): void {
  const serializedValue = JSON.stringify(value)
  localStorage.setItem(key, serializedValue)
}

export function getLocalStorage<T>(key: string): T | null {
  const item = localStorage.getItem(key)
  return item ? (JSON.parse(item) as T) : null
}
