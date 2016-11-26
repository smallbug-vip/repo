package com.github.smallbug.tool.jdk.annotation;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class MyTesterRunner {

	public static void main(String[] args)
			throws IllegalArgumentException, IllegalAccessException, InvocationTargetException, InstantiationException {
		Class clazz = Dao1ImplTest.class;
		Method ms[] = clazz.getMethods();// 得到测试类上的所有公有方法
		for (Method m : ms) {
			// 得到当前方法上面的@MyTest注解。没有返回null
			MyTest myTest = m.getAnnotation(MyTest.class);
			if (myTest != null) {
				// 说明方法上面有注解
				// 获取注解的timeout取值，如果大于0，说明要测试效率
				long time = myTest.timeout();// 获取注解的timeout属性取值
				if (time < 0) {
					m.invoke(clazz.newInstance(), null);
				}
				else {
					long startTime = System.nanoTime();
					m.invoke(clazz.newInstance(), null);
					long endTime = System.nanoTime();
					long costTime = endTime - startTime;
					if (costTime > time) {
						System.out.println(m.getName() + "超时");
					}
				}
			}
		}
	}

}
