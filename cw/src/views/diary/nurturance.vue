<template>
    <div class="chat-container">
        <div class="message-area" ref="messageArea">
            <div
                v-for="(msg, index) in messages"
                :key="index"
                :class="['message', { 'user-message': msg.role === 'user' }]"
            >
                <div class="message-content">
                    {{ msg.content }}
                </div>
            </div>
            <div v-if="isLoading" class="loading-indicator">思考中...</div>
            <div v-if="error" class="error-message">{{ error }}</div>
        </div>

        <div class="input-area">
            <textarea
                v-model="inputMessage"
                @keydown.enter.exact.prevent="sendMessage"
                placeholder="输入消息..."
                :disabled="isLoading"
            ></textarea>
            <button @click="sendMessage" :disabled="isLoading || !inputMessage.trim()">
                {{ isLoading ? '发送中...' : '发送' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue';
import axios from 'axios';

const API_URL = 'https://api.deepseek.com/chat/completions';
const API_KEY = 'sk-98355992ebac49b09f121bf5ad1fac2e';

const messages = reactive([]);
const inputMessage = ref('');
const isLoading = ref(false);
const error = ref(null);
const messageArea = ref(null);

const scrollToBottom = () => {
    nextTick(() => {
        if (messageArea.value) {
            messageArea.value.scrollTop = messageArea.value.scrollHeight;
        }
    });
};

// 发送消息
const sendMessage = async () => {
    if (!inputMessage.value.trim() || isLoading.value) return;

    try {
        isLoading.value = true;
        error.value = null;

        messages.push({
            role: 'user',
            content: inputMessage.value.trim(),
        });
        scrollToBottom();

        const requestData = {
            messages: [
                {
                    content: `You are a helpful assistant that can analyze a pet's overall condition based on a week's worth of data, and even provide insights if data is limited.`,
                    role: 'system',
                },
                ...messages,
                {
                    content: inputMessage.value.trim(),
                    role: 'user',
                },
            ],
            model: 'deepseek-chat',
            temperature: 0.7,
            max_tokens: 2048,
        };

        const response = await axios.post(API_URL, requestData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
        });

        if (response.data?.choices?.[0]?.message?.content) {
            messages.push({
                role: 'assistant',
                content: response.data.choices[0].message.content,
            });
        } else {
            throw new Error('无效的API响应');
        }

        inputMessage.value = '';
        scrollToBottom();
    } catch (err) {
        console.error('API请求失败:', err);
        error.value = `请求失败: ${err.response?.data?.message || err.message}`;
        messages.pop();
    } finally {
        isLoading.value = false;
    }
};
</script>
<style scoped>
.chat-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(135deg, #f0f4ff 0%, #e6f0ff 100%);
    font-family: 'Segoe UI', system-ui;
}

.message-area {
    flex: 1;
    padding: 24px 15%;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
}

.message {
    margin-bottom: 24px;
    display: flex;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.message-content {
    max-width: 65%;
    padding: 16px 24px;
    border-radius: 18px;
    line-height: 1.6;
    font-size: 15px;
    word-break: break-word;
    transition: transform 0.2s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.user-message .message-content {
    background: linear-gradient(135deg, #3f87ff 0%, #296cfe 100%);
    color: white;
    border-radius: 18px 4px 18px 18px;
}

.message:not(.user-message) .message-content {
    background: white;
    border-radius: 4px 18px 18px 18px;
    border: 1px solid #e0e7ff;
}

.input-area {
    padding: 20px 15%;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 -8px 20px rgba(0, 0, 0, 0.03);
    display: flex;
    gap: 12px;
}

textarea {
    flex: 1;
    padding: 16px 20px;
    border: 2px solid #e0e7ff;
    border-radius: 12px;
    resize: none;
    min-height: 56px;
    font-size: 15px;
    transition: all 0.2s;
}

textarea:focus {
    border-color: #3f87ff;
    box-shadow: 0 4px 12px rgba(63, 135, 255, 0.15);
}

button {
    padding: 0 28px;
    background: linear-gradient(135deg, #3f87ff 0%, #296cfe 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.2s;
}

button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(63, 135, 255, 0.3);
}

.loading-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #3f87ff;
    padding: 20px;
    font-weight: 500;
}

.loading-indicator::after {
    content: '';
    width: 18px;
    height: 18px;
    border: 3px solid #e0e7ff;
    border-top-color: #3f87ff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.error-message {
    background: #ffe9ec;
    color: #ff4757;
    border-radius: 8px;
    padding: 12px 16px;
    margin: 16px;
    font-weight: 500;
}

.message-area::-webkit-scrollbar {
    width: 8px;
}

.message-area::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
}

.message-area::-webkit-scrollbar-thumb {
    background: #3f87ff;
    border-radius: 4px;
}
</style>
