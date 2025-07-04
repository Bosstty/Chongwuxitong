<template>
    <div>
        <el-row>
            <el-col :span="12">
                <el-button @click="showEdit = true">添加</el-button>
            </el-col>
            <!--      <el-col :span="12"><div class="grid-content ep-bg-purple-dark" /></el-col>-->
        </el-row>

        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="bookkeepId" label="bookkeepId" width="180" />
            <el-table-column prop="bookkeepname" label="bookkeepname" width="180" />

            <el-table-column prop="bookkeepprice" label="bookkeepprice" />
            <el-table-column prop="userid" label="操作">
                <template #default="scope">
                    <el-button link type="primary" @click="deleteById(scope.row.deptId)">
                        删除
                    </el-button>
                    <el-button link type="primary" @click="toEdit(scope.row.deptId)">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="queryParam.current"
            :page-sizes="[3, 5, 10, 15, 20, 30, 40]"
            v-model:page-size="queryParam.size"
            size="default"
            layout="sizes, prev, pager, next"
            :total="total"
            @size-change="loadDataList"
            @current-change="loadDataList"
        />

        <el-dialog title="记账本" width="600px" v-model="showEdit">
            <el-form :model="form" label-width="auto">
                <el-form-item label="名称">
                    <el-input v-model="form.bookkeepname" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input v-model="form.bookkeepprice" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button @click="closeDialog()">Cancel</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup name="Bookkeeping">
import { ref, onMounted, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { page, deleteById as del, queryById, saveOrUpdate } from '@/utils/crud';

interface Bookkeep {
    bookkeepId?: string;
    bookkeepname: string;
    bookkeepprice: string;
}

// 数据相关
const tableData = ref<Bookkeep[]>([]);
const queryParam = reactive({ current: 1, size: 10 });
const total = ref(0);
const loading = ref(false);
const form = reactive<Bookkeep>({ bookkeepname: '', bookkeepprice: '' });
const showEdit = ref(false);

// 加载数据
async function loadDataList() {
    try {
        loading.value = true;
        const result = await page<Bookkeep>('/home/Bookkeeping/page', queryParam);
        tableData.value = result.data;
        total.value = result.total;
    } catch (error) {
        ElMessage.error('数据加载失败');
        console.error('加载数据出错:', error);
    } finally {
        loading.value = false;
    }
}

// 删除操作
async function deleteById(id: string) {
    try {
        await ElMessageBox.confirm('是否删除数据?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        });

        const success = await del('/home/Bookkeeping/delete', id);
        if (success) {
            ElMessage.success('删除成功');
            await loadDataList();
        }
    } catch (error) {
        if (error !== 'cancel') {
            ElMessage.error('删除失败');
            console.error('删除操作出错:', error);
        }
    }
}

// 保存操作
async function save() {
    try {
        const success = await saveOrUpdate('/home/Bookkeeping/save', form);
        if (success) {
            ElMessage.success('保存成功');
            closeDialog();
            await loadDataList();
        }
    } catch (error) {
        ElMessage.error('保存失败');
        console.error('保存操作出错:', error);
    }
}

// 编辑操作（修复属性映射错误）
async function toEdit(id: string) {
    try {
        const bookkeep = await queryById<Bookkeep>('/home/Bookkeeping/selectById', id);
        showEdit.value = true;
        Object.assign(form, {
            bookkeepId: bookkeep.bookkeepId,
            bookkeepname: bookkeep.bookkeepname,
            bookkeepprice: bookkeep.bookkeepprice,
        });
    } catch (error) {
        ElMessage.error('获取数据失败');
        console.error('编辑操作出错:', error);
    }
}
</script>
