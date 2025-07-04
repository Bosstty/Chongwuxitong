<template>
    <div ref="chartDom" style="width: 600px; height: 400px"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';

const chartDom = ref(null);
let chartInstance = null;

// 初始化图表
const initChart = () => {
    chartInstance = echarts.init(chartDom.value);
    chartInstance.setOption({
        title: { text: '示例图表' },
        xAxis: { data: ['A', 'B', 'C'] },
        yAxis: {},
        series: [{ type: 'bar', data: [10, 20, 30] }],
    });
};

// 响应式更新
const props = defineProps({ data: Array });
watch(
    () => props.data,
    newData => {
        chartInstance.setOption({ series: [{ data: newData }] });
    }
);

// 生命周期
onMounted(initChart);
onBeforeUnmount(() => {
    chartInstance?.dispose();
});

// 窗口自适应
window.addEventListener('resize', () => {
    chartInstance?.resize();
});
</script>
