package com.github.smallbug.tool.database.redis;

import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.util.Pool;

public class JedisConnectionFactory2 extends JedisConnectionFactory {

	private JedisPool jedisPool = null;

	@Override
	protected Pool<Jedis> createRedisPool() {

		return jedisPool;
	}

	public void setJedisPool(JedisPool jedisPool) {
		this.jedisPool = jedisPool;
	}

}
