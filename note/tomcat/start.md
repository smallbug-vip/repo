## tomcat启动流程详解 ##

#### 一、 Bootstrap和Catalina的作用 ####

首先Bootstrap中main方法执行，在这里首先会执行init方法初始化一些系统参数和类加载器，具体如下：  

    public void init()
        throws Exception
    {

        setCatalinaHome();
        setCatalinaBase();

        initClassLoaders();

        Thread.currentThread().setContextClassLoader(catalinaLoader);

        SecurityClassLoad.securityClassLoad(catalinaLoader);

        Class<?> startupClass =
            catalinaLoader.loadClass
            ("org.apache.catalina.startup.Catalina");
        Object startupInstance = startupClass.newInstance();

        String methodName = "setParentClassLoader";
        Class<?> paramTypes[] = new Class[1];
        paramTypes[0] = Class.forName("java.lang.ClassLoader");
        Object paramValues[] = new Object[1];
        paramValues[0] = sharedLoader;
        Method method =
            startupInstance.getClass().getMethod(methodName, paramTypes);
        method.invoke(startupInstance, paramValues);

        catalinaDaemon = startupInstance;

    }
具体逻辑是：  
　1. 初始化环境变量，如： `catalina.home，catalina.base` 等  
　2. 根据 `catalina.home` 中的值读取路径信息，从而读取相关的路径和jar包，以此作为参数初始化ClassLoader  
　3. 通过反射，创建 `org.apache.catalina.startup.Catalina` 对象，然后设置其 `parentClassLoader` 属性的值为刚才创建的类加载器  
　4. 设置 `catalinaDaemon` 属性的值为刚才创建的 `org.apache.catalina.startup.Catalina` 实例

----------
然后是继续通过反射，去执行 `org.apache.catalina.startup.Catalina` 实例的load方法  

    public void load() {

    long t1 = System.nanoTime();

    initDirs();

    initNaming();

    Digester digester = createStartDigester();

    InputSource inputSource = null;
    InputStream inputStream = null;
    File file = null;
    try {
        file = configFile();
        inputStream = new FileInputStream(file);
        inputSource = new InputSource(file.toURI().toURL().toString());
    } catch (Exception e) {
        if (log.isDebugEnabled()) {
            log.debug(sm.getString("catalina.configFail", file), e);
        }
    }

    inputSource.setByteStream(inputStream);
    digester.push(this);
    digester.parse(inputSource);

    getServer().setCatalina(this);

    initStreams();

    try {
        getServer().init();
    } catch (LifecycleException e) {
        if (Boolean.getBoolean("org.apache.catalina.startup.EXIT_ON_INIT_FAILURE")) {
            throw new java.lang.Error(e);
        } else {
            log.error("Catalina.start", e);
        }

    }

    long t2 = System.nanoTime();
    if(log.isInfoEnabled()) {
        log.info("Initialization processed in " + ((t2 - t1) / 1000000) + " ms");
    }
    }  
其具体的实现逻辑如下：  
　1. 初始化环境变量，具体来说就是检查 `catalina.home，catalina.base` 中的路径是否是绝对路径，如果不是转化为绝对路径，检查缓存路径等  
　2. 创建 Digester 实例解析 `%catalina.base%/conf/service.xml` 文件，这一步非常重要，就好比你要组装一部汽车，`service.xml` 就是这部汽车的组装说明书，Tomcat是这部车。Digester 是apache的一个开源框架，如果想要了解更多，可以先暂且抛开Tomcat源码单独研究这个工具，目前只要知道这个工具可以根据service.xml中配置的信息初始化Tomcat各组件的依赖关系即可  
　3. 建立server与catalina的关联关系  
　4. 装饰输出流  
　5. 初始化server，这个是整个容器初始化开始的入口，非常重要，稍后重点讨论  
> 在第二点还要注意一个问题就是由于重写了 `SetParentClassLoaderRule` 所以在根据 server.xml 创建系统组件时导致Engine和Host的 parentClassLoader 和 Catalina 的 parentClassLoader 是一样的，也就是说该 classLoader 是根据 `catalina.home` 下的jar文件和文件夹创建的  


----------
到此时 catalina 的 load 就以反射的形式被执行完了，接下来就是反射执行 Catalina 的 start 方法

    public void start() {
    
	    if (getServer() == null) {
	        load();
	    }
	
	    if (getServer() == null) {
	        log.fatal("Cannot start server. Server instance is not configured.");
	        return;
	    }
	
	    long t1 = System.nanoTime();
	
	    // Start the new server
	    try {
	        getServer().start();
	    } catch (LifecycleException e) {
	        log.fatal(sm.getString("catalina.serverStartFail"), e);
	        try {
	            getServer().destroy();
	        } catch (LifecycleException e1) {
	            log.debug("destroy() failed for failed Server ", e1);
	        }
	        return;
	    }
	
	    long t2 = System.nanoTime();
	    if(log.isInfoEnabled()) {
	        log.info("Server startup in " + ((t2 - t1) / 1000000) + " ms");
	    }
	
	    // Register shutdown hook
	    if (useShutdownHook) {
	        if (shutdownHook == null) {
	            shutdownHook = new CatalinaShutdownHook();
	        }
	        Runtime.getRuntime().addShutdownHook(shutdownHook);
	
	        LogManager logManager = LogManager.getLogManager();
	        if (logManager instanceof ClassLoaderLogManager) {
	            ((ClassLoaderLogManager) logManager).setUseShutdownHook(
	                    false);
	        }
	    }
	
	    if (await) {
	        await();
	        stop();
	    }
    }
这个方法的核心功能是调用server的start方法，真正启动容器。当然在核心功能之下还有一些其他的辅助功能。如：  
　1. 如果使用关闭钩子的话，就在这里注册关闭钩子，其作用就是在服务器异常停止时调用server的 stop 方法，以此中方式处理一些敏感资源  
　2. 调用server的 await 方法，该方法的作用是：创建一个 ServerSocket 监听接收关闭指令的端口，该端口默认是8005,如果没有关闭指令的话，主线程将阻塞在此处~  
　3. 待到接收到关闭指令后，await将执行完毕，随即执行 catalina 的 stop 方法，该方法主要是检测JVM是否注册了关闭钩子，如果注册了就清除，然后调用 server 的 stop 方法和 destory 方法
　







----------  
*以上代码为了阅读方便，均有所省略*   
