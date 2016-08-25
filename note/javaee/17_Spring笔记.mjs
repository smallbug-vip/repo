一、IOC/DI
	1、创建对象的三种方式
		<1>	对象直接创建
			<bean name="userDao" class="com.mjs.a_helloword.UserDaoImpl">
		
		<2>	对象工厂静态方法创建
			<bean name="userDao2" class="com.mjs.b_beanInstance.StaticDaoFactory" factory-method="createUserDaoInstance">
		
		<3>	实例化工厂创建
			<bean name="daoFactory" class="com.mjs.b_beanInstance.DaoFactory2"></bean>
			<bean name="userDao3" factory-bean="daoFactory" factory-method="createUserDao"></bean>
	2、创建对象的时机
		<单例>（默认）
			加载方式：
				饿汉式（默认）
				懒汉式（lazy-init="true"）
			
		<多例>（scope="prototype"）
			加载方式：
				对象在使用的时候才被创建
		附加：
			scope=="singleton/prototype/request/session/global session"
	3、对象的生命周期
		<单例>
			1、调用对象的构造方法
			2、执行init方法	（init-method="init"）
			3、调用自己的方法	
			4、当spring容器关闭的时候执行destroy方法	（destroy-method="destroy"）
		<多例>
			执行init方法后托管
	4、DI （依赖注入）
		<1>使用javaBean中的getXxx/setXxx属性注入
			<property name="jdbcUrl" value="jdbc:mysql://localhost:3306/test01"></property>
			
		<2>如果spring的配置文件中的bean中没有<constructor-arg>该元素，则调用默认的构造函数
		
		<3>如果spring的配置文件中的bean中有<constructor-arg>该元素，则该元素确定唯一的构造函数
			  index  代表参数的位置  从0开始计算
			  type   指的是参数的类型
			  value  给基本类型赋值
			  ref    给引用类型赋值
	5、注解
		<1>@Resource注解的使用规则：
			a、在spring的配置文件中导入命名空间
				 xmlns:context="http://www.springframework.org/schema/context"
								 http://www.springframework.org/schema/context
								 http://www.springframework.org/schema/context/spring-context-2.5.xsd
			b、引入注解解析器
					<context:annotation-config></context:annotation-config>
			c、在spring的配置文件中把 Student（被依赖对象） 的bean引入进来
			d、在一个类的属性上加
				@Resource(name="username")
		<2>类扫描的注解：
			  a、在spring的配置文件中导入命名空间
				 xmlns:context="http://www.springframework.org/schema/context"
				 http://www.springframework.org/schema/context
				 http://www.springframework.org/schema/context/spring-context-2.5.xsd
			  b、<context:component-scan base-package="cn.itcast.annotation.scan"></context:component-scan>
				   1、 该注解解析器包含了两个功能：依赖注入和类扫描
				   2、在base-package包及子包下查找所有的类
			  c、如果一个类上加了@Component注解，就会进行如下的法则
					如果其value属性的值为""
						  @Component
						  public class Person {}
						  ==
						  <bean id="person" class="..Person">
				   如果其value属性的值不为""
						  @Component("p")
						  public class Person {}
						  ==
						  <bean id="p" class="..Person">
			  d、按照@Resource的法则再次进行操作
		<3>
			依赖注入
				@Resource
				@Autowired
				@Qualifier
			类扫描
				@Component
				@Controller
				@Repository
				@Service
	6、关于继承
		   <1>	如果一个类在spring配置文件中，但是不想让整个类创建对象，则用abstract="true"
		   <2>	如果让一个子类拥有父类的属性值，则parent="commonDao"

