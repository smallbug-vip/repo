package com.github.smallbug.tool.jdk.test;

public class ExceptionTest {
	public static void main(String[] args) {
		ExceptionTest t = new ExceptionTest();
		System.out.println(t.show());
	}

	private int show() {
		try {
			int i = 1 / 0;
			return 1;
		}
		catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		finally {
			System.out.println("sss");

		}
	}
}
