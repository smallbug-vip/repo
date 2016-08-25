document对象：
	一、属性
		1、bgColor  //不赞成。设置或获取表明对象后面的背景颜色的值ep：document.bgColor="red";
		2、designMode  //设置或获取表明文档是否可被编辑的值。
		3、fgColor  //设置或获取文档的前景(文本)颜色。
		4、lastModified  //获取页面上次修改的日期，若页面提供的话。
		5、URL  //获取将用户引入当前页面的位置 URL。
		6、vlinkColor  //设置或获取用户已访问过的链接颜色。
	二、事件
		1、onactivate  //当对象设置为活动元素时触发。
		2、onclick  //在用户用鼠标左键单击对象时触发
		3、oncut  //当对象或选中区从文档中删除并添加到系统剪贴板上时在源元素上触发
		4、onbdlclick  //当用户双击对象时触发
		5、ondrag  //当进行拖曳操作时在源对象上持续触发。
		6、onmousemove  //当用户将鼠标划过对象时触发。
		7、onmouseout  //当用户将鼠标指针移出对象边界时触发。
		8、onmouseover  //当用户将鼠标指针移动到对象内时触发。
		9、onmousewheel  //当鼠标滚轮按钮旋转时触发。
		10、onstop  //当用户单击停止按钮或离开 Web 页面时触发。
	三、方法
		1、createElement  //为指定标签创建一个元素的实例。
		2、getElementById  //获取对 ID 标签属性为指定值的第一个对象的引用。
		3、getElementsByName  //根据 NAME 标签属性的值获取对象的集合。
		4、getElementsByTagName  //获取基于指定元素名称的对象集合。
	
object对象
	一、属性
		1、className  //设置或获取对象的类。
		2、disabled  //获取表明用户是否可与该对象交互的值。
		3、form  //获取对象所在表单的引用。
		4、id  //获取标识对象的字符串。
		5、name  //设置或获取对象的名称。
		6、nextSibling  //获取对此对象的下一个兄弟对象的引用。
		7、nodeName  //获取特定结点类型的名称。
		8、nodeType  //获取所需结点的类型。
		9、nodeValue  //设置或获取结点的值。
		10、outerHTML  //设置或获取对象及其内容的 HTML 形式。
		11、outerText  //设置或获取对象的文本。	
		12、parentElement  //获取对象层次中的父对象。
		13、parentNode  //获取文档层次中的父对象。
		14、previousSibling  //获取对此对象的上一个兄弟对象的引用。
		15、tagName  //获取对象的标签名称。
		16、type  //设置或获取对象的 MIME 类型。
		17、width  //设置或获取对象的宽度。
		18、heigh  //设置或获取对象的高度。
	二、事件
		1、onblur  //在对象失去输入焦点时触发。
		2、onfocus  //当对象获得焦点时触发。
	三、方法
		1、applyElement  //使得元素成为其它元素的子元素或父元素。oElement = object.applyElement(oNewElement [outside|inside])
		2、blur  //使元素失去焦点并触发 onblur 事件。
		3、click  //触发 onclick 事件来模拟单击。
		4、cloneNode  //从文档层次中复制对对象的引用。
		5、focus  //使得元素得到焦点并执行由 onfocus 事件指定的代码。
		6、getAttribute  //获取指定标签属性的值。
		7、removeAttribute  //删除对象的给定标签属性。
		8、replaceNode  //用其它元素替换对象。
		9、setAttribute  //设置指定标签属性的值。
		
table对象
	一、属性
		1、align  //设置或获取表格排列。
		2、background  //设置或获取对象中文本和图像后平铺的背景图片。
		3、caption  //获取表格的 caption 对象。	
		4、cols  //设置或获取表格的列数。
		5、firstChild  //获取对象的 childNodes 集合的第一个子对象的引用。
		6、frame  //设置或获取表格周围的边框显示的方式。
		7、innerHTML  //设置或获取位于对象起始和结束标签内的 HTML
		8、lastChild  //获取该对象 childNodes 集合中最后一个子对象的引用。
		9、nextSibling  //获取对此对象的下一个兄弟对象的引用。
		10、outerHTML  //设置或获取对象及其内容的 HTML 形式。
		11、previousSibling  //获取对此对象的上一个兄弟对象的引用。
	二、事件
	三、方法
		1、appendChild  //给对象追加一个子元素。
		2、createCaption  //在表格中创建空的 caption 元素。
		3、deleteCaption  //从表格中删除 caption 元素及其内容。
		4、deleteRow  //从表格及 rows 集合中删除指定行(tr)。
		5、insertRow  //在表格中创建新行(tr)，并将行添加到 rows 集合中。
		6、moveRow  //将表格行移动到新位置。
		7、refresh  //刷新表格中的内容。当调用 removeRule 这样的方法后这可能是必需的，因为此时页面可能不会自动更新。
		8、removeChild  //从元素上删除子结点。
		9、removeNode  //从文档层次中删除对象。
		10、replaceChild  //用新的子元素替换已有的子元素。
		11、replaceNode  //用其它元素替换对象。
		12、insertBefore(new, old)  //在旧节点的前面插入新节点，父对象调用
		13、insertAfter
		
事件对象
	type: 获取事件类型
	target: 获取事件目标
	stopPropagation(): 阻止事件冒泡
	preventDefault: 阻止事件默认行为

window(一个html文档是一个window)
	定时器
		setTimeout(fun,N)
		clearTimeout（每隔N毫秒执行）

		setInterval(fun,N)
		clearInterval（每隔N毫秒执行）
	
	window之间的通信
		self	//自身window对象
		parent	//父窗口对象
		top	//顶层对象

		frames	//一个界面中的多个window对象
		opener	//打开该窗口的窗口对象

history
	forward
	back
	go()
	
location
	href=url
	reload()

DOM中的对象
	Document	文档对象
	Element		元素对象
	Attribute	属性对象
	Text		文本对象
	Commons		注释对象


	抽取-->Node
		自身属性
			nodeName
			nodeValue
			nodeType
		导航属性
			parentNode
			childNodes
			firstChild
			lastChild
			nextSibling
			previousSibling
