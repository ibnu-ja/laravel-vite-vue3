import { defineStore } from 'pinia'

export type RootState = {
  theme?: string,
  selected: string | null,
  drawer?: any
}

export const useUserStore = defineStore('user', {
  state: () => <RootState>({
    theme: undefined,
    selected: null,
    drawer: null
  })
})
