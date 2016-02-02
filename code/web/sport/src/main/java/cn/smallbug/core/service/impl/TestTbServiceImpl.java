package cn.smallbug.core.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.smallbug.core.bean.TestTb;
import cn.smallbug.core.dao.TestTbDao;
import cn.smallbug.core.service.TestTbService;

/**
 * 
 * @timestamp Jan 31, 2016 11:14:36 PM
 * @author smallbug
 */
@Service
@Transactional
public class TestTbServiceImpl implements TestTbService {

	@Resource
	private TestTbDao testTbDao;

	public void addTestTb(TestTb testTb) {
		testTbDao.addTestTb(testTb);
		// int a = 1/0;
	}

}
