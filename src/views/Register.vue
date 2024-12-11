<template>
  <div class="register-page">
    <div class="register-box">
      <h2>创建账号</h2>
      <p class="subtitle">加入 AI Tools Hub，开启智能创作之旅</p>
      
      <el-form ref="formRef" :model="form" :rules="rules" class="register-form">
        <el-form-item prop="username">
          <el-input 
            v-model="form.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input 
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input 
            v-model="form.confirmPassword"
            type="password"
            placeholder="请确认密码"
            :prefix-icon="Lock"
            show-password
          />
        </el-form-item>
        
        <el-button type="primary" class="submit-btn" @click="handleRegister" :loading="loading">
          注册
        </el-button>
      </el-form>
      
      <div class="login-link">
        已有账号？
        <el-link type="primary" @click="router.push('/login')" :underline="false">
          立即登录
        </el-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%),
              linear-gradient(45deg, rgba(59, 130, 246, 0.02) 0%, rgba(37, 99, 235, 0.02) 100%);
  padding: 20px;
}

.register-box {
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

.register-form {
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

.submit-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 12px;
  margin: 24px 0;
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

.login-link {
  text-align: center;
  color: #64748b;
  font-size: 0.95em;
}

.login-link :deep(.el-link) {
  margin-left: 4px;
  font-weight: 500;
  padding: 0 2px;
}

@media (max-width: 480px) {
  .register-box {
    padding: 30px 20px;
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' }
  ]
}

const handleRegister = async () => {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: form.value.username,
            password: form.value.password
          })
        })
        
        if (response.ok) {
          ElMessage.success('注册成功')
          router.push('/login')
        } else {
          const data = await response.json()
          ElMessage.error(data.message || '注册失败')
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