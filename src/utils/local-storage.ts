export const setLocalStorage = <T>(key: string, value: T): void => {
  const serializedValue = JSON.stringify(value)
  localStorage.setItem(key, serializedValue)
}

export const getLocalStorage = <T>(key: string): T | null => {
  const item = localStorage.getItem(key)
  return item ? (JSON.parse(item) as T) : null
}
