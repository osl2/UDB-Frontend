// vue.config.js
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.xml$/,
                    loader: 'url-loader'
                }
            ]
        }
    }
};
