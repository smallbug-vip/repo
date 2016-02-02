package cn.smallbug;

import java.util.Date;

import javax.annotation.Resource;

import org.junit.Test;

import cn.smallbug.common.junit.SpringJunitTest;
import cn.smallbug.core.bean.TestTb;
import cn.smallbug.core.service.TestTbService;

/**
 * 
 * @timestamp Jan 31, 2016 11:27:24 PM
 * @author smallbug
 */
public class TestTestTb extends SpringJunitTest {

	@Resource
	private TestTbService testTbService;

	@Test
	public void testAdd() {
		TestTb testTb = new TestTb();
		testTb.setName("小虫");
		testTb.setBirthday(new Date());

		testTbService.addTestTb(testTb);
	}
}
