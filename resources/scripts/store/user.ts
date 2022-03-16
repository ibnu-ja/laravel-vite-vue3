import { defineStore } from 'pinia'

export type RootState = {
  theme?: string,
  selected?: string,
  drawer?: boolean
}

export const useUserStore = defineStore('user', {
  state: () => <RootState>({
    theme: undefined,
    selected: undefined,
    drawer: undefined
  })
})
