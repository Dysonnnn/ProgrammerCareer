[加快访问GitHub的速度](https://www.cnblogs.com/onefine/p/10499339.html)
由于某些原因，国内访问Github有时会异常缓慢，通过修改系统hosts文件的办法，绕过国内dns解析，直接访问GitHub的CDN节点，从而达到加速的目的。该方法也可加速其他因为CDN被屏蔽导致访问慢的网站。

实现
在本地host文件中添加映射，步骤如下：

1、用文本编辑器打开hosts文件（注意修改访问权限），位于C:\Windows\System32\drivers\etc目录下

2、打开 http://tool.chinaz.com/dns ，这是一个查询域名映射关系的工具

3、重点查询github.global.ssl.fastly.net和assets-cdn.github.com两个地址

4、多查几次，选择一个稳定，延迟较低的ip按如下方式添加到host文件

比如将下列信息添加到host文件中：

# github
52.74.223.119	github.com
185.199.110.153	developer.github.com
185.199.109.153	assets-cdn.github.com
151.101.197.194	github.global.ssl.fastly.net
5、保存文件，Windows+X打开系统命令行（管理员身份）或powershell
运行ipconfig /flushdns手动刷新系统DNS缓存。

6、重新打开浏览器，起飞。

参考：
https://blog.csdn.net/why19940926/article/details/77922281
https://blog.csdn.net/w958660278/article/details/81161224