package com.github.smallbug.tool.database.redis;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.Test;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import com.github.smallbug.tool.common.AbstractJunit;

public class StringTest extends AbstractJunit {
	@Resource
	private RedisTemplate<String, String> redisTemplate;

	private ValueOperations<String, String> v = null;

	@Before
	public void before() {
		v = redisTemplate.opsForValue();
	}

	/**
	 * 未操作
	 * 
	 * @timestamp 2016年8月16日 下午7:17:36
	 */
	@Test
	public void test02() {
		// 设置指定偏移量的bit
		v.setBit("name", 1, false);
		// 获取指定偏移量的bit
		System.out.println(v.getBit("name", 1));
		System.out.println(v.get("name"));
	}

	@Test
	public void test01() {
		// 设置字符串
		v.set("name", "smallbug" + System.currentTimeMillis());
		// 获取字符串
		System.out.println(v.get("name"));
		// 截取字符串
		System.out.println(v.get("name", 0, 7));
		// 输出就值，设置新值
		System.out.println(v.getAndSet("name", "bb"));
		// 获取多个key
		System.out.println(Arrays.toString(v.multiGet(Arrays.asList("school", "name")).toArray()));
		// 设置值加上超期时间
		v.set("ss", "ss", 100, TimeUnit.SECONDS);
		// 偏移设置
		v.set("name", "wwwwww", 1);
		// 字符串长度
		System.out.println(v.size("name"));
		Map<String, String> sm = new HashMap<String, String>();
		sm.put("11", "11");
		sm.put("22", "22");
		sm.put("44", "44");
		// 设置多值
		v.multiSet(sm);
		// 如果都不存在，设置多值
		v.multiSetIfAbsent(sm);
		// 增加
		v.increment("11", -122.2);
		// 追加
		v.append("name", "o----------o");
	}
}
