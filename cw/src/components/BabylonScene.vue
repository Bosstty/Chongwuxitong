<template>
    <div :class="isRendering ? 'container bg' : 'container'">
        <!-- <div id="loadingScreen" class="flex_column_center">
            <span class="loading"></span>
            <span class="progress">{{ progress }}%</span>
            <span class="text">3D模型加载中...</span>
        </div> -->
        <canvas id="canvas"></canvas>
        <div class="btn_list flex_middle" v-if="isRendering">
            <!-- <el-button type="warning" size="small" @click="reset">
                <i class="el-icon-refresh"></i>
                重置
            </el-button> -->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as BABYLON from '@babylonjs/core/Legacy/legacy';
import '@babylonjs/loaders';
import * as GUI from '@babylonjs/gui/2D';

let engine = ref(null);
let scene = ref(null);
let camera = ref(null);
let progress = ref(0);
let isRendering = ref(false);

const engineResize = () => {
    engine.value.resize();
};

const reset = () => {
    scene.value.activeCamera.restoreState();
};

onMounted(() => {
    let canvas = document.getElementById('canvas');
    engine.value = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    scene.value = new BABYLON.Scene(engine.value);
    scene.value.clearColor = new BABYLON.Color4(0, 0, 0, 0);
    camera.value = new BABYLON.ArcRotateCamera(
        'Camera',
        0,
        10,
        200,
        new BABYLON.Vector3(0, 0, 0),
        scene.value
    );

    camera.value.attachControl(canvas, true);

    BABYLON.SceneLoader.Append(
        '/public/models/',
        '66c81c413abc4353a95e305e4095d1c0.glb',
        scene.value,
        object => {
            camera.value.setTarget(object);
            scene.value.createDefaultCameraOrLight(true, true, true);
            let light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 1));
            light.intensity = 1;
            engine.value.hideLoadingUI();
            isRendering.value = true;
        },
        progressEvent => {
            progress.value = (progressEvent.loaded / progressEvent.total) * 100;
        }
    );

    engine.value.runRenderLoop(() => {
        scene.value.render();
    });

    window.addEventListener('resize', engineResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', engineResize);
});
</script>

<style scoped>
.container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.bg {
    background-color: #8ecbe3;
}
#loadingScreen {
    position: absolute;
    width: 100%;
    height: 100%;
}
.loading {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    border: 8px solid #0934f7;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
}
.progress {
    margin-top: -60px;
    color: #6be031;
    font-size: 16px;
    font-weight: 700;
}
.text {
    margin-top: 60px;
    color: #f5a327;
    font-size: 14px;
}
canvas {
    width: 100%;
    height: 100%;
    outline: none;
    cursor: pointer;
}
.btn_list {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    z-index: 99;
}
</style>
