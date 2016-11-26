package com.github.smallbug.tool.httpclient;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InterruptedIOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import javax.net.ssl.SSLException;

import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.HeaderElementIterator;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpEntity;
import org.apache.http.HttpEntityEnclosingRequest;
import org.apache.http.HttpException;
import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.HttpRequestInterceptor;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.HttpVersion;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpRequestRetryHandler;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.client.utils.URIUtils;
import org.apache.http.conn.ConnectTimeoutException;
import org.apache.http.conn.ConnectionKeepAliveStrategy;
import org.apache.http.entity.BufferedHttpEntity;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.FileEntity;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultConnectionKeepAliveStrategy;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.client.LaxRedirectStrategy;
import org.apache.http.message.BasicHeaderElementIterator;
import org.apache.http.message.BasicHttpResponse;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;
import org.apache.http.util.EntityUtils;
import org.junit.Test;

@SuppressWarnings("unused")
public class ToolDemo {

	/**
	 * Redirect handling
	 * 
	 * @throws Exception
	 */
	@Test
	public void test19() throws Exception {
		LaxRedirectStrategy redirectStrategy = new LaxRedirectStrategy();
		CloseableHttpClient httpclient = HttpClients//
				.custom()//
				.setRedirectStrategy(redirectStrategy)//
				.build();
		HttpClientContext context = HttpClientContext.create();
		HttpGet httpget = new HttpGet("http://localhost:8080/");
		CloseableHttpResponse response = httpclient.execute(httpget, context);
		try {
			HttpHost target = context.getTargetHost();
			List<URI> redirectLocations = context.getRedirectLocations();
			URI location = URIUtils.resolve(httpget.getURI(), target, redirectLocations);
			System.out.println("Final HTTP location: " + location.toASCIIString());
			// Expected to be an absolute URI
		} finally {
			response.close();
		}
	}

	/**
	 * in order to enable a custom exception recovery mechanism one should
	 * provide an implementation of the HttpRequestRetryHandler interface
	 */
	@Test
	public void test18() {
		HttpRequestRetryHandler myRetryHandler = new HttpRequestRetryHandler() {

			public boolean retryRequest(IOException exception, int executionCount, HttpContext context) {
				if (executionCount >= 5) {
					// Do not retry if over max retry count
					return false;
				}
				if (exception instanceof InterruptedIOException) {
					// Timeout
					return false;
				}
				if (exception instanceof UnknownHostException) {
					// Unknown host
					return false;
				}
				if (exception instanceof ConnectTimeoutException) {
					// Connection refused
					return false;
				}
				if (exception instanceof SSLException) {
					// SSL handshake exception
					return false;
				}
				HttpClientContext clientContext = HttpClientContext.adapt(context);
				HttpRequest request = clientContext.getRequest();
				boolean idempotent = !(request instanceof HttpEntityEnclosingRequest);
				if (idempotent) {
					// Retry if the request is considered idempotent
					return true;
				}
				return false;
			}

		};
		CloseableHttpClient httpclient = HttpClients.custom().setRetryHandler(myRetryHandler).build();
	}

	/**
	 * how local context can be used to persist a processing state between
	 * consecutive requests
	 * 
	 * @throws Exception
	 */
	@Test
	public void test17() throws Exception {
		CloseableHttpClient httpclient = HttpClients.custom().addInterceptorLast(new HttpRequestInterceptor() {

			public void process(final HttpRequest request, final HttpContext context) throws HttpException, IOException {
				AtomicInteger count = (AtomicInteger) context.getAttribute("count");
				request.addHeader("Count", Integer.toString(count.getAndIncrement()));
			}

		}).build();

		AtomicInteger count = new AtomicInteger(1);
		HttpClientContext localContext = HttpClientContext.create();
		localContext.setAttribute("count", count);

		HttpGet httpget = new HttpGet("http://localhost/");
		for (int i = 0; i < 10; i++) {
			CloseableHttpResponse response = httpclient.execute(httpget, localContext);
			try {
				HttpEntity entity = response.getEntity();
			} finally {
				response.close();
			}
		}
	}

	/**
	 * the request configuration set by the initial request will be kept in the
	 * execution context and propagated to the consecutive requests sharing the
	 * same context
	 * 
	 * @throws ClientProtocolException
	 * @throws IOException
	 */
	@Test
	public void test16() throws ClientProtocolException, IOException {
		HttpContext context = HttpClientContext.create();
		HttpClientContext clientContext = HttpClientContext.adapt(context);
		HttpHost target = clientContext.getTargetHost();
		HttpRequest request = clientContext.getRequest();
		System.out.println(request);
		HttpResponse response = clientContext.getResponse();
		RequestConfig config = clientContext.getRequestConfig();

		CloseableHttpClient httpclient = HttpClients.createDefault();
		RequestConfig requestConfig = RequestConfig//
				.custom()//
				.setSocketTimeout(1000)//
				.setConnectTimeout(1000)//
				.build();

		HttpGet httpget1 = new HttpGet("http://www.baidu.com");
		httpget1.setConfig(requestConfig);
		CloseableHttpResponse response1 = httpclient.execute(httpget1, context);
		System.out.println(clientContext.getRequest());
		try {
			HttpEntity entity1 = response1.getEntity();
			System.out.println(entity1);
		} finally {
			response1.close();
		}
		HttpGet httpget2 = new HttpGet("http://www.baidu.com");
		CloseableHttpResponse response2 = httpclient.execute(httpget2, context);
		try {
			HttpEntity entity2 = response2.getEntity();
			System.out.println(entity2);
		} finally {
			response2.close();
		}
	}

