package com.github.smallbug.tool.spring.aop;

public class StudentDaoImpl implements StudentDao {

	public String savePerson() {
// int a = 1 / 0;
		System.out.println("save person");
		return "aaa";
	}
}
