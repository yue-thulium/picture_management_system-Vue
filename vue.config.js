module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://localhost:8082',
                changeOrigin: true,
                pathRewrite: {
                    '^/': ''
                }
            }
        }
    },
    configureWebpack: {
        resolve:{
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'views': '@/views',
                'network': '@/network',
            }
        }
    }
}
