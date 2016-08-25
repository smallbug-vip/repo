package cn.smallbug.spring.createaop;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

/**
 * 过滤器
 * 
 * @timestamp Feb 17, 2016 2:59:48 PM
 * @author smallbug
 */
public class Interceptor implements InvocationHandler {
	/**
	 * 目标对象
	 */
	private Object target = null;
	/**
	 * 过滤器链
	 */
	private ApplicationFilterChain filterChain = null;

	private String[] regular;

	/**
	 * 
	 * @param target
	 *            目标类
	 * @param filterChain
	 *            过滤器链
	 * @param regular
	 *            匹配规则
	 */
	public Interceptor(Object target, ApplicationFilterChain filterChain, String... regular) {
		super();
		this.target = target;
		this.filterChain = filterChain;
		this.regular = regular;
	}

	/**
	 * 执行目标方法
	 */
	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		try {
			// 设置目标方法，目标类，参数
			filterChain.setMethod(method);
			filterChain.setTarget(target);
			filterChain.setArgs(args);
			filterChain.setRegular(regular);
			return filterChain.invoke(filterChain);
		} catch (Exception e) {
			filterChain.operateException(e);
		} finally {
			filterChain.destroy(target);
		}
		return null;
	}

}
