package cn.smallbug.jdk.jmx._01;

public interface BugMBean {
	/**
	 * 获取名字
	 * 
	 * @timestamp Feb 10, 2016 3:22:58 PM
	 * @return
	 */
	public String getName();

	/**
	 * 设置名字
	 * 
	 * @timestamp Feb 10, 2016 3:23:23 PM
	 * @param name
	 */
	public void setName(String name);

	/**
	 * 最喜欢的食物是什么
	 * 
	 * @timestamp Feb 10, 2016 3:23:37 PM
	 * @return
	 */
	public String getFood();

	/**
	 * 设置最喜欢的食物
	 * 
	 * @timestamp Feb 10, 2016 3:23:55 PM
	 * @param food
	 */
	public void setFood(String food);

	/**
	 * 吃
	 * 
	 * @timestamp Feb 10, 2016 3:24:08 PM
	 * @param eat
	 */
	public void eat(String eat);

	/**
	 * 查看状态
	 * 
	 * @timestamp Feb 10, 2016 3:24:15 PM
	 * @return
	 */
	public String toString();
}
