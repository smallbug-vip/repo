一、Servlet概述
		1、Servlet是SUN公司制定的一套开发动态网页的技术。
		2、JavaEE相关的类，包名一般都是以javax开头
		
*****二、编写第一个Servlet案例应用
		1、建立一个标准的JavaWeb应用目录
			FirstApp:
				WEB-INF:
					classes：
					lib:
					web.xml
		2、进入classes目录，建立一个文本文件（所有的Servlet类都必须间接或直接实现javax.servlet.Servlet接口）
			package cn.itcast.servlet;

			import java.io.*;
			import javax.servlet.*;

			public class FirstServlet extends GenericServlet{
				public void service(ServletRequest req,
										 ServletResponse res)
								  throws ServletException,
										 java.io.IOException{
					OutputStream out = res.getOutputStream();
					out.write("Hello Servlet".getBytes());
					out.close();
										 
				}

			}
		3、进入classes目录，对FirstServlet进行编译：
			前提：把servlet-api.jar加入到你的构建路径中.set classpath=%classpath%;C:\apache-tomcat-6.0.35\lib\servlet-api.jar
			执行：javac -d . FirsetServlet.java
		4、修改web.xml，对FirsetServlet进行url地址映射，配置如下：
			<?xml version="1.0" encoding="ISO-8859-1"?>
			<web-app xmlns="http://java.sun.com/xml/ns/javaee"
			   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			   xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
			   version="2.5"> 
				<servlet>
					<servlet-name>FirstServlet</servlet-name>
					<servlet-class>cn.itcast.servlet.FirstServlet</servlet-class>
						  
				</servlet>
				<servlet-mapping>
					<servlet-name>FirstServlet</servlet-name>
					<url-pattern>/hello</url-pattern>
				</servlet-mapping>
			</web-app>
		5、把你的应用部署到Tomcat中。
		6、访问地址：http://localhost:8080/FirstApp/hello就可以看到写的Servlet类的输出结果了。
		
*****三、Servlet的生命周期
			容器最终要调用service方法为客户进行服务
			1、Servlet接口中的常用方法：
					public void init(ServletConfig config)：初始化。Servlet类被实例化后就执行，且执行一次。由容器进行调用
					public void destroy()：销毁Servlet对象。由容器进行调用
			在内存中一个Servlet只有一个实例。针对不同的用户请求，容器采用多线程的机制调用service方法的。
			
			Servlet实例对象和初始化方法，默认情况下，只有第一次访问时才执行，且只执行一次。
			
			希望在应用被Tomcat加载完毕后（此时还没有任何人访问），就实例化并完成初始化Servlet的工作？
			<servlet>tartup>      
			</servlet>
				<servlet-name>FirstServlet</servlet-name>
				<servlet-class>cn.itcast.servlet.FirstServlet</servlet-class>
				<load-on-startup>2</load-on-startup>
			
*****四、Servlet的孩子们（模板方法设计模式）
		如果设计与HTTP协议有关的Servlet，一般选择集成javax.servlet.http.HttpServlet.
		不要覆盖其中的service(ServletRequest req,ServletResponse resp)方法，而应该覆盖掉，doXXX方法。
		doXXX就是根据你的请求方式来的。
		
		
		HttpServlet中的service方法是典型的模板方法设计模式的具体应用。
		
