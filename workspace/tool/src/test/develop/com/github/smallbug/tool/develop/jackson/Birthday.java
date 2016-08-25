package com.github.smallbug.tool.develop.jackson;

import java.util.Date;

public class Birthday {

	private Date date;

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	// getter、setter
	public Birthday() {
	}

	@Override
	public String toString() {
		return "Birthday [date=" + date + "]";
	}

}
