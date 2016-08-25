自定义标签开发
1、自定义标签属于JSP技术中的

一、标签的作用
	移除掉JSP中的Java脚本(<%%>)
二、编写自定义标签的步骤(自定义EL函数，步骤相同)

	Tag接口：其中的方法都是由容器调用的。
	
	常量：
		SKIP_BODY:忽略标签的主体内容。只为doStartTag方法服务
		EVAL_BODY_INCLUDE:不忽略标签的主体内容。只为doStartTag方法服务
		SKIP_PAGE:忽略结束标签之后的内容。只为doEndTag方法服务
		EVAL_PAGE:不忽略结束标签之后的内容。只为doEndTag方法服务
	方法：
		int doStartTag():容器调用。遇到自定义标签的开始标签时被调用。
		int doEndTag():容器调用。遇到自定义标签的结束时被调用。
		void setPageContext(PageContext pc):由容器调用。处理标签之前就会调用。
		void setParent(Tag t):由容器调用。处理标签之前就会调用。目标传递进父标签，没有传递null。
		void release() :由容器调用，释放标签类占用的资源。
		
		
	IterationTag接口：继承Tag接口。增加重复执行主体内容的方法
		int doAfterBody():执行完主体后会被容器调用该方法。
			该方法的返回值只能是：Tag.SKIP_BODY,忽略主体，进入结束标签处理。
								  IterationTag.EVAL_BODY_AGAIN，再执行一次主体内容。
		
	BodyTag接口：继承IterationTag接口。增加了获取主体内容的方法。
		int EVAL_BODY_BUFFERED:给doStartTag()方法用的。只有返回该值，以下2个方法才会被容器调用。
		
		void doInitBody():初始化主体。容器调用
		void setBodyContent(BodyContent b) :设置主体内容。容器调用。BodyContent就代表着主体内容。
	
	SimpleTag接口：
		void doTag():遇到标签就执行。容器调用。
		void setJspBody(JspFragment jspBody):容器调用。传入标签的主体内容。
		void setJspContext(JspContext pc):容器调用。传入PageContext对象。
		void setParent(JspTag parent):容器调用。传入父标签。
		
	
	----------------------------不用--------------------------------------------------------------------------------------------------
	1、编写一个类，直接或间接实现javax.servlet.jsp.tagext.Tag接口
		package cn.itcast.tag;

		import java.io.IOException;

		import javax.servlet.jsp.JspException;
		import javax.servlet.jsp.tagext.TagSupport;
		//TagSupport实现了Tag接口
		public class ShowRemoteIpTag extends TagSupport {

			public int doStartTag() throws JspException {
				String remoteIp = pageContext.getRequest().getRemoteAddr();
				try {
					pageContext.getOut().write(remoteIp);
				} catch (IOException e) {
					e.printStackTrace();
				}
				return super.doStartTag();
			}
		}

	------------------------------------------------------------------------------------------------------------------------------

	2、在WEB-INF目录下建立一个扩展名为tld（Tag Libary Definition）的xml文件。
	<?xml version="1.0" encoding="UTF-8"?>
	<taglib xmlns="http://java.sun.com/xml/ns/j2ee"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-jsptaglibrary_2_0.xsd"
		version="2.0">
		<tlib-version>1.0</tlib-version>
		<short-name>itcast</short-name>
		<uri>http://www.itcast.cn/jsp/jstl</uri>
		<tag><!-- 描述标签 -->
			<description>Show Remote Address</description>
			<name>showRemoteIp</name>
			<tag-class>cn.itcast.tag.ShowRemoteIpTag</tag-class>
			<body-content>empty</body-content><!-- 指示标签的主体内容：没有就写empty -->
		</tag>
	</taglib>
	3、（可选的）在web.xml中对tld文件和名称空间进行映射对应。
	  <jsp-config>
		<taglib>
			<taglib-uri>http://www.itcast.cn/jsp/jstl</taglib-uri>
			<taglib-location>/WEB-INF/itcast.tld</taglib-location>
		</taglib>
	  </jsp-config>
	4、在JSP中使用
		<%@ taglib uri="http://www.itcast.cn/jsp/jstl" prefix="itcast"%>

==============================================================================
	1.设置属性
		private List items;
		private String var;//妙
		public void setItems(List items) {
			this.items = items;
		}
		public void setVar(String var) {
			this.var = var;
		}

	2.把当前元素放到页面范围
		pc.setAttribute(var, obj);

	3.让主体内容执行
		getJspBody().invoke(null);

		// 一下效果相同
		JspFragment jf = getJspBody();
		jf.invoke(out);

	4.获取标签包裹内容
		StringWriter sw = new StringWriter();
		getJspBody().invoke(sw);
		String content = sw.getBuffer().toString();

	5.获取pageContext
		PageContext pc = (PageContext) getJspContext();

三、标签执行步骤和原理
四、标签实现的附属功能
	控制jsp页面某一部分内容是否执行。
	控制结束标签后的JSP内容是否执行
	控制jsp页面内容重复执行。
	修改页面内容输出
