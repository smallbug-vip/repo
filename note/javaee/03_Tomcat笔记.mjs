二、Web开发的基本概念
	服务器上的WEB资源：
	静态资源：基本不变的。比如html、css、js
	动态资源：根据不同环境而不同，动的。动态资源生成静态资源。比如：JSP、ASP

三、Web开发需要的服务器
	JavaEE:是13种技术的总称。Servlet/JSP属于JavaEE技术的一种
	常用的服务器：
	WebLogic:支持JavaEE规范。称之为JavaEE容器：即实现了什么规范的服务器就叫做什么容器。属于重量级服务器。
	WebSphereAS（Application Server）：支持JavaEE规范
	JbossAS：支持JavaEE规范。免费
	Tomcat：支持Servlet/JSP规范。轻量级服务器。

	Java相关规范（接口和抽象类）都是SUN制定


四、Tomcat的安装与启动遇到的问题(目标：TOmcat能启动)
	1、注意：不要把Tocmat装到有中文或空格的目录中。
	2、验证Tomcat是否成功
		a、进入Tomcat\bin，执行startup.bat
		b、启动过程中没有出错。最好还要打开浏览器：http://localhost:8080看到猫说明OK
		
	3、启动Tomcat遇到的问题：
		***a、无法启动：配置系统环境变量JAVA_HOME=你的JDK的安装目录
		
		Tips:
			HTTP协议规定，Web应用的默认端口是80
			把Tomcat使用的默认端口8080改为Web应用的默认端口80？
			
			在Tomcat\conf目录中有一个server.xml
			找到8080改为80，就可以使用默认端口了。
	4、Catalina_home=Tomcat的安装目录（不建议使用）



		java文件：javac -d . xx.java	


五、Tomcat的目录结构（服务器厂商自定义的）
	CATALINA_HOME：
		*bin:运行Tomcat的相关命令
		*conf：Tomcat的配置信息所在
		*lib：Tomcat运行需要的jar包
		*logs:TOmcat的运行日志
		temp：存放临时文件的
		*webapps:Web应用的存放目录。该目录中的每个目录都代表一个应用。
		work：Tomcat的工作目录
	
*****六、JavaWeb应用的目录结构（SUN制定的，有严格要求）必须记住
		MyApp:(目录，应用的名称)
			1.html
			css
				a.css
			WEB-INF:此目录必须有，且大小必须完全一致。该目录中的资源，用户无法直接访问到。（非常重要）
				classes:存放Java类的字节码
				lib:存放本应用需要的jar包
				web.xml:本应用的配置文件

***七、如何“部署”自己的应用到Tomcat中
		方式一：把你的应用拷贝到Tomcat\webapps目录下。
			注意：在文件拷贝完后，要重启Tomcat
		方式二：把自己的应用打包成war包，再拷贝到Tomcat\webapps目录下
			进入你的应用目录
			执行：jar -cvf MyApp.war .
	
八、Tomcat组成部分详解：
	虚拟目录：
		方式一：（不建议使用，原因就是需要重新启动）
			1、修改Tomcat\conf\server.xml，找到<Host name="localhost"/>元素
			2、在其中增加一个子元素，内容如下：
				<Context path="/haha" docBase="E:\MyApp"/>
				path:虚拟目录的名称。给用户来访问的
				docBase:实际应用的存放目录
			3、重新启动Tomcat
			4、访问资源：http://localhost:8080/haha/1.html就是访问E盘下MyApp目录中的1.html
		**方式二：
			在Tomcat\conf\[enginename]\[hostname]目录下建立一个特殊的文件，文件扩展名为xml；
			文件的主文件名就是映射的虚拟路径（即<Context path="/haha" docBase="E:\MyApp"/>中的path）
			增加以下内容：
			<?xml version="1.0"?>
			<Context docBase="E:\MyApp"/>