	/**
	 * this enables the users to selectively replace default implementation of
	 * those aspects with custom,application specific ones...
	 */
	@Test
	public void test15() {
		ConnectionKeepAliveStrategy keepAliveStrat = new DefaultConnectionKeepAliveStrategy() {

			@Override
			public long getKeepAliveDuration(HttpResponse response, HttpContext context) {
				long keepAlive = super.getKeepAliveDuration(response, context);
				if (keepAlive == -1) {
					// Keep connections alive 5 seconds if a keep-alive value
					// has not be explicitly set by the server
					keepAlive = 5000;
				}
				return keepAlive;
			}

		};
		CloseableHttpClient httpclient = HttpClients//
				.custom()//
				.setKeepAliveStrategy(keepAliveStrat)//
				.build();
	}

	/**
	 * let HttpClient choose the most appropriate transfer encoding based on the
	 * 
	 * properties of the HTTP message being transferred
	 * 
	 */
	@Test
	public void test14() {
		StringEntity entity = new StringEntity(//
				"important message", ContentType//
						.create("plain/text", Consts.UTF_8));
		entity.setChunked(true);
		HttpPost httppost = new HttpPost("http://localhost/acrtion.do");
		httppost.setEntity(entity);
		System.out.println(httppost.getMethod());
	}

	/**
	 * UrlEncodedFormEntity to facilitate the process to simulate the process of
	 * submitting an HTML form
	 * 
	 * @throws Exception
	 * @throws ClientProtocolException
	 */
	@Test
	public void test13() throws ClientProtocolException, Exception {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		List<NameValuePair> formparams = new ArrayList<NameValuePair>();

		formparams.add(new BasicNameValuePair("_method", "POST"));
		formparams.add(new BasicNameValuePair("username", "11111"));
		formparams.add(new BasicNameValuePair("password", "22222"));
		formparams.add(new BasicNameValuePair("rePassword", "22222"));
		formparams.add(new BasicNameValuePair("email", "22222@qq.com"));
		formparams.add(new BasicNameValuePair("verifyCode", "7x86"));
		// param1=value1&param2=value2
		UrlEncodedFormEntity entity = new UrlEncodedFormEntity(formparams, Consts.UTF_8);
		HttpPost httppost = new HttpPost("http://dddd.com/shopping/client/user");
		httppost.setEntity(entity);
		CloseableHttpResponse response = httpclient.execute(httppost);

		try {
			HttpEntity entitys = response.getEntity();
			OutputStream out = null;
			if (entitys != null) {
				InputStream instream = entitys.getContent();
				try {
					File file = new File("e:/a.html");
					out = new FileOutputStream(file);
					byte[] by = new byte[1024];
					int len = 0;
					while ((len = instream.read(by)) > 0) {
						out.write(by, 0, len);
					}
				} finally {
					instream.close();
					out.close();
				}
			}
		} finally {
			response.close();
		}
	}

	/**
	 * 
	 * HttpClient provides several classes for most common data containers such
	 * as string, byte array, input, stream, and file : StringEntity
	 * ByteArrayEntity, InputStreamEntity, and FileEtity
	 */
	@Test
	public void test12() {
		File file = new File("somefile.txt");
		FileEntity entity = new FileEntity(file, ContentType//
				.create("text/plain", "UTF-8"));

		HttpPost httppost = new HttpPost("http://localhost/action.do");
		httppost.setEntity(entity);
	}

	/**
	 * the content original entity to be read into a in-memory buffer
	 * 
	 * @throws Exception
	 */
	@Test
	public void test11() throws Exception {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet("http://www.baidu.com");
		CloseableHttpResponse response = httpclient.execute(httpget);
		HttpEntity entity = response.getEntity();
		if (entity != null) {
			HttpEntity httpEntity = entity = new BufferedHttpEntity(entity);
		}
	}

