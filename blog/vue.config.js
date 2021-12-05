module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:9099",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": ""
                }
            }
        },
        disableHostCheck: true
    },
    productionSourceMap: false,
    css: {
        extract: true,
        sourceMap: false
    }
}
