<1>继承
	接口继承
		BeanFactory <-- ListenableBeanFactory <-- ApplicationContext
	实体(从基到子)
		DefaultResourceLoader
		AbstractApplicationContext
		AbstractRefreshableApplicationContext
		AbstractRefreshableConfigApplicationContext
		AbstractXmlApplicationContext
		FileSystemXmlApplicationContext
<2>流程
	定位资源：

		类：FileSystemXmlApplicationContext
				方法：Constructor
	1) setConfigLocations(configLocations); //设置资源地址字符串（XML文件地址）
	2) refresh(); //调用基类的refresh()方法

		类：AbstractApplicationContext
				方法：refresh()
	3) obtainFreshBeanFactory()
				方法：obtainFreshBeanFactory
	4) refreshBeanFactory()

		类：AbstractRefreshableApplicationContext
				方法：refreshBeanFactory()
	5) createBeanFactory(); //创建DefaultListableBeanFactory对象，作为实际的IOC容器
	6) loadBeanDefinitions(beanFactory); //模板方法模式调用子类实现

		类：AbstractXmlApplicationContext
				方法：loadBeanDefinitions(DefaultListableBeanFactory beanFactory)
	7) new XmlBeanDefinitionReader(beanFactory); //创建读取资源的Reader类
	8) loadBeanDefinitions(beanDefinitionReader);
				方法：loadBeanDefinitions(XmlBeanDefinitionReader reader)
	9) reader.loadBeanDefinitions(configLocations);//这个方法有两种情况，分别处理Resource资源和String资源

		类：AbstractBeanDefinitionReader
				方法：loadBeanDefinitions(String... locations)
	10) for (String location : locations) {
			counter += loadBeanDefinitions(location);
		}
				方法：loadBeanDefinitions(String location)
	11) return loadBeanDefinitions(location, null);

				方法：loadBeanDefinitions(String location, Set<Resource> actualResources)
	12) ResourceLoader resourceLoader = getResourceLoader();//该对象将String转化为Resource
	13) ((ResourcePatternResolver) resourceLoader).getResources(location);//转换资源AbstractApplicationContext

		类：AbstractApplicationContext
				方法：getResources(String locationPattern)
	14) return this.resourcePatternResolver.getResources(locationPattern);

		类：PathMatchingResourcePatternResolver
				方法：getResources(String locationPattern)
	15) return new Resource[] {getResourceLoader().getResource(locationPattern)};

		类：DefaultResourceLoader
				方法：getResource(String location)
	16) return getResourceByPath(location);

		类：FileSystemXmlApplicationContext
				方法：getResourceByPath(String path)
	17) return new FileSystemResource(path);//创建一个Resource并返回



	加载资源：
		类：AbstractBeanDefinitionReader
				方法：loadBeanDefinitions(String location, Set<Resource> actualResources)
	18) int loadCount = loadBeanDefinitions(resources);
				方法：loadBeanDefinitions(Resource... resources)
	19) for (Resource resource : resources) {
			counter += loadBeanDefinitions(resource);//循环加载注册资源
		}

		类：XmlBeanDefinitionReader
				方法：loadBeanDefinitions(EncodedResource encodedResource)
	20) InputStream inputStream = encodedResource.getResource().getInputStream();//创建IO流
	21) return doLoadBeanDefinitions(inputSource, encodedResource.getResource());
				方法：doLoadBeanDefinitions(InputSource inputSource, Resource resource)
	22) Document doc = doLoadDocument(inputSource, resource);//将读入的资源转化为Docuemnt
	23) return registerBeanDefinitions(doc, resource);
				方法：registerBeanDefinitions(Document doc, Resource resource)
	24) BeanDefinitionDocumentReader documentReader = createBeanDefinitionDocumentReader();
	25) documentReader.registerBeanDefinitions(doc, createReaderContext(resource));

		类：DefaultBeanDefinitionDocumentReader
				方法:registerBeanDefinitions(Document doc, XmlReaderContext readerContext)
	26) Element root = doc.getDocumentElement();将Document转化为Element
	27) doRegisterBeanDefinitions(root);


				方法:doRegisterBeanDefinitions(Element root)
	28) this.delegate = createDelegate(getReaderContext(), root, parent);//

	很重要，解析Element使用的就是这个对象
	29) parseBeanDefinitions(root, this.delegate);


				方法:parseBeanDefinitions(Element root, BeanDefinitionParserDelegate delegate)
	30) NodeList nl = root.getChildNodes();
			for (int i = 0; i < nl.getLength(); i++) {//逐条解析，对应每一个Bean
				Node node = nl.item(i);
				if (node instanceof Element) {
					Element ele = (Element) node;
					if (delegate.isDefaultNamespace(ele)) {
						parseDefaultElement(ele, delegate);//解析import，alias，bean，beans
					}
					else {
						delegate.parseCustomElement(ele);
					}
				}
			}


				方法:parseDefaultElement(Element ele, BeanDefinitionParserDelegate delegate)
	31) processBeanDefinition(ele, delegate);//解析bean


				方法: processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate)
	32) BeanDefinitionHolder bdHolder = delegate.parseBeanDefinitionElement(ele);

				方法: parseBeanDefinitionElement(Element ele, BeanDefinition containingBean)
	33) String id = ele.getAttribute(ID_ATTRIBUTE);//读取ID
	34) String nameAttr = ele.getAttribute(NAME_ATTRIBUTE);//读取name
	35) AbstractBeanDefinition beanDefinition = parseBeanDefinitionElement(ele, beanName, containingBean);//进一步解析


	36) return new BeanDefinitionHolder(beanDefinition, beanName, aliasesArray);//将解析好的BeanDefinition装入BeanDefinitionHolder








		类：DefaultBeanDefinitionDocumentReader
				方法:processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate)
	37) BeanDefinitionReaderUtils.registerBeanDefinition(bdHolder, getReaderContext().getRegistry());

		类：DefaultListableBeanFactory
				方法:registerBeanDefinition(String beanName, BeanDefinition beanDefinition)
	38) this.beanDefinitionNames.add(beanName);
		this.manualSingletonNames.remove(beanName);
		this.frozenBeanDefinitionNames = null;
		this.beanDefinitionMap.put(beanName, beanDefinition);

		定义如下：
			/** List of bean definition names, in registration order */
			private final List<String> beanDefinitionNames = new ArrayList<String>(64);
			/** List of names of manually registered singletons, in registration order */
			private final Set<String> manualSingletonNames = new LinkedHashSet<String>(16);
			/** Map of bean definition objects, keyed by bean name */
			private final Map<String, BeanDefinition> beanDefinitionMap = new ConcurrentHashMap<String, BeanDefinition>(64);
		可见最终bean资源其实是注册到了BeanFactory子类的一个ConcurrentHashMap中






