package cn.smallbug.tomcat.Lifecycle.demo;

import cn.smallbug.tomcat.Lifecycle.LifecycleState;
import cn.smallbug.tomcat.Lifecycle.core.LifecycleMBeanBase;
import cn.smallbug.tomcat.Lifecycle.exception.LifecycleException;

public class Server extends LifecycleMBeanBase {

	private Service services[] = new Service[0];

	/**
	 * 添加一个service
	 * 
	 * @timestamp Feb 7, 2016 5:46:38 PM
	 * @param service
	 */
	public void addService(Service service) {

		service.setServer(this);

		synchronized (services) {
			Service results[] = new Service[services.length + 1];
			System.arraycopy(services, 0, results, 0, services.length);
			results[services.length] = service;
			services = results;

			if (getState().isAvailable()) {
				try {
					service.start();
				} catch (LifecycleException e) {

				}
			}
		}
		// 通知状态改变监听器
	}

	/**
	 * 删除一个service
	 * 
	 * @timestamp Feb 7, 2016 5:46:53 PM
	 * @param service
	 */
	public void removeService(Service service) {

		synchronized (services) {
			int j = -1;
			for (int i = 0; i < services.length; i++) {
				if (service == services[i]) {
					j = i;
					break;
				}
			}
			if (j < 0)
				return;
			try {
				services[j].stop();
			} catch (LifecycleException e) {
				// Ignore
			}
			int k = 0;
			Service results[] = new Service[services.length - 1];
			for (int i = 0; i < services.length; i++) {
				if (i != j)
					results[k++] = services[i];
			}
			services = results;
			// 通知状态改变监听器
		}
	}

	/**
	 * 初始化server
	 */
	@Override
	protected void initInternal() throws LifecycleException {
		// 先调用父类LifecycleMBeanBase的initInternal()方法，执行初始化的公共部分
		super.initInternal();

		// 如果service不为空，依次调用service的初始化
		for (int i = 0; i < services.length; i++) {
			services[i].init();
		}
	}

	@Override
	protected void stopInternal() throws LifecycleException {

		// setState(LifecycleState.STOPPING);
		fireLifecycleEvent(CONFIGURE_STOP_EVENT, null);

		// Stop our defined Services
		for (int i = 0; i < services.length; i++) {
			services[i].stop();
		}
	}

	@Override
	protected void startInternal() throws LifecycleException {

		fireLifecycleEvent(CONFIGURE_START_EVENT, null);
		setState(LifecycleState.STARTING);

		// Start our defined Services
		synchronized (services) {
			for (int i = 0; i < services.length; i++) {
				services[i].start();
			}
		}
	}

}
