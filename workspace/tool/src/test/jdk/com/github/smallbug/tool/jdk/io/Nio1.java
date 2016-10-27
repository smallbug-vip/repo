package com.github.smallbug.tool.jdk.io;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;

import org.junit.Test;

/**
 * <lo>
 * <li>FileChannel 从文件中读写数据</li>
 * <li>DatagramChannel 能通过UDP读写网络中的数据</li>
 * <li>SocketChannel 能通过TCP读写网络中的数据</li>
 * <li>ServerSocketChannel可以监听新进来的TCP连接，像Web服务器那样。对每一个新进来的连接都会创建一个SocketChannel</li>
 * <li></li>
 * <li></li>
 * <li></li>
 * <li></li> </lo>
 *
 */
public class Nio1 {

	@Test
	public void test01() throws IOException {

		String filePath = Nio1.class//
				.getClassLoader()//
				.getResource("log4j.properties")//
				.getPath();

		RandomAccessFile aFile = new RandomAccessFile(filePath, "rw");

		FileChannel inChannel = aFile.getChannel();
		ByteBuffer buf = ByteBuffer.allocate(48);// capacity 容量

		int bytesRead = inChannel.read(buf);
		while (bytesRead != -1) {

			System.out.println("Read " + bytesRead);
			buf.flip();// 写模式切换到读模式

			int i = 0;
// buf.mark();// 设置节点
			while (buf.hasRemaining()) {// position表示当前的位置
				System.out.print((char)buf.get());
				if (i++ % 20 == 0) {
// buf.rewind();// 将position设回0
// buf.reset();// 恢复节点
				}

			}

			buf.clear();// 清空整个缓冲区
// buf.compact();// 清除已经读过的数据
			bytesRead = inChannel.read(buf);
		}
		aFile.close();
	}

	@Test
	public void test02() throws IOException {
		RandomAccessFile fromFile = new RandomAccessFile("fromFile.txt", "rw");
		FileChannel fromChannel = fromFile.getChannel();

		RandomAccessFile toFile = new RandomAccessFile("toFile.txt", "rw");
		FileChannel toChannel = toFile.getChannel();

		long position = 0;
		long count = fromChannel.size();

		// SocketChannel只会传输此刻准备好的数据（可能不足count字节）。
		// 因此，SocketChannel可能不会将请求的所有数据(count个字节)全部传输到FileChannel中
		toChannel.transferFrom(fromChannel, count, position);

	}
}
