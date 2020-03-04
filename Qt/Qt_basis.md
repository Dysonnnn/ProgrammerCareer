[Qt窗口之QMainWindow、QDialog、QWidget](https://blog.csdn.net/rl529014/article/details/51419126)

在 Qt 中，我们将窗口和控件统称为部件（Widget）


## 窗口
窗口是指程序的整体界面，可以包含标题栏、菜单栏、工具栏、关闭按钮、最小化按钮、最大化按钮等。

## 控件
控件是指按钮、复选框、文本框、表格、进度条等这些组成程序的基本元素。一个程序可以有多个窗口，一个窗口也可以有多个控件。

QWidget 是所有用户界面元素的基类，窗口和控件都是直接或间接继承自 QWidget，QMainWindow、QWidget、QDialog 三个类就是用来创建窗口的，可以直接使用也可以继承后再使用。

QMainWindow 窗口可以包含菜单栏、工具栏、状态栏、标题栏等，是最常见的窗口形式，可以作为GUI程序的主窗口。


QDialog 是对话框窗口的基类。对话框主要用来执行短期任务，或与用户进行互动，它可以是模态的也可以是非模态的。QDialog 没有菜单栏、工具栏、状态栏等。




如果是主窗口，就使用 QMainWindow；
如果是对话框，就是用 QDialog；
如果不确定，或有可能作为顶级窗口，也有可能嵌入到其他窗口中，那么使用 QWidget。


需要注意的是，窗口和控件都继承自 QWidget，如果不为控件指定父对象，它就会被作为窗口处理，这时 setWindowTitle() 和 setWindowIcon() 函数就会生效。


可以发现，窗口和控件没有绝对的区别，控件也可以成为窗口，这取决于它有没有父对象。


----


# 信号与槽机制

## 信号与槽概述
>信号和槽机制是QT的核心机制。信号和槽是一种高级接口，应用于 对象(包括窗口部件对象和非图形对象）之间的通信。

**信号**:当对象改变其状态时，信号就由该对象发射(emit) 出去，而且对 象只负责发送信号，它不知道另一端是谁在接收这个信号。这样就做 到了真正的信息封装，能确保对象被当作一个真正的软件组件来使用。 

**槽**:用于接收信号，而且槽只是普通的对象成员函数。一个槽并不知道 是否有任何信号与自己相连接，并且对象并不了解具体的通信机制。

## 信号与槽使用方法
1. designer中点击“信号和槽编辑器”直接 编辑关联部件
2. designer中，右击控件，选择goto slot
3. 使用connect关键字

connect(button, SIGNAL(clicked()), &a, SLOT(quit()));
		发送者， 信号， 接收者， 槽。

### 信号与槽连接方式
- 一个信号可以与另一个信号相连
- 同一个信号可以与多个槽相连
- 同一个槽可以响应多个信号
- 注意点

**一个信号可以与另一个信号相连**
connect(Object1, SIGNAL(signal1), Object2, SIGNAL(signal1));
1表示Object1的信号1发送可以触发Object2的信号1发送

**同一个信号可以与多个槽相连**
connect(Object1,SIGNAL(signal2),Object2,SLOT(slot2)
connect(Object1,SIGNAL(signal3),Object3,SLOT(slot1)


**同一个槽可以响应多个信号**
connect(Object1,SIGNAL(signal2),Object2,SIGNAL(slot2)
connect(Object3,SIGNAL(signal2),Object2,SIGNAL(slot2)

**注意点**
（1）如果要追求高效率，比如在实时系统中就要尽可能 少用这种机制 
（2）如果使用不当，在程序执行时有可能产生死循环 
（3）如果一个信号与多个槽相联，那么，当这个信号被 发射时，与之相关的槽被激活的顺序为随机 
（4）宏定义不能用在signal 和 slot 的参数中 （5）构造函数不能用在signals 或者 slots 声明区域内



# 布局管理器的使用

## 布局管理系统概述
Qt中主要提供了QLayout类及其子类来作为布局管 理器，他们可以实现常用的布局管理功能。

QLayout类及其子类关系图如图所示，其中箭头表示 继承关系，头为父类，尾为子类。

所有的QWidget类的子类的对象都可以使用布局管理器来 管理位于它们之中的子部件，QWidget::setLayout()函数 可以在一个部件上应用布局管理器。一旦一个部件上设置了 布局管理器，那么它主要完成的任务为：定位子部件；感知 窗口默认大小；感知窗口最小大小；改变大小处理。

QLayout类是布局管理器的基类，它是一个抽象基类。该类继 承自QObject和QLayoutItem类，一般设计中，只需要使用 QLayout的几个子类即可，它们是： 
QBoxLayout（基本布局管理器） 
>QHBoxLayout 
>QVBoxLayout 
QGridLayout（栅格布局管理器） 
QFormLayout（表单布局管理器）




### 水平布局
1、在mywidget.cpp文件中添加头文件#include<QHBoxLayout> 
2、添加如下代码：
```c
QHBoxLayout *layout = new QHBoxLayout;     // 新建水平布局管理器 
layout->addWidget(ui->fontComboBox);        // 向布局管理器中添加部件 
layout->addWidget(ui->textEdit); 
layout->setSpacing(50);                         // 设置部件间的间隔 layout->setContentsMargins(0, 0, 50, 100);    // 设置布局管理器到边界的距离，
 											// 四个参数顺序是左，上，右，下 
setLayout(layout);
```
### 垂直布局
QVBoxLayout：把子窗口从上到下排列在一个垂直列上，如图所示

### 栅格布局管理器
QGridLayout：把子窗口排列在一个二维的网格中，窗口可占 据多个单元格，如图所示。


### 表单布局管理器
在设计模式，从部件栏中找到Form Layout，将 其拖入到界面上，然后双击它，或者在它上面点 击鼠标右键，选择“添加表单布局行”菜单。然 后在弹出的“添加表单布局行”对话框中填入标 签文字“Name(&N)：”，这样下面便自动填写 了“标签名称”、“字段类型”和“字段名称” 等，并且设置了伙伴关系。
这里填写的标签文字中（&N），设置伙伴关系表示当按下Alt+N 时，光标会自动跳转到标签后面对应的行编辑器中。按下确定键 ，便会在布局管理器中添加一个标签和一个行编辑器。按照以上 方法，再添加三行：Sex(&S)，使用QComoBox；Age(&A)，使 用QSpinBox；Mail(&M)，使用QLineEdit，如图所示。







