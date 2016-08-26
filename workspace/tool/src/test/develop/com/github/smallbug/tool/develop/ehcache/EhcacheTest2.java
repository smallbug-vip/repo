package com.github.smallbug.tool.develop.ehcache;

import javax.annotation.Resource;

import org.junit.Test;

import com.github.smallbug.tool.common.AbstractJunit;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;

public class EhcacheTest2 extends AbstractJunit {

	@Resource
	private Ehcache levelOneCache;
	@Resource
	private CacheManager cacheManager;

	/**
	 * 两者是一个对象
	 * 
	 * @timestamp 2016年8月26日 下午5:57:59
	 */
	@Test
	public void test01() {
		cacheManager.getCache("levelOneCache").put(new Element("test", "testxxx"));
		System.out.println(levelOneCache.get("test").getObjectValue());
	}

}
