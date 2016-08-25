Lesson01   XML

XML的学习目标：
能用XML描述现实中的有层次关系的数据
能使用程序读取到XML中表示的数据（解析Parser）

一、XML是什么？作用是什么？
	1、XML是指可扩展标记语言（eXtensible Markup Language），用户自定义的标签.相对于HTML来讲的。
	2、XML被设计的宗旨是表示数据。HTML是用来显示数据的。目前经常使用的XML版本是1.0
	3、XML除了表示数据外。在实际的企业开发中，主要用XML作为程序的配置文件。

二、XML的基本语法
	1、文档声明：
		作用：用于标识该文档是一个XML文档。
		注意事项：声明必须出现在文档的第一行（之前连空行都不能有，也不能有任何的注释）

		最简单的XML声明：<?xml version="1.0"?>
		声明中的encoding属性：说明解析当前XML文档时所使用的编码。默认是UTF-8
		声明中的standalone属性：说明XML文档是否是独立的。（了解）


	2、元素
		结束标签不能省略
		一个XML文档必须且只能有一个根标签
		XML文档中不会忽略回车和换行及空格
		标签的命名规范：元素(标签)的名称可以包含字母、数字、减号、下划线和英文句点。严格区分大小写。

	3、元素的属性
		的属性取值一定要用引号引起来（单引号或双引号）

	4、注释
		与HTML中的注释完全一致：<!--这是注释-->
		注释不能嵌套
	5、CDATA区
		CDATA是Character Data的缩写。
		作用：CDATA区中的东东都是文本。
		语法：
			<![CDATA[
			
					文本内容
					
					]]>
	6、特殊字符
		空格    &nbsp;
		&		&amp;
		<		&lt;   (less than)
		>		&gt;	(great than)
		"		&quot;
		'		&apos;
		
	7、处理指令(PI:Processing Instruction)
		处理指令，简称PI(Processing Instruction)。
		作用：用来指挥软件如何解析XML文档。
		语法：必须以“<?”作为开头，以“?>”作为结尾。
			例：<?xml-stylesheet type="text/css" href="s.css"?>
			
三、XML的约束
	1、格式良好的XML文档：符合XML语法的。
	2、有效的XML文档：遵循约束规范的。
		格式良好的不一定是有效的，但有效的必定格式良好。

