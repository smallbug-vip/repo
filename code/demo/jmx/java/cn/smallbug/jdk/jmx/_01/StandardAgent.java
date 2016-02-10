package cn.smallbug.jdk.jmx._01;

import javax.management.Attribute;
import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.ObjectName;

import com.sun.jdmk.comm.HtmlAdaptorServer;

/**
 * MBean标准类型
 * 
 * @timestamp Feb 10, 2016 3:44:04 PM
 * @author smallbug
 */
public class StandardAgent {
	private MBeanServer server = MBeanServerFactory.createMBeanServer();
	private ObjectName helloName;

	private void test01() {

		try {
			helloName = new ObjectName("smallbug:name=Bug");
			server.registerMBean(new Bug(), helloName);

			ObjectName adapterName = new ObjectName("StandardAgent:name=htmladapter,port=8082");
			HtmlAdaptorServer adapter = new HtmlAdaptorServer();
			server.registerMBean(adapter, adapterName);
			adapter.start();
			System.out.println("start.....");
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	private void test02() {
		try {
			helloName = new ObjectName("smallbug:name=Bug");
			server.registerMBean(new Bug(), helloName);

			changeProperties();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private void changeProperties() {
		Attribute name = new Attribute("Name", "smallbug");
		Attribute food = new Attribute("Food", "leaves");
		try {
			server.setAttribute(helloName, name);
			server.setAttribute(helloName, food);

			System.out.println("the name is " + server.getAttribute(helloName, "Name"));
			Object[] params = { "beans" };
			String[] sign = { "java.lang.String" };
			server.invoke(helloName, "eat", params, sign);
			String s = (String) server.invoke(helloName, "toString", null, null);
			System.out.println(s);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public static void main(String[] args) {
		StandardAgent agent = new StandardAgent();
		agent.test02();
		// agent.test01();
	}
}
