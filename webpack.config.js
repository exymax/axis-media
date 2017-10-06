var path = require('path');

module.exports = {
    entry: path.resolve('js/es6/index.js'),
    output: {
        filename: 'app.js',
        path: path.resolve('js/bundle'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },

            {
                test: /\.(less|css)$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                }, {
                    loader: "less-loader"
                }]
            },

            {test: /\.(png|jpg)$/, use: 'url-loader?limit=30000'}
        ]
    }
};
