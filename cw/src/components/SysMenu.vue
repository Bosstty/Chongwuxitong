<template>
    <div>
        <img src="../img/puppy.png" alt="宠物图标" />
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            @select="selectMenu"
            default-active="/home/home"
            text-color="#fff"
        >
            <el-menu-item index="/home/home">首页</el-menu-item>
            <el-menu-item index="/home/Bookkeeping">宠物记账本</el-menu-item>
            <el-menu-item index="/home/accomplishment">宠物成就</el-menu-item>
            <el-sub-menu index="petDiary">
                <template #title>
                    <span>宠物日记</span>
                </template>
                <el-menu-item index="/home/diary/daily">运动轨迹</el-menu-item>
                <el-menu-item index="/home/diary/motion">日常记录</el-menu-item>
                <el-menu-item index="/home/diary/nurturance">养成意见（AI）</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="personalCenter">
                <template #title>
                    <span>个人中心</span>
                </template>
                <el-menu-item index="/home/Personal/UserInfo">用户信息</el-menu-item>
                <el-menu-item index="/home/Personal/handoff">切换宠物</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/home/concern">关注我们</el-menu-item>
        </el-menu>
    </div>
</template>

<script setup lang="ts" name="SysMenu">
import { useRouter } from 'vue-router';

const router = useRouter();

function selectMenu(url: string) {
    try {
        console.log('url', url);
        router.push(url);
    } catch (error) {
        console.error('导航失败:', error);
        // 可以在这里添加一个用户友好的错误提示
        alert('导航失败，请稍后再试');
    }
}
</script>

<style scoped>
img {
    width: 100%;
}
</style>
