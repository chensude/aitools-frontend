<template>
  <div class="landing">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <div class="logo">AI Tools Hub</div>
        <div class="nav">
          <el-button type="text" @click="router.push('/login')">登录</el-button>
          <el-button type="primary" @click="router.push('/register')">免费注册</el-button>
        </div>
      </div>
    </header>

    <!-- Hero 区域 -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>智能媒体工具<br>集成平台</h1>
          <p class="subtitle">让AI为创作赋能，提升内容创作效率</p>
        </div>
        <el-button type="primary" size="large" class="cta-button" @click="router.push('/register')">
          立即开始使用
        </el-button>
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">10w+</div>
            <div class="stat-label">活跃用户</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99%</div>
            <div class="stat-label">处理成功率</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">全天候服务</div>
          </div>
        </div>
      </div>
      <div class="hero-bg"></div>
    </section>

    <!-- 特点介绍 -->
    <section class="features">
      <div class="section-content">
        <div class="section-header">
          <h2>为什么选择我们</h2>
          <p class="section-subtitle">专业的AI工具集成平台，让内容创作更轻松</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">
              <el-icon :size="32">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
      <div class="features-bg"></div>
    </section>

    <!-- 工具展示 -->
    <section class="tools-showcase">
      <div class="section-content">
        <div class="section-header">
          <h2>功能特性</h2>
          <p class="section-subtitle">一站式解决您的所有媒体处理需求</p>
        </div>
        <div class="tools-grid">
          <div class="tool-preview" v-for="tool in tools" :key="tool.id">
            <div class="tool-icon">
              <el-icon :size="40">
                <component :is="tool.icon" />
              </el-icon>
            </div>
            <h3>{{ tool.name }}</h3>
            <p class="tool-desc">{{ tool.description }}</p>
            <ul class="tool-features">
              <li v-for="(feature, index) in tool.features" :key="index">
                <el-icon><Check /></el-icon>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 新增：用户反馈 -->
    <section class="testimonials">
      <div class="section-content">
        <div class="section-header">
          <h2>用户反馈</h2>
          <p class="section-subtitle">来自真实用户的使用体验</p>
        </div>
        <el-carousel :interval="4000" type="card">
          <el-carousel-item v-for="feedback in testimonials" :key="feedback.id">
            <div class="testimonial-card">
              <div class="testimonial-content">
                <el-icon class="quote-icon" :size="30"><ChatRound /></el-icon>
                <p class="quote">{{ feedback.content }}</p>
                <div class="author">
                  <el-avatar :src="feedback.avatar" :size="48">
                    {{ feedback.name.charAt(0) }}
                  </el-avatar>
                  <div class="author-info">
                    <h4>{{ feedback.name }}</h4>
                    <p>{{ feedback.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </section>

    <!-- 原有的footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>AI Tools Hub</h3>
          <p>智能工具集成平台，让创作更简单</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>关于我们</h4>
            <ul>
              <li><a href="#">公司介绍</a></li>
              <li><a href="#">联系我们</a></li>
              <li><a href="#">用户协议</a></li>
            </ul>
          </div>
          <div class="link-group">
            <h4>帮助中心</h4>
            <ul>
              <li><a href="#">使用教程</a></li>
              <li><a href="#">常见问题</a></li>
              <li><a href="#">技术支持</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 AI Tools Hub. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Document, Microphone, VideoPlay, Key,
  Lightning, Monitor, Connection, Lock,
  Check, ChatRound
} from '@element-plus/icons-vue'
import HeroImage from '../components/HeroImage.vue'

const router = useRouter()

const features = ref([
  {
    id: 1,
    icon: Lightning,
    title: '高效处理',
    description: '先进的AI算法，快速处理各类媒体文件'
  },
  {
    id: 2,
    icon: Monitor,
    title: '智能识别',
    description: '准确的语音识别和文本提取能力'
  },
  {
    id: 3,
    icon: Connection,
    title: '一站式服务',
    description: '多种工具集成，满足不同创作需求'
  },
  {
    id: 4,
    icon: Lock,
    title: '安全可靠',
    description: '数据加密存储，保护用户隐私'
  }
])

const tools = ref([
  {
    id: 1,
    name: '文案提取',
    icon: Document,
    description: '从视频音频中提取文字内容',
    features: [
      '快速导出文本',
      '准确的语音识别',
      '支持多种媒体格式'
    ],
    image: '/images/text-extract.webp'
  },
  {
    id: 2,
    name: '去水印',
    icon: VideoPlay,
    description: '智能去除视频水印',
    features: [
      '无损画质处理',
      '批量处理功能',
      '支持主流平台视频'
    ],
    image: '/images/watermark-remove.webp'
  },
  {
    id: 3,
    name: '人声分离',
    icon: Microphone,
    description: '分离人声和背景音乐',
    features: [
      '多种导出格式',
      '保留声音细节',
      '高质量音频分离'
    ]
  },
  {
    id: 4,
    name: 'MD5去重',
    icon: Key,
    description: '修改视频MD5提升原创度',
    features: [
      '快速处理',
      '保持视频质量',
      '支持批量操作'
    ]
  }
])

// 新增用户反馈数据
const testimonials = ref([
  {
    id: 1,
    content: '使用AI Tools Hub大大提升了我的工作效率，特别是文案提取功能，帮我节省了大量时间。',
    name: '张先生',
    title: '自媒体创作者',
    avatar: 'https://example.com/avatar1.jpg'
  },
  {
    id: 2,
    content: '去水印功能非常好用，处理速度快，而且画质没有损失。推荐给所有需要处理视频的朋友。',
    name: '李女士',
    title: '短视频博主',
    avatar: 'https://example.com/avatar2.jpg'
  },
  {
    id: 3,
    content: '人声分离的效果超出预期，对音乐创作很有帮助。客服响应也很及时。',
    name: '王先生',
    title: '音乐制作人',
    avatar: 'https://example.com/avatar3.jpg'
  }
])
</script>

<style scoped>
.landing {
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

.nav {
  display: flex;
  gap: 16px;
  align-items: center;
}

:deep(.nav .el-button) {
  font-weight: 500;
  height: 40px;
  border-radius: 20px;
  padding: 0 24px;
}

:deep(.nav .el-button--text) {
  color: #1e293b;
  font-size: 0.95em;
  position: relative;
  padding: 0 16px;
  height: 36px;
  font-weight: 500;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

:deep(.nav .el-button--text:hover) {
  color: #3b82f6;
  background: transparent;
  border-color: rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.05);
}

:deep(.nav .el-button--text::after) {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
  opacity: 0;
}

:deep(.nav .el-button--text:hover::after) {
  width: calc(100% - 24px);
  opacity: 1;
}

:deep(.nav .el-button--text:active) {
  transform: translateY(1px);
  border-color: rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.1);
}

:deep(.nav .el-button--primary) {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  border: none;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
  transition: all 0.3s ease;
  margin-left: 12px;
}

:deep(.nav .el-button--primary:hover) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
}

