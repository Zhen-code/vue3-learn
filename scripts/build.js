const fs = require('fs');
const execa = require('execa')
const dirs = fs.readdirSync('packages').filter(dir => {
    if(fs.statSync(`packages/${dir}`).isDirectory()){
        return true;
    }
    return false;
})
console.log(dirs);

// 进行打包 并行
async function build(target){
    await execa('rollup', ['-c', '--environment',`TARGET:${target}`], {stdio: 'inherit'}) // stdio子进程在根目录输出
}
    
async function runParaller(dirs, itemfn){
    let result = []
    for(let item of dirs){
        result.push(itemfn(item))
    }
    return Promise.all(result)
}
runParaller(dirs, build).then(() => {})

