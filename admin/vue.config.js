module.exports = {
    productionSourceMap: false,
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
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"));
    },
    configureWebpack:{
        externals:{
            'TencentCaptcha': 'TencentCaptcha'
        }
    }
    };

const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
