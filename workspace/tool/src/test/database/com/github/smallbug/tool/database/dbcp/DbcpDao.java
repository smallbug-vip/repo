package com.github.smallbug.tool.database.dbcp;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import com.github.smallbug.tool.beans.Cat;

public class DbcpDao {

	private JdbcTemplate jdbcTemplate;

	public void save(Cat c) {
		jdbcTemplate.update("INSERT INTO demo (name,birthday) VALUES (?,now())", c.getName());
	}

	public void get() {
		List<Cat> cs = jdbcTemplate.query("SELECT id, name,birthday FROM demo WHERE id=?",
				BeanPropertyRowMapper.newInstance(Cat.class), 1L);
		System.out.println(cs);
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public void save1() {
		try {
			jdbcTemplate.update("INSERT INTO aa (name) VALUES (?)", "aa你还啊在家吗地a");
		}
		catch (DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
