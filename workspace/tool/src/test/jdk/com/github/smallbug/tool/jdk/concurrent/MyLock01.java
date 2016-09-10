package com.github.smallbug.tool.jdk.concurrent;

import java.util.concurrent.locks.AbstractQueuedSynchronizer;

/**
 * 
 * 使用AQS自定义自旋锁
 * 
 * @version 2016年8月26日
 * @author i-jiashuomeng
 * @since JDK1.6
 *
 */
public class MyLock01 implements Lock {

	private final Sync lock = new Sync();

	@Override
	public void lock() {
		lock.acquire(1);

	}

	@Override
	public void unlock() {
		lock.release(0);
	}

	public static class Sync extends AbstractQueuedSynchronizer {

		/**
		 * 
		 */
		private static final long serialVersionUID = -4516145595748975600L;

		@Override
		protected boolean tryAcquire(int arg) {
			if (compareAndSetState(0, 1)) {
				setExclusiveOwnerThread(Thread.currentThread());
				return true;
			}
			for (int n = 3; n-- > 0;) {
				for (int i = 10; getState() == 0 && i-- > 0;) {

				}
				if (compareAndSetState(0, 1)) {
					setExclusiveOwnerThread(Thread.currentThread());
					return true;
				}
			}
			return false;
		}

		@Override
		protected boolean tryRelease(int arg) {
			if (getState() == 0)
				throw new IllegalMonitorStateException();
			setExclusiveOwnerThread(null);
			setState(arg);
			return true;
		}

		@Override
		protected boolean isHeldExclusively() {
			return getState() == 1;
		}

	}

}
