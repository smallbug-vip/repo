package cn.smallbug.tomcat.Lifecycle.core;

import javax.management.ObjectName;

import cn.smallbug.tomcat.Lifecycle.LifecycleListener;
import cn.smallbug.tomcat.Lifecycle.LifecycleState;
import cn.smallbug.tomcat.Lifecycle.MBeanRegistration;
import cn.smallbug.tomcat.Lifecycle.MBeanServer;
import cn.smallbug.tomcat.Lifecycle.exception.LifecycleException;

public class LifecycleMBeanBase extends LifecycleBase implements MBeanRegistration {

	@Override
	public void addLifecycleListener(LifecycleListener listener) {
		super.addLifecycleListener(listener);
	}

	@Override
	public LifecycleListener[] findLifecycleListeners() {
		return super.findLifecycleListeners();
	}

	@Override
	public void removeLifecycleListener(LifecycleListener listener) {
		super.removeLifecycleListener(listener);
	}

	@Override
	public void init() throws LifecycleException {
		super.init();

	}

	@Override
	public void start() throws LifecycleException {
		super.start();

	}

	@Override
	public void stop() throws LifecycleException {
		super.stop();

	}

	@Override
	public void destroy() throws LifecycleException {
		super.destroy();

	}

	@Override
	public LifecycleState getState() {

		return super.getState();
	}

	@Override
	public String getStateName() {
		return super.getStateName();
	}

	@Override
	public ObjectName preRegister(MBeanServer server, ObjectName name) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void postRegister(Boolean registrationDone) {
		// TODO Auto-generated method stub

	}

	@Override
	public void preDeregister() throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postDeregister() {
		// TODO Auto-generated method stub

	}

	@Override
	protected void initInternal() throws LifecycleException {
		// TODO Auto-generated method stub
		System.out.println("将组件注册到JMX服务器中");
	}

	@Override
	protected void startInternal() throws LifecycleException {

	}

	@Override
	protected void stopInternal() throws LifecycleException {
		// TODO Auto-generated method stub

	}

	@Override
	protected void destroyInternal() throws LifecycleException {
		// TODO Auto-generated method stub

	}

}
