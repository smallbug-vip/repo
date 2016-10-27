package com.github.smallbug.tool.database.redis;

import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.support.collections.DefaultRedisMap;

import com.distributed.lock.redis.RedisReentrantLock;
import com.github.smallbug.tool.common.AbstractJunit;
import com.github.smallbug.tool.jdk.concurrent.ConcurrentEnvironment;

import redis.clients.jedis.JedisPool;

public class LockTest extends AbstractJunit {

	Logger logger = Logger.getLogger(LockTest.class);
	@Resource
	private RedisTemplate<String, String> redisTemplate;

	@Resource
	private JedisPool jedisPool = new JedisPool();

// private JedisPool jedisPool = new JedisPool("redis.vip.idc.pplive.cn", 19670);
	@Test
	public void t2() throws Exception {

		for (;;) {
			redisTemplate.opsForHash().put("cache", "pptv", "0");
			new ConcurrentEnvironment(5) {
				@Override
				protected void testCode() {
					/////// -----------------------
					RedisReentrantLock lock = new RedisReentrantLock(jedisPool, "GET_RECENT_CARD_INFO_LOCK");
					DefaultRedisMap<String, String> map = new DefaultRedisMap<String, String>("cache", redisTemplate);
					for (int i = 0; i < 1000; i++) {
						try {
							if (lock.tryLock(5000L, TimeUnit.MILLISECONDS)) {// 获取锁超时时间为5秒
								int s = Integer.valueOf(map.get("pptv"));
								if (s == 3433)
									s = 1 / 0;
								map.put("pptv", ++s + "");
							}
							else {
								// TODO 获得锁超时后要做的事
							}
						}
						catch (Exception e) {
							map.put("pptv", 3434 + "");
						}
						finally {
							lock.unlock();
						}
						/////// -----------------------
					}
				}
			}.start();
			String s = (String)redisTemplate.opsForHash().get("cache", "pptv");
			System.out.println("end!   -> " + s);
		}

	}

	public static void main(String[] args) throws Exception {

	}

}
