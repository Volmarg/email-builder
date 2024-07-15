/**
 * @description this webpack file is explicitly for the static communication page (known iframe communication - performance issue)
 * @see `/demo/public/communication/static-page.html`
 */
const path              = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const webpack           = require('webpack');

module.exports = (env) => {

    // start my-private-customization
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});
    // end my-private-customization

    return {

        mode: "production",
        entry: {
            main: "./src/static/communication/index.js",
        },
        output: {
            path: path.resolve(__dirname, './src/static/communication/scripts'),
            filename: "../../../../public/static/communication/index.js" // <--- Will be compiled to this single file
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                "@core/utils"        : path.resolve(__dirname, "../packages/easy-email-core/src/utils"),
                "@core"              : path.resolve(__dirname, "../packages/easy-email-core/src"),
                "@core/typings"      : path.resolve(__dirname, "../packages/easy-email-core/src/typings/index.ts"),
                "@core/blocks/*"     : path.resolve(__dirname, "../packages/easy-email-core/src/blocks/*"),
                "@core/blocks"       : path.resolve(__dirname, "../packages/easy-email-core/src/blocks"),
                "@core/constants"    : path.resolve(__dirname, "../packages/easy-email-core/src/constants.ts"),
                "@core/components"   : path.resolve(__dirname, "../packages/easy-email-core/src/components"),
                "@core/components/*" : path.resolve(__dirname, "../packages/easy-email-core/src/components/*"),
                "@core/utils/*"      : path.resolve(__dirname, "../packages/easy-email-core/src/utils/*"),
            }
        },
        plugins: [
            new CompressionPlugin(),
            new webpack.DefinePlugin(envKeys) // my-private-customization
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [{
                        loader: 'ts-loader',
                        options: {
                            configFile: "src/static/communication/tsconfig.json"
                        }
                    }],
                    exclude: /node_modules/,
                }
            ]
        }
    }

};