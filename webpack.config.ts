import { join } from "path";
// import { optimize } from "webpack";
import * as TypedocWebpackPlugin from "typedoc-webpack-plugin";

const env: any = process && process.env && process.env.NODE_ENV;
const tsConfig: {} = env && env === "production" ? { configFileName: "tsconfig.prod.json" } : {};

const libraryName: string = "racoon-bot";

export default {
    entry: join( __dirname, `src/${libraryName}.ts` ),
    devtool: "source-map",
    target: "node",
    output: {
        path: join( __dirname, "dist" ),
        libraryTarget: "umd",
        library: libraryName,
        filename: `${libraryName}.js`
    },
    resolve: {
        extensions: [ ".ts", ".js", ".json" ]
    },
    module: {
        rules: [ {
            test: /\.ts$/,
            use: [
                {
                    loader: "babel-loader",
                    options: { presets: [ "es2015" ] }
                },
                {
                    loader: "ts-loader",
                    options: tsConfig
                }
            ],
            exclude: [
                join( __dirname, "node_modules" ),
                join( __dirname, "test" )
            ]
        }]
    },
    plugins: [
        // new optimize.UglifyJsPlugin({sourceMap: true}),
        // new TypedocWebpackPlugin(
        //     {
        //         theme: "minimal",
        //         out: "docs",
        //         target: "es6",
        //         ignoreCompilerErrors: true
        //     },
        //     "src"
        // )
    ]
};