四、DTD的基本语法（看懂即可）
	1、DTD：Document Type Definition
	2、作用：约束XML的书写规范。
	3、DTD文件保存到磁盘时，必须使用UTF-8编码

	4、如何引入外部的DTD文档来约束当前的XML文档
		DTD文件在本地：<!DOCTYPE 根元素名称 SYSTEM "DTD文件的路径">
		DTD文件在网络上：<!DOCTYPE 根元素名称 PUBLIC "DTD名称" "DTD的路径URL">

	5、DTD的语法细节
		5.1定义元素
			语法：<!ELEMENT 元素名称 使用规则>
			使用规则：
				(#PCDATA):指示元素的主体内容只能是普通的文本.(Parsed Character Data)
				EMPTY:指示元素的不能有主体内容。
				ANY:用于指示元素的主体内容为任意类型
				(子元素)：指示元素中包含的子元素
						如果子元素用逗号分开，说明必须按照声明顺序去编写XML文档
						如果子元素用“|”分开，说明任选其一。
						用+、*、？来表示元素出现的次数
		5.2定义元素的属性(attribute)
			语法：<!ATTLIST 哪个元素的属性
							属性名1 属性值类型 设置说明
							属性名2 属性值类型 设置说明>
				属性值类型：
					CDATA：说明该属性的取值为一个普通文本
					ENUMERATED (DTD没有此关键字)：
						语法：<!ATTLIST 元素名称 (值1|值2) "值1">
					ID:属性的取值不能重复
				设置说明：
					#REQUIRED：表示该属性必须出现
					#IMPLIED：属性可有可无
					#FIXED:表示属性的取值为一个固定值 语法：#FIXED "固定值"
					直接值：表示属性的取值为该默认值
					
					
					<!ELEMENT TVSCHEDULE (CHANNEL+)>
					<!ELEMENT CHANNEL (BANNER,DAY+)>
					<!ELEMENT BANNER (#PCDATA)>
					<!ELEMENT DAY (DATE,(HOLIDAY|PROGRAMSLOT+)+)>
					<!ELEMENT HOLIDAY (#PCDATA)>
					<!ELEMENT DATE (#PCDATA)>
					<!ELEMENT PROGRAMSLOT (TIME,TITLE,DESCRIPTION?)>
					<!ELEMENT TIME (#PCDATA)>
					<!ELEMENT TITLE (#PCDATA)> 
					<!ELEMENT DESCRIPTION (#PCDATA)>
					<!ATTLIST TVSCHEDULE NAME CDATA #REQUIRED>
					<!ATTLIST CHANNEL CHAN CDATA #REQUIRED>
					<!ATTLIST PROGRAMSLOT VTR CDATA #IMPLIED>
					<!ATTLIST TITLE RATING CDATA #IMPLIED>
					<!ATTLIST TITLE LANGUAGE CDATA #IMPLIED>
					
					<?xml version="1.0" encoding="GBK"?>
					<!DOCTYPE TVSCHEDULE SYSTEM "instance1.dtd">
					<TVSCHEDULE NAME="YYTV">
						<CHANNEL CHAN="YY">
							<BANNER>AAA</BANNER>
							<DAY>
								<DATE>2013-04-13</DATE>
								<PROGRAMSLOT>
									<TIME>14:57</TIME>
									<TITLE LANGUAGE="ZH">TT</TITLE>
									<DESCRIPTION>DD</DESCRIPTION>
								</PROGRAMSLOT>
							</DAY>
						</CHANNEL>
					</TVSCHEDULE>
	
	
	
		5.2定义实体
			关键字ENTITY
			实体的定义分为引用实体和参数实体
			引用实体：
				作用：在DTD中定义，在XML中使用
				语法：<!ENTITY 实体名称 "实体内容">
				在XML中使用：&实体名称;
			参数实体：
				作用：在DTD中定义，在DTD中使用
				语法：<!ENTITY % 实体名称 "实体内容">
				在DTD中使用：%实体名称;
五、XML解析方式概述
	1、常用XML的解析方式：DOM和SAX
		DOM:Document Object Model是W3C推荐使用的解析方式
		SAX:Simple API for XML。非官方标准。
	2、常用解析开发包：
		JAXP:SUN推出的实现，能进行DOM和SAX方式解析
		Dom4J
		JDom等

六、JAXP进行DOM解析
	JAXP的API都在JavaSE中。
	org.w3c.dom:提供DOM方式解析XML的标准接口
	org.xml.sax:提供SAX方式解析XML的标准接口
	javax.xml:提供了解析XML文档的类

Lesson02

一、JAXP进行DOM解析的案例
二、JAXP进行SAX解析
	SAX解析原理：
	通过读取器读取XML文档，当读到了文档的某一部分时（文档的开始，元素的开始、文本、元素的结束、文档的结束），
	都会调用事件处理器的对应方法，读到的数据，以参数的形式传递给对应的方法。
八、Schema约束(看懂即可)
	1、Schema约束文档本身就是一个XML文档，扩展名为xsd
	2、重点：根据Schema写出XML文档
		难点：XML文档的根元素怎么写？

	a、首先看Schema文档，找到根元素
		<?xml version="1.0" encoding="UTF-8"?>
		<书架></书架>
	b、思考：书架来自于哪个名称空间？看Schema文档，targetNamespace就是名称空间。
		用xmlns关键字(xmlns名称空间声明)来声明我的元素来自哪个名称空间（xmlns：xml namespace）

		<?xml version="1.0" encoding="UTF-8"?>
		<itcast:书架 xmlns:itcast="http://www.itcast.cn"></itcast:书架>

	c、思考：名称空间与哪个xsd文件对应呢？使用schemaLocation关键字来关联名称空间和xsd的对应关系

		<?xml version="1.0" encoding="UTF-8"?>
		<itcast:书架 xmlns:itcast="http://www.itcast.cn" 
					schemaLocation="http://www.itcast.cn book.xsd"></itcast:书架>

	d、schemaLocation来自哪里？来自一个标准的名称空间（http://www.w3.org/2001/XMLSchema-instance）
		<?xml version="1.0" encoding="UTF-8"?>
		<itcast:书架 xmlns:itcast="http://www.itcast.cn" 
					xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
					xsi:schemaLocation="http://www.itcast.cn book.xsd"></itcast:书架>