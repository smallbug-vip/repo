Lesson 1

一、struts2配置文件
	1、配置web.xml
		<filter>
			<filter-name>struts2</filter-name>
			<filter-class>org.apache.struts2.dispatcher.ng.filter.StrutsPrepareAndExecuteFilter</filter-class>
		</filter>

		<filter-mapping>
			<filter-name>struts2</filter-name>
			<url-pattern>/*</url-pattern>
		</filter-mapping>
	2、package属性详解
		<package name="itcast" namespace="/test" extends="struts-default">
			<!--
			pageckage:方便管理动作元素
				name：必须有。包的名称，配置文件中必须保证唯一。
				namespace：该包的名称空间，一般是以"/"开头
				extends:集成的父包的名称。struts-default名称的包是struts2框架已经命名好的一个包。（在struts2-core.jar中有一个struts-default.xml中）
				abstract：是否是抽象包。没有任何action元素的包就是抽象包（java类）
			-->
			<action name="helloworld" class="cn.itcast.action.HelloWorldAction" method="sayHello">
				<!--
				action:代表一个请求动作
					name：同包中必须唯一。动作的名称
					class:负责处理的JavaBean的类全名
					method：JavaBean中的对应处理方法。（动作方法：特点是，public String 方法名(){}）
				-->
					<result name="success">/1.jsp</result>
					<!--
					result:结果类型
						name:动作方法返回的字符串
						主体内容：View的具体地址。
					-->
			</action>
		</package>
	3、action名称的搜索顺序
		访问helloworld动作的方式：http://localhost:8080/struts2day01/test/helloworld   应用名称/包的名称空间/动作的名称
			默认情况下：访问动作名helloworld，可以直接helloworld，或者helloworld.action
		
			http://localhost:8080/struts2day01/test/a/b/c/helloworld
				/test/a/b/c:名称空间
				helloworld：动作名称
				
				搜索顺序：名称空间
							/test/a/b/c  没有helloworld
							/test/a/b	 没有helloworld
							/test/a      没有helloworld
							/test        有了，调用执行
	4、struts.xml配置文件编写是没有提示的问题？
		方法一：上网即可
		方法二：
			1、拷贝http://struts.apache.org/dtds/struts-2.1.7.dtd地址
			2、Eclipse的window、preferences，搜索XML Catelog
			3、点击add按钮
				Location：dtd文件的路径
				Key Type:URI
				Key:http://struts.apache.org/dtds/struts-2.1.7.dtd
	5、Struts配置文件中的各种默认值。
		result name:
			class:默认值是com.opensymphony.xwork2.ActionSupport
					常量： 	SUCCESS     success
							NONE		none
							ERROR		error
							INPUT		input
							LOGIN		login
			method：默认值是public String execute(){}
			
		result type
		（注：type的取值是定义好的，不是瞎写的。在struts-default.xml中的package中有定义）
			dispatcher：普通的转发到某个页面
			chain：普通的抓发到某个动作名称
			redirect：重定向到一个页面
			redirectAction:重定向到一个动作名称
			plainText：以纯文本的形式输出JSP内容
			
		result元素的写法：
			方式一：
				<result type="chain" name="success">a2</result>
			方式二：
				<result type="chain" name="success">
					<param name="actionName">a2</param><!--name对应的chain的处理器中的setActionName()方法-->
				</result>
				
			注意：如果要转向的是在另外一个名称空间的动作，那么只能使用方式二
				<package name="p1" namespace="/namespace1" extends="struts-default">
					<action name="a2">
						<result type="dispatcher" name="success">/3.jsp</result>
					</action>
				</package>
				<package name="p2" namespace="/namespace2" extends="struts-default">
					<action name="a1">
						<result type="chain" name="success">
							<param name="namespace">/namespace1</param>
							<param name="actionName">a2</param>
						</result>
					</action>
				</package>
二、常量详解：    

		（1）struts.i18n.encoding=UTF-8
			   指定默认编码    
			用法: <constant name="struts.i18n.encoding" value="UTF-8" />
		 
		（2）struts.action.extension 
		指定Struts 2处理的请求后缀，默认值是action，即所有匹配*.action的请求都由Struts2处理，如果用户需要指定多个请求后缀，则多个后缀之间以英文逗号（,）隔开
			 用法:<constant name="struts.action.extension" value="do" />  或者
			 <constant name="struts.action.extension" value="do,action" />
		  
		（3）struts.configuration.xml.reload
			  当struts的配置文件修改后,系统是否自动重新加载该文件,默认值为false(生产环境下使用),开发阶段最好打开 
			用法:<constant name="struts.configuration.xml.reload" value="true" /> 
		 
		（4）struts.devMode  
				 开发模式下使用,默认为false，设置成true，这样可以打印出更详细的错误信息，有助于查找到错误，在开发的时候建议开启，项目发布之后改成false 
		<constant name="struts.devMode" value="true" />
		  
		（5）struts.multipart.parser
			  该属性指定处理 MIME-type multipart/form-data，文件上传方式，有三种方式cos、pell 、jakarta;struts2默认采用第三种方式，如果想用前两种方式，需要去网上下载相应jar包即可 
		   用法： <constant name="struts.multipart.parser" value="cos" />  
				 <constant name="struts.multipart.parser" value="pell" />  
				 <constant name="struts.multipart.parser" value="jakarta" />
		  
		（6）struts.multipart.saveDir
			 指定上传文件时的临时目录，默认使用 javax.servlet.context.tempdir 
		用法：<constant name="struts.multipart.saveDir" value="/tmpuploadfiles" />  
			 
		（7）struts.multipart.maxSize
				  该属性指定Struts 2文件上传中整个请求内容允许的最大字节数 默认为2M 
			用法：<constant name="struts.multipart.maxSize" value="2097152" />  
		 
		（8）struts.ui.theme
			   默认的视图主题，可以为simple,xhtml或ajax
			用法：<constant name="struts.ui.theme" value="simple" />  
			
		（9）struts.serve.static.browserCache
			  设置浏览器是否缓存静态内容,默认值为true(生产环境下使用),开发阶段最好关闭 
			用法:<constant name="struts.serve.static.browserCache" value="false" />  
		（10）struts.enable.SlashesInActionNames 
		设置是否可以在action中使用斜线，默认为false不可以，设置为true，可以使用 
			用法:<constant name="struts.enable.SlashesInActionNames" value="true" />  
		（11）struts.enable.DynamicMethodInvocation 
			设置是否支持动态方法调用，true为支持，false不支持. 
			用法:<constant name="struts.enable.DynamicMethodInvocation" value="true" /> 
Lesson 2

	action是线程安全的
	
一、自定义类型转换器
	1、编写一个类，继承com.opensymphony.xwork2.conversion.impl.DefaultTypeConverter
	2、覆盖掉其中的public Object convertValue(Map<String, Object> context, Object value,Class toType)
			context:OGNL表达式的上下文
			value:实际的值。用户输入的都是字符串，但他是一个String数组。
			toType：目标类型
	public class DateConvertor extends DefaultTypeConverter {
		/*
		 context:ognl表达式的上下文
		 value：用户输入的值（ 保存数据时）或者模型中的属性。用户输入的值是String数组
		 toType:目标类型
		 */
		@Override
		public Object convertValue(Map<String, Object> context, Object value,
				Class toType) {
			DateFormat df = new SimpleDateFormat("yyyy/MM/dd");
			if(toType==Date.class){
				//2013/05/31----->java.util.Date 保存数据时
				String strValue = ((String[])value)[0];
				try {
					return df.parse(strValue);
				} catch (ParseException e) {
					throw new RuntimeException(e);
				}
			}else{
				//java.util.Date----->2013/05/31 获取数据时
				Date dValue = (Date)value;
				return df.format(dValue);
			}
		}
	}
	3、注册类型转换器
		3.1局部类型转换器：只对当前的Action有效
		具体做法：在动作类相同的包中，建立一个名称是“动作类名-conversion.properties”的配置文件，
			文件中增加以下内容：要验证的字段=验证器的类全名
					birthday=cn.itcast.convertor.DateConvertor
		3.2全局类型转换器：对所有的Action都有效
		具体做法：在WEB-INF/classes目录下，建立一个名称为"xwork-conversion.properties"的配置文件，
			文件中增加以下内容：目标类型全名=验证器的类全名
					java.util.Date=cn.itcast.convertor.DateConvertor
