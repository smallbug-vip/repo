一、基础jar包

二、基础环境搭建

三、注释详解

四、REST (Representational State Transfer)（表现层状态转化）风格架构

五、使用POJO（Plain Old Java Object）对象绑定请求参数值

六、使用Servlet API 作为入参

七、处理模型数据

八、视图和视图解析器

九、SpringMVC自定义标签

十、自定义类型转换器

十一、数据校验

十二、返回JSON

十三、文件上传、下载

十四、拦截器

十五、异常处理

十六、SpringIOC与SpringMVC整合

一、基础jar包
	1、commons-logging
		//日志
	2、spring-aop
		//面向切片编程 提供对AspectJ的支持，以便可以方便的将面向方面的功能集成进IDE中
	3、spring-beans
		//核心。访问配置文件、创建和管理bean 以及进行IOC/DI操作相关的所有类。
	4、spring-context
		//为Spring 核心提供了大量扩展。
	5、spring-core
		//Spring 框架基本的核心工具类。外部依赖Commons Logging 。
	6、spring-expression
		//配置对象的注入，它便是SpEL (Spring Expression Language)
	7、spring-web
		//Web 应用开发时，用到Spring 框架时所需的核心类
	8、spring-webmvc
		//Spring MVC 框架相关的所有类。包括框架的Servlets，Web MVC框架，控制器和视图支持。