二、AOP
	1、概念
		<1>Aspect（切面） ： 事务、日志、安全性框架、权限等都是切面
		
		<2>joinpoint(连接点) ： 目标类的目标方法。（由客户端在调用的时候决定）
		
		<3>Pointcut（切入点） ： 只有符合切入点，才能让通知和目标方法结合在一起。所谓切入点是指我们要对那些拦截的方法的定义.
			
		<4>Advice（通知） ： 切面中的方法就是通知
			
		<5>Targect（目标类） ： 代理的目标对象 
		
		<6>Weaving（织入）： 形成代理对象的方法的过程
		
	2、切入点表达式
		execution（public * *（..））  所有的公共方法

		execution（* set*（..））  以set开头的任意方法

		execution（* com.xyz.service.AccountService.*（..）） com.xyz.service.AccountService类中的所有的方法

		execution（* com.xyz.service.*.*（..））  com.xyz.service包中的所有的类的所有的方法

		execution（* com.xyz.service..*.*（..）） com.xyz.service包及子包中所有的类的所有的方法

		execution(* cn.itcast.spring.sh..*.*(String,?,Integer))  cn.itcast.spring.sh包及子包中所有的类的有三个参数
																	第一个参数为String,第二个参数为任意类型，
																	第三个参数为Integer类型的方法
	3、springAOP的具体加载步骤：
		   <1> 当spring容器启动的时候，加载了spring的配置文件
		   <2> 为配置文件中所有的bean创建对象
		   <3> spring容器会解析aop:config的配置 
			   1、解析切入点表达式，用切入点表达式和纳入spring容器中的bean做匹配
					如果匹配成功，则会为该bean创建代理对象，代理对象的方法=目标方法+通知
					如果匹配不成功，不会创建代理对象
		   <4> 在客户端利用context.getBean获取对象时，如果该对象有代理对象则返回代理对象，如果代理对象，则返回目标对象

		说明：如果目标类没有实现接口，则spring容器会采用cglib的方式产生代理对象，如果实现了接口，会采用jdk的方式
		
	4、通知
		<1>前置通知  <aop:before method="privilege" pointcut-ref="salary"/>
		  a、在目标方法执行之前执行
		  b、无论目标方法是否抛出异常，都执行，因为在执行前置通知的时候，目标方法还没有执行，还没有遇到异常
		  
		<2>后置通知  
		  a、在目标方法执行之后执行  <aop:after-returning method="logging" pointcut-ref="salary" returning="nihao"/>
		  b、当目标方法遇到异常，后置通知将不再执行
		  c、后置通知可以接受目标方法的返回值，但是必须注意： 
				   后置通知的参数的名称和配置文件中returning="var"的值是一致的
				   
		<3>最终通知：<aop:after method="logging" pointcut-ref="salary"/>
		  a、在目标方法执行之后执行
		  b、无论目标方法是否抛出异常，都执行，因为相当于finally
		  
		<4>异常通知
		  a、接受目标方法抛出的异常信息
		  b、步骤
			   在异常通知方法中有一个参数Throwable  ex
			   在配置文件中
				  <aop:after-throwing method="throwingMethod" pointcut-ref="salary" throwing="ex"/>
				  
		<5>环绕通知
		  a、如果不在环绕通知中调用ProceedingJoinPoint的proceed，目标方法不会执行
		  b、环绕通知可以控制目标方法的执行

		<6>这5种类型的通知，在内部调用时这样组织 
			try{ 
			
		环绕通知在后：	调用前置通知 				环绕通知在前：		环绕前置处理
						环绕前置处理 									调用前置通知
						调用目标对象方法    							调用目标对象方法
						环绕后置处理 									调用后置通知
						调用后置通知 									环绕后置处理
						
			}catch(Exception e){ 
				调用异常通知 
			}finally{ 
				调用最终通知 
			} 

三、Spring的JDBC操作

	<bean
		class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
		<property name="locations">
			<value>classpath:jdbc.properties</value>
		</property>
	</bean>

	<bean id="dataSource" destroy-method="close"
		class="org.apache.commons.dbcp.BasicDataSource">
		<property name="driverClassName" value="${jdbc.driverClassName}" />
		<property name="url" value="${jdbc.url}" />
		<property name="username" value="${jdbc.username}" />
		<property name="password" value="${jdbc.password}" />
	</bean>
	
	<bean id="transactionManager"
		class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
		<property name="dataSource">
			<ref bean="dataSource" />
		</property>
	</bean>
	
	<tx:advice id="tx" transaction-manager="transactionManager">
		<tx:attributes>
			<tx:method name="save*" read-only="false" />
		</tx:attributes>
	</tx:advice>
	
	<aop:config>
		<aop:pointcut expression="execution(* com.mjs.service.impl.*.* (..))"
			id="perform" />
			<aop:advisor advice-ref="tx" pointcut-ref="perform" />
	</aop:config>
		
