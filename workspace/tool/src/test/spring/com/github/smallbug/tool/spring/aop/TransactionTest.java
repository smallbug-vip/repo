package com.github.smallbug.tool.spring.aop;

import javax.annotation.Resource;

import org.junit.Test;

import com.github.smallbug.tool.common.AbstractJunit;

/**
 * 原理：<br />
 * 1、当spring容器启动的时候，加载两个bean,对两个bean进行实例化<br />
 * 2、当spring容器对配置文件解析到<aop:config>的时候<br />
 * 3、把切入点表达式解析出来，按照切入点表达式匹配spring容器内容的bean<br />
 * 4、如果匹配成功，则为该bean创建代理对象<br />
 * 5、当客户端利用context.getBean获取一个对象时，如果该对象有代理对象，则返回代理对象, 如果没有代理对象，则返回对象本身
 * 
 * @author zd
 *
 */
public class TransactionTest extends AbstractJunit {
	@Resource
	private StudentDao studentDao;

	@Test
	public void testTransaction() {
		studentDao.savePerson();
	}
}
