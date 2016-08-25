package cn.smallbug.jdk.dynamic.impl;

import java.lang.reflect.Method;

public class ProxyBean implements MyInvocationHandler {

	private Object target;

	public ProxyBean(Object target) {
		this.target = target;
	}

	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

		if ("eat".equals(method.getName())) {
			return method.invoke(target, args);
		} else if ("aa".equals(method.getName())) {
			return method.invoke(target, args);
		}
		return method.invoke(target, args);
	}

	public Object getTarget() {
		return target;
	}

}