二、文件上传
	image
	imageFileName
	imageContentType
	enctype="multipart/form-data"
	
	struts.multipart.saveDir
		 指定上传文件时的临时目录，默认使用 javax.servlet.context.tempdir 
	用法：<constant name="struts.multipart.saveDir" value="/tmpuploadfiles" />  
			 
	struts.multipart.maxSize
			  该属性指定Struts 2文件上传中整个请求内容允许的最大字节数 默认为2M 
	用法：<constant name="struts.multipart.maxSize" value="2097152" />  
三、自定义拦截器
	1、编写一个类，实现com.opensymphony.xwork2.interceptor.Interceptor
	2、主要实现public String intercept(ActionInvocation invocation) throws Exception{}方法
		该方法的返回值就相当于动作的返回值
		如果调用了String result = invocation.invoke();得到了动作类的返回的值。
	public String intercept(ActionInvocation invocation) throws Exception {
		//判断用户是否登录
		HttpSession session = ServletActionContext.getRequest().getSession();
		Object obj = session.getAttribute("user");
		if(obj==null){
			return "login";
		}else{
			return invocation.invoke();//调用动作方法
		}
	}
	3、拦截器定义好后，一定要在配置文件中进行注册：
		<interceptors> 只是定义拦截器，并没有起作用 
			<interceptor name="permissionInterceptor" class="cn.itcast.interceptor.PermissionInterceptor"></interceptor>
		</interceptors>
	4、配置文件中的动作，要通过
		<interceptor-ref name="permissionInterceptor"></interceptor-ref>使用该拦截器
	注意：一旦动作中使用了自定义的拦截器，那么默认的就不起作用了。一般应该采用如下的做法：
		<interceptor-stack name="mydefaultstack">-->
				<interceptor-ref name="defaultStack"></interceptor-ref>
				<interceptor-ref name="permissionInterceptor"></interceptor-ref
		</interceptor-stack>
		
	多个动作类都要使用的话，可以通过package来进行组合。
