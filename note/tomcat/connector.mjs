init：
JIOEndpoint类
	bind方法：
		393：serverSocketFactory = new DefaultServerSocketFactory(this);//创建socketfactory
		400：serverSocket = serverSocketFactory.createSocket(getPort(),getBacklog());//创建serverSocket

start：
JIOEndpoint类
	startInternal()方法:
		430：createExecutor();//初始化excuter线程池
		433: initializeConnectionLatch();//初始化共享锁
		435：startAcceptorThreads();//创建JIOEndpoint$Acceptor类实例并开启它
				222: socket = serverSocketFactory.acceptSocket(serverSocket);//用于接收socket
				236:Acceptor的run方法中执行processSocket()将任务提交： getExecutor().execute(new SocketProcessor(wrapper));
		438：new Thread(new AsyncTimeout(), getName() + "-AsyncTimeout");//创建JIOEndpoint$AsyncTimeout类实例并开启它,检测request是否超时

处理socket：
	1> 236：JIOEndpoint::Acceptor::run     processSocket(socket)
	2> 526: JIOEndpoint::processSocket 		new SocketWrapper<Socket>(socket)包装:增加可重入读写锁
	3> 533:	JIOEndpoint::processSocket 		getExecutor().execute(new SocketProcessor(wrapper));包装并执行
	4> 314: JIOEndpoint::SocketProcessor:run方法：
					 if ((state != SocketState.CLOSED)) {
                        if (status == null) {
                            state = handler.process(socket, SocketStatus.OPEN_READ);
                        } else {
                            state = handler.process(socket,status);
                        }
                    }

    5> 625：AbstractProtocol::AbstractConnectionHandler::process方法

    6> 1079: AbstractHttp11Processor::process      
    						创建buffer对象，解析请求头，创建request，response对象
    						adapter.service(request, response);

    7> 423: CoyoteAdapter::service     connector.getService().getContainer().getPipeline().getFirst().invoke(request, response);







    =============================================================================================================

NioEndpoint::bind()
470:
	serverSock = ServerSocketChannel.open();
	socketProperties.setProperties(serverSock.socket());
	InetSocketAddress addr = (getAddress()!=null?new InetSocketAddress(getAddress(),getPort()):new InetSocketAddress(getPort()));
	serverSock.socket().bind(addr,getBacklog());
	serverSock.configureBlocking(true); //mimic APR behavior
	serverSock.socket().setSoTimeout(getSocketProperties().getSoTimeout());

初始化：
NioEndpoint::startInternal()
				543：createExecutor();//初始化excuter线程池
				546:initializeConnectionLatch();//初始化共享锁
				550:初始化轮询器
				  	for (int i=0; i<pollers.length; i++) {
			                pollers[i] = new Poller();
			                Thread pollerThread = new Thread(pollers[i], getName() + "-ClientPoller-"+i);
			                pollerThread.setPriority(threadPriority);
			                pollerThread.setDaemon(true);
			                pollerThread.start();
			            }
			    startAcceptorThreads();//开启接收线程

处理Socket：
		840: NioEndpoint::Acceptor::run    setSocketOptions(socket) 
		691: NioEndpoint::setSocketOptions 		getPoller0().register(channel);
		1083: NioEndpoint::register 		r = new PollerEvent(socket,ka,OP_REGISTER);
											addEvent(r);

		1017:ConcurrentLinkedQueue<Runnable> events.offer(event);

		1245:processKey(sk, attachment);

		1292:processSocket(channel, SocketStatus.OPEN_READ, true)

		759: getExecutor().execute(sc);

=============================================================================================================

处理流程：



	





=============================================================================================================

问：request是怎么找到正确的context和wrapper的？
答：
	1> 在tomcat初始化时会根据配置文件在Connector中初始化一个Mapper对象
	2> 在CoyoteAdapter中解析request请求头时会context和wrapper对象,并加到mapper中
	3> 通过一个MappingData对象将context和wrapper对象设置到request中。

-----------------------------------------------

问：简述Filter的原理。
答：
	1> 在Wrapper初始化时会随之初始化一个ApplicationFilterChian它里面有一个FilterConfig数组
	2> 加载在web.xml中配置的filter文件。放入这个config数组
	3> 执行ApplicationFilterChian的doFilter方法，这个方法里面每次会将一个计数器+1以此来调用不同的filter。

-----------------------------------------------

问：Servlet是如何被加载的？
答：
	1> Context初始化时有一个实现了Listener接口的ContextConfig对象
	2> 在ContextConfig中有一个WebXml对象解析xml文件并创建wrapper对象然后将StandardContext包装后传给Wrapper
	3> 当Servlet首次被访问或者是在web.xml配置了启动参数之后，StandardWrapper会使用实例管理器创建Servlet并将Wrapper包装以ServletConfig的形式传给Servlet类。

-----------------------------------------------

问：说说Tomcat的监听器
	采用观察者模式，有生命周期监听器和事件监听器两类。

-----------------------------------------------

问：Tomcat如何实现Session机制
答：
	1> 首先当服务器端调用getSession时才会创建session，如果访问呢JSP的话默认是<%@ page session="true" %>会调用getSession
	2> 如果没有与jsessionid对应的session对象的话，StandardManager会创建，它存储session的形式是ConcurrentHashMap

-----------------------------------------------

问：Tomcat如何解析Cookie，以此来获取jsessionid的
答：在AbstractHttp11Processor类的process方法中解析Cookie，如果有jsessionid的话，就将jsessionid设置到request中

-----------------------------------------------

问：简述java类加载机制
答：1> Bootstrap ClassLoader: 加载JVM自身工作需要的的类，没有子类
	2> ExtClassLoader: 加载java.ext.dirs目录下的类，它没有父类。
	3> AppClassLoader: 加载应用的类，父类是ExtClassLoader

-----------------------------------------------

问：如何自己实现ClassLoader的类加载机制
答：
	1> 重写ClassLoader的findClass方法
	2> 在这个方法里面读取class文件为byte[]数组
	3> 传入defineClass方法,该方法返回加载的类
	或：
	loadclass

	前者不保证类加载的父亲委托机制，后者保证了类加载的父亲委托机制

-----------------------------------------------

问：Servlet类加载机制
答：Servlet是被InstanceManager创建的，而InstanceManager是借用StandardContext的类加载器初始化的。每一个StandardContext都是被不同的WebappClassLoader类加载器加载的。

-----------------------------------------------

问：JSP如何实现热部署
答：




Server 1----* service  1----1 engine  1----*  host  1----*  context