二、基础环境搭建
	1、web.xml 文件配置信息
	
		① 装配 Servlet
			<servlet>
				<servlet-name>dispatcherServlet</servlet-name>
				<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
				<init-param>
					<param-name>contextConfigLocation</param-name>
					<param-value>classpath:springmvc.xml</param-value>
				</init-param>
				<load-on-startup>1</load-on-startup>
			</servlet>
			  
			<servlet-mapping>
				<servlet-name>dispatcherServlet</servlet-name>
				<url-pattern>/</url-pattern>
			</servlet-mapping>
			
		② 支持 RESTFUL 风格
			<filter>
				<filter-name>HiddenHttpMethodFilter</filter-name>
				<filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
			</filter>

			<filter-mapping>
				<filter-name>HiddenHttpMethodFilter</filter-name>
				<url-pattern>/*</url-pattern>
			</filter-mapping>
			
	2、springmvc.xml 文件配置信息
		
		<!-- 配置自定扫描的包 -->
		<context:component-scan base-package="com.mjs"></context:component-scan>
		
		<!-- 配置视图解析器: 如何把 handler 方法返回值解析为实际的物理视图 -->
		<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
			<property name="prefix" value="/WEB-INF/views/"></property>
			<property name="suffix" value=".jsp"></property>
		</bean>
三、注释详解
	1、RequestMapping("index")
		//映射请求，可以定义在类上
		
		① 参数
			value（默认）：请求URL
			method ：请求方法RequestMethod
			params ：请求参数 params="id[!id][id=12]"[{"id","id=12"}]
			heads ：请求头（同请求参数）
		② Ant 风格资源地址支持 3 种匹配符：
			?：匹配文件名中的一个字符
			*：匹配文件名中的任意字符
			**：** 匹配多层路径
			
	2、PathVariable
		//通过 @PathVariable 可以将 URL 中占位符参数绑定到控制器处理方法的入参中：URL 中的 {xxx} 占位符可以通过
			@PathVariable("xxx") 绑定到操作方法的入参中。
			
		① 使用举例
			@RequestMapping("/delete/{id}")
			public String delete(@PathVariable("id") Integer id){ ///// }
		
	3、RequestParam
		//在处理方法入参处使用 @RequestParam 可以把请求参数传递给请求方法
		
		① 参数
			value：参数名
			required：是否必须。默认为 true, 表示请求参数中必须包含对应的参数，若不存在，将抛出异常
			
		② 使用举例
			public String testRequestParam(@RequestParam(value = "username") String username){ /////// }
			
	4、RequestHeader
		//绑定请求报头的属性值
		
		① 参数
			value：参数名
			required：是否必须。默认为 true, 表示请求参数中必须包含对应的参数，若不存在，将抛出异常
		
		② 使用举例
			public String testRequestHeader(@RequestHeader(value = "Accept-Language") String al){ //////// }
			
	5、CookieValue 
		//可让处理方法入参绑定某个 Cookie 值
		
		① 参数
			value：参数名
			required：是否必须。默认为 true, 表示请求参数中必须包含对应的参数，若不存在，将抛出异常
		
		② 使用举例			
			public String testCookieValue(@CookieValue("JSESSIONID") String sessionId) { ////////// }
	6、InitBinder
		//由 @InitBinder 标识的方法，可以对 WebDataBinder 对象进行初始化。WebDataBinder 是 DataBinder 的子类，用
			于完成由表单字段到 JavaBean 属性的绑定
			
		① @InitBinder方法不能有返回值，它必须声明为void
		
		② @InitBinder方法的参数通常是是 WebDataBinder
		
		③ 使用举例
			@InitBinder
			public void initBinder(WebDataBinder binder){
				binder.setDisallowedFields("lastName");
			}
	
	7、DateTimeFormat
		//可对java.util.Date、java.util.Calendar、java.long.Long 时间类型进行标注
		
		① 参数 pattern ：pattern类型为字符串。指定解析/格式化字段数据的模式， 如：”yyyy-MM-dd hh:mm:ss”
				iso ：类型为 DateTimeFormat.ISO。指定解析/格式化字段数据的ISO模式，包括四种：ISO.NONE（不使用）
					-- 默认、ISO.DATE(yyyy-MM-dd) 、ISO.TIME(hh:mm:ss.SSSZ)、ISO.DATE_TIME(yyyy-MM-dd hh:mm:ss.SSSZ)
				style ：字符串类型。通过样式指定日期时间的格式，由两位字符组成，第一位表示日期的格式，第二位表示时间
						的格式：S：短日期/时间格式、M：中日期/时间格式、L：长日期/时间格式、F：完整日期/时间格式、：
						忽略日期或时间格式
				
	8、NumberFormat
		//可对类似数字类型的属性进行标注
		① 参数		style ：类型为 NumberFormat.Style。用于指定样式类型，包括三种：Style.NUMBER（正常数字类型）、
							Style.CURRENCY（货币类型）、 Style.PERCENT（百分数类型）
					pattern ：类型为 String，自定义样式，如patter="#,###"
					
	9、HttpMessageConverter
				
四、REST (Representational State Transfer)（表现层状态转化）风格架构

	1、资源（Resources）：网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌
		曲、一种服务，总之就是一个具体的存在。可以用一个URI（统一资源定位符）指向它，每种资源对应一个特定的 URI 。
		要获取这个资源，访问它的URI就可以，因此 URI 即为每一个资源的独一无二的识别符。
		
	2、表现层（Representation）：把资源具体呈现出来的形式，叫做它的表现层（Representation）。比如，文本可以
		用 txt 格式表现，也可以用 HTML 格式、XML 格式、JSON 格式表现，甚至可以采用二进制格式。
		
	3、状态转化（State Transfer）：每发出一个请求，就代表了客户端和服务器的一次交互过程。HTTP协议，是一个无状态
		协议，即所有的状态都保存在服务器端。因此，如果客户端想要操作服务器，必须通过某种手段，让服务器端发生“状
		态转化”（State Transfer）。而这种转化是建立在表现层之上的，所以就是 “表现层状态转化”。具体说，就是 HTTP 
		协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET 用来获取资源，
		POST 用来新建资源，PUT 用来更新资源，DELETE 用来删除资源。
		
		
五、使用POJO（Plain Old Java Object）对象绑定请求参数值

	1、Spring MVC 会按请求参数名和 POJO 属性名进行自动匹配，自动为该对象填充属性值。支持级联属性。
		
		@RequestMapping("/testPojo")
		public String testPojo(User user) {
			System.out.println("testPojo: " + user);
			System.out.println("testPojo: " + user.getAddress());
			return SUCCESS;
		}
		
六、使用Servlet API 作为入参
	
	1、MVC 的 Handler 方法可以接受的 ServletAPI 类型
		HttpServletRequest
		HttpServletResponse 
		HttpSession 
		InputStream
		OutputStream
		Reader
		Writer
		
		java.security.Principal
		Locale
		
	2、使用举例
		@RequestMapping("/testServletAPI")
		public void testServletAPI(HttpServletRequest request,
				HttpServletResponse response, Writer out) throws IOException {
			System.out.println("testServletAPI, " + request + ", " + response);
			out.write("hello springmvc");
			// return SUCCESS;
		}
	
七、处理模型数据

	Spring MVC 提供了以下几种途径输出模型数据：
	
		1、ModelAndView: 处理方法返回值类型为 ModelAndView 时, 方法体即可通过该对象添加模型数据
			eg：
				public ModelAndView testModelAndView() {
					String viewName = SUCCESS;
					ModelAndView modelAndView = new ModelAndView(viewName);

					// 添加模型数据到 ModelAndView 中.
					modelAndView.addObject("time", new Date());
					return modelAndView;
				}
				
			//目标方法的返回值可以是 ModelAndView 类型。 其中可以包含视图和模型信息 SpringMVC 会把 ModelAndView 的
			//model 中数据放入到 request 域对象中.
			
		2、Map 及 Model: 入参为org.springframework.ui.Model、org.springframework.ui.ModelMap 或 java.util.Map 时，
			处理方法返回时，Map 中的数据会自动添加到模型中。
			eg：
				public String testMap(Map<String, Object> map) {
					map.put("names", Arrays.asList("Tom", "Jerry", "Mike"));
					return SUCCESS;
				}
			
		3、@SessionAttributes: 将模型中的某个属性暂存到HttpSession 中，以便多个请求之间可以共享这个属性
		
			@SessionAttributes(types=User.class) 会将隐含模型中所有类型为 User.class 的属性添加到会话中。
			@SessionAttributes(value={"user1", "user2"}) 		//对应key值
			@SessionAttributes(types={User.class, Dept.class})
			@SessionAttributes(value={"user1", "user2"},types={Dept.class})
			
			//除了可以通过属性名指定需要放到会话中的属性外(实际上使用的是 value 属性值),
			//还可以通过模型属性的对象类型指定哪些模型属性需要放到会话中(实际上使用的是 types 属性值)
			
		4、@ModelAttribute: 方法入参标注该注解后, 入参的对象就会放到数据模型中。
		
			① 在方法定义上使用：Spring MVC 在调用目标处理方法前，会先逐个调用在方法级上标注了@ModelAttribute 的方法。
			
			② 在方法的入参前使用：可以从隐含对象中获取隐含的模型数据中获取对象，再将请求参数绑定到对象中，
									再传入入参。将方法入参对象添加到模型中
				@ModelAttribute
				public void getUser(@RequestParam(value = "id", required = false) Integer id,Map<String, Object> map) {
					System.out.println("modelAttribute method:" + id);
					if (id != null) {
						User user = new User(1, "Tom", "123456", "tom@atguigu.com", 12);
						System.out.println("从数据库中获取一个对象: " + user);
						map.put("user", user);
					}
				}
				@RequestMapping("/testModelAttribute")
				public String testModelAttribute(@ModelAttribute("user")User user) {
					System.out.println(user);
					return "success";
				}
				//对于不想修改的字段，在请求时不写该属性就好
	
		5、由@SessionAttributes引发的异常
		
			如果在处理类定义处标注了@SessionAttributes("xxx")，则尝试从会话中获取该属性，
				并将其赋给该入参，然后再用请求消息填充该入参对象。如果在会话中找不到对应的属
				性，则抛出 HttpSessionRequiredException 异常(回话即SessionAttributes域)
			解决方案：
				① @ModelAttribute("aaa")
				② 定义@ModelAttribute修饰的方法
	
八、视图和视图解析器

	1、请求处理方法执行完成后，最终返回一个 ModelAndView 对象。对于那些返回 String，View 或 ModeMap 等类型的
		处理方法，Spring MVC 也会在内部将它们装配成一个ModelAndView 对象，它包含了逻辑名和模型对象的视图。
		
	2、Spring MVC 借助视图解析器（ViewResolver）得到最终的视图对象（View），最终的视图可以是 JSP ，也可能是
		Excel、JFreeChart 等各种表现形式的视图。
		
	3、对于最终究竟采取何种视图对象对模型数据进行渲染，处理器并不关心，处理器工作重点聚焦在生产模型数据的工
		作上，从而实现 MVC 的充分解耦。
	
	4、视图的作用是渲染模型数据，将模型里的数据以某种形式呈现给客户。
	
	5、常见的视图解析类
	
		① URL视资源图
			InternalResourceView
				//将JSP或其他资源封装成一个视图，是InternalResourceViewResolver默认使用的视图类
			JstlView
				//如果JSP中使用了JSTL国际化标签的功能，则需要使用该视图
				
		② 文档视图
			AbstractExcelView
				//Excel文档视图的抽象类。该视图类基于POI构造Excel文档
			AbstractPdfView
				//PDF文档视图的抽象类，该视图类基于IText构造PDF文档
				
		③ 报表视图
			ConfigurableJsperReportsView
			Jasper...
				//几个使用 JasperReports 报表技术的视图
				
		④ JSON视图
			MappingJacksonJsonView
				//将模型数据通过 Jackson 开源框架的 ObjectMapper 以 JSON 方式输出
	
	6、视图解析器
		
		① SpringMVC 为逻辑视图名的解析提供了不同的策略，可以在 Spring WEB 上下文中配置一种或多种解析策略，并
			指定他们之间的先后顺序。每一种映射策略对应一个具体的视图解析器实现类。
			
		② 视图解析器的作用比较单一：将逻辑视图解析为一个具体的视图对象。
		
		③ 所有的视图解析器都必须实现 ViewResolver 接口
	
	7、常用的视图解析器实现类
		
		① 解析为 Bean 的名字
			BeanNameViewResolver
				//将逻辑视图名解析为一个 Bean ，Bean 的id等于逻辑视图名
				
		② 解析为 URL 文件
			InternalResourceViewResolver
				将视图名解析为一个URL文件，一般使用该解析器将视图名映射为一个保存在 WEB-INF 目录下的程序文件（JSP）
			JasperReportsViewResolver
				JasperReports是一个基于Java的开源报表工具，该解析器将视图名解析为报表文件对应的URL
				
		③ 模板文件视图
			FreeMarkerViewResoler
				解析为基于FreeMarker模板技术的模板文件
				
			VelocityViewReoler				
			VelocityLayoutViewResolver		//解析为基于Velocity模板技术的模板文件
			
	8、若希望直接响应通过 SpringMVC 渲染的页面，可以使用 mvc:view-controller 标签实现
	
		① <mvc:view-controller path="/success" view-name="success"/>
			<mvc:annotation-driven></mvc:annotation-driven>
			<!-- 可以直接相应转发的页面, 而无需再经过 Handler 的方法. -->
		    <!-- 在实际开发中通常都需配置 mvc:annotation-driven 标签 -->
		    
九、SpringMVC自定义标签

十、自定义类型转换器
	1、定义类型转换类实现 Converter<String, Employee>
	2、重写 convert(String source) 方法
	3、<mvc:annotation-driven conversion-service="conversionService"></mvc:annotation-driven>	
		<bean id="conversionService"
			class="org.springframework.format.support.FormattingConversionServiceFactoryBean">
			<property name="converters">
				<set>
					<ref bean="employeeConverter"/>
				</set>
			</property>	
		</bean>
	
十一、数据校验
	① 实现验证
	
		//JSR 303 是 Java 为 Bean 数据合法性校验提供的标准框架，它已经包含在 JavaEE 6.0 中
		
		//JSR 303 通过在 Bean 属性上标注类似于 @NotNull、@Max 等标准的注解指定校验规则，并通过标准的验证接口对 Bean 进
		//行验证
		
		注解：
		@Null			//必须为空
		@NotNull		//不能为空
		@AssertTrue		//必须为true
		@AssertFalse	//必须为false
		
		@Min(value)		//其值必须是一个数字，并且大于等于指定值
		@Max
		@DecimalMax
		@DecimalMin
		
		@Size(max, min)	//元素大小在指定范围内
		@Didits(integer,fraction)	//备注是的元素必须是一个数字，其值必须在可接受的范围内
		@Past			//被注释的元素必须是一个过去的日期
		@Future			//被注释的元素必须是一个将来的时间
		@Pattern(value)	//必须符合正则表达式
		
		@Email
		@Length			//被注释的字符串的大小必须在指定范围内
		@NotEmpty		//必须非空
		@Range			//必须在适合的范围内
		
		eg:
			public String save(@Valid Employee employee, Errors result){
					if(result.getErrorCount() > 0){
						System.out.println("出错了!");
						
						for(FieldError error:result.getFieldErrors()){
							System.out.println(error.getField() + ":" + error.getDefaultMessage());
						}
						return "input";
					}
					employeeDao.save(employee);
					return "redirect:/emps";
				}	
				
			jsp:<form:errors path="*"></form:errors>
	
	
	② 提示消息的国际化
	
		i18n.properties
			NotEmpty.employee.email=\u4E0D\u80FD\u4E0D\u80FD\u771F\u7684\u4E0D\u80FD\u4E3A\u7A7A\u554A
		
		springmvc.xml
			<bean id="messageSource" class="org.springframework.context.support.ResourceBundleMessageSource">
					<property name="basename" value="i18n"></property>
			</bean>
	
十二、返回JSON
	1、加Jackson**  3个jsr包
	2、 @ResponseBody
		@RequestMapping("testJson")
		public Collection<Employee> testJson(){
			return employeeDao.getAll();
		}
	3、$(function() {
			$("#testJson").click(function() {
				var url = this.href;
				var args = {};
				$.post(url, args, function(data) {
					for ( var i = 0; i < data.length; i++) {
						var id = data[i].id;
						var lastName = data[i].lastName;
						alert(id + ": " + lastName);
					}
				});
				return false;
			});
		});
	//解决JSON死循环
	@JsonIgnoreProperties(value={"parent"})
		
十三、文件上传、下载
	① 上传
		1、导jar包
		
		2、 <!-- 配置 MultipartResolver -->
			<bean id="multipartResolver"
				class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
				<property name="defaultEncoding" value="UTF-8"></property>
				<property name="maxUploadSize" value="1024000"></property>	
			</bean>	
			
		3、 @RequestMapping("/testFileUpload")
			public String testFileUpload(@RequestParam("desc") String desc, 
					@RequestParam("file") MultipartFile file) throws IOException{
				System.out.println("desc: " + desc);
				System.out.println("OriginalFilename: " + file.getOriginalFilename());
				System.out.println("InputStream: " + file.getInputStream());
				return "success";
			}
		
	
	//不能上传
		@ResponseBody
		@RequestMapping("/testHttpMessageConverter")
		public String testHttpMessageConverter(@RequestBody String body) {
			System.out.println(body);
			return "helloword" + new Date();
		}
		
	② 下载
		@RequestMapping("/testResponseEntity")
		public ResponseEntity<byte[]> testResponseEntity(HttpSession session)
				throws IOException {
			byte[] body = null;
			ServletContext servletContext = session.getServletContext();
			InputStream in = servletContext.getResourceAsStream("/files/试验田.txt");
			body = new byte[in.available()];
			in.read(body);

			HttpHeaders headers = new HttpHeaders();
			headers.add("Content-Disposition", "attachment;filename=abc.txt");

			HttpStatus statusCode = HttpStatus.OK;

			ResponseEntity<byte[]> response = new ResponseEntity<byte[]>(body,
					headers, statusCode);
			return response;
		}

十四、拦截器
	① 配置文件配置
		<mvc:interceptors>
			<!-- 配置自定义的拦截器 -->
			<bean class="com.smallBug.springmvc.interceptors.FirstInterceptor"></bean>
			
			<!-- 配置拦截器(不)作用的路径 -->
			<mvc:interceptor>
				<mvc:mapping path="/emps"/>
				<bean class="com.smallBug.springmvc.interceptors.SecondInterceptor"></bean>
			</mvc:interceptor>
		</mvc:interceptors>
		
	② 实现 HandlerInterceptor

		public class FirstInterceptor implements HandlerInterceptor{

			/**
			 * 该方法在目标方法之前被调用.
			 * 若返回值为 true, 则继续调用后续的拦截器和目标方法. 
			 * 若返回值为 false, 则不会再调用后续的拦截器和目标方法. 
			 * 
			 * 按配置文件配置顺序，正向执行
			 * 
			 * 可以考虑做权限. 日志, 事务等. 
			 */
			@Override
			public boolean preHandle(HttpServletRequest request,
					HttpServletResponse response, Object handler) throws Exception {
				System.out.println("[FirstInterceptor] preHandle");
				return true;
			}

			/**
			 * 调用目标方法之后, 但渲染视图之前. 
			 * 可以对请求域中的属性或视图做出修改. 
			 * 
			 * 按配置文件配置顺序，反向执行
			 * 
			 */
			@Override
			public void postHandle(HttpServletRequest request,
					HttpServletResponse response, Object handler,
					ModelAndView modelAndView) throws Exception {
				System.out.println("[FirstInterceptor] postHandle");
			}

			/**
			 * 渲染视图之后被调用. 释放资源
			 * 
			 * 按配置文件配置顺序，方向执行
			 * 
			 */
			@Override
			public void afterCompletion(HttpServletRequest request,
					HttpServletResponse response, Object handler, Exception ex)
					throws Exception {
				System.out.println("[FirstInterceptor] afterCompletion");
			}

		}
		
