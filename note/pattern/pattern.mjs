创建型模式(五种)
工厂方法模式(Factory)：工厂创建对象（经典实现：很多框架初始化时都会创建一个工厂对象，用来加载资源）
抽象工厂模式(Abstractfactory)：抽象工厂实例创建对象，工厂可修改，灵活度高（经典实现：Struts2插件机制的核心实现就是BeanFactory这个抽象工厂。Spring IOC加载Bean，AOP创建Proxy）
单例模式(Sington)：适用于只需要一个对象的情况（经典实现：Tomcat中StringManager的错误处理机制）
建造者模式(Builder)：一步一步创建一个复杂的对象（经典实现：MyBatis中的SQLSession就是结合了Configure，executor等对象，以此来实现SQLSession的复杂功能）
原型模式(Prototype)：复制对象，包括深度复制和浅度复制，深度复制重建引用对象，浅度复制不创建（经典实现：java序列化）




结构型模式(七种)
适配器模式(Adapter)：通过实现接口，依赖注入，继承等方式为不相关的实体建立关系（经典实现：Tomcat新版本连接器Coyote，就是通过为Connector适配建立了ProtocolHandler与Tomcat组件Connector的关联关系）
装饰器模式(Decorator)：创建包装对象修饰扩展被包装对象的功能（经典实现：IO家族中BufferedXxx）
代理模式(Proxy)：通过添加中间代理的方式限制，过滤，修改被代理类的某些行为（经典实现：Spring AOP核心实现，DataSource中为Connection创建代理对象，改变close方法的行为，使其从开始的关闭连接变成将连接还回连接池）
外观模式(Facade)：通过外观的包装，使应用程序只能看到外观对象，而不会看到具体的细节对象。（经典实现：Tomcat中创建外观类包装StandardContext传给Wrapper，创建外观类包装Wrapper以ServletConfiguration的形式传给Servlet，以此来屏蔽不想让Servlet可见的那些Tomcat容器参数）
桥接模式(Bridge)：将抽象部分与它的实现部分分离，使它们都可以独立地变化（经典实现：JDBC驱动）
组合模式(Composite)：部分与整体，常用于表示树形结构
享元模式(Flyweight)：维护资源集合（经典实现：数据库连接池，避免重新开启数据库链接的开销）
 
 
行为型模式(十一种)
策略模式(Strategy)：定义多个不同的实现类，这些类实现公共接口，通过调用接口调用不同实例得到不同结果（Spring中Bean的定义与注入，Controller，Servcie，repository三层架构中只依赖上一层接口）
模板方法模式(Template)：父类定义公共方法，不同子类重写父类抽象方法，得到不同结果（经典实现：Tomcat生命周期中的init，SpringIOC上层类加载具体子类指定的配置文件）
观察者模式(Observer)：目标方法被调用，通知所有观察者（经典实现：Tomcat生命周期事件监听，Spring BeanPostProcessor实现 ）
迭代子模式(Interator)：提供一种方法顺序访问一个聚合对象中各个元素, 而又不需暴露该对象的内部表示。（经典实现：集合迭代器）
责任链模式(ChainOfResponsibility)：链式依赖，依次调用（经典实现：Tomcat Valve）
命令模式(Commond)：Action定义具体命令，拦截器Invocation回调执行命令（经典实现：Struts2）
备忘录模式(Memento)：建立原始对象副本，用于存储恢复原始对象数据
状态模式(Stage)：通过改变状态，改变行为（经典实现：切换装载着不同配置信息的配置文件对象）
访问者模式(Visitor)：结构与操作解耦。灵活的操作，放入固定的结构中执行（经典实现：在SpringAOP的实现过程中首先会有一个ProxyCreator去创建切入点，通知之类的，然后创建一个抽象工厂将这些参数对象传递给抽象工厂，抽象工厂调用createAopProxy(this)来创建对象，传入不同的抽象工厂创建出不同的实体对象）
中介者模式(Mediator)：MVC 框架，其中C（控制器）就是 M（模型）和 V（视图）的中介者
解释器模式(Iterpreter)：定义分别定义 + - * / 非终结符，组合不同的非终结符定义不同的表达式，维护繁琐