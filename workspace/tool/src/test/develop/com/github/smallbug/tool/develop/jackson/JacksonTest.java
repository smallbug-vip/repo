package com.github.smallbug.tool.develop.jackson;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.Before;
import org.junit.Test;

import com.github.smallbug.tool.develop.jackson.JacksonUtil.JsonObject;
import com.github.smallbug.tool.develop.jackson.JacksonUtil.ObjectMapperProperty;

public class JacksonTest {
	private AccountBean bean = null;

	@Before
	public void init() {
		bean = new AccountBean();
		bean.setAddress("china-Guangzhou");
		bean.setEmail("hoojo_@126.com");
		bean.setId(1);
		bean.setName("hoojo");
		Birthday b = new Birthday();
		b.setDate(new Date());
		bean.setBirthday(b);
	}

	@Test
	public void obj2json() {
		ObjectMapperProperty p = new ObjectMapperProperty();
		p.setFilter(JacksonUtil.getExceptPropertyFilter(bean, true, "email"))//
				.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

		String s = JacksonUtil.obj2Json(bean, JacksonUtil.JSONP, null, p);
		System.out.println(s);
	}

	/**
	 * 将java对象转换成jsonp字符串
	 */
	@Test
	public void obj2json2() {

		System.out.println(JacksonUtil.obj2Json(bean, JacksonUtil.JSONP, "cb"));
	}

	/**
	 * 将map转换成json字符串
	 */
	@Test
	public void obj2json3() {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("a1", bean);
		map.put("a2", bean);
		map.put("a3", bean);
		map.put("a4", bean);
		ObjectMapperProperty p = new ObjectMapperProperty();
		p.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		System.out.println(JacksonUtil.obj2Json(map, JacksonUtil.JSON, null, p));
	}

	@Test
	public void obj2json4() {

		List<AccountBean> list = new ArrayList<AccountBean>();
		for (int i = 0; i < 10; i++) {
			list.add(bean);
		}
		System.out.println(JacksonUtil.obj2Json(list, "json", null));
	}

	/**
	 * 转化对象
	 */
	@Test
	public void json2obj() {

		String json = "{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}}";
		AccountBean acc = JacksonUtil.json2Obj(json, AccountBean.class);
		System.out.println(acc);
	}

	/**
	 * json字符串转换成list
	 */
	@Test
	public void jsob2List() {
		String json = "[{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}},{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':1472103545495}}]";
		System.out.println(Arrays.toString(JacksonUtil.json2List(json, AccountBean.class).toArray()));
	}

	@Test
	public void json2Map() {
		String json = "{'a1':{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':'2016-08-25 14:20:17'}},'a2':{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':'2016-08-25 14:20:17'}},'a3':{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':'2016-08-25 14:20:17'}},'a4':{'id':1,'name':'hoojo','email':'hoojo_@126.com','address':'china-Guangzhou','birthday':{'date':'2016-08-25 14:20:17'}}}";
		ObjectMapperProperty p = new ObjectMapperProperty();
		p.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		Map<String, AccountBean> maps = JacksonUtil.json2Map(json, String.class, AccountBean.class, p);
		Set<String> key = maps.keySet();
		Iterator<String> iter = key.iterator();
		while (iter.hasNext()) {
			Object field = iter.next();
			System.out.println(field + ":" + maps.get(field));
		}
	}

	@Test
	public void jsonObject() {
		JsonObject o = new JsonObject();
		o.setProperty("name", "小猫");
		o.setProperty("age", 23);
		o.setProperty("birthday", new Date());
		o.setProperty("bean", bean);
		System.out.println(o.getJson());
		System.out.println(o.getJson());
		System.out.println(o.getJson());
		System.out.println(o.getJson());
		System.out.println(o.getJson());
		o.setProperty("name", "小狗");
		System.out.println(o.getJson());
		System.out.println(o.getJson(JacksonUtil.JSONP, null));
		ObjectMapperProperty p = new ObjectMapperProperty();
		p.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
		System.out.println(o.getJson(JacksonUtil.JSONP, "back", p));

	}
}
