Lesson 1

****
一、JSP概述
	1、JSP:Java Server Pages(运行在服务器端的页面)。就是Servlet。
	学习JSP学好的关键：时刻联想到Servlet即可。
	2、JSP的原理
		JSP会被Tomcat翻译成一个Servlet。该Servlet在Tomcat\work\catalina\locahot\day09\....
	3、JSP、Servlet开发的最佳实践：
		Servlet：一般作为控制组件，处理业务逻辑
		JSP：一般作为显示组件，显示数据
		
二、JSP的语法
	1、JSP的模板元素：(先写HTML)
			就是JSP中的那些HTML标记
			作用：页面布局和美化
	2、JSP的Java脚本表达式：
			作用：输出数据到页面上
			语法：<%=表达式%>(实际上就是调用输出流打印到页面上)
	3、JSP中的Java脚本片段：(实际开发中，应做到JSP中不能出现一行Java脚本片段)
			作用：书写Java代码逻辑
			语法：<%
					语句1;
					语句2;
				  %>
			原理：其中的语句会原封不动的被服务器翻译到对应的Servlet的service方法中。
	4、JSP的声明：（了解其原理）
			作用：定义类的成员
			语法：<%!
					你的Java代码
					%>
	5、JSP的注释：
			作用：注释Java脚本代码
			语法：<%--这是注释--%>
			
三、JSP的指令:给JSP引擎用的（服务器用的）
		基本的语法格式：<%@ 指令名称 属性1="值1" 属性2="值2" ....%>
		作用：告诉服务器，该如何处理JSP中除了指令之外的内容的。
		
	3.1page
		作用：定义JSP页面的各种属性
		属性：
			language:指示JSP页面中使用脚本语言。默认值java，目前只支持java。
			extends：指示JSP对应的Servlet类的父类。不要修改。
			*import：导入JSP中的Java脚本使用到的类或包。（如同Java中的import语句）
						JSP引擎自动导入以下包中的类：
								javax.servlet.*
								javax.servlet.http.*
								javax.servlet.jsp.*
					注意：一个import属性可以导入多个包，用逗号分隔。
			*sessioin:指示JSP页面是否创建HttpSession对象。默认值是true，创建
			*buffer：指示JSP用的输出流的缓存大小.默认值是8Kb。
			autoFlush：自动刷新输出流的缓存。
			isThreadSafe：指示页面是否是线程安全的（过时的）。默认是true。
					true：不安全的。
					false：安全的。指示JSP对应的Servlet实现SingleThreadModel接口。
			*errorPage:指示当前页面出错后转向（转发）的页面。
						目标页面如果以"/"（当前应用）就是绝对路径。
						
						配置全局错误提示页面：
							web.xml
							 <error-page>
								<exception-type>java.lang.Exception</exception-type>
								<location>/error.jsp</location>
							 </error-page>
							  <error-page>
								<error-code>404</error-code>
								<location>/404.jsp</location>
							  </error-page>
			*isErrorPage:指示当前页面是否产生Exception对象。
			*contentType：指定当前页面的MIME类型。作用与Servlet中的response.setContentType()作用完全一致
			*pageEncoding：通知引擎读取JSP时采用的编码（因为要翻译）
					还有contentType属性的作用。
			*isELIgnored:是否忽略EL表达式。${1+1}。默认值是false。
			
		page指令最简单的使用方式：<%@ page pageEncoding="UTF-8"%>
	3.2include（静态包含,开发中能用静的不用动的）
		作用：包含其他的组件。
		语法：<%@include file=""%>file指定要包含的目标组件。路径如果以"/"（当前应用）就是绝对路径。
		原理：把目标组件的内容加到源组件中，输出结果。
		
		动态包含：
			采用动作元素：<jsp:include page=""/>路径如果以"/"（当前应用）就是绝对路径。
			
		
	3.3taglib
		作用：引入外部的标签
		语法：<%@taglib uri="标签名称空间" prefix="前缀"%>
			<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
			
