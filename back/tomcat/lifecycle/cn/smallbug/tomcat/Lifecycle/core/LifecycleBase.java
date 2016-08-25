package cn.smallbug.tomcat.Lifecycle.core;

import cn.smallbug.tomcat.Lifecycle.Lifecycle;
import cn.smallbug.tomcat.Lifecycle.LifecycleListener;
import cn.smallbug.tomcat.Lifecycle.LifecycleState;
import cn.smallbug.tomcat.Lifecycle.exception.LifecycleException;

public abstract class LifecycleBase implements Lifecycle {

	private volatile LifecycleState state = LifecycleState.NEW;

	private LifecycleSupport lifecycle = new LifecycleSupport(this);

	@Override
	public void addLifecycleListener(LifecycleListener listener) {
		lifecycle.addLifecycleListener(listener);

	}

	@Override
	public LifecycleListener[] findLifecycleListeners() {
		return lifecycle.findLifecycleListeners();
	}

	@Override
	public void removeLifecycleListener(LifecycleListener listener) {
		lifecycle.removeLifecycleListener(listener);

	}

	/**
	 * 继承Lifecycle类实际调用的初始化方法
	 */
	@Override
	public void init() throws LifecycleException {
		// 如果状态不是NEW抛异常
		if (!state.equals(LifecycleState.NEW)) {
			invalidTransition(Lifecycle.BEFORE_INIT_EVENT);
		}
		// 设置状态为INITIALIZING
		setStateInternal(LifecycleState.INITIALIZING, null, false);
		try {
			// 调用子类（Server或Service等）的initInternal()方法
			initInternal();
		} catch (Throwable t) {
			throw new RuntimeException(t);
		}
		// 改变状态为初始化完成
		setStateInternal(LifecycleState.INITIALIZED, null, false);
	}

	protected abstract void initInternal() throws LifecycleException;

	@Override
	public void start() throws LifecycleException {
		if (LifecycleState.STARTING_PREP.equals(state) || LifecycleState.STARTING.equals(state) || LifecycleState.STARTED.equals(state)) {
			return;
		}
		if (state.equals(LifecycleState.NEW)) {
			init();
		} else if (state.equals(LifecycleState.FAILED)) {
			stop();
		} else if (!state.equals(LifecycleState.INITIALIZED) && !state.equals(LifecycleState.STOPPED)) {
			invalidTransition(Lifecycle.BEFORE_START_EVENT);
		}
		setStateInternal(LifecycleState.STARTING_PREP, null, false);

		try {
			// 调用子类的startInternal
			startInternal();
		} catch (Throwable t) {
			setStateInternal(LifecycleState.FAILED, null, false);
			throw new RuntimeException("lifecycleBase.startFail");
		}
		if (state.equals(LifecycleState.FAILED) || state.equals(LifecycleState.MUST_STOP)) {
			stop();
		} else {
			if (!state.equals(LifecycleState.STARTING)) {
				invalidTransition(Lifecycle.AFTER_START_EVENT);
			}

			setStateInternal(LifecycleState.STARTED, null, false);
		}
	}

	protected abstract void startInternal() throws LifecycleException;

	@Override
	public void stop() throws LifecycleException {
		if (LifecycleState.STOPPING_PREP.equals(state) || LifecycleState.STOPPING.equals(state) || LifecycleState.STOPPED.equals(state)) {

			return;
		}
		if (state.equals(LifecycleState.NEW)) {
			state = LifecycleState.STOPPED;
			return;
		}

		if (!state.equals(LifecycleState.STARTED) && !state.equals(LifecycleState.FAILED) && !state.equals(LifecycleState.MUST_STOP)) {
			invalidTransition(Lifecycle.BEFORE_STOP_EVENT);
		}

		if (state.equals(LifecycleState.FAILED)) {
			fireLifecycleEvent(BEFORE_STOP_EVENT, null);
		} else {
			setStateInternal(LifecycleState.STOPPING_PREP, null, false);
		}

		try {
			stopInternal();
		} catch (Throwable t) {
			throw new LifecycleException("lifecycleBase.stopFail");
		}

		if (state.equals(LifecycleState.MUST_DESTROY)) {
			setStateInternal(LifecycleState.STOPPED, null, false);

			destroy();
		} else if (!state.equals(LifecycleState.FAILED)) {
			if (!state.equals(LifecycleState.STOPPING)) {
				invalidTransition(Lifecycle.AFTER_STOP_EVENT);
			}
			setStateInternal(LifecycleState.STOPPED, null, false);
		}

	}

	protected abstract void stopInternal() throws LifecycleException;

	@Override
	public void destroy() throws LifecycleException {
		if (LifecycleState.FAILED.equals(state)) {
			try {
				// Triggers clean-up
				stop();
			} catch (LifecycleException e) {
			}
		}

		if (LifecycleState.DESTROYING.equals(state) || LifecycleState.DESTROYED.equals(state)) {

			return;
		}

		if (!state.equals(LifecycleState.STOPPED) && !state.equals(LifecycleState.FAILED) && !state.equals(LifecycleState.NEW) && !state.equals(LifecycleState.INITIALIZED)) {
			invalidTransition(Lifecycle.BEFORE_DESTROY_EVENT);
		}

		setStateInternal(LifecycleState.DESTROYING, null, false);

		try {
			destroyInternal();
		} catch (Throwable t) {
			throw new LifecycleException("lifecycleBase.destroyFail");
		}

		setStateInternal(LifecycleState.DESTROYED, null, false);
	}

	protected abstract void destroyInternal() throws LifecycleException;

	@Override
	public LifecycleState getState() {
		return state;
	}

	@Override
	public String getStateName() {
		return getState().toString();
	}

	private void invalidTransition(String type) throws LifecycleException {
		throw new LifecycleException("lifecycleBase.invalidTransition");
	}

	private synchronized void setStateInternal(LifecycleState state, Object data, boolean check) throws LifecycleException {

		// 是否进行状态安全检查
		if (check) {
			if (state == null) {
				invalidTransition("null");
				return;
			}

			if (!(state == LifecycleState.FAILED || (this.state == LifecycleState.STARTING_PREP && state == LifecycleState.STARTING)
					|| (this.state == LifecycleState.STOPPING_PREP && state == LifecycleState.STOPPING)
					|| (this.state == LifecycleState.FAILED && state == LifecycleState.STOPPING))) {
				invalidTransition(state.name());
			}
		}

		// 改变状态
		this.state = state;
		// 得到事件名称
		String lifecycleEvent = state.getLifecycleEvent();
		if (lifecycleEvent != null) {
			fireLifecycleEvent(lifecycleEvent, data);
		}
	}

	protected void fireLifecycleEvent(String type, Object data) {
		lifecycle.fireLifecycleEvent(type, data);
	}

	protected synchronized void setState(LifecycleState state) throws LifecycleException {
		setStateInternal(state, null, true);
	}

}
