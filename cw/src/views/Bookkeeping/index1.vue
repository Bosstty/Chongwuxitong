<template>
    <div>
        <h1>记账本</h1>
        <!-- 新增或修改表单 -->
        <form @submit.prevent="save">
            <input v-model="bookkeep.bookkeepId" type="hidden" />
            <label>名称:</label>
            <input v-model="bookkeep.bookkeepname" type="text" required />
            <label>价格:</label>
            <input v-model="bookkeep.bookkeepprice" type="text" required />
            <button type="submit">{{ bookkeep.bookkeepId ? '修改' : '新增' }}</button>
        </form>
        <!-- 列表展示 -->
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>价格</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in bookkeepList" :key="item.bookkeepId">
                    <td>{{ item.bookkeepId }}</td>
                    <td>{{ item.bookkeepname }}</td>
                    <td>{{ item.bookkeepprice }}</td>
                    <td>
                        <button @click="edit(item)">编辑</button>
                        <button @click="deleteBookkeep(item.bookkeepId)">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 分页组件 -->
        <div>
            <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bookkeepList: [],
            bookkeep: {
                bookkeepId: null,
                bookkeepname: '',
                bookkeepprice: '',
            },
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
        };
    },
    mounted() {
        this.getBookkeepList();
    },
    methods: {
        // 获取记账本列表
        async getBookkeepList() {
            try {
                const response = await fetch(
                    `/home/Bookkeeping/page?current=${this.currentPage}&size=${this.pageSize}`
                );
                const data = await response.json();
                this.bookkeepList = data.data;
                this.totalPages = Math.ceil(data.total / this.pageSize);
            } catch (error) {
                console.error('获取列表失败:', error);
            }
        },
        // 保存记账信息
        async save() {
            try {
                const url = '/home/Bookkeeping/save';
                const method = this.bookkeep.bookkeepId ? 'PUT' : 'POST';
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.bookkeep),
                });
                const result = await response.json();
                if (result) {
                    this.resetForm();
                    this.getBookkeepList();
                }
            } catch (error) {
                console.error('保存失败:', error);
            }
        },
        // 编辑记账信息
        edit(item) {
            this.bookkeep = { ...item };
        },
        // 删除记账信息
        async deleteBookkeep(id) {
            try {
                const response = await fetch(`/home/Bookkeeping/delete?id=${id}`, {
                    method: 'DELETE',
                });
                const result = await response.json();
                if (result) {
                    this.getBookkeepList();
                }
            } catch (error) {
                console.error('删除失败:', error);
            }
        },
        // 上一页
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getBookkeepList();
            }
        },
        // 下一页
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.getBookkeepList();
            }
        },
        // 重置表单
        resetForm() {
            this.bookkeep = {
                bookkeepId: null,
                bookkeepname: '',
                bookkeepprice: '',
            };
        },
    },
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}
</style>
