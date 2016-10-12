package com.github.smallbug.tool.jdk.test;

public class InnerObj {
	private int a = 3;

	public InnerObj() {
		System.out.println("InnerObj!");
	}

	public static void main(String[] args) {
// InnerObj i = new InnerObj();
// i.sys();
		A a = new A();
	}

	public void sys() {
// A a = new A();
	}

	static class A {
		{
			System.out.println("-------");
		}

		public A() {
			System.out.println("s");
		}
	}

}
