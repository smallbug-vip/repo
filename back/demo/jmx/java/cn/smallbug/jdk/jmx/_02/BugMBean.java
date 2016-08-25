package cn.smallbug.jdk.jmx._02;

import javax.management.Attribute;
import javax.management.AttributeNotFoundException;
import javax.management.MBeanException;
import javax.management.ReflectionException;
import javax.management.RuntimeOperationsException;

import org.apache.commons.modeler.BaseModelMBean;

public class BugMBean extends BaseModelMBean {

	public BugMBean() throws MBeanException, RuntimeOperationsException {
		super();
	}

	@Override
	public String getClassName() {

		return (this.resource.getClass().getName());

	}

	@Override
	public Object getAttribute(String name) throws AttributeNotFoundException, MBeanException, ReflectionException {
		System.out.println("-------------------" + name);
		return super.getAttribute(name);
	}

	@Override
	public void setAttribute(Attribute attribute) throws AttributeNotFoundException, MBeanException, ReflectionException {
		System.out.println("+++++++++++++++++++" + attribute);
		super.setAttribute(attribute);
	}

}
