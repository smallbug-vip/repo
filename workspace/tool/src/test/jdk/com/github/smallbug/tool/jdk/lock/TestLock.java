package com.github.smallbug.tool.jdk.lock;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.CyclicBarrier;

public class TestLock {

	public static volatile int NUM = 50;
	public static long count = 10000;
	public static long sum = 0;
	private CyclicBarrier cyclic = new CyclicBarrier(NUM);
	private static CountDownLatch latch = new CountDownLatch(50);
	private final Lock lock = new MyLock01();

	public static void main(String[] args) {
		TestLock t = new TestLock();
		long t1 = System.currentTimeMillis();
		t.test01();
		try {
			latch.await();
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("sum = " + sum);
		System.out.println("time -> " + (System.currentTimeMillis() - t1));
	}

	private void test01() {
		for (int i = 0; i < NUM; i++) {
			new Thread(new Runnable() {

				@Override
				public void run() {
					try {
						cyclic.await();
					}
					catch (Exception e) {
						e.printStackTrace();
					}
					long i = count;
					while (i-- > 0) {
						lock.lock();
						sum++;
						lock.unlock();
					}
					latch.countDown();
				}
			}).start();
		}
	}
}
