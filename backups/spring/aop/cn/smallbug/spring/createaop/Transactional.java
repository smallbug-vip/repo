package cn.smallbug.spring.createaop;

import java.util.regex.Matcher;

public class Transactional implements FilterChainSub {

	/**
	 * 前置通知
	 */
	@Override
	public void before(Object target, Matcher[] matchers) {
		for (Matcher m : matchers) {
			if (m.find()) {
				System.out.println("before -> " + target);
			}
		}
	}

	/**
	 * 后置通知
	 */
	@Override
	public void after(Object target, Matcher[] matchers) {
		for (Matcher m : matchers) {
			if (m.find()) {
				System.out.println("after -> " + target);
			}
		}
	}

	/**
	 * 异常通知
	 */
	@Override
	public void operateException(Exception exception, Object target) {
		System.out.println("exception -> ");
		exception.printStackTrace();
	}

	/**
	 * 最终通知
	 */
	@Override
	public void destroy(Object target) {
		System.out.println("destroy -> " + target);
	}

}
