const Koa = require('koa');
const Router = require('@koa/router');
const MongoDB = require('./MongoDB/mongodb');
const router = new Router();
const server = new Koa();

router.get('/', async ctx => {
    ctx.body = '这是首页';
});

router.get('/list', async ctx => {
    ctx.body = '这是列表';
});

router.get('/trace', async ctx => {
    try {
        const collection = MongoDB.collection('GadoDe_TraecDetail');
        const traceData = await collection.aggregate([
            {
                $unwind: '$result.routes',
            },
            {
                $unwind: '$result.routes.steps',
            },
            {
                $project: {
                    _id: 1,

                    coords: [
                        {
                            lng: '$result.routes.steps.stepOriginLocation.lng',
                            lat: '$result.routes.steps.stepOriginLocation.lat',
                        },
                        {
                            lng: '$result.routes.steps.stepDestinationLocation.lng',
                            lat: '$result.routes.steps.stepDestinationLocation.lat',
                        },
                    ],
                },
            },
            {
                $unwind: '$coords', // 展开坐标数组
            },
            {
                $group: {
                    _id: '$_id',

                    coordinates: { $addToSet: '$coords' },
                },
            },
            {
                $project: {
                    coordinates: {
                        $map: {
                            input: '$coordinates',
                            as: 'point',
                            in: {
                                lng: '$$point.lng',
                                lat: '$$point.lat',
                            },
                        },
                    },
                },
            },
        ]);

        const result = await traceData.toArray();
        ctx.body = result;
    } catch (error) {
        console.error('获取轨迹数据时出错:', error);
        ctx.status = 500;
        ctx.body = { error: '服务器内部错误' };
    }
});

server.use(router.routes());
server.listen(8888, () => console.log('服务器启动成功'));
