<template>
    <div class="login-container">
        <transition name="fade">
            <div class="login-card">
                <div class="branding">
                    <div class="logo-wrapper">
                        <img src="@/assets/icos8/icons8-cat-64.png" class="logo" alt="" />
                        <!-- <LogoCarousel /> -->
                    </div>

                    <h1 class="system-name">以爱为伴-宠物监测</h1>
                </div>

                <el-form
                    ref="loginForm"
                    :model="form"
                    :rules="rules"
                    @keyup.enter="handleLogin"
                    class="login-form"
                >
                    <el-form-item prop="username">
                        <el-input
                            v-model="form.username"
                            placeholder="用户名/账号"
                            prefix-icon="el-icon-user"
                            clearable
                            tabindex="1"
                        >
                            <template #prefix>
                                <el-icon class="input-icon"><User /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input
                            v-model="form.password"
                            type="password"
                            placeholder="登录密码"
                            show-password
                            prefix-icon="el-icon-lock"
                            tabindex="2"
                        >
                            <template #prefix>
                                <el-icon class="input-icon"><Lock /></el-icon>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item class="action-row">
                        <el-checkbox v-model="rememberMe">自动登录</el-checkbox>
                        <router-link
                            to="/forgot-pwd"
                            class="forgot-link"
                            style="margin-left: 240px"
                        >
                            忘记密码?
                        </router-link>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            type="primary"
                            :loading="loading"
                            @click="handleLogin"
                            class="login-btn"
                        >
                            {{ loading ? '登录中...' : '立即登录' }}
                        </el-button>
                    </el-form-item>
                </el-form>

                <div class="footer">
                    <span class="version">v2.3.1</span>
                    <div class="copyright">© 2025 保留所有权利</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
// import { User, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
// import LogoCarousel from '@/components/LogoCarousel.vue';
import { ElMessage, type FormInstance } from 'element-plus';

const router = useRouter();
const loginForm = ref<FormInstance>();
const loading = ref(false);
const rememberMe = ref(false);

const form = reactive({
    username: localStorage.getItem('savedUsername') || '',
    password: '',
});

const rules = reactive({
    username: [
        { required: true, message: '请输入登录账号', trigger: 'blur' },
        { min: 4, max: 16, message: '账号长度为4-16位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入登录密码', trigger: 'blur' },
        {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/,
            message: '需包含大小写字母和数字（8-20位）',
        },
    ],
});

const handleLogin = async () => {
    try {
        await loginForm.value?.validate();
        loading.value = true;

        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (form.username === 'admin' && form.password === 'Admin123') {
            rememberMe.value && localStorage.setItem('savedUsername', form.username);
            ElMessage.success('登录成功');
            router.replace('/home');
        } else {
            ElMessage.error('账号或密码错误');
        }
    } catch (error) {
        console.error('登录失败:', error);
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.login-container {
    height: 100vh;
    background-image: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-card {
    width: 384px;
    padding: 32px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    transform: translateY(-3vh);
}

.branding {
    margin-bottom: 32px;
    text-align: center;
}

.logo-wrapper {
    display: inline-block;
    padding: 16px;
    background-color: #e0e7ff;
    border-radius: 16px;
    margin-bottom: 16px;
}

.logo {
    width: 32px;
    height: 32px;
}

.system-name {
    font-size: 1.5rem;
    font-weight: 500;
    color: #1f2937;
    letter-spacing: 1.5px;
}

.login-form .input-icon {
    color: #9ca3af;
    font-size: 1.125rem;
}

.action-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.forgot-link {
    font-size: 0.875rem;
    color: #6b7280;
    transition: color 0.3s ease;
}

.forgot-link:hover {
    color: #4f46e5;
}

.login-btn {
    width: 100%;
    height: 40px;
    border-radius: 8px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.footer {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #f3f4f6;
    text-align: center;
}

.version {
    font-size: 0.75rem;
    color: #9ca3af;
}

.copyright {
    margin-top: 8px;
    font-size: 0.75rem;
    color: #6b7280;
}

/* 动画效果 */
.fade-enter-active {
    animation: fade-in 0.6s cubic-bezier(0.39, 0.575, 0.565, 1);
}

@keyframes fade-in {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
