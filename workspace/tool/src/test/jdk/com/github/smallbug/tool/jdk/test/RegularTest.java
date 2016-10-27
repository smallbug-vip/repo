package com.github.smallbug.tool.jdk.test;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;

public class RegularTest {
	@Test
	public void testRegular_01() {
		String str = "啊啊啊..压.哈哈哈哈哈....可可可.....的...";
		String str_0 = str.replaceAll("\\.+", "");
		System.out.println(str_0);
		String str_1 = str_0.replaceAll("(.)\\1+", "$1");
		System.out.println(str_1);
	}

	@Test
	public void testRegular_02() {

		String str = "192.168.62.35 10.23.56.84  5.5.5.5    78.65.89.26";
		String str_1 = str.replaceAll("(\\d+)", "00$1");
		String str_2 = str_1.replaceAll("\\d*(\\d{3})", "$1");
		String[] str_0 = str_2.split(" +");
		Arrays.sort(str_0);
		for (String s : str_0) {
			System.out.println(s.replaceAll("0*(\\d+)", "$1"));
		}
	}

	@Test
	public void testRegular_03() {
		String str = "ni  hao a ha   ha";
		String[] st = str.split(" +");
		for (String s : st) {
			System.out.println(s);
		}
	}

	@Test
	public void testRegular_04() {
		String str = "13256485498";
		String st = str.replaceAll("(\\d{3})\\d{4}(\\d{4})", "$1****$2");
		System.out.println(st);
	}

	@Test
	public void testRegular_05() {
		String str = "ai ni java";
		Matcher m = Pattern.compile("\\w+?").matcher(str);
		while (m.find()) {
			System.out.println(m.group());
		}
	}

	@Test
	public void addCommas() {// 非捕获组
		String s = "1234527809";
		String reg = "(\\d)(?=(\\d{3})+$)";
		String reg2 = "(?<group>\\w)345\\k<group>";
		Pattern p = Pattern.compile(reg2);
		Matcher m = p.matcher(s);
		while (m.find()) {
			System.out.println(m.start() + "----" + m.group() + "-----" + m.end());
		}
		String st = s.replaceAll("(\\d)(?=(\\d{3})+$)", "$1,");
		System.out.println(st);
	}

	@Test
	public void testRegular_06() {
		String str = "da jia zhu yi le ,yao pai wei dian ying le !";
		String reg = "\\b[a-z]{3}\\b";
		// 正则规则被编译成Pattern对象
		Pattern p = Pattern.compile(reg);
		// 通过正则对象的方法matcher和字符串相关联获取匹配对象
		Matcher m = p.matcher(str);
		// 使用匹配器的方法对字符串进行操作
		while (m.find()) {
			System.out.println(m.start() + "----" + m.group() + "-----" + m.end());
		}
	}
}
