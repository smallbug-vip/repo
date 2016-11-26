package com.github.smallbug.tool.test;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;

public class HasFile {

	public static void main(String[] args) throws Exception {
		String wordPath = "E:/a.txt";
		String urlPath = "E:/b.txt";

		BufferedReader dr1 = new BufferedReader(new InputStreamReader(new FileInputStream(wordPath)));
		BufferedReader dr2 = new BufferedReader(new InputStreamReader(new FileInputStream(urlPath)));

		StringBuilder sb = new StringBuilder();
		String s1 = null;
		while ((s1 = dr1.readLine()) != null) {
			sb.append(s1);
		}
		String s = sb.toString();
		System.out.println(s);
		System.out.println("------------------------------------------");
		System.out.println("------------------------------------------");
		System.out.println("------------------------------------------");
		String s2 = null;
		while ((s2 = dr2.readLine()) != null) {
			if (s.contains(s2)) {
				System.out.println(s2);
			}
		}
		dr1.close();
		dr2.close();
	}
}
