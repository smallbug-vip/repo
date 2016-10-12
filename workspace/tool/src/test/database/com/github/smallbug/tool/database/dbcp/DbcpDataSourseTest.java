package com.github.smallbug.tool.database.dbcp;

import javax.annotation.Resource;

import org.junit.Test;

import com.github.smallbug.tool.beans.Cat;
import com.github.smallbug.tool.common.AbstractJunit;

public class DbcpDataSourseTest extends AbstractJunit {

	@Resource
	private DbcpDao dbcpDao;

	@Test
	public void t1() {
		Cat c = new Cat();
		c.setName("小猫1");
		dbcpDao.save(c);
	}
}