五、JSP中标签继承体系
六、简单标签原理
七、标签的配置元素详解
	tld文件：
	taglib：根元素
		tlib-version:版本号
		short-name:引用标签时的短名称。一般与tld文件的文件名一致，好找。
		uri：标签绑定的名称空间。只是一个名字，没有实际的意义。
		tag：定义标签元素
			name：标签的名称。
			tag-class:标签的实现类的全名称。
			body-content:指示标签的主体内容的类型。
				可选值：
					empty:没有主体内容。适用于传统和简单标签。
					JSP:说明JSP文件中能出现啥，标签主体内容中就能出现啥。适用于传统标签。
					scriptless：说明标签的主体内容不能是java脚本。有主体内容时使用，适用于简单标签。
					tagdependent：说明标签的主体内容是原封不动的传递给标签处理类的。
								而不是传递的运算结果
			attribute：定义标签的属性
				name：属性名。对应标签处理类中的setter方法
				required:是否是必须的属性
				rtexprvalue：是否支持表达式（EL或java表达式）。默认是false。
		<tag>
			<name>forEach1</name>
			<tag-class>cn.smallbug.tag.ForEach1SimpleTag</tag-class>
			<body-content>scriptless</body-content>
			<attribute>
				<name>items</name>
				<required>true</required>
				<rtexprvalue>true</rtexprvalue>
			</attribute>
			<attribute>
				<name>var</name>
				<required>true</required>
				<rtexprvalue>false</rtexprvalue>
			</attribute>
		</tag>
		
八、标签的实用案例：
	防盗链
	模拟c:if
	模拟c:when c:otherwise c:choose
	模拟c:forEach
		java.lang.reflect.Array
	过滤HTML标记的标签
九、JSTL中的剩余核心标签

Lesson 2

(有一定了解)一、什么是国际化
(练习一遍)二、国际化处理需要的类
	1、资源包：
		基名_语言_国家.properties
		
		基名相同的多个properties文件才属于一个资源包。
		语言：ISO有规定。zh  en   http://www.loc.gov/standards/iso639-2/englangn.html。 
		国家:ISO有规定。CN HK MO TW  US UK  http://www.iso.ch/iso/en/prods-services/iso3166ma/02iso-3166-code-lists/list-en1.html。 
		
		msg_en_US.properties
		msg_zh_CN.properties
		msg.properties  如果根据区域信息没有找到对应的资源文件，找这个，这是默认的资源包
		
		

	Locale
	文本：ResourceBundle 
	-------------------------------------------------------------
	日期时间：DateFormat
	Date---->String:格式化输出。format
	 
	
	String---->Date:解析字符串。parse
	
	数字货币：NumberFormat
	
	Number---->String:格式化输出。format
	
	String---->Number:解析字符串。parse
	
	
	批量格式化：MessageFormat
三、简单介绍国际化的JSTL标签库
*****四、过滤器概述(灰常重要)
	1、过滤器就是一个保安。
	2、可以对请求和响应进行拦截。
	
五、编写过滤的步骤
	1、编写一个类，实现javax.servlet.Filter接口，这样的类一般称之为过滤器类
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		System.out.println("FilterDemo1拦截了");
		chain.doFilter(request, response);//放行
	}
	2、在web.xml中进行配置，要拦截哪些资源。
	<filter>
		<filter-name>FilterDemo1</filter-name>
		<filter-class>cn.itcast.filter.FilterDemo1</filter-class>
	  </filter>
	  <filter-mapping>
		<filter-name>FilterDemo1</filter-name>
		<url-pattern>/*</url-pattern>
	  </filter-mapping>
	  
六、过滤器的执行过程
	多个过滤器的拦截顺序是按照web.xml中filter-mapping元素的出现顺序进行拦截的。
	
	过滤器只会被初始化一次，应用被加载时就完成了初始化。
	
七、过滤器简单案例：3个
八、过滤器的高级配置
	<filter-mapping>
		<filter-name>FilterDemo3</filter-name>
		<url-pattern>/*</url-pattern>
		<dispatcher>REQUEST</dispatcher> 默认情况。如果写了另外一种情况，默认的就没有了
		<dispatcher>FORWARD</dispatcher>
		<dispatcher>INCLUDE</dispatcher>
		<dispatcher>ERROR</dispatcher>
	  </filter-mapping>
九、巩固包装设计模式
十、过滤器高级案例：
	全站Gzip压缩（相当有难度）
	
Lesson 3 
	
一、包装设计模式：BufferedReader的readLine()方法增加行号
二、过滤器高级案例：
	中文乱码过滤器
	脏话过滤器
	HTML特殊标记过滤器
	全站压缩过滤器（超难）
三、基于URL的权限拦截过滤器
	技术要求：
		数据库：MySQL
		开发模型：MVC+三层架构
		数据库访问：DBUtils框架
		界面数据封装：BeanUtils框架
		JSP中不能出现一行java脚本和表达式
		
	一、搞清楚你的需求。
		
	二、根据技术要求搭建开发环境。
			commons-beanutils.jar
			commons-dbcp.jar
			commons-dbutils.jar
			commons-logging.jar
			commons-pool.jar
			jstl.jar
			standard.jar
			
			mysqldriver.jar
	建立数据库：
		create database day20;
		use day20;
		create table menu(
			id varchar(100) primary key,
			name varchar(100) unique,
			uri varchar(100),
			description varchar(255)
		);
		create table role(
			id varchar(100) primary key,
			name varchar(100) unique,
			description varchar(255)
		);
		create table user(
			id varchar(100) primary key,
			username varchar(100) unique not null,
			password varchar(100),
			nick varchar(100)
		);
		create table menu_role(
			m_id varchar(100),
			r_id varchar(100),
			primary key(m_id,r_id),
			constraint m_id_fk foreign key(m_id) references menu(id),
			constraint r_id_fk1 foreign key(r_id) references role(id)
		);
		create table role_user(
			r_id varchar(100),
			u_id varchar(100),
			primary key(r_id,u_id),
			constraint u_id_fk foreign key(u_id) references user(id),
			constraint r_id_fk2 foreign key(r_id) references role(id)
		);