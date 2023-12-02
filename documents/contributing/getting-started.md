---
nav:
  title: 共建指南

title: 快速起步
order: 20
---

# 快速起步

1. 从 GitLab 仓库中拉取项目到本地

   ```bash
   git clone https://github.com/fexd-team/mobile.git
   ```

2. 基于 `master` 切出一条独立的分支

   ```bash
   git chechout -b feat/xxx
   ```

3. 使用 `yarn` 初始化项目依赖

   ```bash
   npm install -g yarn # 如果已经安装了 yarn 可忽略这一步

   yarn
   ```

4. 使用 `yarn dev` 命令启动本地开发模式

   ```bash
   yarn dev
   ```

   本地开发模式默认运行在 `8000` 端口上，可访问 http://localhost:8000

5. 使用 `yarn new:component` 命令创建一个组件，再写点 bug

   ```bash
   yarn new:component --name=Test
   ```

6. 跑测试用例（这一步尚未支持...）

7. 提交改动，并将分支推到远端

   ```bash
   git add --all
   git commit -am 'feat: xxx'
   git push --set-upstream origin feat/xxx
   ```

8. 创建一个合入 `main` 分支的 [Pull Request](https://github.com/fexd-team/mobile/pulls)，找人 review 提交，等待合并
