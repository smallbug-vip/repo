package com.github.smallbug.tool.develop.jackson;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.text.DateFormat;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedClass;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import com.fasterxml.jackson.databind.util.JSONPObject;

/**
 * 封装Jackson功能的工具类
 * 
 * @timestamp 2016年8月25日 上午10:20:47
 * @author i-jiashuomeng
 */
public class JacksonUtil {

	public static final String JSON = "json";
	public static final String JSONP = "jsonp";

	public static final String DEFAULT_CALLBACK = "cb";

	private static final ObjectMapper objectMapper = getObjectMapper();

	private static final Logger log = Logger.getLogger(JacksonUtil.class);

	/**
	 * 将对象转化为json或者jsonp字符串，如果转化失败就会返回null
	 * 
	 * @timestamp 2016年8月25日 上午11:14:51
	 * @param obj
	 *            要转化的对象
	 * @param format
	 *            json格式或者jsonp格式
	 * @param callback
	 *            如果是jsonp，这是回调函数，默认是'cb'
	 * @return
	 */
	public static String obj2Json(Object obj, String format, String callback) {
		return obj2Json(objectMapper, obj, format, callback);
	}

	/**
	 * 将对象转化为字符串时，设置相关的过滤器。该方法未使用公共的 objectMapper。如果需要添加其他属性可在 ObjectMapperProperty 类中添加一个属性，再在该方法上添加一条if判断即可
	 * 
	 * @timestamp 2016年8月25日 上午11:43:36
	 * @param obj
	 *            要转化的对象
	 * @param format
	 *            json格式或者jsonp格式
	 * @param callback
	 *            如果是jsonp，这是回调函数，默认是'cb'
	 * @param prop
	 *            设置ObjectMapper属性，可实现滤字段、格式化日期等功能
	 * @return
	 */
	public static String obj2Json(Object obj, String format, String callback, ObjectMapperProperty prop) {
		if (prop == null)
			return obj2Json(obj, format, callback);
		ObjectMapper mapper = getObjectMapper();
		setMapperProperty(mapper, prop);
		return obj2Json(mapper, obj, format, callback);
	}

	/**
	 * 将不需要序列化的属性传入，再将得到的 FilterProvider 作为参数设置到 ObjectMapperProperty 中，使用obj2FilterJson方法完成，转化时过滤某些字段的作用
	 * 
	 * @timestamp 2016年8月25日 上午11:55:18
	 * @param obj
	 *            目标对象
	 * @param notExcept
	 *            true:只获取指定字段名的字段<br />
	 *            false:除了指定的字段，其他的全部获取
	 * @param argus
	 *            哪些字段不需要转化（或者只需要转换那些字段）
	 * @return
	 */
	public static FilterProvider getExceptPropertyFilter(Object obj, boolean notExcept, String... argus) {
		SimpleFilterProvider provider = new SimpleFilterProvider();
		if (notExcept)
			provider.addFilter(obj.getClass().getName(), SimpleBeanPropertyFilter.filterOutAllExcept(argus));
		else
			provider.addFilter(obj.getClass().getName(), SimpleBeanPropertyFilter.serializeAllExcept(argus));
		provider.setFailOnUnknownId(false);
		return provider;
	}

	/**
	 * 将json转化为对象
	 * 
	 * @timestamp 2016年8月25日 下午2:11:40
	 * @param json
	 * @param clazz
	 * @return
	 */
	public static <T> T json2Obj(String json, Class<T> clazz) {
		if (json == null || "".equals(json.trim()) || clazz == null)
			return null;
		try {
			return objectMapper.readValue(json, clazz);
		}
		catch (Exception e) {
			printErrorLog(e);
			return null;
		}
	}

	/**
	 * 将json转化为对象，指定mapper属性可以自定义转换方式，例如自定义日期转换格式等
	 * 
	 * @timestamp 2016年8月25日 下午2:30:57
	 * @param json
	 * @param clazz
	 * @param prop
	 * @return
	 */
	public static <T> T json2Obj(String json, Class<T> clazz, ObjectMapperProperty prop) {
		if (json == null || "".equals(json.trim()) || clazz == null)
			return null;

		if (prop == null)
			return json2Obj(json, clazz);
		try {
			ObjectMapper mapper = getObjectMapper();
			setMapperProperty(mapper, prop);
			return mapper.readValue(json, clazz);
		}
		catch (Exception e) {
			printErrorLog(e);
			return null;
		}
	}

