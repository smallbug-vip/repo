package cn.smallbug.jdk.dynamic.impl;

/**
 * 测试类
 * 
 * @timestamp Mar 19, 2016 10:28:51 PM
 * @author smallbug
 */
public class ProxyTest {

	public static void main(String[] args) {

		Smallbug smallbug = new Smallbug();

		MyInvocationHandler handler = new ProxyBean(smallbug);

		SmallbugInterface smallProxy = (SmallbugInterface) MyProxy//
				.newProxyInstance(//
						ProxyTest.class.getClassLoader(), //
						smallbug.getClass().getInterfaces(), //
						handler);

		System.out.println(smallProxy);
		int num = smallProxy.eat("leaves");
		System.out.println("eat " + num + " !");
		String str = smallProxy.aa("smallbug", 19);
		System.out.println("smallbug -> " + str);
	}
}
