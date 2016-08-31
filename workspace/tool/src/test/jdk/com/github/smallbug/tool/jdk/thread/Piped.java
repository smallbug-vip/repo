package com.github.smallbug.tool.jdk.thread;

import java.io.IOException;
import java.io.PipedReader;
import java.io.PipedWriter;

/**
 * 
 * 管道输入/输出流和普通的文件输入/输出流或者网络输入/输出流不同之处在于，它主要 用于线程之间的数据传输，而传输的媒介为内存。
 * 
 * @version 2016年8月29日
 * @author i-jiashuomeng
 * @since JDK1.6
 *
 */
public class Piped {

	public static void main(String[] args) throws Exception {
		PipedWriter out = new PipedWriter();
		PipedReader in = new PipedReader();
		// 将输出流和输入流进行连接，否则在使用时会抛出IOException
		out.connect(in);
		Thread printThread = new Thread(new Print(in), "PrintThread");
		printThread.start();
		int receive = 0;
		try {
			while ((receive = System.in.read()) != -1) {
				out.write(receive);
			}
		}
		finally {
			out.close();
		}
	}

	static class Print implements Runnable {
		private PipedReader in;

		public Print(PipedReader in) {
			this.in = in;
		}

		public void run() {
			int receive = 0;
			try {
				while ((receive = in.read()) != -1) {
					System.out.print((char)receive);
				}
			}
			catch (IOException ex) {
			}
		}
	}
}
