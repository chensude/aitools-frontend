<template>
  <div class="voice-container">
    <div class="page-header">
      <h2>人声分离</h2>
      <p class="description">智能分离人声和背景音乐，提供高质量的音频处理服务</p>
    </div>

    <div class="main-content">
      <!-- 上传区域 -->
      <el-upload
        class="upload-area"
        drag
        action="#"
        :auto-upload="false"
        :on-change="handleFileChange"
        :show-file-list="false"
        accept="audio/*,video/*"
      >
        <el-icon class="upload-icon"><upload-filled /></el-icon>
        <div class="upload-text">
          <h3>点击或拖拽文件到此处上传</h3>
          <p>支持 MP3, WAV, MP4 等格式</p>
        </div>
      </el-upload>

      <!-- 文件列表 -->
      <div v-if="fileList.length > 0" class="file-list">
        <div v-for="(file, index) in fileList" :key="index" class="file-item">
          <div class="file-info">
            <el-icon><document /></el-icon>
            <span class="filename">{{ file.name }}</span>
            <span class="filesize">{{ formatFileSize(file.size) }}</span>
          </div>
          
          <div class="file-actions">
            <el-progress 
              v-if="file.status === 'processing'"
              :percentage="file.progress" 
              :format="progressFormat"
            />
            <template v-else>
              <el-button 
                type="primary" 
                :loading="file.status === 'processing'"
                @click="processFile(file)"
              >
                开始处理
              </el-button>
              <el-button 
                type="danger" 
                plain
                @click="removeFile(index)"
              >
                删除
              </el-button>
            </template>
          </div>
        </div>
      </div>

      <!-- 处理结果 -->
      <div v-if="results.length > 0" class="results-section">
        <h3>处理结果</h3>
        <div class="results-list">
          <div v-for="(result, index) in results" :key="index" class="result-item">
            <div class="result-info">
              <span class="result-type">{{ result.type }}</span>
              <span class="result-name">{{ result.fileName }}</span>
            </div>
            <div class="result-preview">
              <audio controls :src="result.url"></audio>
            </div>
            <div class="result-actions">
              <el-button type="primary" @click="downloadFile(result)">
                下载
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 处理说明 -->
    <div class="instructions">
      <h3>使用说明</h3>
      <el-collapse>
        <el-collapse-item title="支持的文件格式" name="1">
          <p>支持上传 MP3、WAV、MP4、AVI 等常见音视频格式</p>
        </el-collapse-item>
        <el-collapse-item title="文件大小限制" name="2">
          <p>单个文件最大支持 500MB</p>
        </el-collapse-item>
        <el-collapse-item title="处理时长说明" name="3">
          <p>处理时长与文件大小相关，一般在几秒到几分钟不等</p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Document, UploadFilled } from '@element-plus/icons-vue'

interface FileItem {
  name: string
  size: number
  status: 'waiting' | 'processing' | 'completed' | 'error'
  progress: number
  file: File
}

interface ResultItem {
  type: '人声' | '背景音乐'
  fileName: string
  url: string
}

const fileList = ref<FileItem[]>([])
const results = ref<ResultItem[]>([])

const handleFileChange = (file: any) => {
  // 检查文件大小
  if (file.raw.size > 500 * 1024 * 1024) {
    ElMessage.error('文件大小不能超过 500MB')
    return
  }

  // 添加到文件列表
  fileList.value.push({
    name: file.name,
    size: file.size,
    status: 'waiting',
    progress: 0,
    file: file.raw
  })
}

const removeFile = (index: number) => {
  fileList.value.splice(index, 1)
}

const processFile = async (file: FileItem) => {
  file.status = 'processing'
  
  // 模拟处理进度
  const timer = setInterval(() => {
    if (file.progress < 99) {
      file.progress += 1
    }
  }, 100)

  try {
    // TODO: 调用实际的处理接口
    await new Promise(resolve => setTimeout(resolve, 10000))
    
    clearInterval(timer)
    file.progress = 100
    file.status = 'completed'

    // 模拟结果
    results.value.push(
      {
        type: '人声',
        fileName: `vocals_${file.name}`,
        url: URL.createObjectURL(new Blob([''], { type: 'audio/wav' }))
      },
      {
        type: '背景音乐',
        fileName: `instrumental_${file.name}`,
        url: URL.createObjectURL(new Blob([''], { type: 'audio/wav' }))
      }
    )

    ElMessage.success('处理完成')
  } catch (error) {
    clearInterval(timer)
    file.status = 'error'
    ElMessage.error('处理失败，请重试')
  }
}

const downloadFile = (result: ResultItem) => {
  const link = document.createElement('a')
  link.href = result.url
  link.download = result.fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const progressFormat = (percentage: number) => {
  return percentage === 100 ? '处理完成' : `${percentage}%`
}
</script>

<style scoped>
.voice-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 40px;
  text-align: center;
}

.page-header h2 {
  font-size: 2em;
  color: #1e293b;
  margin-bottom: 12px;
}

.description {
  color: #64748b;
  font-size: 1.1em;
}

.main-content {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  margin-bottom: 40px;
}

.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #3b82f6;
}

.upload-icon {
  font-size: 48px;
  color: #3b82f6;
  margin-bottom: 16px;
}

.upload-text h3 {
  font-size: 1.2em;
  color: #1e293b;
  margin-bottom: 8px;
}

.upload-text p {
  color: #64748b;
}

.file-list {
  margin-top: 32px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-radius: 8px;
  background: #f8fafc;
  margin-bottom: 12px;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filename {
  color: #1e293b;
  font-weight: 500;
}

.filesize {
  color: #64748b;
  font-size: 0.9em;
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
}

.results-section {
  margin-top: 40px;
}

.results-section h3 {
  font-size: 1.2em;
  color: #1e293b;
  margin-bottom: 20px;
}

.result-item {
  background: #f8fafc;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
}

.result-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.result-type {
  background: #3b82f6;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.9em;
}

.result-name {
  color: #1e293b;
  font-weight: 500;
}

.result-preview {
  margin-bottom: 16px;
}

.result-preview audio {
  width: 100%;
}

.instructions {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.instructions h3 {
  font-size: 1.2em;
  color: #1e293b;
  margin-bottom: 20px;
}

:deep(.el-collapse-item__content) {
  color: #64748b;
  padding: 16px;
}

@media (max-width: 768px) {
  .voice-container {
    padding: 16px;
  }

  .main-content {
    padding: 20px;
  }

  .file-item {
    flex-direction: column;
    gap: 16px;
  }

  .file-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 