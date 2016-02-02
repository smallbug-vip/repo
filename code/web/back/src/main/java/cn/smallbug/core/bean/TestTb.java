package cn.smallbug.core.bean;

import java.util.Date;

/**
 * 测试类
 * 
 * @timestamp Jan 31, 2016 11:12:29 PM
 * @author smallbug
 */
public class TestTb {

	private Integer id;
	private String name;
	private Date birthday;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

}
