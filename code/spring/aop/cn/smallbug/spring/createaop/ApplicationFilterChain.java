package cn.smallbug.spring.createaop;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 过滤器链实现类
 * 
 * @timestamp Feb 17, 2016 3:52:00 PM
 * @author smallbug
 */
public class ApplicationFilterChain {

	/**
	 * 实现过滤器链
	 */
	private List<FilterChain> filterChainList = new ArrayList<>();
	/**
	 * 索引计数器
	 */
	private int index = 0;
	/**
	 * 目标方法
	 */
	private Method method = null;
	/**
	 * 目标对象
	 */
	private Object target = null;
	/**
	 * 参数
	 */
	private Object[] args = null;

	/**
	 * 匹配规则
	 */
	private Matcher[] matchers;

	public ApplicationFilterChain() {
		super();
	}

	public ApplicationFilterChain(Method method, Object target, Object[] args, String[] regular) {
		super();
		this.method = method;
		this.target = target;
		this.args = args;
		if (regular != null && regular.length > 0)
			parse(regular);
	}

	public int size() {
		return filterChainList.size();
	}

	public FilterChain get(int index) {
		return filterChainList.get(index);
	}

	public int index() {
		return index;
	}

	/**
	 * 增加过滤链
	 * 
	 * @timestamp Feb 17, 2016 2:55:30 PM
	 * @param filterChain
	 * @return
	 */
	public ApplicationFilterChain addChain(FilterChain filterChain) {
		filterChainList.add(filterChain);
		return this;
	}

	/**
	 * 移除给定的过滤器链节点
	 * 
	 * @timestamp Feb 17, 2016 3:53:02 PM
	 * @param filterChain
	 */
	public void removeFilterChain(FilterChain filterChain) {
		filterChainList.remove(filterChain);
	}

	/**
	 * 调用过滤器链
	 * 
	 * @timestamp Feb 17, 2016 3:53:39 PM
	 */
	public Object invoke(ApplicationFilterChain chain) {
		if (filterChainList.size() < 0)
			return null;
		if (chain.size() == chain.index()) {
			Object obj = null;
			try {
				obj = method.invoke(target, args);
			} catch (Exception e) {
				throw new RuntimeException(e);
			}
			return obj;
		}
		// 获取过滤链中当前索引所指向的节点
		FilterChain f = chain.get(chain.index);
		Object obj = null;
		f.before(target, matchers);
		// 过滤链中当前索引+1
		this.index++;
		obj = invoke(this);
		f.after(target, matchers);
		return obj;
	}

	/**
	 * 处理异常
	 * 
	 * @timestamp Feb 17, 2016 4:28:34 PM
	 * @param e
	 */
	public void operateException(Exception e) {
		for (FilterChain f : filterChainList) {
			if (f instanceof FilterChainSub) {
				((FilterChainSub) f).operateException(e, target);
			}
		}
	}

	/**
	 * 释放资源
	 * 
	 * @timestamp Feb 17, 2016 4:29:26 PM
	 * @param target2
	 */
	public void destroy(Object target) {
		index = 0;
		for (FilterChain f : filterChainList) {
			if (f instanceof FilterChainSub) {
				((FilterChainSub) f).destroy(target);
			}
		}
	}

	/**************************** get/set ***************************/

	public List<FilterChain> getFilterChainList() {
		return filterChainList;
	}

	public void setFilterChainList(List<FilterChain> filterChainList) {
		this.filterChainList = filterChainList;
	}

	public Method getMethod() {
		return method;
	}

	public void setMethod(Method method) {
		this.method = method;
	}

	public Object getTarget() {
		return target;
	}

	public void setTarget(Object target) {
		this.target = target;
	}

	public Object[] getArgs() {
		return args;
	}

	public void setArgs(Object[] args) {
		this.args = args;
	}

	public void setRegular(String[] regular) {
		if (regular != null && regular.length > 0)
			parse(regular);
	}

	/**
	 * 将字符串解析为匹配规则
	 * 
	 * @timestamp Feb 19, 2016 6:03:11 PM
	 * @param regular
	 */
	private void parse(String[] regular) {
		this.matchers = new Matcher[regular.length];
		int i = 0;
		for (String str : regular) {
			Pattern p = Pattern.compile(str);
			this.matchers[i++] = p.matcher(method.getName());
		}
	}
}