	/**
	 * 将json转化为List对象，并指定Bean的类型
	 * 
	 * @timestamp 2016年8月25日 下午1:52:00
	 * @param json
	 * @param valyeType
	 * @return
	 */
	public static <T> List<T> json2List(String json, Class<T> valyeType) {
		if (json == null || "".equals(json.trim()) || valyeType == null)
			return null;

		JavaType javaType = objectMapper.getTypeFactory().constructParametricType(ArrayList.class, valyeType);
		try {
			return objectMapper.readValue(json, javaType);
		}
		catch (Exception e) {
			printErrorLog(e);
			return null;
		}
	}

	/**
	 * 将json转化为List对象，并指定Bean的类型，指定mapper属性可以自定义转换方式，例如自定义日期转换格式等
	 * 
	 * @timestamp 2016年8月25日 下午2:31:22
	 * @param json
	 * @param valyeType
	 * @param prop
	 * @return
	 */
	public static <T> List<T> json2List(String json, Class<T> valyeType, ObjectMapperProperty prop) {
		if (json == null || "".equals(json.trim()) || valyeType == null)
			return null;
		if (prop == null)
			json2List(json, valyeType);

		ObjectMapper mapper = getObjectMapper();
		setMapperProperty(mapper, prop);
		JavaType javaType = mapper.getTypeFactory().constructParametricType(ArrayList.class, valyeType);
		try {
			return mapper.readValue(json, javaType);
		}
		catch (Exception e) {
			printErrorLog(e);
			return null;
		}
	}

	/**
	 * 将json转化为Map对象，并指定Bean的类型
	 * 
	 * @timestamp 2016年8月25日 下午3:02:45
	 * @param json
	 * @param keyType
	 * @param valueType
	 * @return
	 */
	public static <E, T> Map<E, T> json2Map(String json, Class<E> keyType, Class<T> valueType) {
		if (json == null || "".equals(json.trim()) || keyType == null || valueType == null)
			return null;
		JavaType javaType = objectMapper.getTypeFactory().constructParametricType(LinkedHashMap.class, Object.class,
				valueType);
		try {
			return objectMapper.readValue(json, javaType);
		}
		catch (Exception e) {
			printErrorLog(e);
			return null;
		}
	}

	/**
	 * 将json转化为Map对象，并指定Bean的类型，指定mapper属性可以自定义转换方式，例如自定义日期转换格式等
	 * 
	 * @timestamp 2016年8月25日 下午3:02:54
	 * @param json
	 * @param keyType
	 * @param valueType
	 * @param prop
	 * @return
	 */
	public static <E, T> Map<E, T> json2Map(String json, Class<E> keyType, Class<T> valueType,
			ObjectMapperProperty prop) {
		if (json == null || "".equals(json.trim()) || keyType == null || valueType == null)
			return null;
		if (prop == null)
			return json2Map(json, keyType, valueType);
		ObjectMapper mapper = getObjectMapper();
		setMapperProperty(mapper, prop);
		JavaType javaType = mapper.getTypeFactory().constructParametricType(LinkedHashMap.class, Object.class,
				valueType);
		try {
			return mapper.readValue(json, javaType);
		}
		catch (Exception e) {
			printErrorLog(e);
			return null;
		}
	}

	/**
	 * 设置ObjectMapper属性
	 * 
	 * @timestamp 2016年8月25日 下午2:12:45
	 * @author i-jiashuomeng
	 */
	public static class ObjectMapperProperty {
		private FilterProvider filter = null;// 过滤器
		private Include include = null;// 包含属性风格
		private DateFormat dateFormat = null; // 日期格式化

		public FilterProvider getFilter() {
			return filter;
		}

		public ObjectMapperProperty setFilter(FilterProvider filter) {
			this.filter = filter;
			return this;
		}

		public Include getInclude() {
			return include;
		}

		public ObjectMapperProperty setInclude(Include include) {
			this.include = include;
			return this;
		}

		public DateFormat getDateFormat() {
			return dateFormat;
		}

