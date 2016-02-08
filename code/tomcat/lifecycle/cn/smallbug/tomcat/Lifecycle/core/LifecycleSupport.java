package cn.smallbug.tomcat.Lifecycle.core;

import cn.smallbug.tomcat.Lifecycle.Lifecycle;
import cn.smallbug.tomcat.Lifecycle.LifecycleListener;

/**
 * Support class to assist in firing LifecycleEvent notifications to registered
 * LifecycleListeners.
 *
 * @author Craig R. McClanahan
 */
public final class LifecycleSupport {

	// ----------------------------------------------------------- Constructors

	/**
	 * Construct a new LifecycleSupport object associated with the specified
	 * Lifecycle component.
	 *
	 * @param lifecycle
	 *            The Lifecycle component that will be the source of events that
	 *            we fire
	 */
	public LifecycleSupport(Lifecycle lifecycle) {

		super();
		this.lifecycle = lifecycle;

	}

	// ----------------------------------------------------- Instance Variables

	/**
	 * The source component for lifecycle events that we will fire.
	 */
	private Lifecycle lifecycle = null;

	/**
	 * The set of registered LifecycleListeners for event notifications.
	 */
	private LifecycleListener listeners[] = new LifecycleListener[0];

	private final Object listenersLock = new Object(); // Lock object for
														// changes to listeners

	// --------------------------------------------------------- Public Methods

	/**
	 * Add a lifecycle event listener to this component.
	 *
	 * @param listener
	 *            The listener to add
	 */
	public void addLifecycleListener(LifecycleListener listener) {

		synchronized (listenersLock) {
			LifecycleListener results[] = new LifecycleListener[listeners.length + 1];
			for (int i = 0; i < listeners.length; i++)
				results[i] = listeners[i];
			results[listeners.length] = listener;
			listeners = results;
		}

	}

	/**
	 * Get the lifecycle listeners associated with this lifecycle. If this
	 * Lifecycle has no listeners registered, a zero-length array is returned.
	 */
	public LifecycleListener[] findLifecycleListeners() {

		return listeners;

	}

	/**
     * 遍历监听器
     * @timestamp Feb 8, 2016 2:13:49 PM
     * @param type 事件类型
     * @param data 事件对象
     */
    public void fireLifecycleEvent(String type, Object data) {
        LifecycleEvent event = new LifecycleEvent(lifecycle, type, data);
        LifecycleListener interested[] = listeners;
        for (int i = 0; i < interested.length; i++)
            interested[i].lifecycleEvent(event);

    }

	/**
	 * Remove a lifecycle event listener from this component.
	 *
	 * @param listener
	 *            The listener to remove
	 */
	public void removeLifecycleListener(LifecycleListener listener) {

		synchronized (listenersLock) {
			int n = -1;
			for (int i = 0; i < listeners.length; i++) {
				if (listeners[i] == listener) {
					n = i;
					break;
				}
			}
			if (n < 0)
				return;
			LifecycleListener results[] = new LifecycleListener[listeners.length - 1];
			int j = 0;
			for (int i = 0; i < listeners.length; i++) {
				if (i != n)
					results[j++] = listeners[i];
			}
			listeners = results;
		}

	}

}
