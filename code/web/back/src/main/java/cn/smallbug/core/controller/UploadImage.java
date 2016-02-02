package cn.smallbug.core.controller;

import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;

@Controller
public class UploadImage {

	@RequestMapping(value = "/upload/uploadImage.do")
	public void uploadImage(@RequestParam(required = false) MultipartFile pic, HttpServletResponse response) {

		String ext = FilenameUtils.getExtension(pic.getOriginalFilename());
		String uuid = UUID.randomUUID().toString();
		String newFileName = uuid + "." + ext;

		// 实例化jersey
		Client client = new Client();

		// 另一台服务器的请求路径
		String url = "http://192.168.88.131:8080/back/upload/" + newFileName;

		// 设置请求路径
		WebResource resource = client.resource(url);

		// 发送
		try {
			resource.put(String.class, pic.getBytes());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		JSONObject jo = new JSONObject();
		jo.put("url", url);

		try {
			response.getWriter().write(jo.toString());
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
}
