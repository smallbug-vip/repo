
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Scanner;

public class FormatFile {

	/******************** formateFile ********************/

	public void formateFile(File file) {

		byte[] headerText = new byte[20];
		byte[] count = randomByte(10);
		byte[] fileNameText = new byte[70];
		long fileLength = file.length();
		long len = fileLength / 10;
		System.arraycopy(String2Byte(String.valueOf(len), "GBK"), 0,//
				headerText, 1, String2Byte(String.valueOf(len), "GBK").length);
		System.arraycopy(String2Byte(file.getName(), "UTF-8"), 0, //
				fileNameText, 1, String2Byte(file.getName(), "UTF-8").length);

		headerText[0] = (byte) String2Byte(String.valueOf(len), "GBK").length;
		fileNameText[0] = (byte) String2Byte(file.getName(), "UTF-8").length;

		List<Long> lengths = new ArrayList<>();

		for (int i = 0; i < 10; i++) {
			lengths.add(len * (i + 1));
		}

		String outPath = file.getPath().substring(0, file.getPath().lastIndexOf("\\")) + "\\";
		File savePath = new File(outPath);
		File[] files = savePath.listFiles();
		int maxInt = 0;
		for (File f : files) {
			if (f.getName().endsWith("dir")) {
				String str = f.getName().substring(0, f.getName().lastIndexOf("."));
				try {
					int nn = Integer.valueOf(str);
					maxInt = maxInt > nn ? maxInt : nn;
				} catch (NumberFormatException e) {
					System.out.println(str);
				}
			}
		}
		String outputName = (maxInt + 1) + ".dir";

		try (RandomAccessFile randomAccessFile = new RandomAccessFile(file, "r");//
				FileOutputStream out = new FileOutputStream(outPath + outputName)) {
			out.write(headerText);
			out.write(count);
			out.write(fileNameText);
			for (int i = 0; i < 10; i++) {
				int index = count[i];
				long end = 0;
				long start = 0;

				if (index > 0) {
					start = lengths.get(index - 1);
				} else {
					start = 0;
				}

				end = lengths.get(index);

				byte[] by = new byte[1024];
				int le = -1;

				randomAccessFile.seek(start);
				while ((le = randomAccessFile.read(by)) != -1) {
					if (randomAccessFile.getFilePointer() > end) {
						le = le - (int) (randomAccessFile.getFilePointer() - end);
						out.write(by, 0, le);
						break;
					}
					out.write(by, 0, le);
				}
				System.out.println("complete " + (i + 1) * 10 + "%");
			}
			randomAccessFile.seek(lengths.get(9));
			int le = -1;
			byte[] by = new byte[1024];
			while ((le = randomAccessFile.read(by)) != -1) {
				out.write(by, 0, le);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public void formateAllFile(String filePath, FormatFile formatFile) {
		File file = new File(filePath);
		if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (File f : files) {
				if (f.isFile() && !f.getName().endsWith(".dir")) {
					formatFile.formateFile(f);
				}
			}
		} else {
			throw new RuntimeException("this file is not directory!");
		}
	}

	/******************** parseFile ********************/

	public void parseAllFile(String filePath, FormatFile formatFile) {
		File file = new File(filePath);
		if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (File f : files) {
				if (f.getName().endsWith(".dir")) {
					formatFile.parseFile(f);
				}
			}
		} else {
			throw new RuntimeException("this file is not directory!");
		}
	}

	public void parseFile(File file) {
		String outPath = file.getPath().substring(0, file.getPath().lastIndexOf("\\")) + "\\";
		byte[] headerText = null;
		byte[] count = randomByte(10);
		byte[] fileNameText = null;
		FileOutputStream out = null;
		try (RandomAccessFile randomAccessFile = new RandomAccessFile(file, "r")) {
			byte[] bufferReader = new byte[1];
			randomAccessFile.read(bufferReader, 0, 1);
			headerText = new byte[bufferReader[0]];
			randomAccessFile.read(headerText, 0, bufferReader[0]);
			randomAccessFile.seek(20);
			randomAccessFile.read(count);
			randomAccessFile.read(bufferReader, 0, 1);
			fileNameText = new byte[bufferReader[0]];
			randomAccessFile.read(fileNameText, 0, bufferReader[0]);
			String hText = new String(headerText, "GBK");
			String fName = new String(fileNameText, "UTF-8");
			long len = Long.valueOf(hText);
			out = new FileOutputStream(outPath + fName);
			for (int i = 0; i <= 9; i++) {
				int j = 0;
				while (count[j] != i) {
					j++;
				}
				byte[] by = new byte[1024];
				long end = 100 + (j + 1) * len;
				long start = 100 + j * len;
				randomAccessFile.seek(start);
				int le = -1;
				while ((le = randomAccessFile.read(by)) != -1) {
					if (randomAccessFile.getFilePointer() > end) {
						le = le - (int) (randomAccessFile.getFilePointer() - end);
						out.write(by, 0, le);
						break;
					}
					out.write(by, 0, le);
				}
				System.out.println("complete " + (i + 1) * 10 + "%");
			}
			randomAccessFile.seek(100 + 10 * len);
			int le = -1;
			byte[] by = new byte[1024];
			while ((le = randomAccessFile.read(by)) != -1) {
				out.write(by, 0, le);
			}
		} catch (Exception e) {
			throw new RuntimeException(e);
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					throw new RuntimeException(e);
				}
			}
		}
	}

	/******************** listFileName ********************/

	public void listAllFileName(String filePath) {
		File file = new File(filePath);
		if (file.isDirectory()) {
			File[] files = file.listFiles();
			for (File f : files) {
				if (f.getName().endsWith("dir")) {
					try (RandomAccessFile randomAccessFile = new RandomAccessFile(f, "r")) {
						byte[] fileNameText = null;
						byte[] bufferReader = new byte[1];
						randomAccessFile.seek(30);
						randomAccessFile.read(bufferReader, 0, 1);
						fileNameText = new byte[bufferReader[0]];
						randomAccessFile.read(fileNameText, 0, bufferReader[0]);
						System.out.println("|-- " + f.getName() + " --> " + new String(fileNameText, "UTF-8"));
					} catch (Exception e) {
						throw new RuntimeException(e);
					}
				}
			}
		} else {
			throw new RuntimeException("this file is not directory!");
		}
	}

	/******************** main ********************/

	public static void main(String[] args) {
		FormatFile formatFile = new FormatFile();
		String str = "";
		Scanner scan = new Scanner(System.in);
		File file = null;
		while (true) {
			System.out.println("input 'format' encrypt file!");
			System.out.println("input 'formatall' encrypt many file!");
			System.out.println("input 'parse' declassified file!");
			System.out.println("input 'parseall' declassified many file!");
			System.out.println("input 'list' list file name!");
			System.out.println("input 'close' exit!");
			str = scan.next();
			switch (str) {
			case "format":
				System.out.println("input full name of file:");
				str = scan.next();
				file = new File(str);
				formatFile.formateFile(file);
				break;
			case "formatall":
				System.out.println("input path:");
				str = scan.next();
				formatFile.formateAllFile(str, formatFile);
				break;
			case "parse":
				System.out.println("input full name of file:");
				str = scan.next();
				file = new File(str);
				formatFile.parseFile(file);
				break;
			case "parseall":
				System.out.println("input path:");
				str = scan.next();
				formatFile.parseAllFile(str, formatFile);
				break;
			case "list":
				System.out.println("input path:");
				str = scan.next();
				formatFile.listAllFileName(str);
				break;
			case "close":
				scan.close();
				return;
			default:
				System.out.println("input error!");
			}
		}
	}

	/******************** utils ********************/

	public byte[] String2Byte(String str, String character) {
		byte[] by = null;
		try {
			by = str.getBytes(character);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return by;
	}

	public byte[] randomByte(int num) {
		List<Byte> list = new ArrayList<>();
		for (byte i = 0; i < num; i++) {
			list.add(i);
		}
		int a = num, i = 0;
		Random random = new Random();
		byte[] by = new byte[num];

		while (a > 0) {
			int b = random.nextInt(a);
			by[i++] = list.remove(b);
			a--;
		}
		return by;
	}
}
