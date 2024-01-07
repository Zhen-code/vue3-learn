import ts from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';
// 获取包所在的路径
const packagesDir = path.resolve(__dirname, 'packages');
// 获取需要打包的包 TARGET：build.js
const packageDir = path.resolve(packagesDir, process.env.TARGET);
// 获取到每个包的项目配置
const resolve = p => path.resolve(packageDir, p);
// 获取每个包下的package.json
const pkg = require(resolve('package.json')); 
 // 包名
const name = path.basename(packageDir);
const outputOpions = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: 'es'
    },
    'cjs': {
        file: resolve(`dist/${name}.cjs.js`),
        format: 'cjs'
    },
    'global': {
        file: resolve(`dist/${name}.global.js`),
        format: 'iife', // global
    }
}
const options = pkg.buildOptions;

function createConfig(format,output){
    //进行打包
    output.name = options.name
    output.sourcemap = true
    //生成rollup配置
    return {
        input:resolve('src/index.ts'), //导入
        output,
        plugins: [
            json(),
            ts({ //解析 ts
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
        resolvePlugin() //解析 第三方 插件
    ]}
}

// rollup 需要 导出一个配置
export default options.formats.map(format => createConfig(format,outputOpions[format]))


