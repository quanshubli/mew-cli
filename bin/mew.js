const path = require('path');
const fs = require('fs');
const cp = require('child_process');

const cwd = process.cwd();  // 当前所在目录

// 根据输入，获取项目名称
const projectName = process.argv[2];

if (!projectName) {
  throw Error('请输入项目名称!');
}

// 检查当前目录是否已存在该名称的文件夹
const file = path.resolve(cwd, projectName);

if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
  throw Error(`项目 ${projectName} 已存在!`);
}

// 执行
go();
function go() {
  const temp = path.resolve(__dirname, '../template');
  const target = path.resolve(cwd, projectName);
  fs.mkdir(target, err => {
    if (err) throw err;
    copyFolder(temp, target, err => {
      if (err) throw err;
      readAndSetPackageJson(
        path.join(temp, 'package.json'),
        path.join(target, 'package.json'),
        () => {
          cp.exec(
            'npm install',
            { cwd: target },
            (err) => {
              if (err) throw err;
              console.log('项目创建完毕!');
            }
          );
        }
      );
    });
  });
}

// 拷贝目录及其子目录
function copyFolder(temp, target, callback) {
  fs.readdir(temp, (err, files) => {
    let count = 0;
    let checkEnd = function () {
      ++count == files.length && callback && callback();
    }

    if (err) throw err;
    files.forEach(file => {
      const tempPath = path.join(temp, file);
      const targetPath = path.join(target, file);
      if (fs.statSync(tempPath).isDirectory()) {
        fs.mkdir(targetPath, err => {
          if (err) throw err;
          copyFolder(tempPath, targetPath, checkEnd);
        });
      } else {
        fs.copyFile(tempPath, targetPath, checkEnd);
      }
    });
    files.length === 0 && callback && callback();
  });
}

// 读取并设置 package.json
function readAndSetPackageJson(temp, target, callback) {
  let packageJson = fs.readFileSync(temp, 'utf-8');
  packageJson = JSON.parse(packageJson);
  packageJson.name = projectName;
  fs.writeFile(target, JSON.stringify(packageJson), err => {
    if (err) throw err;
    callback && callback();
  });
}