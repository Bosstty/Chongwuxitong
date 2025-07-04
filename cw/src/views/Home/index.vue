<template>
    <el-container class="container">
        <!-- <el-header class="header">Header :使用 cartStroe:{{ cartStore.name }} ,{{ cartStore.count }} ， {{ cartStore.amount
            }}
            <button>减少</button>

            <div> <button @click="useMitt"> 使用 mitt发送消息</button></div>

        </el-header> -->
        <el-container>
            <el-aside width="250px" class="aside">
                <SysMenu></SysMenu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup name="Home">
import { RouterView, RouterLink } from 'vue-router';
import SysMenu from '@/components/SysMenu.vue';
</script>

<style scoped>
.container {
    width: 100vw;
    height: 100vh;
}

.header {
    background-color: #c6e2ff;
}

.aside {
    background-color: #545c64;
}

.main {
    background-color: #ecf5ff;
}

/* .menu {
    height: 100%;
    width: 300px;
    background-color: cadetblue;
}


.content {
    height: 100%;
    width: calc(100% - 300px);
    background-color: rgb(176, 188, 189);
} */
</style>
