#!/usr/bin/env sh
 
# 确保脚本抛出遇到的错误
set -e
 
# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'update'



git branch -M gh-pages

git remote add origin https://github.com/1034668900/test.git

git push -u origin gh-pages

cd -

