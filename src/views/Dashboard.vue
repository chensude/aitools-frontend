<template>
  <div class="home">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">AI Tools Hub</div>
        <div class="nav">
          <el-dropdown>
            <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="userStore.logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="main">
      <!-- 工具卡片区域 -->
      <div class="tools-grid">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" v-for="tool in tools" :key="tool.id">
            <el-card class="tool-card" :body-style="{ padding: '0px' }" @click="router.push(tool.path)">
              <div class="tool-content">
                <div class="icon-wrapper">
                  <el-icon class="tool-icon" :size="50">
                    <component :is="tool.icon"/>
                  </el-icon>
                </div>
                <h3>{{ tool.name }}</h3>
                <p>{{ tool.description }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { Document, Microphone, VideoPlay, Key } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const tools = ref([
  {
    id: 1,
    name: '文案提取',
    description: '智能提取音视频文件中的文字内容',
    icon: Document,
    path: '/extract'
  },
  {
    id: 2,
    name: '去水印',
    description: '支持主流短视频平台的视频去水印',
    icon: VideoPlay,
    path: '/watermark'
  },
  {
    id: 3,
    name: '人声分离',
    description: '智能分离音频中的人声和背景音乐',
    icon: Microphone,
    path: '/voice'
  },
  {
    id: 4,
    name: 'MD5去重',
    description: '修改文件MD5值，提高视频原创度',
    icon: Key,
    path: '/md5'
  }
])
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f8fafc;
}

.header {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.logo {
  font-size: 26px;
  font-weight: 600;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: -0.5px;
}

.main {
  padding-top: 90px;
  padding-bottom: 40px;
}

.tools-grid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.tool-card {
  height: 100%;
  margin-bottom: 30px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02),
              0 10px 15px rgba(0,0,0,0.03);
}

.tool-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 20px rgba(0,0,0,0.06),
              0 20px 30px rgba(0,0,0,0.04);
}

.tool-content {
  padding: 36px 24px;
  text-align: center;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1));
  border-radius: 20px;
  transition: all 0.3s ease;
}

.tool-card:hover .icon-wrapper {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(37,99,235,0.15));
}

.tool-icon {
  color: #3b82f6;
}

.tool-content h3 {
  font-size: 1.25em;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.tool-content p {
  color: #64748b;
  font-size: 0.95em;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }

  .main {
    padding-top: 80px;
  }

  .tools-grid {
    padding: 0 16px;
  }

  .tool-content {
    padding: 30px 20px;
  }
}
</style> 