package cn.smallbug.jdk.dynamic.impl;

import java.lang.reflect.Method;

public interface MyInvocationHandler {
	/**
	 * 
	 * @timestamp Mar 19, 2016 10:12:33 PM
	 * @param proxy
	 *            被代理对象
	 * @param method
	 *            目标方法
	 * @param args
	 *            方法参数
	 * @return
	 * @throws Throwable
	 */
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable;
}