:deep(.nav .el-button--primary:active) {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

@media (max-width: 768px) {
  .nav {
    gap: 8px;
  }
  
  :deep(.nav .el-button) {
    height: 36px;
    padding: 0 16px;
    font-size: 0.9em;
  }

  :deep(.nav .el-button--text) {
    border-width: 1.5px;
  }

  :deep(.nav .el-button--text::after) {
    bottom: 4px;
  }

  :deep(.nav .el-button--text:hover::after) {
    width: calc(100% - 16px);
  }

  :deep(.nav .el-button--primary) {
    margin-left: 8px;
  }
}

.hero {
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  color: white;
  text-align: center;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 24px;
  margin: 0 auto;
}

.hero-text {
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 4em;
  font-weight: 700;
  margin-bottom: 24px;
  line-height: 1.2;
  background: linear-gradient(to right, #fff, rgba(255,255,255,0.9));
  -webkit-background-clip: text;
  color: transparent;
  animation: fadeInUp 0.8s ease-out;
}

.hero .subtitle {
  font-size: 1.4em;
  opacity: 0.9;
  margin-bottom: 40px;
  line-height: 1.6;
  animation: fadeInUp 0.8s ease-out 0.2s both;
  max-width: 600px;
  margin: 0 auto 40px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 60px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: fadeInUp 0.8s ease-out 0.6s both;
  max-width: 600px;
  margin: 60px auto 0;
}

.stat-item {
  text-align: center;
  color: white;
}

.stat-number {
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.8) 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.stat-label {
  font-size: 1em;
  opacity: 0.9;
}

.section-subtitle {
  text-align: center;
  color: #64748b;
  font-size: 1.2em;
  margin-bottom: 60px;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 150%, rgba(255,255,255,0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% -50%, rgba(255,255,255,0.15) 0%, transparent 50%);
}

.cta-button {
  height: 50px;
  padding: 0 40px;
  font-size: 1.1em;
  font-weight: 500;
  background: white;
  color: #1e40af;
  border: none;
  transition: all 0.3s ease;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  background: white;
  color: #1e40af;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

.features, .tools-showcase {
  background: white;
}

.features h2, .tools-showcase h2 {
  text-align: center;
  font-size: 2.5em;
  color: #1e293b;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.feature-card {
  text-align: center;
  padding: 40px 24px;
  border-radius: 16px;
  background: #f8fafc;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.05);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1));
  border-radius: 16px;
  color: #3b82f6;
}

.feature-card h3 {
  font-size: 1.25em;
  color: #1e293b;
  margin-bottom: 16px;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.tool-preview {
  padding: 40px;
  border-radius: 20px;
  background: white;
  transition: all 0.3s ease;
  text-align: center;
}

.tool-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.tool-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1));
  border-radius: 16px;
  color: #3b82f6;
}

.tool-preview h3 {
  font-size: 1.4em;
  color: #1e293b;
  margin-bottom: 16px;
}

.tool-desc {
  color: #64748b;
  margin-bottom: 24px;
  line-height: 1.6;
}

.tool-features {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 260px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tool-features li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1e293b;
  margin-bottom: 12px;
  width: fit-content;
}

.tool-features li .el-icon {
  color: #3b82f6;
  flex-shrink: 0;
  width: 20px;
  display: flex;
  justify-content: center;
}

.tool-features li span {
  display: block;
  flex: none;
}

@media (max-width: 768px) {
  .tool-features {
    width: 240px;
  }
  
  .tool-features li {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .tool-features {
    width: 220px;
  }
  
  .tool-features li {
    gap: 4px;
  }
}

.tool-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.tool-text {
  flex: 1;
}

.tool-image {
  flex: 1;
  position: relative;
}

.tool-image img {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.tool-preview:hover .tool-image img {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .tool-content {
    flex-direction: column;
  }
  
  .tool-image {
    margin-top: 30px;
  }
}

/* 用户反馈样式 */
.testimonials {
  background: white;
  padding: 80px 0;
  overflow: hidden;
}

.testimonial-card {
  background: white;
  padding: 40px 60px;
  border-radius: 20px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.testimonial-content {
  max-width: 600px;
  margin: 0 auto;
}

.quote-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: #3b82f6;
  margin-bottom: 24px;
  opacity: 0.8;
}

.quote {
  font-size: 1.1em;
  color: #1e293b;
  line-height: 1.6;
  margin-bottom: 30px;
  min-height: 4.8em;
}

.author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

:deep(.el-avatar) {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-size: 20px;
  font-weight: 500;
}

.author-info h4 {
  font-size: 1.1em;
  color: #1e293b;
  margin-bottom: 4px;
  font-weight: 500;
}

.author-info p {
  color: #64748b;
  font-size: 0.9em;
  margin: 0;
}

:deep(.el-carousel__item) {
  padding: 20px;
}

:deep(.el-carousel__item--card) {
  border-radius: 20px;
  overflow: hidden;
}

:deep(.el-carousel__mask) {
  opacity: 0;
}

:deep(.el-carousel__item--card.is-active) {
  transform: translateX(0) scale(1.1) !important;
  z-index: 2;
}

@media (max-width: 768px) {
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .tool-preview {
    padding: 30px;
  }
  
  .testimonial-card {
    padding: 30px;
  }
  
  .tool-features {
    margin: 0 auto;
  }

  .testimonial-content {
    padding: 0;
  }

  .quote {
    font-size: 1em;
  }
}

.footer {
  background: #1e293b;
  color: white;
  padding: 80px 0 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 60px;
}

.footer-info h3 {
  font-size: 1.5em;
  margin-bottom: 16px;
  font-weight: 500;
}

.footer-info p {
  color: #94a3b8;
  line-height: 1.6;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
}

.link-group h4 {
  font-size: 1.1em;
  margin-bottom: 24px;
  font-weight: 500;
  color: #e2e8f0;
}

.link-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-group li {
  margin-bottom: 12px;
}

.link-group a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding: 24px 0;
  text-align: center;
}

.footer-bottom p {
  color: #94a3b8;
  margin: 0;
}

@media (max-width: 768px) {
  .footer {
    padding: 60px 0 0;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .link-group h4 {
    margin-bottom: 16px;
  }

  .link-group li {
    margin-bottom: 10px;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-header h2 {
  font-size: 2.5em;
  color: #1e293b;
  margin-bottom: 16px;
  text-align: center;
}

.section-subtitle {
  font-size: 1.2em;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

/* 用户反馈样式 */
.testimonials {
  background: white;
  padding: 80px 0;
  overflow: hidden;
}

.testimonials .section-header {
  max-width: 600px;
  margin: 0 auto 60px;
}

.testimonials .section-header h2 {
  margin-bottom: 16px;
}

.testimonials .section-subtitle {
  margin-bottom: 0;
}

.testimonial-card {
  background: white;
  padding: 40px 60px;
  border-radius: 20px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 40px;
  }

  .section-header h2 {
    font-size: 2em;
  }

  .section-subtitle {
    font-size: 1.1em;
  }
}

/* 特点介绍 */
.features {
  position: relative;
  background: #fff;
  padding: 100px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: 2.5em;
  color: #1e293b;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.section-subtitle {
  font-size: 1.2em;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 40px;
}

.feature-card {
  padding: 40px;
  border-radius: 16px;
  background: #f8fafc;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.05);
}

.feature-icon {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.1));
  border-radius: 20px;
  margin-bottom: 24px;
  color: #3b82f6;
}

.feature-card h3 {
  font-size: 1.4em;
  color: #1e293b;
  margin-bottom: 16px;
  font-weight: 500;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

/* 工具展示 */
.tools-showcase {
  background: #f8fafc;
  padding: 100px 0;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 60px;
}

/* 用户反馈样式 */
.testimonials {
  background: white;
  padding: 100px 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .features, .tools-showcase, .testimonials {
    padding: 80px 0;
  }

  .section-header {
    margin-bottom: 60px;
  }

  .section-header h2 {
    font-size: 2em;
    margin-bottom: 20px;
  }

  .features-grid {
    gap: 30px;
  }

  .feature-card {
    padding: 30px;
  }

  .feature-icon {
    width: 70px;
    height: 70px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .features, .tools-showcase, .testimonials {
    padding: 60px 0;
  }

  .section-header {
    margin-bottom: 40px;
  }

  .feature-card {
    padding: 24px;
  }

  .feature-icon {
    width: 60px;
    height: 60px;
  }
}
</style> 