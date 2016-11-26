package com.github.smallbug.tool.jdk.annotation;

public class Dao1ImplTest {
	@MyTest(timeout = 100000000)
	/**
	 * 测试保存
	 */
	public void save() {
		System.out.println("save");
	}

	@MyTest
	public void delete() {
		System.out.println("delete");
	}
}