十五、异常处理
	① 特定handler 异常处理
	
		/**
		 * 1. 在 @ExceptionHandler 方法的入参中可以加入 Exception 类型的参数, 该参数即对应发生的异常对象
		 * 2. @ExceptionHandler 方法的入参中不能传入 Map. 若希望把异常信息传导页面上, 需要使用 ModelAndView 作为返回值
		 * 3. @ExceptionHandler 方法标记的异常有优先级的问题. 
		 * 4. @ControllerAdvice: 如果在当前 Handler 中找不到 @ExceptionHandler 方法来出来当前方法出现的异常, 
		 * 则将去 @ControllerAdvice 标记的类中查找 @ExceptionHandler 标记的方法来处理异常. 
		 */
		 
		@ExceptionHandler({ArithmeticException.class})
		public ModelAndView handleArithmeticException(Exception ex){
			System.out.println("出异常了: " + ex);
			ModelAndView mv = new ModelAndView("error");
			mv.addObject("exception", ex);
			return mv;
		}
		
	② 全局异常处理
	
		@ControllerAdvice
		public class SpringMVCTestExceptionHandler {

			@ExceptionHandler({ArithmeticException.class})
			public ModelAndView handleArithmeticException(Exception ex){
				System.out.println("----> 出异常了: " + ex);
				ModelAndView mv = new ModelAndView("error");
				mv.addObject("exception", ex);
				return mv;
			}
			
		}
	
	③ 自定义错误页面（还可定义在方法上）
	
		@ResponseStatus(value=HttpStatus.FORBIDDEN, reason="用户名和密码不匹配!")
		public class UserNameNotMatchPasswordException extends RuntimeException{

			private static final long serialVersionUID = 1L;
		}
		
	④ 配置文件中映射异常
	
		<!-- 配置使用 SimpleMappingExceptionResolver 来映射异常 -->
		<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
			<property name="exceptionAttribute" value="ex"></property>
			<property name="exceptionMappings">
				<props>
					<prop key="java.lang.ArrayIndexOutOfBoundsException">error</prop>
				</props>
			</property>
		</bean>	
		
