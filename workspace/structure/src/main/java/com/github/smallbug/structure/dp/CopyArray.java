package com.github.smallbug.structure.dp;

import java.util.Arrays;

/**
 * 
 * 分段复制数组
 * 
 * @version 2016年10月27日
 * @since JDK1.6
 *
 */
public class CopyArray {

	private static int CREATE_NUM = 10;

	public static void main(String[] args) {
		int n = 41;
		int[] sportCouponList = new int[n];
		for (int i = 1; i <= n; i++) {
			sportCouponList[i - 1] = i;
		}
		int index1 = 0;
		int index2 = CREATE_NUM;
		int count = CREATE_NUM;
		for (;;) {
			int[] list = new int[count];
			System.arraycopy(sportCouponList, index1, list, 0, count);
			System.out.println(Arrays.toString(list));
			if (index1 + count >= sportCouponList.length)
				break;
			index1 += CREATE_NUM;
			if (index2 + CREATE_NUM > sportCouponList.length - 1) {
				count = sportCouponList.length - index1;
			}
			else {
				index2 += CREATE_NUM;
			}
		}
	}
}
