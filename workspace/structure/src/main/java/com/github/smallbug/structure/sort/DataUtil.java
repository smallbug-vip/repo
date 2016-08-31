package com.github.smallbug.structure.sort;

import java.util.Random;

/**
 * 获取数据
 * 
 * @timestamp Mar 11, 2016 12:27:20 PM
 * @author smallbug
 */
public class DataUtil {

	public static final String ASC = "asc";
	public static final String DESC = "desc";

	/**
	 * 获取数据
	 * 
	 * @timestamp Mar 11, 2016 1:17:10 PM
	 * @param sum
	 * @return
	 */
	public static int[] getData(int sum) {
		int[] ii = new int[sum];
		Random r = new Random();
		for (int i = 0; i < sum; i++) {
			ii[i] = r.nextInt(sum);
		}
		return ii;
	}

	/**
	 * 交换数据
	 * 
	 * @timestamp Mar 11, 2016 1:17:17 PM
	 * @param data
	 * @param i
	 * @param j
	 */
	public static void swap(int[] data, int i, int j) {
		int temp = data[i];
		data[i] = data[j];
		data[j] = temp;
	}

	/**
	 * 验证排序是否成功
	 * 
	 * @timestamp Mar 11, 2016 1:38:09 PM
	 * @param data
	 * @param orderBy
	 * @return
	 */
	public static boolean verify(int[] data, String orderBy) {
		boolean flag = true;

		if (ASC.equalsIgnoreCase(orderBy)) {
			for (int i = 0; i < data.length - 1; i++) {
				if (data[i] > data[i + 1])
					flag = false;
			}
		}
		else if (DESC.equalsIgnoreCase(orderBy)) {
			for (int i = 0; i < data.length - 1; i++) {
				if (data[i] < data[i + 1])
					flag = false;
			}
		}
		else {
			throw new RuntimeException("order error!");
		}
		return flag;
	}

}
