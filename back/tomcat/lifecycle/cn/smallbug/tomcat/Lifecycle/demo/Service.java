package cn.smallbug.tomcat.Lifecycle.demo;

import cn.smallbug.tomcat.Lifecycle.LifecycleState;
import cn.smallbug.tomcat.Lifecycle.core.LifecycleMBeanBase;
import cn.smallbug.tomcat.Lifecycle.exception.LifecycleException;

public class Service extends LifecycleMBeanBase {

	private Server server = null;

	public void setServer(Server server) {
		this.server = server;
	}

	@Override
	protected void startInternal() throws LifecycleException {
		setState(LifecycleState.STARTING);

		// Start our defined Container first

		// Start our defined Connectors second
	}

	@Override
	protected void initInternal() throws LifecycleException {
		// 先调用父类LifecycleMBeanBase的initInternal()方法，执行初始化的公共部分
		super.initInternal();
	}

	@Override
	protected void destroyInternal() throws LifecycleException {
		super.destroyInternal();
	}

}