**	五、Servlet配置
		1、一个Servlet可以被映射到多个URL地址上
		2、URL地址映射还支持通配符*
			方式一：以*开头，以扩展名结尾。比如 <url-pattern>*.do</url-pattern>
			方式二：以/前缀开头，以*结尾。 比如<url-pattern>/action/*</url-pattern>
		3、多个Servlet使用通配符时，有可能有多
					以"/"开头（方式二）要比"*"开头（方式一）优先级高
					都以"/"开头，还是有多个匹配，找最匹配的
		4、如果一个Servlet的映射为一个"/",就称之为默认的Servlet，它负责处理没有映射路径的URL请求的响应。
			个配置的Servlet，到底执行哪一个？
			原则：优先级
					绝对匹配
					
Lesson 2


****一、Servlet中的线程安全问题
	在Servlet中定义变量，除非特殊要求，尽量使用局部变量。
	如果有需要实例变量时，应做同步处理，且同步代码块尽量包围少的代码。
	
***二、Servlet的配置对象：
		ServletConfig：（容器来创建）
			作用：代表了Servlet配置中的参数信息。
			比如在web.xml中的参数配置如下：
				<servlet>
					<servlet-name>ServletDemo2</servlet-name>
					<servlet-class>cn.itcast.servlet.ServletDemo2</servlet-class>
					<init-param><!-- aaa=bbb -->
						<param-name>aaa</param-name>
						<param-value>bbb</param-value>
					</init-param>
					<init-param>
						<param-name>xxx</param-name>
						<param-value>yyy</param-value>
					</init-param>
				  </servlet>
*****三、ServletContext详解
	1、在应用被服务器加载时就创建ServletContext对象的实例。每一个JavaWeb应用都有唯一的一个ServletContext对象
	它就代表着当前的应用。
	2、如何得到ServletContext对象：ServletConfig.getServletContext();
	3、有什么用？
		3.1ServletContext对象是一个域对象（域对象就是说其内部维护了一个Map<String,Object>）
			    Object getAttribute(String name):根据名称获取绑定的对象
				Enumeration getAttributeNames() :获取ServletContext域中的所有名称
				void removeAttribute(String name):根据名称移除对象
				void setAttribute(String name,Object value):添加或修改对象。
		3.2实现多个Servlet之间的数据共享
		3.3获取WEB应用的初始化参数（应用的全局参数）
			在web.xml的根元素下配置一下信息：
			<context-param>
				<param-name>encoding</param-name>
				<param-value>UTF-8</param-value>
			</context-param>
			这些参数就属于整个应用的全局参数，使用ServletContext来读取。
		3.4读取资源文件的三种方式：
			利用ServletContext.getRealPath():
					特点：读取应用中任何文件。只能在Web环境下用
			利用ResourceBundle读取配置文件
					特点：可以用在非web环境下。但是只能读取类路径中的properties文件
			利用类加载器读取配置文件（专业）
					特点：可以用在非web环境下。可以读取类路径下的任何文件。
					
			插入：ServletAPI中的主要接口或类的核心类图

			Tips:更改MyEclipse生成的Servlet的模板（8.5）
			1、关闭你的MyEclipse
			2、找到MyEclipse的安装目录C:\Program Files\Genuitec
			3、搜索*wizard*(com.genuitec.eclipse.wizards_8.5.0.me201003052220.jar)
			4、打开，找到templates\Servlet.java,这个文件就是MyEclipse生成Servlet的模板代码
			5、弄出来，做好备份，开始修改。

**四、请求和响应对象概述
			HTTP协议包含请求和响应部分。
			HttpServletRequest就代表着请求部分
			HttpServletResponse就代表着响应部分

			学好的关键：HTTP协议。

*****五、HttpServletResponse详解
	5.1输出中文数据：
		字节流：
			out.write("中文".getBytes("UTF-8"));有乱码
			解决办法：
				方式一：更改浏览器的查看编码（不可取）
				
				通知浏览器，使用的码表
				方式二：response.setHeader("Content-Type", "text/html;charset=UTF-8");
				方式三：response.getOutputStream().write("<meta http-equiv='Content-Type' content='text/html;charset=UTF-8'>".getBytes("UTF-8"));
				*方式四：response.setContentType("text/html;charset=UTF-8");//方式二、三、四都是一样的
				
		字符流：
			Servlet中的字符流默认查ISO-8859-1（SUN的Servlet规范要求的）
			如何更改这个默认的编码呢？response.setCharacterEncoding("UTF-8");
			
			//不要忘记通知浏览器的编码
			response.setCharacterEncoding("UTF-8");
			response.setHeader("Content-Type", "text/html;charset=UTF-8");
			PrintWriter out = response.getWriter();
			out.write(s);//默认查的是ISO-8859-1码表（SUN的Servlet规范要求的）
			
			
			在字符流输出中文数据时：response.setContentType("text/html;charset=UTF-8");
					有两个作用：通知字符流以UTF-8编码输出
								通知客户端以UTF-8解码显示
			
			
	5.2控制不要缓存
	5.3控制缓存时间
	5.4动态生成随机验证码图片
	5.5定时刷新
	5.6文件下载（中文文件名的文件下载）
	5.7HttpServletResponse细节:
		字节流和字符流不能同时使用，互斥的。
		通过字符流或字节流输出的数据并不是直接打给浏览器的。而是把数据写到response对象的缓存中的。服务器从缓存中取出数据，按照HTTP协议的响应格式输出给浏览器。
		如果你调用的response的输出流没有主动关闭，服务器会替你关的。
		
Lesson 3

*****一、HttpServletRequest详解
		代表着客户端的请求。要客户的信息只要找这个对象即可，该对象由容器创建。
		学习关键：时刻记住HTTP协议的请求部分的具体内容。
	
		6.1常用简单方法
		6.2获取请求消息头
		6.3获取请求参数（内省）
		6.4常用表单数据的获取
		表单输入域类型：
			radio checkbox,即使表单中有对应名称输入域，如果一个不选择，则什么数据不会带给服务器。（注意空指针异常）
			如果选择了其中的一个或多个，则把他们的value的取值提交给服务器。
			如果选择了其中的一个或多个，他们又没有value取值，则提交给服务器的值是on.
		请求参数的编码：
			浏览器当前使用什么编码，就以什么编码提交请求参数。<meta http-equiv="content-type" content="text/html; charset=UTF-8">
			
			request.setCharacterEncoding(编码):通知程序，客户端提交的数据使用的编码。但是只对POST请求方式有效
			
			如果是get请求提交数据，编码就是ISO-8859-1
			
		Tips：目前采用POST提交方式。
		
	6.5域对象：
		ServletRequest也是一个域对象（内部维护了一个Map<String,Object>）
			Object getAttribute(Stirng name):
			void setAttribute(String name,Object value):
			void removeAttribute(String name):
		
	6.6请求转发和重定向
		请求转发借助于RequestDispatcher
		如何得到RequestDispatcher对象：
			方式一：ServletContext.getRequestDispatcher(目标资源的URI);
			方式二：ServletRequest.getRequestDispatcher(目标资源的URI);
			区别：
				方式一中的目标资源的URI必须以"/"开头，否则报错，此"/"就表示的是当前应用（绝对路径表示法）
				方式二中的目标资源的URI如果以"/"开头，就表示的是当前应用（绝对路径表示法）。如果不以"/"开头，就表示相对路径。
				
		
	（了解原则）6.7转发和重定向细节（实际开发中知道一个原则）
		1、请求转发：1、由源组件转发到目标组件时，容器会清空源组件输出的数据。因此，用户只会看到目标组件输出的页面结果。
						但是，响应头信息是不清空的。（forward）消源文件体
					 2、由源组件转发到目标组件时，容器会清空源组件输出头的数据。因此，用户会看到源组件和目标组件输出的页面结果。
						但是，响应头信息是清空的。（include）消源文件头
		编码原则：不要在转发前后向页面输出数据，也不要关闭输出流。（做无用功）
	（了解原则）6.8包含：（动态包含）
		由源组件包含到目标组件时，容器会清空目标组件的头。因此，源组件设置的头才有效。
					但是，响应体信息是不清空的。
		编码原则：不要在目标组件中设置响应头。（做无用功）
*****二、会话概述
	1、会话过程就好比打电话。
	2、学习会话要解决的问题是什么？
		会话过程中的数据保存。
	
	三、Cookie和HttpSession简介
		Cookie是客户端技术
		HttpSession是服务器端技术
		
	四、Cookie详细介绍
		javax.servlet.http.Cookie
		1、Cookie是什么？
			一个小信息，由服务器写给浏览器的。由浏览器来保存。
			客户端保存的Cookie信息，可以再次带给服务器。
		2、Cookie的属性：
			name：必须的
			value:必须的
			comment:可选的。注释
			path：可选的。
					写Cookie的程序的访问路径是：http://localhost:8080/day07/servlet/CookieDemo1
							其中：localhost就是域名；/day07/servlet就是当前Cookie的path
							
							
					访问的地址的URI.startWith(cookie的路径),为true就带
					
					比如IE存的cookie的路径是/day07
					现在访问的地址是：http://localhost:8080/day07/servlet/CookieDemo1  带
					现在访问的地址是：http://localhost:8080/day07/CookieDemo1          带
					
					比如IE存的cookie的路径是/day07/servlet/
					现在访问的地址是：http://localhost:8080/day07/servlet/CookieDemo1  带
					现在访问的地址是：http://localhost:8080/day07/CookieDemo1          不带
					
					如果一个Cookie的路径设置成了/day07，意味着什么？当前应用下的所有资源浏览器都会带着它给服务器。
					
			domain：可选的。该Cookie所属的网站域名。（itcast.cn）默认值。
			maximum age：可选的。不设置就是会话过程（存在浏览器的内存中）。单位是秒
							如果是0，说明要删除。
			version：可选的。
			
		3、如何向客户端写Cookie：HttpServletResponse.addCookie(javax.servlet.http.Cookie)（就是写了一个响应消息头：Set-Cookie:cookie的信息）
			特点：一个浏览器针对一个网站最多存20个Cookie；最多存300个Cookie，每个Cookie的长度不能超过4KB。（稀缺）
		
		4、服务器如何得到客户端传来的Cookie。HttpServletRequest.getCookies()
		5、如何区分Cookie：通过名称不行。
			domain+path+name来区分的。
			localhost/day07/servlet/lastAccessTime
	五、Cookie案例：
		5.1记住用户最后一次的访问时间
		
		5.2记住用户登录时的用户名
		5.3电商网站：记住用户商品的历史浏览记录
		
		
	六、各种URL地址的写法
		相对路径
		绝对路径：（建议的）
		绝对路径怎么写？什么时候需要加上应用名称"/day07"?
		原则：地址是不是给服务器用的，如果是,"/"就代表着当前应用。如果是给客户端用的绝对路径要加上应用名称。
		
		
		<link href=path/>                                要加/day07
		<script src=path/>								要加/day07
		<img src=path/>									要加/day07
		<a href=path/>									要加/day07
		RequestDispatcher.include(path)					不要加，"/"就代表着当前应用
		RequestDispatcher.forward(path)					不要加，"/"就代表着当前应用
		HttpServletResponse.sendRedirect(path)			要加/day07
		ServletContext.getRealPath(path)				不要加，"/"就代表着当前应用




		常见的作用域对象有： request,session,servletcontext,pageContext,
		作用域对象的目的是在不同的servlet 和 jsp之间传送数据。
		作用域对象的主要作用是当做容器存放任何东西。
		作用域的主要方法是存取容器里的数据。即
		存：setAttribute(键,值)
		取：getAttribute(键)
		 request作用域对象：
		   作用范围：当服务器接到请求创建一个request对象  到响应结束时消亡
		   request的存取：存 request.setAttiribute("key","aaaaa");
		   request的存都是以键值对的方式来存储,这里的 "key" 表示他的键，可以是任意字符串。"aaaaaa"  表示的他的值，可以是字符串也可以是任意的对象。
		  取：request.getAttirbute("key");
		   表示利用他的键来取得他的值。
		 session作用域对象：
			   作用：在一次客户端会话期间，在服务器上保存客户端相关状态信息地.
				创建和消亡 session 对象
				当我们执行到 request.getSession()时就创建一个sesssion对象,当出现超时就会消亡session对象,每个sesssion对象都会有一个唯一的ID，永远不重复的字符串。
				 session的存取的request是一样的，都是用键值对的方式来存，利用键来取值，
			 如： HttpSession session = request.getSession();---->获得session对象
				 session.getSession(键，值)------>存        
				 session.getSession(键),-------->取
		 设置他的超时：可以在web.xml里设置，也可以调用他的方法，
			在web.xml里设置超时:  
				<session-config>
					   <session-timeout> 超时的时间</session-timeout> 
				</session-config>
		调用他的方法：session.invalidate();
		
Lesson    4

*****一、Cookie的案例：记录用户最近商品的访问记录
*****二、HttpSession概述及原理探讨
	得到HttpSession对象：
		HttpServletRequest.getSession():根据特殊Cookie（JSESSIONID=HttpSession对象的id,由服务器生成，唯一的）的取值，在服务器的内存中根据id查找
										这个HttpSession对象，找到了，取出来继续服务；没有找到，创建一个新的HttpSession对象。
		HttpServletRequest.getSession(boolean b):如果b为true，与上面方法功能完全一致。如果为false，只查询。
		
*****三、HttpSession案例：
	*****完成用户的一次性登录（随机验证码验证）
	*****简单购物原理案例
	*****防止表单的重复提交（Base64编码）
		Base64编码原理：把3个字节转换为4个字节
							1010 1100    0101 1111     1010 0101
			转成4个字节   0010 1011    0000    0101   0011 1110   0010 0101
					转成4个字节后，每一个字节表示的最大和最小数：00111111 ~  00000000
																	63~0共64个整数，所以称之为Base64，它其实是一个码表，每个数字对应一个可见字符
			
		java.util.UUID:通用的唯一标识符
		
*****四、客户端禁用Cookie后的会话数据保存问题
		客户端禁用Cookie对http://localhost访问的无效
		
		url---->url;JSESSIONID=123:URL重写.必须对网站中的所有URL地址都重写。
		HttpServletResponse.encodeURL(url)：是一个智能方法。判断用户是否禁用了Cookie，没有禁用，则不重写；禁用了就重写。
		
		
		网站主页：为了更好访问本网站，请不要禁用您的Cookie。
		
*****五、HttpSession对象的状态及转换（序列化）
	1、如何更改内存中HttpSession对象的超时时间。
		修改web.xml
			<session-config>
			<session-timeout>1</session-timeout><!--自然整数，单位是分钟-->
			</session-config>



	//如果获得的是包下的,那么太麻烦了.
		//一:使用getClass().getResourceAsStream方法,相对路径分为两种情况
				//1: 加"/"  ==> 相对的是classes目录
				//2: 不加"/" ==> 相对的是本类当前目录
					InputStream is = this.getClass().getResourceAsStream("students.xml");
					System.out.println(is);
		//二:使用this.getClass().getClassLoader().getResourceAsStream("");获得
				//只有一个相对路径 ==> 就是相对于 classes目录
					InputStream is2 = 	this.getClass().getClassLoader().getResourceAsStream("students.xml");
					System.out.println(is2);
		
		
			
	//注意: 使用类和类加载器加载资源文件时
	//1 jvm运行期间只加载一次. 但是使用下面的代码可以解决这个问题.
		String path = this.getClass().getClassLoader().getResource("students.xml").getPath();
		File file = new File(path.substring(1, path.length()));
		System.out.println(path);
	//2 getClassLoader()原本是用来加载.class文件的, 所以缓存设计的很小.不要用他加载一些别较大的资源.

