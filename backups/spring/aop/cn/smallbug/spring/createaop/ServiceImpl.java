package cn.smallbug.spring.createaop;

public class ServiceImpl implements Service {

	@Override
	public void save() {
//		int d = 1/0;
		System.out.println("impl save entity!");
	}

}
