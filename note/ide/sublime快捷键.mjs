（1）Ctrl + D
（2）左键
（3）中间键
			//多重编辑

Ctrl + P
	@显示函数
	:30		//跳到30行
			//随意跳转

Ctrl + F11
		//免打扰模式

Ctrl+ Ctrl-
		//调整代码大小

Tab
		//代码自动补全

Ctrl + /
Ctrl + Shift + /
		//注解

Shift + Alt + number
				8（两个上下的窗口）
				9（3个）
		//将界面变成几个窗口

Ctrl + Shift + F
Ctrl + F
Ctrl + H
		//查找

Ctrl + L
		//选择整行
Ctrl + KK
		//从光标出删除至行尾
Ctrl + X
			//删除整行
Ctrl + Shift + D
			//复制光标所在行，出入到之前
Ctrl + J
			//合并行
Ctrl + KU
			//改为大写
Ctrl + KL	
			//改为小写
Ctrl + D
			//选词
Ctrl + M	
			//光标移动至括号开始或结束的地方
Ctrl + Shift + M
			//选择括号内的内容
Alt + .		
			//闭合当前标签
Ctrl + Shift + [
			//折叠代码
Ctrl + Shift + ]
			//展开代码
Ctrl + KT
			//折叠属性
Ctrl + K0
			//展开所有
Ctrl + T	
			//换位置
Ctrl + Shift + UP
			//与上一行互换
Ctrl + Shift + DOWN

			//与下一行互换
Ctrl + Enter
			//差入行后
Ctrl + Shift + Enter
			//差入前行
F9
		//行排序
		
		

快捷键位置：Preferences菜单下面的Key Bindings - Default

plugin:


import urllib.request,os,hashlib; h = 'eb2297e1a458f27d836c04bb0cbaf282' + 'd0e7a3098092775ccb37ca9d6b2e4b7d'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

Emmet插件可以说是使用Sublime Text进行前端开发必不可少的插件
JsFormat插件这是一款将JS格式化的插件,按快捷键 Ctrl+Alt+F 即可格式化当前的 js 文件。
SideBarEnhancements是一款很实用的右键菜单增强插件
TrailingSpaces这款插件能高亮显示多余的空格和Tab
Tag插件这是HTML/XML标签缩进、补全、排版和校验工具
Terminal插件可以允许在Sublime Text 3中打开cmd命令窗口				//即可使用快捷键Ctrl+Shift+T呼出命令行窗口
SublimeCodeIntel插件				这是一款代码提示插件，支持多种编程语言
CssComb是为CSS属性进行排序和格式化插件				它依赖于Node.js [官网]
git 集成了git的所有命令




Ctrl+Shift+P：打开命令面板
Ctrl+P：搜索项目中的文件
Ctrl+G：跳转到第几行
Ctrl+W：关闭当前打开文件
Ctrl+Shift+W：关闭所有打开文件
Ctrl+Shift+V：粘贴并格式化
Ctrl+Shift+L：选择多行
Ctrl+Shift+Enter：在当前行前插入新行
Ctrl+M：跳转到对应括号
Ctrl+U：软撤销，撤销光标位置
Ctrl+J：选择标签内容
Ctrl+Shift+F：查找并替换
Ctrl+R：前往 method
Ctrl+N：新建窗口
Ctrl+K+B：开关侧栏
Ctrl+Shift+M：选中当前括号内容，重复可选着括号本身
Ctrl+F2：设置/删除标记
Ctrl+/：注释当前行
Ctrl+Shift+/：当前位置插入注释
Ctrl+Alt+/：块注释，并Focus到首行，写注释说明用的
Ctrl+Shift+A：选择当前标签前后，修改标签用的
Shift+F11：全屏免打扰模式，只编辑当前文件
Alt+F3：选择所有相同的词
Alt+.：闭合标签
Alt+Shift+数字：分屏显示
Alt+数字：切换打开第N个文件
Shift+右键拖动：光标多不，用来更改或插入列内容
鼠标的前进后退键可切换Tab文件
按Ctrl，依次点击或选取，可需要编辑的多个位置




html:5 或者 ! 生成 HTML5 结构
html:xt 生成 HTML4 过渡型
html:4s 生成 HTML4 严格型