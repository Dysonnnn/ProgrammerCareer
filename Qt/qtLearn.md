下载地址

官方下载地址：
http://download.qt.io/archive/qt/

安装教程
Qt 5.12长期支持版本正式发布(带下载链接)
https://blog.csdn.net/nicai_xiaoqinxi/article/details/84995134

Win下Qt5.12的下载、安装、配置及使用
https://blog.csdn.net/Vantablack/article/details/92799607

学习教程
Qt教程，Qt5编程入门教程（非常详细）
http://c.biancheng.net/qt/

《Qt 学习之路 2》目录
https://www.devbean.net/2012/08/qt-study-road-2-catelog/


[《Qt编程指南》](https://qtguide.ustclug.org/)
---


安装：
**选择安装项的时候**
>需要用vs调用qt的话要装 MSVS 2017 啥的。
>需要装 MinGw X.X.X 64-bit  不然会缺文件。无法构建工程。
>Sources也选了吧


环境变量也添加
Qt\5.12.x\mingwxx_64bit\bin
Qt\tool]mingwxxx_xx\bin


开始配置VS环境下的Qt
https://blog.csdn.net/Vantablack/article/details/92799607

第一行 扩展->管理扩展，然后左边选择联机，然后Ctrl+E搜索，输入qt，回车
（使用手机流量下载会好的。）

然后选择Qt Visual Studio Tools，Download，然后等待下载完成（好像很有点慢）

然后安装这个。

打开VS，扩展里面会多一个Qt VS Tools，打开里面的Qt Options
打开之后添加一个
Qt\Qtx.x.x\msvc2017