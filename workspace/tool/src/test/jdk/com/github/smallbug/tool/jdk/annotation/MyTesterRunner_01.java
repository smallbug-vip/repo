package com.github.smallbug.tool.jdk.annotation;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MyTesterRunner_01 {

	public static void main(String[] args)
			throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException {
		Class clazz = DaoImplTest_01.class;
		Method ms[] = clazz.getMethods();// 得到测试类上的所有公有方法
		for (Method m : ms) {
			// 判断当前方法上面有没有@MyTest注解
			boolean b = m.isAnnotationPresent(MyTest_01.class);
// System.out.println(m.getName()+"有没有："+b);
			if (b) {
				m.invoke(clazz.newInstance(), null);
			}
		}
	}

}
