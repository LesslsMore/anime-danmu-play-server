// 目标服务器的地址
import { createProxyMiddleware } from 'http-proxy-middleware';

const target = 'https://api.dandanplay.net';

// 代理中间件配置
const danmuProxy = createProxyMiddleware({
    target: target,
    changeOrigin: true,
    // pathRewrite: {
    //     '^/api/v2': '/api/v2', // 保持路径不变
    // },
    on: {
        error: () => {},
        proxyReq: (proxyReq, req, res) => {
            // 添加自定义请求头
            console.log('Proxying request to:', req.url);
            proxyReq.setHeader('X-AppId', process.env.DANMU_APPID);
            proxyReq.setHeader('X-AppSecret', process.env.DANMU_APPSECRET);
        },
        proxyRes: () => {},
        proxyReqWs: () => {},
        open: () => {},
        close: () => {},
    },

});

export {
    danmuProxy,
}
