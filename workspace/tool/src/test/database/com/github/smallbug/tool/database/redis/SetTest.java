package com.github.smallbug.tool.database.redis;

import java.util.Arrays;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.Test;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.core.SetOperations;

import com.github.smallbug.tool.common.AbstractJunit;

public class SetTest extends AbstractJunit {
	@Resource
	private RedisTemplate<String, String> redisTemplate;

	private SetOperations<String, String> s;

	@Before
	public void before() {
		s = redisTemplate.opsForSet();
	}

	@Test
	public void test01() {
		// 添加
		s.add("class1", "q11", "q12", "q13", "q14");
		s.add("class2", "q21", "q22", "q23", "q24");
		s.add("class3", "q31", "q32", "q33", "q34");
	}

	@Test
	public void test02() {
		// 查看是否存在
		System.out.println(s.isMember("class2", "q21"));
		// 获取所有元素
		System.out.println(Arrays.toString(s.members("class1").toArray()));
		// 移除并返回集合中一随机元素
		System.out.println(s.pop("class1"));
		/**
		 * 返回集合中的一个随机元素<br />
		 * -> 如果 count 为正数，且小于集合基数，那么命令返回一个包含 count 个元素的数组，数组中的元素各不相同。如果 count 大于等于集合基数，那么返回整个集合。<br />
		 * -> 如果 count 为负数，那么命令返回一个数组，数组中的元素可能会重复出现多次，而数组的长度为 count 的绝对值。<br />
		 */
		System.out.println(Arrays.toString(s.randomMembers("class3", 3).toArray()));
		// 遍历set
		Cursor<String> cursor = s.scan("class2", ScanOptions.NONE);
		while (cursor.hasNext()) {
			System.out.println(cursor.next());
		}
// s.intersect(key, otherKeys)
// s.scan("class3", )
	}
}
