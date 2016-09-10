package com.github.smallbug.tool.jdk.concurrent;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.CyclicBarrier;
import java.util.concurrent.locks.ReentrantLock;

import org.junit.Test;

public class TestLock {

	public static volatile int NUM = 8;
	public static long count = 100000000;
	public static long sum = 0;
	private CyclicBarrier cyclic = new CyclicBarrier(NUM);
	private static CountDownLatch latch = new CountDownLatch(8);
	private final java.util.concurrent.locks.Lock lock = new ReentrantLock();

	@Test
	public void t1() {
		long s = 0;
		for (long i = 50000000L; i > 0; i--) {
			s += i;
		}
		System.out.println(s);
	}

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
