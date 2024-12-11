import request from '@/utils/request'

export interface RegisterData {
  username: string
  password: string
}

export interface LoginData {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export const register = (data: RegisterData) => {
  return request({
    url: '/api/auth/register',
    method: 'post',
    data
  })
}

export const login = (data: LoginData) => {
  return request<LoginResponse>({
    url: '/api/auth/login',
    method: 'post',
    data
  })
} 