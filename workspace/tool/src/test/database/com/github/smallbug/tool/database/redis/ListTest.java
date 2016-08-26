package com.github.smallbug.tool.database.redis;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.Resource;

import org.junit.Before;
import org.junit.Test;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import com.github.smallbug.tool.common.AbstractJunit;

public class ListTest extends AbstractJunit {
	@Resource
	private RedisTemplate<String, String> redisTemplate;

	private ListOperations<String, String> l = null;

	@Before
	public void before() {
		l = redisTemplate.opsForList();
	}

	/**
	 * 
	 * @timestamp 2016年8月22日 下午6:25:00
	 */
	@Test
	public void test01() {
		// 批量插入
		List<String> a = new ArrayList<String>();
		a.add("xiaoming");
		a.add("xiaohau");
		a.add("xiaocao");
		a.add("wangjaing");
		l.rightPushAll("name", a);
		// 输出所有
		a = l.range("name", 0, -1);
		System.out.println(Arrays.toString(a.toArray()));
		// 长度
		System.out.println(l.size("name"));
		// 索引查找
		System.out.println(l.index("name", 2));
		// 指定位置插入
		l.set("name", 0, "111");
		/**
		 * 删除 <br />
		 * -> count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。<br />
		 * -> count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。 <br />
		 * -> count = 0 : 移除表中所有与 VALUE 相等的值。
		 */
		l.remove("name", -1, "wangjaing");
		// 只留下指定范围内的数据
		l.trim("name", 0, 4);
		// 阻塞获取
		l.leftPop("kkkk", 1, TimeUnit.DAYS);
		// 弹出并压入
		l.rightPopAndLeftPush("xxxx", "name");
	}
}
