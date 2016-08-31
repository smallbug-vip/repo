package com.github.smallbug.tool.beans;

import java.io.Serializable;
import java.util.Date;

public class Student implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8598929353134383211L;
	private Long id;
	private String name;
	private int age;
	private Date birthday;
	private String description;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