四、文件下载
	private String contentType;
		private long contentLength;
		private String contentDisposition;
		private InputStream inputStream;
		

		public String download() throws Exception {

			//确定各个成员变量的值
			String str = URLEncoder.encode("试验田", "UTF-8");
			contentDisposition = "attachment;filename="+str+".txt";
			contentType = "text/plain";
			ServletContext servletContext = 
					ServletActionContext.getServletContext();
			String fileName = servletContext.getRealPath("/WEB-INF/files/试验田.txt");
			inputStream = new FileInputStream(fileName);
			contentLength = inputStream.available();
			
			return "download";
		}
		
		<action name="s_*" class="com.smallBug.action.StudentAction" method="{1}">
			<result type="stream" name="download">
				<param name="bufferSize">2048</param>
			</result>
		</action>


		（2）
			public String download(){
		try {
			//获取文件ID
			String fileID = elecUser.getFileID();
			//1：使用文件ID，查询用户文件表，获取到路径path
			ElecUserFile elecUserFile = elecUserService.findUserFileByID(fileID);
			//路径path
			String path = ServletActionContext.getServletContext().getRealPath("")+elecUserFile.getFileURL();
			//文件名称
			String filename = elecUserFile.getFileName();
			//可以出现中文
			filename = new String(filename.getBytes("gbk"),"iso8859-1");
			request.setAttribute("filename", filename);
			
			//2：使用路径path，查找到对应的文件，转化成InputStream
			InputStream in = new FileInputStream(new File(path));
			//与栈顶的InputStream关联
			elecUser.setInputStream(in);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "download";
	}
	<result name="download" type="stream">
				<!-- <param name="contentType">image/jpeg</param> -->
			    <param name="inputName">inputStream</param>
			    <param name="contentDisposition">attachment;filename="${#request.filename}"</param>
			    <param name="bufferSize">1024</param>
			</result>
Lesson 3

一、用户输入验证
	1、编程方式：
		动作类中的所有方法进行验证：
		
			步骤：
			a、动作类继承ActionSupport
			b、覆盖调用public void validate()方法
			c、在validate方法中，编写不符合要求的代码判断，并调用父类的addFieldError(String fieldName,String errorMessage)
				如果fieldError（存放错误信息的Map）有任何的元素，就是验证不通过，动作方法不会执行。
				Struts2框架会返回到name=input的result
			d、在name=input指定的页面上使用struts2的标签显示错误信息。<s:fielderror fieldName=""/>
		
		动作类中指定的方法进行验证：
			编写步骤与上面相同
			
			验证方法书写有要求：
				public void validateXxx()   Xxx代表的是要验证的动作方法名，其中要把动作方法名的首字母变为大写。
				
	
	2、基于XML配置文件的方式：
		动作类中的所有方法进行验证：
			在动作类的包中，建立一个名称为：动作简单类名-validation.xml ，比如要验证的动作类名是UserAction   UserAction-validation.xml
			内容如下：
			<?xml version="1.0" encoding="UTF-8"?>
			<!DOCTYPE validators PUBLIC
					"-//OpenSymphony Group//XWork Validator 1.0.3//EN"
					"http://www.opensymphony.com/xwork/xwork-validator-1.0.3.dtd">
			<validators>
				<field name="username">
					<!-- 内置验证器都是定义好的，在xwork-core.jar com.opensymphony.xwork2.validator.validators包中的default.xml文件中 -->
					<field-validator type="requiredstring"><!-- 不能为null或者""字符串，默认会去掉前后的空格 -->
						<message>用户名不能为空</message>
					</field-validator>
				</field>
				<--第二种调用方式-->
				<validator type="requiredstring">
					<param name="fieldName">username</param>
					<message>用户名不能为空孔</message>
				</validator>
			</validators>
		动作类中指定的方法进行验证：
			配置文件的名称书写有一定要求。
					动作类名-动作名（配置文件中的动作名）-validation.xml
					UserAction-user_add-validation.xml
					
		StudentAction-validation.xml
		
		
			<?xml version="1.0" encoding="UTF-8"?>
			 <!DOCTYPE validators PUBLIC
					"-//Apache Struts//XWork Validator 1.0.3//EN"
					"http://struts.apache.org/dtds/xwork-validator-1.0.3.dtd">
			<validators>
				<!-- <field name="name">
					<field-validator type="regex">
						<param name="regex"><![CDATA[\d+]]></param>
						<message>[aAbBcCdD][123][eEfFgG][456]</message>
					</field-validator>
				</field> -->
				<validator type="regex">
					<param name="fieldName">name</param>
					<param name="regex"><![CDATA[\d+]]></param>
					<message>[aAbBcCdD][123]------------------[eEfFgG][456]</message>
				</validator>
			</validators>
			
			
	3、自定义基于XML的验证器
		a、编写一个类，继承FieldValidatorSupport类。
		b、在public void validate(Object object)编写你的验证逻辑
				不符合要求的就向fieldErrors中放消息
				
				
				public class StrongPasswordValidator extends FieldValidatorSupport {

					public void validate(Object object) throws ValidationException {
						String fieldName = getFieldName();//取得字段名
						String filedValue = (String)getFieldValue(fieldName, object);//取得用户输入的当前字段的值
						if(!isPasswordStrong(filedValue)){
							addFieldError(fieldName, object);
						}
					}
					private static final String GROUP1 = "abcdefghijklmnopqrstuvwxyz";
					private static final String GROUP2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
					private static final String GROUP3 = "0123456789";
					protected boolean isPasswordStrong(String password) {
						boolean ok1 = false;
						boolean ok2 = false;
						boolean ok3 = false;
						int length = password.length();
						for(int i=0;i<length;i++){
							if(ok1&&ok2&&ok3)
								break;
							String character = password.substring(i,i+1);
							if(GROUP1.contains(character)){
								ok1 = true;
								continue;
							}
							if(GROUP2.contains(character)){
								ok2 = true;
								continue;
							}
							if(GROUP3.contains(character)){
								ok3 = true;
								continue;
							}
						}
						return ok1&&ok2&&ok3;
					}
				}
		c、一定注册你的验证器才能使用
				在WEB-INF/classes目录下建立一个名称为validators.xml的配置文件，内容如下：
				<validators>
					<validator name="strongpassword" class="cn.itcast.validators.StrongPasswordValidator"/>
				</validators>
		d、日后就可以像使用Struts2提供的16个验证器方式去使用了。
		
二、Struts2对于i18n的支持
	全局资源文件/包范围资源文件/动作类的资源文件
	全局资源文件：放到WEB-INF/classes目录下
	包范围资源文件：服务于Java类中的包下的动作类的。
			取名：package_语言_国家.properties
	
	动作类的资源文件:放到与动作类相同的包中
			取名：动作类名_语言_国家.properties
			
			
	jsp中如何读取国际化的消息
	动作类中如何读取国际化的消息
三、OGNL表达式:
	OGNL是从ActionContext中获取数据的。
	
	ActionContext的结构：
		ValueStack：
			List：动作类放在此处。取存放在ValueStack中的root的对象的属性，直接写即可
			
			访问以下内容中的对象要使用#+(范围)session
		application：ServletContext中的那个Map
		session：HttpSession中的那个Map
		request：ServletRequest中的那个Map
		parameters：请求参数的那个Map。（如同EL表达式的paramValues内置对象）
		attr：相当于PageContext的findAttribute方法。${username}
		
		<s:if test="'aaa' not in {'aa','bb'}">
			不在
		</s:if>
	小技巧：在页面中使用<s:debug/>查看上下文中的对象
	<s:select list="#request.list" id="keyword" name="keyword" 
			  listKey="keyword" listValue="keyword"
			  headerKey="jerrynew" headerValue=""
		  cssClass="bg" cssStyle="width:180px" onchange="changetype()">
	</s:select>
	
四、Struts2中常用的标签
	Control Tags
		if
		elseif				test   type:boolean
		else
					<s:if test="%{false}">
						<div>Will Not Be Executed</div>
					</s:if>
					<s:elseif test="%{true}">
						<div>Will Be Executed</div>
					</s:elseif>
					<s:else>
						<div>Will Not Be Executed</div>
					</s:else>
		append
				<s:append var="myAppendIterator">
					 <s:param value="%{myList1}" />
					 <s:param value="%{myList2}" />
					 <s:param value="%{myList3}" />
				</s:append>
				<s:iterator value="%{#myAppendIterator}">
					 <s:property />
				</s:iterator>
		generator
			  <s:generator val="%{'aaa,bb1b,ccc,d1dd,eee'}" separator="1" var="gft" count="2" >
				 <s:iterator>
					 <s:property /><br/>
				 </s:iterator>
			  </s:generator>
		iterator
		merage
		sort
		subset
		
	Data Tags
		a
		action
		bean
		date
		debug
		i18n
		include
		param
		property
		push
		set
		text
		url:<s:url action="student_url" var="u"></s:url>
			<s:a href="%{#u}">url Test</s:a>
五、防止表单重复提交
六、CURD：单表
七、如何使用Struts的插件。（牵扯与其他框架整合）JFreeChart整合
八、普通实体的CRUD转向

	delete -------redirectAction-----> toList
	add-----------redirectAction-----> toList
	update--------redirectAction-----> toList
	
	addUI---------------dispatcher------------------->saveUI
	updateUI---------------dispatcher---------------->saveUI
	
	list------------------------------dispatcher------------------------->list.jsp
	