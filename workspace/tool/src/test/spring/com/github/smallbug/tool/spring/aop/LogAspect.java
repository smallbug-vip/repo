package com.github.smallbug.tool.spring.aop;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.github.smallbug.tool.develop.jackson.JacksonUtil;

/**
 * 
 * 添加注解：<aop:aspectj-autoproxy/>
 *
 * @version 2016年11月3日
 *
 */
@Component
@Aspect
public class LogAspect {

	private Log logger = LogFactory.getLog(getClass());

	@Pointcut("@annotation(org.springframework.web.bind.annotation.RequestMapping)")
	public void logPointcut() {

	}

	@Around("logPointcut()")
	public Object log(ProceedingJoinPoint jp) throws Throwable {
		HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes())
				.getRequest();

		String username = (String)request.getSession().getAttribute("system.username");
		// 打印请求信息
		String queryString = JacksonUtil.obj2Json(request.getParameterMap(), JacksonUtil.JSON, null);
		logger.info(String.format("用户【%s】来自%s的%s方法请求 %s,请求参数:%s", username, getIpAddr(request), request.getMethod(),
				request.getRequestURI(), queryString));

		// 打印耗时及返回结果
		long startTime = System.currentTimeMillis();
		Object result = jp.proceed();
		long duration = System.currentTimeMillis() - startTime;
		logger.info(String.format("请求用时:%sms,返回结果:%s", duration, result));

		return result;
	}

	private String getIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (StringUtils.isBlank(ip)) {
			ip = request.getRemoteAddr();
		}
		if (ip != null && ip.indexOf(",") > 0) {
			ip = ip.substring(0, ip.indexOf(","));
		}
		return ip;
	}
}