四、JSP的内置对象（9个JSP内置对象）
	JSP的内置对象引用名称			对应的类型
	
	request							HttpServletRequest
	response						HttpServletResponse
	session							HttpSession(有开关的：page指令的session属性的取值)
	application						ServletContext
	config							ServletConfig
	page							this(当前Servlet对象)
	exception						java.lang.Throwable（有开关的：page指令的isErrorPage属性改为true）
	
	out								JspWriter
	pageContext						javax.servlet.jsp.PageContext非常重要
			有三大作用：
					1、本身是一个域对象。同时还能操作其他三个域对象（PageContext ServletRequest HttpSession  ServletContext）
							本身表示的域范围是本页面。
									void setAttribute(String name,Object value)
									void removeAttribute(String name)
									Object getAttribute(String name)
							操作其他的三个域对象
									void setAttribute(String name,Object value,int scope)
									void removeAttribute(String name,int scope)
									Object getAttribute(String name,int scope)
									
									参数int scope是由PageContext类提供的静态变量规定的。
												PageContext.PAGE_SCOPE:页面范围（是PageContext本身中的那个Map，代号page）
												PageContext.REQUEST_SCOPE:请求范围（是ServletRequest中的那个Map，代号request）
												PageContext.SESSION_SCOPE:请求范围（是HttpSession中的那个Map，代号session）
												PageContext.APPLICATION_SCOPE:请求范围（是ServletContext中的那个Map，代号application）
												
												
							（非常有用）Object findAttribute(String name):依次按照page request session application范围搜索指定名称的对象，找到为止。
							
					2、获取其他8个隐式对象
					3、提供了转发和包含的方便方法
						RequestDispatcher rd = request.getRequestDispatcher("/url");
						rd.forward(request,response);
						
						pageContext.forward("url");
						pageContext.include("url");
						
*****五、四大域对象(两个资源之间互传数据)
	JSP中隐式对象的名称				范围名称			具体的类型
	pageContext						page				javax.servlet.jsp.PageContext
	request							request				javax.servlet.ServletRequest  （显示完数据就没有用了）
	session							session				javax.servlet.http.HttpSession (显示完数据了，过一会自己还要用)
	application						application			javax.servlet.ServletContext (显示完数据了，大家都要用。不建议使用，如果使用，必须同步处理)
六、JSP常用的动作元素
	<jsp:include/>
	<jsp:forward/>
	<jsp:param/>:在包含和转发时，利用该标签传递请求参数
六、如何调试JSP出现的错误

Lesson 2

*****一、JavaBean的概念
	1、JavaBean就是一个遵循特殊写法的普通类
	2、特殊写法
		a、必须有默认的构造方法
		b、所有字段定位私有的   
		c、提供公有的getter或setter方法，属性
		d、一般实现java.io.Serializable
		
	3、一定要符合Java的命名规范。
	
	***4、应用场景：
		在企业级开发中，JavaBean是用来传递数据的。
		
*****二、JavaWeb的开发模型
		模型一：了解
			JSP+JavaBean
		
		模型二：开发实际应用
							程序中
			M：厨师			JavaBean：模型
			V：上的菜		JSP：显示页面
			C：服务台		Servlet：控制器
			
			MVC+三层架构
			
			
***三、JSP中操作JavaBean的动作元素
	jsp:useBean
		作用：用于在指定域范围内查找指定名称的JavaBean对象，找到了就直接使用；没有找到，创建一个，并放到指定的域范围内。
		属性：
			id：必须的。JavaBean的名称
			class:JavaBean的完整类名
			scope：域范围。默认是page范围。可选值：page request session application
			
		注意：如果该标签有主体内容，只在创建新对象时才会执行。
	jsp:setProperty（必须先使用useBean）
		作用：调用JavaBean的setter方法。还能自动类型转换，仅限基本类型
		属性：
			property：必须的。属性名称。比如setName,名称是name。
				可以使用通配符*。使用前提是请求参数的名称与属性的名称完全一致。
			name：必须的。哪个对象的？即jsp:useBean中的id的取值。
			value：属性的取值。支持直接量；支持表达式（<%=表达式%>）。
			param:请求参数名
	jsp:getProperty
		作用：调用JavaBean的getter方法。
			property：必须的。属性的名称。比如getName,名称是name。
			name:必须的。哪个对象的？即jsp:useBean中的id的取值。
			
*****开发原则：JSP页面中不能出现一行Java脚本<%%>和Java表达式<%=%>
			Java脚本：替代方案，自定义标签。
			Java表达式：替代方案，EL表达式。   Struts2框架:OGNL表达式。
				
