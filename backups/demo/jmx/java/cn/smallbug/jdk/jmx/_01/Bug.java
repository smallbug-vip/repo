package cn.smallbug.jdk.jmx._01;

public class Bug implements BugMBean{

	private String name;
	private String food;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFood() {
		return food;
	}

	public void setFood(String food) {
		this.food = food;
	}

	public void eat(String eat) {
		System.out.println("the bug is eating " + eat + ".");
	}

	@Override
	public String toString() {
		return "Bug [name=" + name + ", food=" + food + "]";
	}

}
