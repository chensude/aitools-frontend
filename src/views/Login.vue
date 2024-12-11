<template>
  <div class="login-page">
    <div class="login-box">
      <h2>欢迎回来</h2>
      <p class="subtitle">登录您的AI Tools Hub账号</p>
      
      <el-form ref="formRef" :model="form" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input 
            v-model="form.username"
            placeholder="用户名/邮箱"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="form.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <div class="form-footer">
          <el-checkbox v-model="form.remember">记住我</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码？</el-link>
        </div>
        
        <el-button type="primary" class="submit-btn" @click="handleLogin" :loading="loading">
          登录
        </el-button>
      </el-form>
      
      <div class="register-link">
        还没有账号？
        <el-link type="primary" @click="router.push('/register')" :underline="false">
          立即注册
        </el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
  remember: false
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能小于3位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: form.username,
            password: form.password
          })
        })
        
        const data = await response.json()
        
        if (data.code === 200) {  // 明确检查成功状态码
          // 登录成功
          ElMessage.success('登录成功')
          // 存储token
          localStorage.setItem('token', data.data.token)
          // 跳转到主页
          router.push('/dashboard')
        } else if (data.code === 401) {  // 处理认证失败
          ElMessage.error(data.msg || '用户名或密码错误')
        } else {  // 处理其他错误
          ElMessage.error(data.msg || '登录失败')
        }
      } catch (error) {
        ElMessage.error('网络错误，请稍后重试')
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%),
              linear-gradient(45deg, rgba(59, 130, 246, 0.02) 0%, rgba(37, 99, 235, 0.02) 100%);
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 440px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02),
              0 10px 15px rgba(0,0,0,0.03),
              0 0 0 1px rgba(0,0,0,0.01);
}

h2 {
  text-align: center;
  font-size: 28px;
  color: #1e293b;
  margin-bottom: 8px;
  font-weight: 600;
  letter-spacing: -0.5px;
}

.subtitle {
  color: #64748b;
  font-size: 1.1em;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.5;
  letter-spacing: 0.2px;
}

.login-form {
  margin-top: 24px;
}

:deep(.el-input__wrapper) {
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.08);
}

:deep(.el-input__prefix) {
  margin-right: 12px;
  color: #64748b;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 24px;
}

:deep(.el-checkbox__label) {
  color: #64748b;
  font-size: 0.95em;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1),
              0 0 0 1px rgba(59, 130, 246, 0.1);
}

.submit-btn:hover {
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25),
              0 0 0 1px rgba(59, 130, 246, 0.1);
}

.register-link {
  text-align: center;
  color: #64748b;
  font-size: 0.95em;
}

.register-link :deep(.el-link) {
  margin-left: 4px;
  font-weight: 500;
  padding: 0 2px;
}

@media (max-width: 480px) {
  .login-box {
    padding: 30px 20px;
  }
}
</style> 