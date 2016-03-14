package cn.smallbug.spring.createaop;

import java.lang.reflect.Proxy;

public class TestAop {

	public static void main(String[] args) {
		ApplicationFilterChain chain = new ApplicationFilterChain();
		chain.addChain(new Transactional());
		ServiceImpl impl = new ServiceImpl();
		Interceptor inte = new Interceptor(impl, chain, "^save*");
		Service s = (Service) Proxy.newProxyInstance(//
				TestAop.class.getClassLoader(), //
				impl.getClass().getInterfaces(), //
				inte);
		s.save();
	}
}
