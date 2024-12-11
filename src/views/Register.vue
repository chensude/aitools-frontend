<template>
  <div class="register-page">
    <div class="register-box">
      <h2>创建账号</h2>
      <p class="subtitle">加入AI Tools Hub，开启智能创作之旅</p>
      
      <el-form ref="formRef" :model="form" :rules="rules" class="register-form">
        <el-form-item prop="username">
          <el-input 
            v-model="form.username"
            placeholder="用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        
        <el-form-item prop="email">
          <el-input 
            v-model="form.email"
            placeholder="邮箱"
            :prefix-icon="Message"
          />
        </el-form-item>
        
        <el-form-item prop="code">
          <div class="verify-code">
            <el-input
              v-model="form.code"
              placeholder="请输入验证码"
              :prefix-icon="Key"
            />
            <el-button
              type="primary"
              :disabled="isCountingDown"
              @click="sendVerifyCode"
            >
              {{ countDownText }}
            </el-button>
          </div>
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

        <el-form-item class="agreement">
          <el-checkbox v-model="form.agreement">
            我已阅读并同意
            <el-link type="primary" @click="showAgreement">用户协议</el-link>
            和
            <el-link type="primary" @click="showPrivacy">隐私政策</el-link>
          </el-checkbox>
        </el-form-item>

        <el-button type="primary" class="submit-btn" @click="handleRegister" :loading="loading">
          注册
        </el-button>

        <div class="login-link">
          已有账号？
          <el-link type="primary" @click="router.push('/login')">立即登录</el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Message, Lock, Key, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)
const isCountingDown = ref(false)
const countdown = ref(60)
const countDownText = ref('获取验证码')

const form = reactive({
  username: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: '',
  agreement: false
})

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能小于6位'))
  } else {
    if (form.confirmPassword !== '') {
      formRef.value?.validateField('confirmPassword')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能小于3位', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度应为6位', trigger: 'blur' }
  ],
  password: [
    { validator: validatePass, trigger: 'blur' }
  ],
  confirmPassword: [
    { validator: validatePass2, trigger: 'blur' }
  ]
})

const startCountDown = () => {
  isCountingDown.value = true
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    countDownText.value = `${countdown.value}秒后重试`
    if (countdown.value <= 0) {
      clearInterval(timer)
      isCountingDown.value = false
      countDownText.value = '获取验证码'
    }
  }, 1000)
}

const sendVerifyCode = async () => {
  try {
    await formRef.value?.validateField('email')
    // TODO: 调用发送验证码接口
    ElMessage.success('验证码已发送到您的邮箱')
    startCountDown()
  } catch (error) {
    // 验证失败
  }
}

const handleRegister = async () => {
  if (!form.agreement) {
    ElMessage.warning('请阅读并同意用户协议和隐私政策')
    return
  }

  try {
    await formRef.value?.validate()
    loading.value = true
    // TODO: 调用注册接口
    setTimeout(() => {
      loading.value = false
      ElMessage.success('注册成功')
      router.push('/login')
    }, 1500)
  } catch (error) {
    // 验证失败
  }
}

const showAgreement = () => {
  // TODO: 显示用户协议
}

const showPrivacy = () => {
  // TODO: 显示隐私政策
}
</script>

<style scoped>
  .register-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
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

  .register-form :deep(.el-input) .el-input__wrapper {
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.08);
  }
  
  .register-form :deep(.el-input) .el-input__prefix {
    margin-right: 12px;
    color: #64748b;
  }

  .verify-code {
    display: flex;
    gap: 12px;
  }

  .verify-code :deep(.el-input) {
    flex: 1;
  }

  .verify-code .el-button {
    width: 120px;
    height: 100%;
    border-radius: 12px;
    font-size: 0.95em;
    font-weight: 500;
    background: linear-gradient(135deg, #3b82f6, #2563eb);
    border: none;
    transition: all 0.3s ease;
    padding: 12px 0;
    letter-spacing: 0.3px;
    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1),
                0 0 0 1px rgba(59, 130, 246, 0.1);
  }

  .verify-code .el-button:not(:disabled):hover {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25),
                0 0 0 1px rgba(59, 130, 246, 0.1);
  }

  .verify-code .el-button:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    border: none;
  }

  .agreement {
    margin-bottom: 24px;
  }
  
  .agreement :deep(.el-checkbox__label) {
    color: #64748b;
    font-size: 0.95em;
  }

  .agreement :deep(.el-link) {
    font-weight: 500;
    font-size: 0.95em;
    padding: 0 2px;
  }

  .submit-btn {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border-radius: 12px;
    margin-bottom: 20px;
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
    margin-top: 16px;
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
      margin: 0 16px;
    }

    .verify-code .el-button {
      width: 100px;
      font-size: 0.9em;
      padding: 12px 8px;
      letter-spacing: 0;
    }

    h2 {
      font-size: 24px;
      margin-bottom: 6px;
    }

    .subtitle {
      font-size: 1em;
      margin-bottom: 24px;
      letter-spacing: 0;
    }

    .submit-btn {
      letter-spacing: 0.5px;
    }
  }
</style> 