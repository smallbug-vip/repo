package cn.smallbug.jdk.dynamic.impl;

import java.io.FileWriter;
import java.io.IOException;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.net.URL;
import java.net.URLClassLoader;

import javax.tools.JavaCompiler;
import javax.tools.JavaCompiler.CompilationTask;
import javax.tools.JavaFileObject;
import javax.tools.StandardJavaFileManager;
import javax.tools.ToolProvider;

public class MyProxy {

	private static String FILEPATH = "f:/proxy/";
	private static String FILENAME = "Proxy0";

	public static Object newProxyInstance(ClassLoader loader, //
			Class<?>[] interfaces, MyInvocationHandler h) {
		writeJavaFile(FILEPATH + FILENAME + ".java", interfaces[0]);
		compileFile(FILEPATH + FILENAME + ".java");
		return newInstance(FILENAME, interfaces[0], h);
	}

	/**
	 * 生成代理类
	 * 
	 * @timestamp Mar 20, 2016 12:18:54 AM
	 * @param fileName
	 */
	private static void writeJavaFile(String fileName, Class<?> interfaces) {
		StringBuilder sb = new StringBuilder();
		sb.append(createFile(interfaces));
		FileWriter fw = null;
		try {
			fw = new FileWriter(fileName);
			fw.write(sb.toString());
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				if (fw != null)
					fw.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private static String createFile(Class<?> infce) {
		String src = //
				" import cn.smallbug.jdk.dynamic.impl.MyInvocationHandler;\r\n" + //
						"\r\n" + //
						" 	public class " + FILENAME + " implements " + infce.getName() + "{\r\n" + //
						"	MyInvocationHandler invocation = null;\r\n" + //
						"	\r\n" + //
						"	public " + FILENAME + "(MyInvocationHandler invocation) {\r\n" + //
						"		super();\r\n" + //
						"		this.invocation = invocation;\r\n" + //
						"	}\r\n" + //
						createMethod(infce) + //
						"}\r\n";
		return src;
	}

	private static String createMethod(Class<?> infce) {
		StringBuilder sb = new StringBuilder();
		Method[] methods = infce.getMethods();
		for (Method m : methods) {
			String returnName = "0";
			if (m.getReturnType().toString().startsWith("class")) {
				returnName = "null";
			}
			sb.append(//
					"	@Override\r\n" + //
							"	public " + getParam(m.getReturnType()) + " " + m.getName() + "(" + transfArgu(m).getStr() + ") {\r\n" + //
							"		" + getParam(m.getReturnType()) + " a = " + returnName + ";\r\n" + //
							"		try {\r\n" + //
							"			a = (" + getParam(m.getReturnType()) + ") invocation.invoke(this, " + infce.getName() + ".class.getMethod(\"" + m.getName() + "\", "
							+ transfParm(m) + "), new Object[]{" + transfArgu(m).getNum() + "});\r\n" + //
							"		} catch (Throwable e) {\r\n" + //
							"			throw new RuntimeException(e);\r\n" + //
							"		}\r\n" + //
							"		return a;\r\n" + //
							"	}\r\n");
		}
		return sb.toString();
	}

	private static String getParam(Class<?> returnType) {
		if (returnType.toString().startsWith("class")) {
			return returnType.toString().substring(6);
		}
		return returnType.toString();
	}

	private static Node transfArgu(Method m) {
		StringBuilder sb = new StringBuilder();
		StringBuilder num = new StringBuilder();
		int i = 0;
		for (Class<?> c : m.getParameterTypes()) {
			if (i != 0)
				num.append(",");
			num.append("argu" + i);
			
			if (i != 0)
				sb.append(",");
			
			sb.append(c.getName() + " argu" + i++);
		}
		return new Node(sb.toString(), num.toString());
	}

	private static String transfParm(Method m) {
		StringBuilder sb = new StringBuilder();
		int i = 0;
		for (Class<?> c : m.getParameterTypes()) {
			if (i != 0)
				sb.append(",");
			sb.append(c.getName() + ".class");
			i++;
		}

		return sb.toString();
	}

	/**
	 * 创建代理实例
	 * 
	 * @timestamp Mar 19, 2016 10:51:15 PM
	 * @param fileName
	 * @param intef
	 * @return
	 */
	private static Object newInstance(String fileName, Class<?> intef, MyInvocationHandler h) {
		URLClassLoader ul = null;
		try {
			URL[] urls = new URL[] { new URL("file:/" + FILEPATH) };
			ul = new URLClassLoader(urls);
			Class<?> c = ul.loadClass(fileName);
			Constructor<?> ctr = c.getConstructor(MyInvocationHandler.class);
			return ctr.newInstance(h);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (ul != null)
					ul.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}

	/**
	 * 编译
	 * 
	 * @timestamp Mar 19, 2016 10:35:48 PM
	 * @param fileName
	 */
	private static void compileFile(String fileName) {
		JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
		StandardJavaFileManager fileMgr = compiler.getStandardFileManager(null, null, null);
		Iterable<? extends JavaFileObject> units = fileMgr.getJavaFileObjects(fileName);
		CompilationTask t = compiler.getTask(null, fileMgr, null, null, null, units);
		t.call();
		try {
			if (fileMgr != null)
				fileMgr.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	static class Node {
		private String str;
		private String num;

		public Node(String str, String num) {
			super();
			this.str = str;
			this.num = num;
		}

		public String getStr() {
			return str;
		}

		public String getNum() {
			return num;
		}

	}

}
