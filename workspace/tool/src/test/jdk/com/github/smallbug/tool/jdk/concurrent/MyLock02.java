package com.github.smallbug.tool.jdk.concurrent;

import java.util.concurrent.locks.AbstractQueuedSynchronizer;

/**
 * 同一时间只允许2个线程进入
 * 
 * @timestamp 2016年8月22日 下午1:50:03
 * @author i-jiashuomeng
 */
public class MyLock02 implements Lock {

	@Override
	public void lock() {
		sync.acquireShared(1);

	}

	@Override
	public void unlock() {
		sync.releaseShared(1);

	}

	private final Sync sync = new Sync(2);

	private static final class Sync extends AbstractQueuedSynchronizer {
		/**
		 * 
		 */
		private static final long serialVersionUID = -7061829770751760225L;

		Sync(int count) {
			if (count <= 0) {
				throw new IllegalArgumentException("count must large than zero.");
			}
			setState(count);
		}

		public int tryAcquireShared(int reduceCount) {
			for (;;) {
				int current = getState();
				int newCount = current - reduceCount;
				if (newCount < 0 || compareAndSetState(current, newCount)) {
					return newCount;
				}
			}
		}

		public boolean tryReleaseShared(int returnCount) {
			for (;;) {
				int current = getState();
				int newCount = current + returnCount;
				if (compareAndSetState(current, newCount)) {
					return true;
				}
			}
		}
	}
}
