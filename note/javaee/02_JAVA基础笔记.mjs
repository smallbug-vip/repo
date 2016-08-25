java基础加强
1、JDK5.0介绍
	新特性
2、静态导入(了解)
	作用：导入类中的静态成员
	语法：import static java.lang.System.out;
	或者import static java.lang.System.*;

3、自动装箱和拆箱
	基本类型---->包装类型：装箱
	包装类型---->基本类型：拆箱

	高速缓存：true、false、byte、介于~128-->+127间的整数 、介于\u0000到\u007F间的字符
	因此这些基本类型的包装类对象，是同一个对象。


4、增强for循环：
	设计的本意：抛弃迭代器
	增强for循环只能遍历数组和实现了Iteratable接口的对象。
	语法：
	for(元素的类型 变量名:数组或实现了Iteratable接口的对象){
		System.out.println(变量名);
	}

	增强for循环的特点：只适合。要想在遍历时改元素的值，请使用传统for循环。


5、可变参数
	可变参数就当做是数组即可。
	一个方法的参数列表中，只能有一个可变参数，且必须放在最后。

6、枚举
7、反射
	反射乃框架设计之灵魂。
	必须先得到类的字节码对象：Class clazz = Class.forName(类的完整类名);

	如何得到类的字节码：
			Class.forName(类的完整类名);
			对象引用名称.getClass();
			类名.class
	在反射方法时，如果方法的参数是一个数组，考虑到向下兼容问题，会按照JDK1.4的语法来对待（JVM会把传递的数组参数拆开，拆开就代表参数的个数不匹配）
	解决办法：防止JVM拆开你的数组
		方式一：把数组看做是一个Object对象
		方式二：重新构建一个Object数组，那个参数数组作为唯一的元素存在。
	
8、内省
	beanutils内省框架(依赖commons-logging)：apache
	www.apache.org
9、泛型
	只给编译器用的。编译完后字节码中没有泛型的。
	泛型：如果等号左右都用到了泛型，必须类型一致。
	ArrayList<Object> list = new ArrayList<String>();错误的

	只有一边使用泛型，另一边不使用泛型是可以的。
	只有引用类型才能作为泛型方法的实际参数
	
Lesson 2

一、注解
1、注解的作用：替代配置文件
2、JDK中提供的三个基本的注解
	@Override:说明是否覆盖了父类的方法。
	@Deprecated：说明过时了。
	@SuppressWarnings：抑制警告
			@SuppressWarnings("抑制的警告的具体类型")：
				unused：变量未使用
				deprecation:使用了不赞成使用的类或方法时的警告
				unchecked：执行了未检查的转换时的警告。比如没有使用泛型
				falthrough：当switch程序块直接通往下一种情况而没有break时的警告
				path：在类路径、源文件路径等中有不存在的路径时的警告。
				serial：当在可序列化雷尚缺少serialVersionUID定义时的警告
				finally：任何finally子句不能正常完成时的警告。
				all：关于以上所有情况的警告。
3、注解学习目标：
	a、自定义注解
	b、反射注解
4、自定义注解的语法：
	注解本身：public @interface MyAnnotation{}
		使用关键字@interface定义一个类而已。这个类就是注解。
	注解中的属性：
		基本形式：类型 属性名称();	
				比如：String name();
					使用：@MyAnnotationDemo1(name="hello")
		特别注意：注解的属性的类型只能是：基本类型、String、Class、枚举、注解类型及以上类型的一维数组。
	注解属性的默认值：
			类型 属性名称() default 默认值;
	注解中的特殊属性：
			类型 value();   使用时,如果只给value设置值，可以这样用：@MyAnnotationDemo1(value="hello")或者@MyAnnotationDemo1("hello")
							  使用时,如果只给value设置值，还要给其他属性设置值，可以这样用：
																		@MyAnnotationDemo1(value="hello",name="aaa")
			类型[] value();
							使用方式如同value。
								使用方式：四种都ok
										//	@MyAnnotationDemo1(value={"a","b"})
										//	@MyAnnotationDemo1({"a","b"})
										//	@MyAnnotationDemo1({"a"})
											@MyAnnotationDemo1("a")
											
5、元注解：
	定义：服务于注解的注解就是元注解。
	***@Retention：注解的保留范围
		RetentionPolicy.SOURCE:注解存在于源文件中
		RetentionPolicy.CLASS:注解存在于源字节码文件中
		RetentionPolicy.RUNTIME:注解存在于运行时
	***@Target：注解出现的位置
	@Documented: 用于指定被该元 Annotation 修饰的 Annotation 类将被 javadoc 工具提取成文档.
	@Inherited: 被它修饰的 Annotation 将具有继承性.如果某个类使用了被 @Inherited 修饰的 Annotation, 则其子类将自动具有该注解
二、Servlet3.0的新规范
1、要求：
	jdk6.0+
	Tomcat7.0+
2、利用注解替代了web.xml配置文件
	@WebServlet：配置Servlet的
	@WebInitParam:配置Servlet、Filter的初始化参数
	@WebFilter：配置过滤器
	@WebListener：注册监听器
	@MultipartConfig//证明客户端提交的表单数据是由多部分组成的