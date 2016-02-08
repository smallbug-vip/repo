package cn.smallbug.tomcat.Lifecycle.listener;

import cn.smallbug.tomcat.Lifecycle.Lifecycle;
import cn.smallbug.tomcat.Lifecycle.LifecycleListener;
import cn.smallbug.tomcat.Lifecycle.core.LifecycleEvent;

/**
 * 安全监听器
 * 
 * @timestamp Feb 8, 2016 2:20:14 PM
 * @author smallbug
 */
public class SecurityListener implements LifecycleListener {

	@Override
	public void lifecycleEvent(LifecycleEvent event) {
		// 如果是 before_init状态
		if (Lifecycle.BEFORE_INIT_EVENT.equals(event.getType()))
			System.out.println("初始化之前进行安全检查!");
	}

}
