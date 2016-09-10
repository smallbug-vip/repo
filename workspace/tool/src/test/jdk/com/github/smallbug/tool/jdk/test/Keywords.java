package com.github.smallbug.tool.jdk.test;

/**
 * 如下选项的关键词，能使java 中一个类的方法不被子类覆盖的有？（）<br />
 * A ：native <br />
 * B ：static <br />
 * C ：private <br />
 * D ：final <br />
 *
 * @version 2016年9月3日
 * @author i-jiashuomeng
 * @since JDK1.6
 *
 */
public class Keywords {
	public static void main(String[] args) {

	}
}

class A {
	public native void an();

	private void ap() {

	}

	public static void as() {

	}

	public final void af() {

	}
}

class B extends A {
	private void ap() {

	}

	public static void as() {

	}

	public native void an();
// public native void af();{
//
// }
}
