package cn.smallbug.spring.createaop;

import java.util.regex.Matcher;

/**
 * 过滤器链节点
 * 
 * @timestamp Feb 17, 2016 2:34:40 PM
 * @author smallbug
 */
public interface FilterChain {

	/**
	 * 目标方法执行之前执行
	 * 
	 * @timestamp Feb 17, 2016 2:41:59 PM
	 */
	public void before(Object target, Matcher[] matchers);

	/**
	 * 目标方法执行之后执行
	 * 
	 * @timestamp Feb 17, 2016 2:42:12 PM
	 */
	public void after(Object target, Matcher[] matchers);
}
