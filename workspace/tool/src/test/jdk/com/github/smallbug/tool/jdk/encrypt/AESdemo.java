package com.github.smallbug.tool.jdk.encrypt;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.Security;
import java.util.Arrays;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;

public class AESdemo {
	// KeyGenerator 提供对称密钥生成器的功能，支持各种算法
	private KeyGenerator keygen;
	// SecretKey 负责保存对称密钥
	private SecretKey deskey;
	// Cipher负责完成加密或解密工作
	private Cipher c;

	public AESdemo() throws NoSuchAlgorithmException, NoSuchPaddingException {
		Security.addProvider(new com.sun.crypto.provider.SunJCE());
		// 实例化支持DES算法的密钥生成器(算法名称命名需按规定，否则抛出异常)
		keygen = KeyGenerator.getInstance("AES");
		// 生成密钥
		deskey = keygen.generateKey();
		// 生成Cipher对象,指定其支持的DES算法
		c = Cipher.getInstance("AES");
	}

	/**
	 * 对字符串加密
	 * 
	 * @param str
	 * @return
	 */
	public byte[] encrytor(String str) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		// 根据密钥，对Cipher对象进行初始化，ENCRYPT_MODE表示加密模式
		c.init(Cipher.ENCRYPT_MODE, deskey);
		byte[] src = str.getBytes();
		// 加密，结果保存进cipherByte
		byte[] cipherByte = c.doFinal(src);
		return cipherByte;
	}

	/**
	 * 对字符串解密
	 * 
	 * @param buff
	 * @return
	 */
	public byte[] decryptor(byte[] buff) throws InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		// 根据密钥，对Cipher对象进行初始化，DECRYPT_MODE表示加密模式
		c.init(Cipher.DECRYPT_MODE, deskey);
		byte[] cipherByte = c.doFinal(buff);
		return cipherByte;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
		AESdemo de1 = new AESdemo();
		String msg = "www.suning.com/index.jsp";
		byte[] encontent = de1.encrytor(msg);
		byte[] decontent = de1.decryptor(encontent);
		System.out.println("明文是:" + msg);
		System.out.println(Arrays.toString(de1.getDeskey().getEncoded()));
		System.out.println(de1.getDeskey().getFormat());
		System.out.println(de1.getDeskey().getAlgorithm());
		System.out.println("加密后:" + new String(encontent));
		System.out.println("解密后:" + new String(decontent));
	}

	public SecretKey getDeskey() {
		return deskey;
	}

}
