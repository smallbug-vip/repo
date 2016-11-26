package com.github.smallbug.tool.jdk.encrypt;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.binary.Hex;

public class _3DESDemo {

	private static final String desAlgorithm = "DESede/CBC/NoPadding";

	private static final String desKeyAlgorithm = "DESede";

	private static final byte defaultIV[] = new byte[] { '0', '0', '0', '0', '0', '0', '0', '0' };

	private static final String DES_KEY = "sdf2324";

	public static void main(String[] args) {

		String content = "22222";

		System.out.println("原文：" + content);
		String cip = encryptBy3DesAndBase64(content, DES_KEY);
		System.out.println("密文：" + cip);
		System.out.println("解密：" + decryptBy3DesAndBase64(cip, DES_KEY));
	}

	public static String encryptBy3DesAndBase64(String content, String desKey) {
		return encryptBy3DesAndBase64(content, desKey, "UTF-8");
	}

	public static String decryptBy3DesAndBase64(String content, String desKey) {
		return decryptBy3DesAndBase64(content, desKey, "UTF-8");
	}

	private static SecretKey KeyGenerator(String desKey) {
		byte input[] = null;
		try {
			input = md5Hex(desKey).substring(0, 24).getBytes("GBK");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		SecretKey triDesKey = new SecretKeySpec(input, desKeyAlgorithm);

		return triDesKey;
	}

	public static String decryptBy3DesAndBase64(String content, String desKey, String encoding) {
		byte[] input = null;
		try {
			input = Base64.decodeBase64(content);
			byte[] output = cryptBy3Des(desKey, 2, null, input);
			return new String(output, encoding);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	private static String encryptBy3DesAndBase64(String content, String desKey, String encoding) {
		byte output[] = null;
		byte input[] = null;
		try {
			int residue = (content.length()) % 8;
			if (0 != residue) {
				int padLen = 8 - residue;
				StringBuffer strBuf = new StringBuffer(content);
				for (int i = 0; i < padLen; i++) {
					strBuf.append(' ');
				}
				input = (new String(strBuf)).getBytes(encoding);
			} else {
				input = content.getBytes(encoding);
			}
			output = cryptBy3Des(desKey, 1, null, input);//3DES加密
			return Base64.encodeBase64String(output).replaceAll("[\\n\\r]", "");

		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return null;
	}

	private static byte[] cryptBy3Des(String desKey, int cryptModel, byte iv[], byte content[]) {
		Cipher cipher = null;
		SecretKey key = KeyGenerator(desKey);
		IvParameterSpec IVSpec = iv == null ? IvGenerator(defaultIV) : IvGenerator(iv);
		try {
			cipher = Cipher.getInstance(desAlgorithm);
			cipher.init(cryptModel, key, IVSpec);
			return cipher.doFinal(content);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private static String md5Hex(String desKey) {
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		try {
			md5.update(desKey.getBytes("GBK"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return Hex.encodeHexString(md5.digest());
	}

	private static IvParameterSpec IvGenerator(byte b[]) {
		IvParameterSpec IV = new IvParameterSpec(b);
		return IV;
	}
}
