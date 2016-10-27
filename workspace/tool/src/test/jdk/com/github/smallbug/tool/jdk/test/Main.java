package com.github.smallbug.tool.jdk.test;

import java.util.ArrayList;

public class Main {
	public static void main(String[] args) {

		Main m = new Main();
		ArrayList list = new ArrayList();
		list.add(m);
		list.add(m);
		list.add(m);
		list.add(m);

		for (Object c : list) {
			list.remove(c);
		}
	}

}