四、Spring的HIbernate操作
	<bean
		class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
		<property name="locations">
			<value>classpath:jdbc.properties</value>
		</property>
	</bean>
	
	<bean id="dataSource" destroy-method="close"
		class="org.apache.commons.dbcp.BasicDataSource">
		<property name="driverClassName" value="${jdbc.driverClassName}" />
		<property name="url" value="${jdbc.url}" />
		<property name="username" value="${jdbc.username}" />
		<property name="password" value="${jdbc.password}" />
	</bean>
	
	<bean id="sessionFactory" class="org.springframework.orm.hibernate3.LocalSessionFactoryBean">
		<property name="configLocation">
			<value>classpath:hibernate.cfg.xml</value>
		</property>
	</bean>
	
	<bean id="transactionManager" class="org.springframework.orm.hibernate3.HibernateTransactionManager">
		<property name="sessionFactory">
			<ref bean="sessionFactory"/>
		</property>
	</bean>
	
	<tx:advice id="tx" transaction-manager="transactionManager">
		<tx:attributes>
			<tx:method name="save*" read-only="false" />
		</tx:attributes>
	</tx:advice>
	
	<aop:config>
		<aop:pointcut expression="execution(* com.mjs.hibernate.dao.impl.*.* (..))" id="perform"/>
		<aop:advisor advice-ref="tx" pointcut-ref="perform"/>
	</aop:config>
	
五、声明式事务处理

六、Spring4 Jar包详解

	Spring AOP：Spring的面向切面编程，提供AOP（面向切面编程）的实现
	
	Spring Aspects：Spring提供的对AspectJ框架的整合
	
	Spring Beans：Spring IOC的基础实现，包含访问配置文件、创建和管理bean等。
	
	Spring Context：在基础IOC功能上提供扩展服务，此外还提供许多企业级服务的支持，
		有邮件服务、任务调度、JNDI定位，EJB集成、远程访问、缓存以及多种视图层框架的支持。
		
	Spring Context Support：Spring context的扩展支持，用于MVC方面。
	
	Spring Core：Spring的核心工具包
	
	Spring expression：Spring表达式语言
	
	Spring Instrument：Spring对服务器的代理接口
	
	Spring Instrument Tomcat：Spring对tomcat连接池的集成
	
	Spring JDBC：对JDBC 的简单封装
	
	Spring JMS：为简化jms api的使用而做的简单封装
	
	Spring orm：整合第三方的orm实现，如hibernate，ibatis，jdo以及spring 的jpa实现
	
	Spring oxm：Spring对于object/xml映射的支持，可以让JAVA与XML之间来回切换
	
	Spring test：对JUNIT等测试框架的简单封装
	
	Spring tx：为JDBC、Hibernate、JDO、JPA等提供的一致的声明式和编程式事务管理。
	
	Spring web：包含Web应用开发时，用到Spring框架时所需的核心类，包括自动载入WebApplicationContext
		特性的类、Struts与JSF集成类、文件上传的支持类、Filter类和大量工具辅助类。
		
	Spring webmvc：包含SpringMVC框架相关的所有类。包含国际化、标签、Theme、视图展现的FreeMarker、
		JasperReports、Tiles、Velocity、XSLT相关类。当然，如果你的应用使用了独立的MVC框架，
		则无需这个JAR文件里的任何类。
		
	Spring webmvc portlet：Spring MVC的增强


if [ $have_tty -eq 1 ]; then
  JAVA_OPTS="-server -XX:PermSize=64M -XX:MaxPermSize=128m 



  spring

  AOP核心：将除了核心业务以外的其他需要重复调用的业务分模块切分成功能鲜明的切面

  日志处理
  安全监测
  权限检测
  对象缓存
  异常处理
  统计方法执行时间