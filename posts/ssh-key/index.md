配置**SSH Key**呢主要是为了能在关联远程仓库时使用 SSH 连接，可以免去 http 连接时频繁的输入密码的操作。
比如要关联在 github 上的 repo：

> 1、设置 git 的 username 和 email

- `git config --global user.name "用户名"`
- `git config --global user.email "邮箱"`

> 2、首先使用命令 `ls -al ~/.ssh` 确定是否已存在 SSH key， 如存在就会列出文件，那么重命名备份一下；

    如不存在则接着使用命令 `ssh-keygen -t rsa -C "邮箱"`，一路按`Enter`(默认路径和空密码)，不出意外即已生成**id_rsa**和**id_rsa.pub**(这个就是公钥啦，用记事本打开并复制里面的内容)；

> 3、在 github 上的**Personal settings**（因为 github 页面可能会改版，所以具体位置自己找），找到**SSH and GPG keys**，点击**New SSH key**，然后在**Key**下的框框中粘贴刚刚复制的公钥，**Title**的话随便给个名字就行了，ok，点击按钮添加；

> 4、测试测试连接情况：git 命令执行 `ssh -T git@github.com` ，如果看到

    "Hi 谁谁谁!You've successfully authenticate,but GitHub does not provide shell access."，
    那么恭喜你配置成功了；

> 5、成功后，你就可以使用 SSH 连接关联远程仓库了：在你的项目下执行`git remote add origin git@server-name:path/repo-name.git`命令，然后就可以很方便的使用各种[git 命令](/2016/08/04/git)来操作了。

好了，**SSH Key**的配置大致就这样了，我也就只知道这些，如果有哪里不对的可以在评论中反馈，有哪里不懂的话可以加群交流讨论。
