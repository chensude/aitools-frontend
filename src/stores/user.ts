import { defineStore } from 'pinia'
import { login } from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    userId: null,
    username: ''
  }),

  actions: {
    async login(username: string, password: string) {
      const res = await login(username, password)
      if (res.code === 200) {
        this.token = res.data.token
        this.userId = res.data.userId
        this.username = res.data.username
        localStorage.setItem('token', res.data.token)
      }
      return res
    }
  }
}) 