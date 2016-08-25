package cn.smallbug.jdk.dynamic.impl;

public class Smallbug implements SmallbugInterface {

	@Override
	public int eat(String food) {
		System.out.println("eating " + food + " !");
		return food.toCharArray().length;
	}

	@Override
	public String aa(String bb, int t) {
		System.out.println("-> " + t);
		return bb;
	}
}
