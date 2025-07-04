<template>
    <div class="logo-carousel">
        <transition name="fade" mode="out-in">
            <img
                :key="currentIndex"
                :src="currentImage"
                alt="系统logo"
                class="logo"
                @load="preloadNextImage"
            />
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 类型安全的图片加载
interface ImageModule {
    default: string;
}

const imageFiles = import.meta.glob('@/assets/icons8/*.png', {
    eager: true,
    import: 'default',
}) as Record<string, ImageModule>;

const imageList = Object.values(imageFiles).map(img => img.default);
const currentIndex = ref(0);
const currentImage = ref(imageList[0] || '');
const preloadedNext = ref(true);

const preloadNextImage = () => {
    const nextIndex = (currentIndex.value + 1) % imageList.length;
    new Image().src = imageList[nextIndex];
    preloadedNext.value = true;
};

const startCarousel = () => {
    const interval = setInterval(() => {
        if (preloadedNext.value) {
            currentIndex.value = (currentIndex.value + 1) % imageList.length;
            currentImage.value = imageList[currentIndex.value] || '';
            preloadedNext.value = false;
            preloadNextImage(); // 预加载下一张图片
        }
    }, 3000);

    // 清除定时器
    onBeforeUnmount(() => {
        clearInterval(interval);
    });
};

onMounted(() => {
    if (imageList.length > 1) {
        startCarousel();
    } else {
        console.warn('没有足够的图片来启动轮播');
    }
});
</script>

<style scoped>
.logo-carousel {
    position: relative;
    width: 48px;
    height: 48px;
}

.logo {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
