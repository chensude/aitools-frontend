<template>
  <div class="extract-container">
    <div class="page-header">
      <h2>文案提取</h2>
      <p class="description">一键提取短视频平台的文案内容</p>
    </div>

    <div class="main-content">
      <!-- 链接输入区域 -->
      <div class="input-section">
        <div class="input-wrapper">
          <el-input
            v-model="videoUrl"
            placeholder="请输入视频链接（支持小红书、抖音、快手等平台）"
            :prefix-icon="Link"
            clearable
            @keyup.enter="handleExtract"
          >
            <template #append>
              <el-button 
                type="primary" 
                :loading="loading"
                @click="handleExtract"
              >
                提取文案
              </el-button>
            </template>
          </el-input>
        </div>
      </div>

      <!-- 结果展示区域 -->
      <div v-if="extractResult" class="result-section">
        <div class="result-header">
          <div class="platform-info">
            <el-tag 
              :type="getPlatformTagType(extractResult.platform)"
              effect="dark"
              round
            >
              {{ extractResult.platform }}
            </el-tag>
            <span class="author">作者：{{ extractResult.author }}</span>
          </div>
          <el-button 
            type="primary" 
            link 
            :icon="CopyDocument"
            @click="copyText(extractResult.content)"
          >
            复制文案
          </el-button>
        </div>
        
        <el-input
          v-model="extractResult.content"
          type="textarea"
          :rows="8"
          placeholder="提取的文案将显示在这里"
          resize="none"
          readonly
        />

        <!-- 额外信息 -->
        <div class="extra-info">
          <div class="info-item">
            <el-icon><Star /></el-icon>
            <span class="label">点赞：</span>
            <span class="value">{{ extractResult.likes }}</span>
          </div>
          <div class="info-item">
            <el-icon><ChatDotRound /></el-icon>
            <span class="label">评论：</span>
            <span class="value">{{ extractResult.comments }}</span>
          </div>
          <div class="info-item">
            <el-icon><Timer /></el-icon>
            <span class="label">发布时间：</span>
            <span class="value">{{ extractResult.publishTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { 
  Link, 
  CopyDocument, 
  Star,
  ChatDotRound,
  Timer
} from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

interface ExtractResult {
  platform: string
  author: string
  content: string
  likes: number
  comments: number
  publishTime: string
}

const videoUrl = ref('')
const loading = ref(false)
const extractResult = ref<ExtractResult | null>(null)
const router = useRouter()

const getPlatformTagType = (platform: string) => {
  const types: Record<string, string> = {
    '小红书': 'danger',
    '抖音': 'primary',
    '快手': 'success',
    'B站': 'warning'
  }
  return types[platform] || 'info'
}

const handleExtract = async () => {
  if (!videoUrl.value.trim()) {
    ElMessage.warning('请输入视频链接')
    return
  }

  loading.value = true
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      ElMessage.error('请先登录')
      router.push('/login')
      return
    }

    const response = await fetch('/api/extract/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        url: videoUrl.value.trim()
      })
    })

    const data = await response.json()
    if (data.code === 200) {
      extractResult.value = data.data
      ElMessage.success('提取成功')
    } else {
      ElMessage.error(data.msg || '提取失败')
    }
  } catch (error) {
    ElMessage.error('网络错误，请稍后重试')
  } finally {
    loading.value = false
  }
}

const copyText = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => ElMessage.success('复制成功'))
    .catch(() => ElMessage.error('复制失败，请手动复制'))
}
</script>

<style scoped>
.extract-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 40px;
  text-align: center;
}

.page-header h2 {
  font-size: 2.5em;
  color: #1e293b;
  margin-bottom: 12px;
  font-weight: 600;
}

.description {
  color: #64748b;
  font-size: 1.1em;
}

.main-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.input-section {
  margin-bottom: 32px;
}

.result-section {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  margin-top: 32px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.platform-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author {
  color: #64748b;
  font-size: 0.95em;
}

.extra-info {
  margin-top: 16px;
  display: flex;
  gap: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.info-item {
  color: #64748b;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 6px;
}

:deep(.el-input__wrapper) {
  padding: 8px 16px;
}

:deep(.el-input__inner) {
  font-size: 1em;
}

:deep(.el-textarea__inner) {
  padding: 16px;
  font-size: 1em;
  line-height: 1.6;
  background-color: white;
}

:deep(.el-button--primary) {
  padding: 0 24px;
}

@media (max-width: 768px) {
  .extract-container {
    padding: 16px;
  }

  .main-content {
    padding: 20px;
  }

  .extra-info {
    flex-direction: column;
    gap: 12px;
  }
}
</style> 