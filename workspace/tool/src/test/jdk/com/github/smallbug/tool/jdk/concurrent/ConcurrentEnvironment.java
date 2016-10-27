package com.github.smallbug.tool.jdk.concurrent;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.TimeUnit;

/**
 * 
 * 提供并发测试环境
 *
 * @version 2016年10月24日
 * @since JDK1.6
 *
 */
public abstract class ConcurrentEnvironment {

	private CyclicBarrier cb = null;
	private CountDownLatch back = null;
	private int num = 0;

	public ConcurrentEnvironment(int num) {
		this.num = num;
		cb = new CyclicBarrier(num);
		back = new CountDownLatch(num);
	}

	public void start() {
		for (int i = 0; i < num; i++) {
			new Thread(new Work()).start();
		}
		try {
			back.await(10, TimeUnit.SECONDS);
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

	protected abstract void testCode();

	private class Work implements Runnable {
		@Override
		public void run() {
			try {
				cb.await();
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			testCode();
			back.countDown();
		}

	}
}