十六、SpringIOC与SpringMVC整合

	<!--  
		需要进行 Spring 整合 SpringMVC 吗 ?
		还是否需要再加入 Spring 的 IOC 容器 ?
		是否需要再 web.xml 文件中配置启动 Spring IOC 容器的 ContextLoaderListener ?
		
		1. 需要: 通常情况下, 类似于数据源, 事务, 整合其他框架都是放在 Spring 的配置文件中(而不是放在 SpringMVC 的配置文件中).
		实际上放入 Spring 配置文件对应的 IOC 容器中的还有 Service 和 Dao. 
		2. 不需要: 都放在 SpringMVC 的配置文件中. 也可以分多个 Spring 的配置文件, 然后使用 import 节点导入其他的配置文件
	-->
	
	<!--  
		问题: 若 Spring 的 IOC 容器和 SpringMVC 的 IOC 容器扫描的包有重合的部分, 就会导致有的 bean 会被创建 2 次.
		解决:
		1. 使 Spring 的 IOC 容器扫描的包和 SpringMVC 的 IOC 容器扫描的包没有重合的部分. 
		2. 使用 exclude-filter 和 include-filter 子节点来规定只能扫描的注解
	-->
	
	<!--  
		SpringMVC 的 IOC 容器中的 bean 可以来引用 Spring IOC 容器中的 bean. 
		返回来呢 ? 反之则不行. Spring IOC 容器中的 bean 却不能来引用 SpringMVC IOC 容器中的 bean!
	-->
	
	① beans.xml
	
		<context:component-scan base-package="com.smallBug.springmvc">
			<context:exclude-filter type="annotation" 
				expression="org.springframework.stereotype.Controller"/>
			<context:exclude-filter type="annotation" 
				expression="org.springframework.web.bind.annotation.ControllerAdvice"/>
		</context:component-scan>
	
	② SpringMVC.xml
		
		<context:component-scan base-package="com.smallBug.springmvc" use-default-filters="false">
			<context:include-filter type="annotation" 
				expression="org.springframework.stereotype.Controller"/>
			<context:include-filter type="annotation" 
				expression="org.springframework.web.bind.annotation.ControllerAdvice"/>
		</context:component-scan>
		
	③ web.xml
	
		<!-- 配置启动 Spring IOC 容器的 Listener -->
		<!-- needed for ContextLoaderListener -->
		<context-param>
			<param-name>contextConfigLocation</param-name>
			<param-value>classpath:beans.xml</param-value>
		</context-param>

		<!-- Bootstraps the root web application context before servlet initialization -->
		<listener>
			<listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
		</listener>
		
		<servlet>
			<servlet-name>springDispatcherServlet</servlet-name>
			<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
			<init-param>
				<param-name>contextConfigLocation</param-name>
				<param-value>classpath:springmvc.xml</param-value>
			</init-param>
			<load-on-startup>1</load-on-startup>
		</servlet>

		<servlet-mapping>
			<servlet-name>springDispatcherServlet</servlet-name>
			<url-pattern>/</url-pattern>
		</servlet-mapping>



	<!-- 配置直接转发的页面 -->
	<!-- 可以直接相应转发的页面, 而无需再经过 Handler 的方法.  -->
	<mvc:view-controller path="/success" view-name="success"/>


	<mvc:default-servlet-handler/>处理静态资源