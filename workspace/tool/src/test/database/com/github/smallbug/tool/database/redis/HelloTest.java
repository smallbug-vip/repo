package com.github.smallbug.tool.database.redis;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.junit.Test;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.DataType;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;

import com.github.smallbug.tool.common.AbstractJunit;

public class HelloTest extends AbstractJunit {
	@Resource
	private RedisTemplate<String, String> redisTemplate;

	@Test
	public void testSet() {
		redisTemplate.opsForValue().set("smallbug", "sssssf");
	}

	/**
	 * 测试序列化
	 * 
	 * @timestamp 2016年8月16日 下午5:59:30
	 */
	@Test
	public void test01() {
		byte[] b = redisTemplate.dump("name");
		System.out.println(new String(b));
	}

	/**
	 * 会否存在
	 * 
	 * @timestamp 2016年8月16日 下午6:01:15
	 */
	@Test
	public void test02() {
		System.out.println(redisTemplate.hasKey("name"));
	}

	/**
	 * 删除
	 * 
	 * @timestamp 2016年8月16日 下午6:02:14
	 */
	@Test
	public void test03() {
		redisTemplate.delete("d");
	}

	/**
	 * 设置过期时间
	 * 
	 * @timestamp 2016年8月16日 下午6:04:41
	 */
	@Test
	public void test04() {
		redisTemplate.expire("name", 1000, TimeUnit.SECONDS);
		redisTemplate.expireAt("name", new Date());
	}

	/**
	 * 查看所有键
	 * 
	 * @timestamp 2016年8月16日 下午6:07:53
	 */
	@Test
	public void test05() {
		System.out.println(Arrays.toString(redisTemplate.keys("*").toArray()));
	}

	/**
	 * 移动键
	 * 
	 * @timestamp 2016年8月16日 下午6:09:03
	 */
	@Test
	public void test06() {
		redisTemplate.move("c", 2);
	}

	/**
	 * 查看多少秒之后过期
	 * 
	 * @timestamp 2016年8月16日 下午6:11:40
	 */
	@Test
	public void test07() {
		long l = redisTemplate.getExpire("school");
		System.out.println(l);
	}

	/**
	 * 查看类型
	 * 
	 * @timestamp 2016年8月16日 下午6:13:46
	 */
	@Test
	public void test08() {
		DataType t = redisTemplate.type("school");
		System.out.println(t.toString());
	}

	/**
	 * 重命名
	 * 
	 * @timestamp 2016年8月16日 下午6:14:26
	 */
	@Test
	public void test09() {
		redisTemplate.rename("school", "s");
	}

	/**
	 * 不过期
	 * 
	 * @timestamp 2016年8月16日 下午6:16:22
	 */
	@Test
	public void test10() {
		redisTemplate.persist("s");
	}

	/**
	 * 遍历key
	 * 
	 * @timestamp 2016年8月22日 下午8:50:11
	 */
	public void scanDbKeys() {
		redisTemplate.execute(new RedisCallback<Iterable<byte[]>>() {
			@Override
			public Iterable<byte[]> doInRedis(RedisConnection connection) throws DataAccessException {

				List<byte[]> binaryKeys = new ArrayList<byte[]>();

				Cursor<byte[]> cursor = connection.scan(ScanOptions.scanOptions().count(5).build());
				while (cursor.hasNext()) {
					byte[] key = cursor.next();
					binaryKeys.add(key);
					System.out.println(new String(key, StandardCharsets.UTF_8));
				}

				try {
					cursor.close();
				}
				catch (IOException e) {
					// do something meaningful
				}

				return binaryKeys;
			}
		});
	}
}
