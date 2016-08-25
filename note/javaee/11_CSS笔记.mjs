一、Font
	1、font:caption; //使用有标题的系统控件的文本字体(如按钮，菜单等)
	2、color:****   //字体颜色
	3、font-family:楷体;  //字体名称。按优先顺序排列。以逗号隔开。如果字体名称包含空格，则应使用引号括起
	4、font-size:16px;	//字体大小，默认值为16px
	5、font-style:italic	//字体风格，italic为斜体
	6、font-weight:900;	//字体变粗
	7、text-decoration:underline（下划线）|line-through（贯穿线）|overline（上划线）
	8、text-transform:uppercase（把所有字母转换成大写）|lowercase（把所有字幕转换成小写）|capitalize（把所有单词的第一个字母变成大写，开始就是大写的字母不变）
	9、line-height:100px;	//文字上边所空出的高度
	10、letter-spacing:34px;	//字间距
	11、word-spacing	//单词之间的距离
	
二、文字
	1、text-indent:2%;	//首行缩进
	2、text-align:center	//文本的对齐方式
	
三、背景
	1、background-color:red;	//背景颜色
	2、background-image:url();	//背景图片
	3、background-position:top | center | bottom | left | center | right	//设置或检索对象的背景图像位置
	4、background-repeat:no-repeat; repeat-x（横向平铺）  repeat-y（纵向平铺） 
	
四、定位
	1、position:absolute;  left:30%;|right|top|	bottom	//一起使用绝对定位
	
五、尺寸
	1、height
	2、width
	
六、外补丁
	1、margin : auto | length 检索或设置对象四边的外延边距。
七、轮廓
	1、outline:red dotted 1px;
		none  :　 默认值。无边框。与任何指定的 outline-width 值无关 
		dotted  :　 点线外轮廓 
		dashed  :　 虚线外轮廓 
		solid  :　 实线外轮廓 
		double  :　 双线外轮廓。两条单线与其间隔的和等于指定的 oueline-width 值 
		groove  :　 根据 outline-color 的值画3D凹槽外轮廓 
		ridge  :　 根据 outline-color 的值画3D凸槽外轮廓 
		inset  :　 根据 outline-color 的值画3D凹边外轮廓 
		outset  :　 根据 outline-color 的值画3D凸边外轮廓 

八、内容
九、内补丁
	1、padding:20px 20px 20px;	//如果只提供一个，将用于全部的四条边。
								如果提供两个，第一个用于上－下，第二个用于左－右。
								如果提供三个，第一个用于上，第二个用于左－右，第三个用于下。
								四个参数：从上开始顺时针
	2、padding-top
	3、padding-right
	4、padding-bottom
	5、padding-left
十、列表
	1、list-style : list-style-image || list-style-position || list-style-type 
	2、list-style-image : none | url ( url ) 
	3、list-style-type 
			   disc  :　 CSS1  默认值。实心圆 
			 circle  :　 CSS1  空心圆 
			 square  :　 CSS1  实心方块 
			decimal  :　 CSS1  阿拉伯数字 
		lower-roman  :　 CSS1  小写罗马数字 
		upper-roman  :　 CSS1  大写罗马数字 
		lower-alpha  :　 CSS1  小写英文字母 
		upper-alpha  :　 CSS1  大写英文字母 
		none  :　 CSS1  不使用项目符号 

十一、表格
	1、caption-side : top | right | bottom | left 	//设置或检索表格( table )的 caption 对象是在表格的那一边。它是和 caption 对象一起使用的属性。
十二、滚动条
十三、打印
十四、声音
十五、其他
十六、布局
	1、clear : left 	//该属性的值指出了不允许有浮动对象的边
	2、float: right 	//文本流向对象的左边
十七、边框
	1、border : border-width || border-style || border-color 
	2、border-color            border-style            border-width             
	3、border-top              border-top-color        border-top-style        border-top-width
	4、border-right            border-right-color      border-right-style      border-right-width 
	5、border-bottom           border-bottom-color     border-bottom-style     border-bottom-width 
	6、border-left             border-left-color       border-left-style       border-left-width
	7、border-left : border-width || border-style || border-color 
十八、伪类
	1、:link    :visited
	2、:hover   :active
十九、引入
	1、<link rel="stylesheet" href="s.css" type="text/css" />
	2、<style type="text/css"></style>
	3、<h1 style=""></h1>
	
	

	值				描述
								//需使用的自定义光标的 URL。
								//注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。
	default			默认光标（通常是一个箭头）
	auto			默认。浏览器设置的光标。
	crosshair		光标呈现为十字线。
	pointer			光标呈现为指示链接的指针（一只手）
	move			此光标指示某对象可被移动。
	e-resize		此光标指示矩形框的边缘可被向右（东）移动。
	ne-resize		此光标指示矩形框的边缘可被向上及向右移动（北/东）。
	nw-resize		此光标指示矩形框的边缘可被向上及向左移动（北/西）。
	n-resize		此光标指示矩形框的边缘可被向上（北）移动。
	se-resize		此光标指示矩形框的边缘可被向下及向右移动（南/东）。
	sw-resize		此光标指示矩形框的边缘可被向下及向左移动（南/西）。
	s-resize		此光标指示矩形框的边缘可被向下移动（南）。
	w-resize		此光标指示矩形框的边缘可被向左移动（西）。
	text			此光标指示文本。
	wait			此光标指示程序正忙（通常是一只表或沙漏）。
	help			此光标指示可用的帮助（通常是一个问号或一个气球）。