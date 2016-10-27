package com.github.smallbug.tool.database.redis;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.Test;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

import com.github.smallbug.tool.common.AbstractJunit;

public class HashTest extends AbstractJunit {
	@Resource
	private RedisTemplate<String, String> redisTemplate;

	private HashOperations<String, Object, Object> h = null;

	@Before
	public void before() {
		h = redisTemplate.opsForHash();
	}

	@Test
	public void test01() {
		// 插入数据
		h.put("name", "x", "xiaoming");
		h.put("name", "s", "six");
		h.put("name", "f", "flash");
		Map<String, String> sm = new HashMap<String, String>();
		sm.put("11", "11");
		sm.put("22", "22");
		sm.put("44", "44");
		// 插入多条数据
		h.putAll("name", sm);
		// 获取数据
		System.out.println(h.get("name", "s"));
		// 获取多个值
		System.out.println(
				Arrays.toString(h.multiGet("name", new ArrayList<Object>(Arrays.asList("11", "22", "33"))).toArray()));
		// 获取所有的键
		System.out.println(Arrays.toString(h.keys("name").toArray()));
		// 遍历
		Map<Object, Object> m = h.entries("name");
		for (Entry<Object, Object> e : m.entrySet()) {
			System.out.println(e.getKey() + "____" + e.getValue());
		}
		// 删除键
		h.delete("name", "11");
		// 是否含有键
		System.out.println(h.hasKey("name", "222"));
		// 含有多少键
		System.out.println(h.size("name"));
		// 增加
		h.increment("name", "22", 234);
		// 返回所有值
		System.out.println(Arrays.toString(h.values("name").toArray()));
	}

}
