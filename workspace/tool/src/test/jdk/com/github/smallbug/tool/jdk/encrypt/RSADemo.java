package com.github.smallbug.tool.jdk.encrypt;

import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

import javax.crypto.Cipher;

import org.apache.commons.codec.binary.Base64;

public class RSADemo {
	public static String src = "RSA 加密字符串";

	public void priENpubDE() {

		try {
			// 1.初始化秘钥
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
			// 秘钥长度
			keyPairGenerator.initialize(512);
			// 初始化秘钥对
			KeyPair keyPair = keyPairGenerator.generateKeyPair();
			// 公钥
			RSAPublicKey rsaPublicKey = (RSAPublicKey) keyPair.getPublic();
			// 私钥
			RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) keyPair.getPrivate();

			// 2.私钥加密，公钥解密----加密
			// 生成私钥
			PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(rsaPrivateKey.getEncoded());
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
			// Cipher类为加密和解密提供密码功能，通过getinstance实例化对象
			Cipher cipher = Cipher.getInstance("RSA");
			// 初始化加密
			cipher.init(Cipher.ENCRYPT_MODE, privateKey);
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("私钥加密，公钥解密----加密:" + Base64.encodeBase64String(result));

			// 3.私钥加密，公钥解密----解密
			// 生成公钥
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(rsaPublicKey.getEncoded());
			keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
			cipher = Cipher.getInstance("RSA");
			// 初始化解密
			cipher.init(Cipher.DECRYPT_MODE, publicKey);
			result = cipher.doFinal(result);
			System.out.println("私钥加密，公钥解密----解密:" + new String(result));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public void pubENpriDE() {

		try {
			// 1.初始化秘钥
			KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
			// 秘钥长度
			keyPairGenerator.initialize(512);
			// 初始化秘钥对
			KeyPair keyPair = keyPairGenerator.generateKeyPair();
			// 公钥
			RSAPublicKey rsaPublicKey = (RSAPublicKey) keyPair.getPublic();
			// 私钥
			RSAPrivateKey rsaPrivateKey = (RSAPrivateKey) keyPair.getPrivate();

			// 2.公钥加密，私钥解密----加密
			X509EncodedKeySpec x509EncodedKeySpec = new X509EncodedKeySpec(rsaPublicKey.getEncoded());
			KeyFactory keyFactory = KeyFactory.getInstance("RSA");
			PublicKey publicKey = keyFactory.generatePublic(x509EncodedKeySpec);
			// 初始化加密
			// Cipher类为加密和解密提供密码功能，通过getinstance实例化对象
			Cipher cipher = Cipher.getInstance("RSA");
			cipher.init(Cipher.ENCRYPT_MODE, publicKey);
			// 加密字符串
			byte[] result = cipher.doFinal(src.getBytes());
			System.out.println("公钥加密，私钥解密----加密:" + Base64.encodeBase64String(result));

			// 3.公钥加密，私钥解密-----解密
			PKCS8EncodedKeySpec pkcs8EncodedKeySpec = new PKCS8EncodedKeySpec(rsaPrivateKey.getEncoded());
			keyFactory = KeyFactory.getInstance("RSA");
			PrivateKey privateKey = keyFactory.generatePrivate(pkcs8EncodedKeySpec);
			// 初始化解密
			cipher.init(Cipher.DECRYPT_MODE, privateKey);
			// 解密字符串
			result = cipher.doFinal(result);
			System.out.println("公钥加密，私钥解密-----解密:" + new String(result));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public static void main(String[] args) {
		RSADemo rsAsecurity = new RSADemo();
		System.out.println("私钥加密公钥解密例：");
		rsAsecurity.priENpubDE();
		System.out.println("公钥加密私钥解密例：");
		rsAsecurity.pubENpriDE();
	}
}
