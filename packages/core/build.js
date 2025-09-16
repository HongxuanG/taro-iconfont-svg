#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { copyFileSync, copySync, removeSync, ensureDirSync } = require('fs-extra')

console.log('Build start')

// 获取当前目录
const rootDir = process.cwd()
const buildDir = path.join(rootDir, 'build')
const srcDir = path.join(rootDir, 'src')
const templatesDir = path.join(rootDir, 'templates')

// 清理旧的构建文件
console.log('Cleaning old build files...')
removeSync(buildDir)
removeSync(path.join(srcDir, 'components', 'iconfont'))

// 确保构建目录存在
ensureDirSync(buildDir)

// 运行 TypeScript 编译
console.log('Running TypeScript compilation...')
try {
  execSync('npx tsc', { stdio: 'inherit', cwd: rootDir })
}
catch (error) {
  console.error('TypeScript compilation failed:', error.message)
  process.exit(1)
}

// 移动构建文件
console.log('Moving build files...')
const buildSrcDir = path.join(buildDir, 'src')
if (fs.existsSync(buildSrcDir)) {
  const files = fs.readdirSync(buildSrcDir)
  files.forEach((file) => {
    const srcPath = path.join(buildSrcDir, file)
    const destPath = path.join(buildDir, file)
    if (fs.statSync(srcPath).isDirectory()) {
      copySync(srcPath, destPath)
    }
    else {
      copyFileSync(srcPath, destPath)
    }
  })
  removeSync(buildSrcDir)
}

// 删除不需要的目录
removeSync(path.join(buildDir, 'src'))
removeSync(path.join(buildDir, 'examples'))

// 复制必要的文件
console.log('Copying necessary files...')
const rootReadmePath = path.join(rootDir, '..', '..', 'README.md')
const rootPackagePath = path.join(rootDir, '..', '..', 'package.json')

if (fs.existsSync(rootReadmePath)) {
  copyFileSync(rootReadmePath, path.join(buildDir, 'README.md'))
}

if (fs.existsSync(rootPackagePath)) {
  copyFileSync(rootPackagePath, path.join(buildDir, 'package.json'))
}

// 复制模板文件
if (fs.existsSync(templatesDir)) {
  copySync(templatesDir, path.join(buildDir, 'templates'))
}

console.log('Build completed')

// 以下为发布相关代码（已注释）
/*
// 保存旧的 npm registry 镜像地址
const oldRegistry = execSync('npm config get registry', { encoding: 'utf8' }).trim();
// 设置 npm registry 官方镜像地址
execSync('npm config set registry https://registry.npmjs.org');

try {
  // 检查是否已登录
  let whoami;
  try {
    whoami = execSync('npm whoami', { encoding: 'utf8' }).trim();
  } catch (e) {
    whoami = '';
  }

  if (!whoami) {
    console.log('login plz...');
    execSync('npm login', { stdio: 'inherit' });
  }

  console.log(`I am: ${execSync('npm whoami', { encoding: 'utf8' }).trim()}`);

  // 等待一秒
  setTimeout(() => {
    console.log('Begin publish...');
    execSync(`npm publish ./build/ --access=public ${process.argv.slice(2).join(' ')}`, { stdio: 'inherit' });

    // 重新设置回旧的 npm registry 镜像地址
    execSync(`npm config set registry ${oldRegistry}`);
  }, 1000);
} catch (error) {
  // 重新设置回旧的 npm registry 镜像地址
  execSync(`npm config set registry ${oldRegistry}`);
  throw error;
}
*/
