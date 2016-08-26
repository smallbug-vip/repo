package com.github.smallbug.tool.develop.ehcache;

import java.io.IOException;
import java.io.InputStream;

import org.junit.Test;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import net.sf.ehcache.config.CacheConfiguration;
import net.sf.ehcache.config.Configuration;
import net.sf.ehcache.config.MemoryUnit;

public class EhcacheTest {

	/**
	 * Ehcache默认配置
	 * 
	 * @timestamp 2016年7月18日 上午10:26:55
	 */
	@Test
	public void testDefault() {
		CacheManager cacheManager = new CacheManager();
		// 输出当前cacheManager正在使用的配置对应的Xml格式文本
		System.out.println(cacheManager.getActiveConfigurationText());
		Cache c = cacheManager.getCache("test");
		System.out.println(c);
	}

	/**
	 * Configuration对象
	 * 
	 * @timestamp 2016年7月18日 上午10:27:11
	 */
	@Test
	public void testConfiguration() {
		// 新建一个CacheManager的配置信息
		Configuration configuration = new Configuration();
		// 新建一个缓存的配置信息
		CacheConfiguration cacheConfiguration = new CacheConfiguration().name("test");
		// 指定当前缓存的最大堆内存值为100M
		cacheConfiguration.maxBytesLocalHeap(100, MemoryUnit.MEGABYTES);
		// 添加一个cache
		configuration.addCache(cacheConfiguration);
		configuration.dynamicConfig(false); // 不允许动态修改配置信息
		CacheManager cacheManager = new CacheManager(configuration);
		Cache cache = cacheManager.getCache("test");
		cache.put(new Element("test", "testx"));
		System.out.println(cache.get("test").getObjectValue());
		System.out.println(cache);
	}

	/**
	 * 输入流创建对象
	 * 
	 * @timestamp 2016年7月18日 上午10:26:47
	 * @throws IOException
	 */
	@Test
	public void testInputStream() throws IOException {
		InputStream is = this.getClass().getClassLoader().getResourceAsStream("cache/ehcache.xml");
		CacheManager cacheManager = new CacheManager(is);
		is.close();
		System.out.println(cacheManager.getActiveConfigurationText());
		System.out.println(cacheManager.getCache("test"));
	}

	@Test
	public void testNewInstance() {
		CacheManager cacheManager = CacheManager.newInstance();// 单例
		System.out.println(cacheManager.hashCode());
		cacheManager = CacheManager.newInstance();
		System.out.println(cacheManager.hashCode());

		cacheManager = CacheManager.create();
		System.out.println(cacheManager.hashCode());
		cacheManager = CacheManager.create();
		System.out.println(cacheManager.hashCode());
	}

}
