var path = require('path');

module.exports = {
    entry: {
        app: path.resolve('js/es6/app.js')
        // index: path.resolve('js/es6/index.js'),
        // new: path.resolve('js/es6/new.js')
    },
    output: {
        filename: '[name].js',
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