重点：

DefaultBeanDefinitionDocumentReader类的
parseBeanDefinitions(Element root, BeanDefinitionParserDelegate delegate)方法
逐条解析Bean

processBeanDefinition(Element ele, BeanDefinitionParserDelegate delegate)方法
解析和注册Bean

BeanDefinitionParserDelegate类的
parseBeanDefinitionElement(Element ele, BeanDefinition containingBean)方法真正解析

DefaultListableBeanFactory类的
registerBeanDefinition(String beanName, BeanDefinition beanDefinition)方法真正的注册




类DefaultListableBeanFactory的
preInstantiateSingletons()预加载Bean

AbstractBeanFactory类的
doGetBean(
			final String name, final Class<T> requiredType, final Object[] args, boolean typeCheckOnly)方法
			实际加载Bean的入口


AbstractAutowireCapableBeanFactory类的
doCreateBean(final String beanName, final RootBeanDefinition mbd, final Object[] args)方法
instanceWrapper = createBeanInstance(beanName, mbd, args);初始化Bean和
populateBean(beanName, mbd, instanceWrapper);建立关联关系

createBeanInstance(String beanName, RootBeanDefinition mbd, Object[] args)使用各种方法初始化Bean

BeanFactory和ApplicationContext













@Override
	public void refresh() throws BeansException, IllegalStateException {
		synchronized (this.startupShutdownMonitor) {
			// Prepare this context for refreshing.
			prepareRefresh();

			// 在子类中启动refreshBeanFactory的地方
			ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

			// Prepare the bean factory for use in this context.
			prepareBeanFactory(beanFactory);

			try {
				// 设置BeanFactory的后置处理
				postProcessBeanFactory(beanFactory);

				// 调用BeanFactory的后处理器，这些后处理器是在Bean定义中向容器注册的
				invokeBeanFactoryPostProcessors(beanFactory);

				// 注册Bean的后处理器，在Bean创建过程中调用
				registerBeanPostProcessors(beanFactory);

				// 对上下文中的消息源进行初始化
				initMessageSource();

				// 初始化上下文中的事件机制
				initApplicationEventMulticaster();

				// 初始化其他特殊的Bean
				onRefresh();

				// 检查监听Bean并且将这些Bean向容器注册
				registerListeners();

				// 初始化所有的（non-lazy-init）单间
				finishBeanFactoryInitialization(beanFactory);

				// 发布容器事件，结束Refresh过程
				finishRefresh();
			}

			catch (BeansException ex) {
				logger.warn("Exception encountered during context initialization - cancelling refresh attempt", ex);

				// 为防止Bean资源的占用，在异常处理中，销毁已经在前面过程中生成的单间Bean
				destroyBeans();

				// 重置active标记
				cancelRefresh(ex);

				// Propagate exception to caller.
				throw ex;
			}
		}
	}





	========================================================================================