*****四、EL表达式
	它只是JSP中的表达式，不是一种开发语言。
	基本语法：${EL表达式}
	4.1获取数据
		*****EL表达式只能获取四大域中的数据。
		EL表达式获取的对象如果是null，页面不会显示数据。因此，EL表达式中永远不会出现空指针异常
		p.name:调用域中名称为p对象的getName方法，点运算符是用于获取属性的取值的。
		
		
			.运算符：
			[]运算符：.运算符能做的，[]也能做。[]能做的，.不一定能做。
				比如${p.name}===${p['name']}==${p["name"]}
				
				优秀在可以取不符合Java命名规范的东东。
		
	4.2数学逻辑运算:
		empty运算符：如果判断的对象是null或者空字符串，都返回true。对于集合，即使集合对象本身不是null，没有任何元素，也返回true。
		
		EL表达式不支持字符串连接操作。
		
	4.3获取JSP的内置对象（11大EL内置对象）：难点，不要与JSP的内置对象和范围名称搞混
		11大EL隐式对象中，其中一个是表示自身对象外，其余都是表示的Map结构
		
		EL隐式对象名称			Java类型									备注
		pageContext				javax.servlet.jsp.PageContext				与JSP中的内置对象完全相同
		
		剩余的都是代表的Map集合
		pageScope				java.util.Map								代表着PageContext页面范围域那个Map
		requestScope			java.util.Map								代表着ServletRequest请求范围域那个Map
		sessionScope			java.util.Map								代表着HttpSession会话范围域那个Map
		applicationScope		java.util.Map								代表着ServletContext应用范围域那个Map
		
		param					java.util.Map								代表着请求参数。key：请求参数的名称。value：请求参数的值，它是一个字符串。
		paramValues				java.util.Map								代表着请求参数。key：请求参数的名称。value：请求参数的值，它是一个字符串数组。
		
		header					java.util.Map								代表着请求消息头。key：头名称。value：头值，它是一个字符串。
		headerValues			java.util.Map								代表着请求消息头。key：头名称。value：头值，它是一个字符串数组。
		
		cookie					java.util.Map								代表客户端提交的Cookie的Map。key：cookie的name。value：cookie对象本身
		initParam				java.util.Map								代表着全局初始化参数（web.xml中context-param）.key：参数名称。value：参数值
		
		
	4.4调用普通类的静态方法（EL函数）
		编写步骤（自定义EL函数的编写步骤即自定义标签的编写步骤）：
			a、编写一个普通的java类，提供一个静态方法
			public class FunctionDemo {
				public static String toUpperCase(String str){
					return str.toUpperCase();
				}
			}
			b、在JavaWeb应用的WEB-INF目录下建立一个扩展名是tld(taglib definition)的XML文件（参考Tomcat中的示例）。内容如下：
			<?xml version="1.0" encoding="UTF-8"?>
			<taglib xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
				version="2.0">
				<tlib-version>1.0</tlib-version>
				<short-name>myfn</short-name>
				<uri>http://www.itcast.cn/myfn</uri>
				<function><!-- 定义函数 -->
					<name>toUppercase</name>
					<function-class>cn.itcast.el.FunctionDemo</function-class>
					<function-signature>java.lang.String toUpperCase( java.lang.String )</function-signature>
				</function>
			</taglib>
			c、（可选步骤）前提是把tld文件放到了WEB-INF目录下。
			告知应用，tld文件和tld中的uri的对应。修改web.xml，增加以下内容：
			<jsp-config>
				<taglib>
					<taglib-uri>http://www.itcast.cn/myfn</taglib-uri>
					<taglib-location>/WEB-INF/myfn.tld</taglib-location>
				</taglib>
			  </jsp-config>
			d、在JSP中使用
				用taglib指令，引入自定义的EL函数库
				<%@ taglib uri="http://www.itcast.cn/myfn" prefix="myfn"%>
				 ${myfn:toUppercase(p)}
			
**五、SUN提供的标准EL函数库
	JSTL标准标签：（Jsp Standard Tag Libary）
		***Core:核心
		**Fmt：国际化
		SQL：数据库操作
		XML：xml操作
		**fn：EL函数库
		
		导入JSTL的jar包。standard.jar jstl.jar
		
		
*****六、JSTL中的核心标签库(替换掉JSP中的Java脚本)
	c:if
		作用：判断是否为true，如果为true，那么标签的主体内容就会显示。
		属性：
			test：必须的。要求必须是boolean的。支持表达式（EL或Java表达式）
			var：保存test运算结果的变量
			scope: 保存的域范围。默认是page
			
	c:forEach
		遍历：数组、List、Set、Map
		属性：
			items：要遍历的目标对象。支持表达式
			var：变量名。指向当前遍历的集合中的一个元素
			begin：开始的索引（含）
			end：结束的索引（含）
			step：步长。默认是1
			varStatus：取一个名字，引用了一个对象。
				该对象有以下方法：
					int getIndex():当前记录的索引号。从0开始
					int getCount():当前记录的顺序。从1开始
					boolean isFirst():是否是第一条记录
					boolean isLast():是否是最后一条记录
			
			