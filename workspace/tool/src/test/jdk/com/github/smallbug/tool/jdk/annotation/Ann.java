package com.github.smallbug.tool.jdk.annotation;

//注解用@interface声明。注解也是一个类
//注解属性的类型只能是：基本类型、String、Class、注解、枚举及以上类型的一维数组
public @interface Ann {
	// 定义注解属性：属性类型 属性名() [default 默认值];
	String name() default "";// 注解属性，没有默认值。

	int age() default 18;// 注解属性，有默认值。使用时可以不用给定值

	String url() default "";

	Param[] params();

	String[] values() default "";

	String value() default "";
}

// 最基本的注解使用
class Demo1 {

	@Ann(name = "张三", age = 28, params = {})
	public void m1() {

	}
}

// 嵌套注解的使用
class Demo2 {
	@Ann(url = "/servlet/Demo1", params = {@Param(name = "encoding", value = "UTF-8", description = "编码"),
			@Param(name = "aaa", value = "bbb", description = "ccc")})
	public void m1() {

	}

}

// 特殊属性value的使用
class Demo3 {
	@Ann(params = {})
	// 给的value
	public void m1() {

	}

	@Ann(value = "abc", name = "def", params = {})
	public void m2() {

	}
}

// 数组属性的使用
class Demo4 {
	@Ann(values = "abc", params = {@Param})
	// 指定一个值
	public void m1() {

	}

	@Ann(values = {"abc", "def"}, params = {@Param})
	// 指定多个值
	public void m2() {

	}

	@Ann(values = {"abc", "def"}, params = {@Param})
	// 指定多个值
	public void m3() {

	}
}