		public ObjectMapperProperty setDateFormat(DateFormat dateFormat) {
			this.dateFormat = dateFormat;
			return this;
		}

	}

	/**
	 * 拼接JSON字符串
	 * 
	 * @timestamp 2016年8月25日 下午4:23:06
	 * @author i-jiashuomeng
	 */
	public static class JsonObject {
		private Map<String, Object> map = new LinkedHashMap<String, Object>();

		private volatile int modCount;
		private volatile int oldVersion;
		private volatile int oldCall;

		private volatile String cacheJson = null;

		public JsonObject() {
			this.modCount = 0;
			this.oldVersion = -1;
			this.oldCall = 0;
		}

		public Object setProperty(String key, Object value) {
			Object o = map.get(key);
			map.put(key, value);
			modCount++;
			return o;
		}

		public Object remove(String key) {
			modCount++;
			return map.remove(key);
		}

		public Object getProperty(String key) {
			return map.get(key);
		}

		public String getJson() {
			if (this.oldCall != 0) {
				oldCall = 0;
				modCount++;
			}
			return getJsonCache(JSON, null, null);
		}

		public String getJson(String format, String callback) {
			if (this.oldCall != 2) {
				oldCall = 2;
				modCount++;
			}
			return getJsonCache(format, callback, null);
		}

		public String getJson(String format, String callback, ObjectMapperProperty prop) {
			if (this.oldCall != 3) {
				oldCall = 3;
				modCount++;
			}
			return getJsonCache(format, callback, prop);
		}

		private String getJsonCache(String format, String callback, ObjectMapperProperty prop) {
			if (oldVersion == modCount)
				return this.cacheJson;
			String json = obj2Json(map, format, callback, prop);
			this.cacheJson = json;
			this.oldVersion = this.modCount;
			return json;
		}

	}

	/**
	 * 为mapper设置属性
	 * 
	 * @timestamp 2016年8月25日 下午2:28:22
	 * @param mapper
	 * @param prop
	 */
	private static void setMapperProperty(ObjectMapper mapper, ObjectMapperProperty prop) {
		if (prop.getDateFormat() != null)
			mapper.setDateFormat(prop.getDateFormat());
		if (prop.getFilter() != null) {
			mapper.setFilters(prop.getFilter());
			mapper.setAnnotationIntrospector(new JacksonAnnotationIntrospector() {
				private static final long serialVersionUID = 1L;

				@Override
				public Object findFilterId(AnnotatedClass ac) {
					return ac.getName();
				}
			});
		}
		if (prop.getInclude() != null)
			mapper.setSerializationInclusion(prop.getInclude());
	}

	/**
	 * 具体将对象转化为字符串
	 * 
	 * @timestamp 2016年8月25日 上午11:38:33
	 * @param mapper
	 * @param obj
	 * @param format
	 * @param callback
	 * @return
	 */
	private static String obj2Json(ObjectMapper mapper, Object obj, String format, String callback) {
		if (obj == null)
			return null;
		if (JSON.equalsIgnoreCase(format)) {
			try {
				return mapper.writeValueAsString(obj);
			}
			catch (Exception e) {
				printErrorLog(e);
				return null;
			}
		}
		else if (JSONP.equalsIgnoreCase(format)) {
			if (callback == null || "".equals(callback))
				callback = DEFAULT_CALLBACK;
			try {
				return mapper.writeValueAsString(new JSONPObject(callback, obj));
			}
			catch (Exception e) {
				printErrorLog(e);
				return null;
			}
		}
		else {
			throw new RuntimeException("the format is not correct!");
		}
	}

	/**
	 * 非单例模式，获取 ObjectMapper 对象
	 * 
	 * @timestamp 2016年8月25日 上午10:23:43
	 * @return
	 */
	private static ObjectMapper getObjectMapper() {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);// 对单引号提供支持
		return mapper;
	}

	/**
	 * 用日志工具打印错误信息
	 * 
	 * @timestamp 2016年8月25日 上午10:43:42
	 * @param e
	 */
	private static void printErrorLog(Exception e) {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		PrintStream ps = new PrintStream(out);
		e.printStackTrace(ps);
		log.error(out.toString());
	}
}