	@Test
	public void test10() throws Exception {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet("http://www.baidu.com");
		CloseableHttpResponse response = httpclient.execute(httpget);
		try {
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				System.out.println(EntityUtils.toString(entity));
			}
		} finally {
			response.close();
		}
	}

	/**
	 * @throws IOException
	 * @throws ClientProtocolException
	 * 
	 * 
	 */
	@Test
	public void test09() throws ClientProtocolException, IOException {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet("http://www.baidu.com");
		CloseableHttpResponse response = httpclient.execute(httpget);
		try {
			HttpEntity entity = response.getEntity();
			if (entity != null) {
				InputStream instream = entity.getContent();
				int byteOne = instream.read();
				System.out.println(byteOne);
				int byteTwo = instream.read();
				System.out.println(byteTwo);
				// Do not need the rest
			}
		} finally {
			response.close();
		}
	}

	/**
	 * get web entity
	 * 
	 * @throws Exception
	 */
	@Test
	public void test08() throws Exception {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet("http://www.cnblogs.com/loveyakamoz/archive/2011/07/21/2112804.html");
		CloseableHttpResponse response = httpclient.execute(httpget);
		try {
			HttpEntity entity = response.getEntity();
			OutputStream out = null;
			if (entity != null) {
				InputStream instream = entity.getContent();
				try {
					File file = new File("e:/a.html");
					out = new FileOutputStream(file);
					byte[] by = new byte[1024];
					int len = 0;
					while ((len = instream.read(by)) > 0) {
						out.write(by, 0, len);
					}
				} finally {
					instream.close();
					out.close();
				}
			}
		} finally {
			response.close();
		}
	}

	/**
	 * operate StringEntity
	 * 
	 * @throws Exception
	 */

	@Test
	public void test07() throws Exception {
		StringEntity myEntity = new StringEntity("important message", ContentType//
				.create("text/plain", "UTF-8"));
		System.out.println(myEntity.getContentType());
		System.out.println(myEntity.getContentLength());
		System.out.println(EntityUtils.toString(myEntity));
		System.out.println(EntityUtils.toByteArray(myEntity).length);
	}

	/**
	 * to parse HTTP messages into individual header elements
	 */
	@Test
	public void test06() {
		HttpResponse response = new BasicHttpResponse(HttpVersion.HTTP_1_1, HttpStatus.SC_OK, "OK");
		response.addHeader("Set-Cookie", "c1=a; path=/; domain=localhost");
		response.addHeader("Set-Cookie", "c2=b; path=\"/\", c3=c; domain=\"localhost\"");

		HeaderElementIterator it = new BasicHeaderElementIterator(response.headerIterator("Set-Cookie"));

		while (it.hasNext()) {
			HeaderElement elem = it.nextElement();
			System.out.println(elem.getName() + " = " + elem.getValue());
			NameValuePair[] params = elem.getParameters();
			for (int i = 0; i < params.length; i++) {
				System.out.println("----------------------------------");
				System.out.println(" " + params[i]);
			}
			System.out.println("++++++++++++++++++++++++++++++++++");
		}
	}

	/**
	 * iterator header message
	 */
	@Test
	public void test05() {
		HttpResponse response = new BasicHttpResponse(HttpVersion.HTTP_1_1, HttpStatus.SC_OK, "OK");
		response.addHeader("Set-Cookie", "c1=a; path=/; domain=localhost");
		response.addHeader("Set-Cookie", "c2=b; path=\"/\", c3=c; domain=\"localhost\"");
		HeaderIterator it = response.headerIterator("Set-Cookie");

		while (it.hasNext()) {
			System.out.println(it.next());
		}
	}

	/**
	 * retrieve ,add , remove and enumeration response headers
	 */
	@Test
	public void test04() {
		HttpResponse response = new BasicHttpResponse(HttpVersion.HTTP_1_1, HttpStatus.SC_OK, "OK");
		response.addHeader("Set-Cookie", "c1=a; path=/; domain=localhost");
		response.addHeader("Set-Cookie", "c2=b; path=\"/\", c3=c; domain=\"localhost\"");
		Header h1 = response.getFirstHeader("Set-Cookie");
		System.out.println(h1);
		Header h2 = response.getLastHeader("Set-Cookie");
		System.out.println(h2);
		Header[] hs = response.getHeaders("Set-Cookie");
		System.out.println(hs.length);
	}

	/**
	 * set up response
	 */
	@Test
	public void test03() {
		HttpResponse response = new BasicHttpResponse(HttpVersion.HTTP_1_1, HttpStatus.SC_OK, "OK");
		System.out.println(response.getProtocolVersion());
		System.out.println(response.getStatusLine().getStatusCode());
		System.out.println(response.getStatusLine().getReasonPhrase());
		System.out.println(response.getStatusLine().toString());
	}

	/**
	 * mosaic uri request
	 * 
	 * @throws Exception
	 */
	@Test
	public void test02() throws Exception {
		URI uri = new URIBuilder()//
				.setScheme("http").setHost("www.google.com")//
				.setPath("/search")//
				.setParameter("q", "httpclient")//
				.setParameter("btnG", "Google Search")//
				.setParameter("aq", "f")//
				.setParameter("oq", "")//
				.build();
		HttpGet httpget = new HttpGet(uri);
		System.out.println(httpget.getURI());
	}

	/**
	 * 1> HttpClients方法创建客户端实例
	 * 2> 创建Get对象
	 * 3> 执行并返回结果
	 * 
	 * @throws IOException
	 * @throws ClientProtocolException
	 */
	@Test
	public void test01() throws IOException, ClientProtocolException {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpGet httpget = new HttpGet("http://www.baidu.com");
		CloseableHttpResponse response = httpclient.execute(httpget);
		System.out.println(response.getStatusLine().toString());
		response.close();
	}
}
