package cn.smallbug.jdk.jmx._02;

import java.io.InputStream;
import java.net.URL;

import javax.management.Attribute;
import javax.management.MBeanServer;
import javax.management.MalformedObjectNameException;
import javax.management.ObjectName;
import javax.management.modelmbean.ModelMBean;

import org.apache.commons.modeler.ManagedBean;
import org.apache.commons.modeler.Registry;

public class ModelAgent {
	private Registry registry;
	private MBeanServer mBeanServer;

	public ModelAgent() {
		registry = createRegistry();
		try {
			mBeanServer = Registry.getServer();
		} catch (Throwable t) {
			t.printStackTrace(System.out);
			System.exit(1);
		}
	}

	public MBeanServer getMBeanServer() {
		return mBeanServer;
	}

	public Registry createRegistry() {
		Registry registry = null;
		try {
			URL url = ModelAgent.class.getResource("/jmx/bug-mbean.xml");
			InputStream stream = url.openStream();
			Registry.loadRegistry(stream);
			stream.close();
			registry = Registry.getRegistry();
		} catch (Throwable t) {
			System.out.println(t.toString());
		}
		return (registry);
	}

	public ModelMBean createModelMBean(String mBeanName) throws Exception {
		ManagedBean managed = registry.findManagedBean(mBeanName);
		if (managed == null) {
			System.out.println("ManagedBean null");
			return null;
		}
		ModelMBean mbean = managed.createMBean();
		ObjectName objectName = createObjectName();
		return mbean;
	}

	private ObjectName createObjectName() {
		ObjectName objectName = null;
		String domain = mBeanServer.getDefaultDomain();
		try {
			objectName = new ObjectName(domain + ":type=MyCar");
		} catch (MalformedObjectNameException e) {
			e.printStackTrace();
		}
		return objectName;
	}

	public static void main(String[] args) {
		ModelAgent agent = new ModelAgent();
		MBeanServer mBeanServer = agent.getMBeanServer();
		Bug bug = new Bug();
		System.out.println("Creating ObjectName");
		ObjectName objectName = agent.createObjectName();
		try {
			ModelMBean modelMBean = agent.createModelMBean("myMBean");
			modelMBean.setManagedResource(bug, "ObjectReference");
			mBeanServer.registerMBean(modelMBean, objectName);
		} catch (Exception e) {
			System.out.println(e.toString());
		}
		// manage the bean
		try {
			Attribute name = new Attribute("Name", "smallbug");
			Attribute food = new Attribute("Food", "leaves");
			mBeanServer.setAttribute(objectName, name);
			mBeanServer.setAttribute(objectName, food);
			String color = (String) mBeanServer.getAttribute(objectName, "Name");
			System.out.println("Name:" + color);

			Object[] params = { "beans" };
			String[] sign = { "java.lang.String" };
			mBeanServer.invoke(objectName, "eat", params, sign);
			String s = (String) mBeanServer.invoke(objectName, "toString", null, null);
			System.out.println(s);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
