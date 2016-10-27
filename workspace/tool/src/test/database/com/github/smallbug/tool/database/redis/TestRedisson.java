package com.github.smallbug.tool.database.redis;

import java.util.concurrent.atomic.AtomicInteger;

import org.apache.commons.lang.math.NumberUtils;
import org.redisson.Config;
import org.redisson.Redisson;
import org.redisson.RedissonClient;
import org.redisson.core.RLock;
import org.redisson.core.RMap;

public class TestRedisson {
	private static AtomicInteger intd = new AtomicInteger();

	private static class A implements Runnable {

		@Override
		public void run() {
			Config config = new Config();
			config.setUseLinuxNativeEpoll(true);
			config.useClusterServers().addNodeAddress("192.168.227.130:6379");
			RedissonClient redisson = Redisson.create(config);
			RMap<String, String> map = redisson.getMap("lock");
			// DefaultRedisMap<String, String> map = new DefaultRedisMap<String, String>("lock", redisTemplate);
			RLock lock = redisson.getLock("myLock");
			for (int i = 0; i < 1000; i++) {
				lock.lock();
				int s = Integer.valueOf(map.get("pptv"));
				map.put("pptv", ++s + "");
				lock.unlock();
			}
			intd.incrementAndGet();
		}

	}

	public static void main(String[] args) {
		int threadNumber = NumberUtils.toInt(args[0]);
		for (int i = 0; i < threadNumber; i++) {
			new Thread(new A()).start();
		}
		for (; intd.get() != threadNumber;) {
			try {
				Thread.sleep(1000);
			}
			catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		System.out.println("end!   -> ");
	}
}
