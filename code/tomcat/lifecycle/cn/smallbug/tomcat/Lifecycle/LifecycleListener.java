package cn.smallbug.tomcat.Lifecycle;

import cn.smallbug.tomcat.Lifecycle.core.LifecycleEvent;

/**
 * 
 * @timestamp Feb 7, 2016 4:34:22 PM
 * @author smallbug
 */
public interface LifecycleListener {

	/**
	 * Acknowledge the occurrence of the specified event.
	 *
	 * @param event
	 *            LifecycleEvent that has occurred
	 */
	public void lifecycleEvent(LifecycleEvent event);

}
