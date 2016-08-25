package cn.smallbug.tomcat.Lifecycle.demo;

import cn.smallbug.tomcat.Lifecycle.listener.SecurityListener;

public class LifecycleDemo {

	public static void main(String[] args) throws Exception {
		// 初始化Server
		Server server = new Server();
		// 初始化Service
		Service service = new Service();

		// 建立Server和Service关系
		server.addService(service);
		// 初始化监听器
		SecurityListener listener = new SecurityListener();
		// 建立监听器与Server的关系
		server.addLifecycleListener(listener);
		// 初始化server
		server.init();
		server.start();
	}
}
