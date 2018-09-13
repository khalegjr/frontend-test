const path = require('path')

module.exports = {
    entry: './src/assets/javascripts/main.js',

    output: {
        path: path.resolve('public/javascripts'),
        filename: 'main.js'
    }
}