流程：
	1> 首先创建BeanFactory（模板方法设计模式）对象
	2> 然后创建Reader对象，关联Reader与BeanFactory
	3> Reader对象去定位Resource对象（模板方法设计模式）
	4> 创建IO流解析Resource文件为Document对象
	5> 创建DocumentReader注册Document
		6> 依赖Document的根节点创建delegate对象然后开始解析
		7> 解析过程是：从DefaultBeanDefinitionDocumentReader类的parseDefaultElement方法开始解析一次解析，import，aliasebean，beans等
		8> 解析完之后生成一个definitionHolder对象其中包含着BeanDefinition对象
		9> 最后将BeanDefinition对象注册到了之前的那个BeanFactory对象中，存储方式是ConcurrentHashMap

========================================================================================

初始化过程：
	1> lazy-init为false所以默认会触发bean的加载过程，改成lazy后字节码不会被加载
	2> 加载顺序：类工厂，构造器，CGLIB
	3> populateBean会解决依赖关系,先处理autowire之后是配置文件中配置的依赖关系，如果实现ApplicationContextAware接口就将IOC上下文注入进去
	4> 如果实现BeanPostProcessor接口，会触发监视器，在init方法执行前后分别调用
	5> 将Bean注册到DefaultSingletonBeanRegistry的ConcurrentHashMap中
	6> 事件机制采用观察者模式


最核心：
	AbstractAutowireCapableBeanFactory类的
		doCreateBean(final String beanName, final RootBeanDefinition mbd, final Object[] args)方法
			-> instanceWrapper = createBeanInstance(beanName, mbd, args);初始化Bean和
			-> populateBean(beanName, mbd, instanceWrapper);建立关联关系

========================================================================================

Spring中模板方法设计模式：
	1> 父类定义接口，createFactory在子类中具体实现
	2> 父类调用getResourceByPath，子类子类分别去实现它

========================================================================================

注入方式：
接口注入
属性注入[属性的SET/GET]
构造注入[构造方法注入]
使用构造函数依赖注入时，Spring保证所有一个对象所有依赖的对象先实例化后，才实例化这个对象。使用set方法依赖注入时，Spring首先实例化对象，然后才实例化所有依赖的对象。
当设值注入与构造注入同时存在时，先执行设置注入，在执行构造注入。