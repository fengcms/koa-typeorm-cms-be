import { CacheConfig } from '@/config'

export const useCheckCache = (key: string) => {
  if (!CacheConfig.enable) return null
  const cache = global.cache[key]
  if (cache && cache.time > Date.now() - CacheConfig.time) {
    return cache.data
  }
  return null
}

export const useSetCache = (key: string, data: any) => {
  if (!CacheConfig.enable) return
  global.cache[key] = { data, time: Date.now() }
}

export const useClearCache = () => {
  global.cache = {}
}
