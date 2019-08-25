// vue.config.js
module.exports = {
    configureWebpack: {
        devtool: 'inline-cheap-module-source-map',
        module: {
            rules: [
                {
                    test: /\.xml$/,
                    loader: 'url-loader',
                },
            ],
        },
    },
};
