<template>
  <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 背景渐变 -->
    <defs>
      <linearGradient id="hero-gradient" x1="0" y1="0" x2="800" y2="600">
        <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.1"/>
        <stop offset="100%" stop-color="#2563EB" stop-opacity="0.2"/>
      </linearGradient>
      <linearGradient id="circle-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#60A5FA"/>
        <stop offset="100%" stop-color="#3B82F6"/>
      </linearGradient>
    </defs>

    <!-- 背景图案 -->
    <rect width="800" height="600" fill="#F8FAFC"/>
    <circle cx="600" cy="150" r="300" fill="url(#hero-gradient)" opacity="0.5"/>
    <circle cx="200" cy="450" r="250" fill="url(#hero-gradient)" opacity="0.3"/>

    <!-- AI 图标元素 -->
    <g transform="translate(300, 200)">
      <circle cx="100" cy="100" r="80" fill="url(#circle-gradient)" opacity="0.9"/>
      <path d="M60 80L140 120M60 120L140 80" stroke="white" stroke-width="8" stroke-linecap="round"/>
      <circle cx="100" cy="100" r="40" fill="none" stroke="white" stroke-width="4"/>
    </g>

    <!-- 装饰线条 -->
    <path d="M50 300Q200 250 300 300T600 300" stroke="#3B82F6" stroke-width="2" opacity="0.3"/>
    <path d="M100 350Q250 300 350 350T650 350" stroke="#3B82F6" stroke-width="2" opacity="0.2"/>
  </svg>
</template> 