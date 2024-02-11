const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
    app.use (
        '/api',
        createProxyMiddleware({
            target: "http://quichealth.com.ng/",
            changeOrigin:true,
            pathRewrite: {
                '^/api': '/api/v1',
                }
        })
    )
}