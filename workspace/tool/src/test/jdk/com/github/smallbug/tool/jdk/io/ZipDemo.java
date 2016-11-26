package com.github.smallbug.tool.jdk.io;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 
 * 将多文件打包成一个zip包
 *
 * @version 2016年11月7日
 * @author i-jiashuomeng
 * @since JDK1.6
 *
 */
public class ZipDemo {
	public static void main(String[] args) throws Exception {
		FileInputStream fis = null;
		BufferedInputStream bis = null;
		FileOutputStream fos = null;
		ZipOutputStream zip = null;
		ZipEntry entry = null;

		String path = "E:/data/";
		String nFile = "a.zip";
		String[] ofiles = {"经济学原理第5版(宏观分册).pdf", "经济学原理第5版(微观分册).pdf"};

		try {
			fos = new FileOutputStream(path + nFile);
			zip = new ZipOutputStream(fos);
			for (String ofile : ofiles) {
				try {
					fis = new FileInputStream(path + ofile);
					bis = new BufferedInputStream(fis);
					entry = new ZipEntry(ofile);
					zip.putNextEntry(entry);
					int count = 0, BUFFER = 8192;
					byte data[] = new byte[BUFFER];
					while ((count = bis.read(data, 0, BUFFER)) != -1) {
						zip.write(data, 0, count);
					}
				}
				catch (IOException e) {
					e.printStackTrace();
				}
				finally {

				}
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			zip.close();
		}
	}
}
