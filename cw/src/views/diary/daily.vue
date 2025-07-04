<template>
    <div id="container"></div>
</template>

<script>
import { log } from 'three/tsl';
import { service } from '../../utils/Koa_request';
export default {
    name: 'vue-daily',
    data() {
        return {
            bmap: null,
            trackAni: null,
            isMapLoading: false,
        };
    },
    mounted() {
        try {
            this.initMap();
        } catch (error) {
            console.error('地图初始化失败:', error);
        }
    },
    methods: {
        initMap() {
            this.bmap = new BMapGL.Map('container'); // 创建Map实例
            this.bmap.centerAndZoom(new BMapGL.Point(126.613752, 45.710104), 15); // 初始化地图,设置中心点坐标和地图级别
            this.bmap.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
            this.createPolyline();
        },
        createPolyline() {
            // service
            //     .get('/trace')
            //     .then(res => {
            // const path = res.data[Math.floor(Math.random() * res.data.length)].coordinates;
            const path = [
                { lng: 126.613481, lat: 45.710939 },
                { lng: 126.613228, lat: 45.710901 },
                { lng: 126.613045, lat: 45.710878 },
                { lng: 126.61262, lat: 45.710857 },
                { lng: 126.612364, lat: 45.711289 },
                { lng: 126.61238, lat: 45.711245 },
                { lng: 126.612304, lat: 45.711539 },
                { lng: 126.612251, lat: 45.711762 },
                { lng: 126.612605, lat: 45.71177 },
                { lng: 126.612801, lat: 45.711896 },
                { lng: 126.612979, lat: 45.711922 },
                { lng: 126.613314, lat: 45.711951 },
                { lng: 126.613948, lat: 45.712037 },
                { lng: 126.614412, lat: 45.712089 },
                { lng: 126.614341, lat: 45.712517 },
                { lng: 126.61416, lat: 45.712508 },
                { lng: 126.613837, lat: 45.712567 },
                { lng: 126.61353, lat: 45.712653 },
                { lng: 126.613306, lat: 45.712735 },
                { lng: 126.613242, lat: 45.712556 },
                { lng: 126.613215, lat: 45.712416 },
                { lng: 126.613394, lat: 45.712357 },
                { lng: 126.613669, lat: 45.712529 },
                { lng: 126.613777, lat: 45.712615 },
                { lng: 126.613611, lat: 45.712964 },
            ];
            const points = path.map(item => new BMapGL.Point(item.lng, item.lat));
            const polyline = new BMapGL.Polyline(points);
            setTimeout(this.startAnimation, 3000, polyline);
            // })
            // .catch(error => {
            //     console.error('获取轨迹数据失败:', error);
            // });
        },
        startAnimation(polyline) {
            try {
                this.trackAni = new BMapGLLib.TrackAnimation(this.bmap, polyline, {
                    overallView: true,
                    tilt: 30,
                    duration: 20000,
                    delay: 300,
                });
                this.trackAni.start();
            } catch (error) {
                console.error('动画启动失败:', error);
            }
        },
    },
};
</script>

<style scoped>
#container {
    height: 100%;
}
</style>
