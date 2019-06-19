# Git 是目前世界上最先进的分布式版本控制系统。

---

第一次接触这个的时候，公司要做一个项目，因为我前端也是自学不久，自然对这玩意一窍不通。
在同事风骚的操作下，我一脸懵逼，全然不知道发生了什么，然而我电脑本地已 pull 下来一个文件，
就这样，我稀里糊涂的开始了 git 之旅。那时什么都不懂，就只知道三个 git 命令，`git status`、`git add`和`git commit -m`，
只要我对文件做了修改或是添加了文件，就执行这三个命令(太那个了)。后来慢慢了解了，也记住了一些东西，然而项目完成后就没再接触 git 了，所以忘得差不多了。
最近突然玩起了[github](http://littlezong.github.io)，所以又开始玩 git 了，不得不说，这玩意真的很不错。
然后，我就在[这里](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)学习了 git。

---

## 常用命令

一般来说，使用 git 命令就得先初始化仓库 (`git init`)，当然，如果你的本地文件是通过 `git clone` (如 `git clone https://littlezong.github.io/example` )克隆下来的，就不用初始化了。
要关联某个远程仓库，使用命令

> `git remote add origin git@server-name:path/repo-name.git`

> 如`git remote add origin git@github.com:littlezong/hellogithub.git`

使用这种 SSH 链接，需要在 github 上配置好你的**SSH Key**([如何配置 SSH key?](/2016/08/04/SSH-Key))。

关联了远程仓库后，可使用以下各种命令来执行操作：

### 如果你对项目动了手脚

> - `git status` 查看状态，可知道哪些文件做了修改，就可以对做了修改的文件进行相关操作
> - `git diff` 查看修改
> - `git add` 添加要推送的文件
> - `git commit -m "修改内容"` 提交，-m 是本次提交说明，最好是必写
> - `git push origin` 将分支推送到远程

### 如果你的队友修改了项目并推送到了远程仓库

> - `git pull origin` 推送远程分支的更新到本地(然后就可以对你的项目动手动脚了)

### 如果你做错事了

> - `git checkout` -- file 把 file 文件在工作区的修改全部撤销
> - - 一种是 file 自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
> - - 一种是 file 已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

> - `git reset --hard HEAD^` 返回上个版本(HEAD^^上上个版本，类推)

> - `git log` 提交记录，添加--pretty=oneline 简单显示(记录一行输出)
> - `git reflog` 记录每一次命令，根据前面的版本 id 可回到对应版本(如--hard dd0d0a1)

> - `git rm -r -n --cached 'src'` 加上-n 这个参数执行命令是是不会删除任何文件，而是展示删除的文件列表预览。(执行完后提交再推送到远程就 ok 了)

### 如果你想操作分支

> - `git branch` 查看当前分支

> - `git branch 分支` 创建分支
> - `git branch -d 分支` 删除分支
> - `git checkout 分支` 切换到分支

> - `git branch -a` 查看所有分支

> - `git branch -r` 查看远程分支

### 如果你遇到问题

> - fatal: remote origin already exists.那么执行`git remote rm origin`

### 其他

> - `ls` 查看当前路径下所有文件(dir 也可以)

> - `vi` 文件，修改文件内容(esc 回到命令，:wq 退出并保存)

> - `cat` 文件，查看该文件内容
