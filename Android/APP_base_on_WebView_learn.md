[Android：这是一份全面&详细的Webview使用攻略](https://juejin.im/post/5924dbf58d6d810058fdde43)
现在很多App里都内置了Web网页（Hyprid App），比如说很多电商平台，淘宝、京东、聚划算等等，如下图


那么这种该如何实现呢？其实这是Android里一个叫WebView的组件实现的。今天我将全面介绍WebView的常用用法。

1. 简介
WebView是一个基于webkit引擎、展现web页面的控件。

Android的Webview在低版本和高版本采用了不同的webkit版本内核，4.4后直接使用了Chrome。


2. 作用

显示和渲染Web页面
直接使用html文件（网络上或本地assets中）作布局
可和JavaScript交互调用


WebView控件功能强大，除了具有一般View的属性和设置外，还可以对url请求、页面加载、渲染、页面交互进行强大的处理。

作者：Carson_Ho
链接：https://juejin.im/post/5924dbf58d6d810058fdde43
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


3. 使用介绍
一般来说Webview可单独使用，可联合其子类一起使用，所以接下来，我会介绍：

Webview自身的常见方法；
Webview的最常用的子类
（WebSettings类、WebViewClient类、WebChromeClient类)
Android和Js的交互

作者：Carson_Ho
链接：https://juejin.im/post/5924dbf58d6d810058fdde43
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


3.1 Webview常用方法
3.1.1 加载url
加载方式根据资源分为三种
```
  //方式1. 加载一个网页：
  webView.loadUrl("http://www.google.com/");

  //方式2：加载apk包中的html页面
  webView.loadUrl("file:///android_asset/test.html");

  //方式3：加载手机本地的html页面
   webView.loadUrl("content://com.android.htmlfileprovider/sdcard/test.html");

   // 方式4： 加载 HTML 页面的一小段内容
  WebView.loadData(String data, String mimeType, String encoding)
// 参数说明：
// 参数1：需要截取展示的内容
// 内容里不能出现 ’#’, ‘%’, ‘\’ , ‘?’ 这四个字符，若出现了需用 %23, %25, %27, %3f 对应来替代，否则会出现异常
// 参数2：展示内容的类型
// 参数3：字节码
```


作者：Carson_Ho
链接：https://juejin.im/post/5924dbf58d6d810058fdde43
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





[appium Android下webview混合APP使用教程](https://www.cnblogs.com/dreamhighqiu/p/10995986.html)


