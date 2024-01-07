const execa = require('execa')

// 进行打包 并行
async function build(target){
    // -cw : c:配置文件 w:监视文件变化
    await execa('rollup', ['-cw', '--environment',`TARGET:${target}`], {stdio: 'inherit'}) // stdio子进程在根目录输出
}
    
build('reactivity')

