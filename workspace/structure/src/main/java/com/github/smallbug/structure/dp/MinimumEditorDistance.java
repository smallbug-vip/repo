package com.github.smallbug.structure.dp;

import java.util.Scanner;

/**
 * 
 * 最小编辑距离
 * 
 * @version 2016年9月18日
 * @author i-jiashuomeng
 * @since JDK1.6
 *
 */
public class MinimumEditorDistance {
	public static void main(String[] args) {
		Scanner s = new Scanner(System.in);
		String str = s.nextLine();
		String[] ss = str.split(" ");
		System.out.println("matrix: " + matrix(ss[0], ss[1]));
		s.close();
	}

	public static int matrix(String s1, String s2) {
		int matrix[][];

		int n = s1.length();
		int m = s2.length();

		int i;
		int j;

		char c1;
		char c2;

		int temp;
		if (n == 0)
			return m;
		if (m == 0)
			return n;

		matrix = new int[n + 1][m + 1];

		for (i = 0; i <= n; i++) {
			matrix[i][0] = i;
		}

		for (j = 0; j <= m; j++) {
			matrix[0][j] = j;
		}

		for (i = 1; i <= n; i++) {
			c1 = s1.charAt(i - 1);

			for (j = 1; j <= m; j++) {
				c2 = s2.charAt(j - 1);
				if (c1 == c2)
					temp = 0;
				else
					temp = 1;

				matrix[i][j] = min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + temp);
				System.out.println();
			}
		}

		return matrix[n][m];
	}

	private static int min(int one, int two, int three) {
		int min = one;
		if (two < min)
			min = two;
		if (three < min)
			min = three;
		return min;
	}
}
