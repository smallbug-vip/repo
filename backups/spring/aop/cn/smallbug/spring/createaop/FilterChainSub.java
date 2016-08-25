package cn.smallbug.spring.createaop;

/**
 * 除了前后通知，还可以处理异常，关闭资源
 * 
 * @timestamp Feb 17, 2016 4:53:47 PM
 * @author smallbug
 */
public interface FilterChainSub extends FilterChain {

	/**
	 * 处理catch中的异常
	 * 
	 * @timestamp Feb 17, 2016 5:57:09 PM
	 * @param exception
	 * @param target
	 */
	public void operateException(Exception exception, Object target);

	/**
	 * 释放资源，相当于finally中的逻辑
	 * 
	 * @timestamp Feb 17, 2016 4:25:53 PM
	 * @param target
	 */
	public void destroy(Object target);
}
