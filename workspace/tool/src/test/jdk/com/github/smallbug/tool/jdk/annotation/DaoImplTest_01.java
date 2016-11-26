package com.github.smallbug.tool.jdk.annotation;

public class DaoImplTest_01 {
	@MyTest_01
	/**
	 * 测试保存
	 */
	public void save() {
		System.out.println("save");
	}

	@MyTest_01
	public void delete() {
		System.out.println("delete");
	}
}
