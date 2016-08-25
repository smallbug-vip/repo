
一、JDBC概述
	JDBC:Java DataBase Connectivity(Java连接数据库的标准。SUN制定的)
	JDBC和数据库的驱动是什么关系？JDBC是规范，抽象层，数据库驱动是具体的实现。
	JDBC规范由一些抽象类和接口组成，一般放在java.sql.*或javax.sql.*包中（JDK中带）
	
*****二、JDBC编码的步骤
	准备：把数据库的驱动加入到构建路径中
	1、加载驱动程序并注册驱动
	2、获取与数据库的连接
	3、得到代表SQL语句的对象，并发送SQL给数据库
	4、如果有查询结果，得到封装了查询结果的对象
	5、遍历结果
	6、释放占用的资源
	
三、JDBC中常用接口和类的详细讲解
	1、DriverManager
		作用：注册驱动，得到数据库的连接
		注册驱动：
			DriverManager.registDriver(new com.mysql.jdbc.Driver());(不可取)
			原因：1、严重依赖具体的数据库驱动。2、会导致驱动注册2遍。
			替代方案：
		获取数据库的连接：
			static Connection getConnection(String url,String user,String password):
					url:数据库的连接串。
						mysql：jdbc:mysql://localhost:3306/day14数据库名或者jdbc:mysql:///day14(连接本地默认端口上的mysql数据库)
					user:数据库的用户名
					password:数据库的密码
			static Connection getConnection(String url,Properties info)
			static Connection getConnection(String url)
			
	2、Connection
		所有与数据库交互都必须建立在连接的基础上
	3、Statement
		作用：代表着SQL语句
		常用的方法：
			ResultSet executeQuery(String sql):sql是DQL语句
			int executeUpdate(String sql):sql是DML语句。或者是没有返回结果的DDL也可以。返回值，代表着语句影响到的行数。
			boolean execute(String sql):sql可以是任何的sql语句。如果有结果集返回，返回true。否则返回false。	
										
	4、ResultSet
		boolean next():下移一行
		boolean previous():上移一行
		void absolute(int row):第一行的记录就是1
		void beforeFirst():移动到第一行的前面
		void afterLast():移动到最后一行的后面
		
	5、释放资源
四、利用JDBC对数据库进行CRUD
五、利用JDBC改写原有的用户注册和登录的案例
六、SQL的注入及防范

PreparedStatement:(尽量使用它，就不要再使用Statement)
	作用：
	1、预编译SQL语句，数据库执行效率高。
	2、防止SQL注入
	3、支持参数占位符"?"
	
七、客户管理系统（Web项目CRUD）

Lesson 2

****一、客户管理系统的实现（JavaWeb+JDBC)
	1、建立数据库
		create database clientManagementSystem;
		use clientManagementSystem;
		create table customer(
			id varchar(100) primary key,
			name varchar(200),
			gender varchar(10),
			birthday date,
			cellphone varchar(20),
			email varchar(200),
			hobby varchar(200),
			type varchar(100),
			description varchar(255)
		);
	2、建立JavaWeb应用，搭建开发环境（jar包）
		mysqldriver.jar
		beanutils.jar
		commons-logging.jar
		jstl.jar
		standard.jar
		
****二、大数据显示时分页（有难度哦）
		MySQL:select * from customer limit m,n;
		m:每页开始的记录的索引号。（从0开始）
		n:每页显示的条数

		每页显示10条
		第1页的数据：select * from customer limit 0,10;
		第2页的数据：select * from customer limit 10,10;
		第3页的数据：select * from customer limit 20,10;

		每页开始记录的索引=(当前页码-1)*每页显示的条数


		总共多少页=总条数%每页显示的条数==0？总条数/每页显示的条数:总条数/每页显示的条数+1；


		DAO层改造：
			/**
			 * 查询记录的总条数
			 */
			int getTotalRecords();
			/**
			 * 查询分页数据
			 * @param startIndex 每页开始记录的索引编号
			 * @param pagesize 每页显示的记录条数
			 * @return
			 */
			List<Customer> findPageRecords(int startIndex,int pagesize);

		Service改造：
			/**
			 * 根据用户要看的页码返回封装了分页有关数据的Page对象
			 */
			Page findPageReocrds(String pagenum);

		Servlet改造：
				String pagenum = request.getParameter("pagenum");//用户要看的页码
				Page page = s.findPageReocrds(pagenum);
				page.setServletUrl("/servlet/ShowAllCustomersServlet");
				request.setAttribute("page", page);
				request.getRequestDispatcher("/listCustomers.jsp").forward(request, response);

三、批处理

四、大文本和大二进制的数据库存取

Lesson 3

一、获取数据库自动生成的主键:主键的值最好由自己的程序来维护
	create database day16;
	use day16;
	create table t1(
		id int primary key auto_increment,
		name varchar(100)
	);
二、如何调用存储过程
***三、事务入门
	TPL：事务控制语句

	start transaction:开启一次事务
	rollback:回滚
	commit：提交事务

	JDBC中与事务有关的方法：
	Connection.setAutoCommit(boolean b)
	Connection.rollback()
	Connection.rollback(Savepoint sp)
	Connection.commit();


*****四、事务的特性（隔离级别）
	A:原子性。说明事务是一个不可分割的单位。
	C：一致性.事务必须使数据库从一个一致性状态变换到另外一个一致性状态.(比如转账)
	*I：隔离性。一个事务不能被其他事务打扰。
	D：持久性。事务一旦提交，就应该被永久保存起来。

	如果不考虑事务的隔离级别，会出现以下“不正确”的情况：
	脏读：指一个事务读到了另一个事务中未提交的数据。
	不可重复读：针对一条记录的，同一条记录前后不一样
	虚读（幻读）：针对一张表，前后读到的记录条数不一样。

	MySQL中控制事务隔离级别的语句：
		select @@tx_isolation;     //查看当前的事务隔离级别
		set transaction isolation level 你的级别（四种之一）;//设置隔离级别




	隔离级别的分类：
	READ UNCOMMITTED:脏读、不可重复读、虚读都有可能发生。
	READ COMMITTED:能避免脏读，不可重复读、虚读都有可能发生。
	REPEATABLE READ:能避免脏读、不可重复度，虚读都有可能发生。
	SERIALIZABLE:能避免脏读、不可重复度、虚读。


*****五、数据库连接池原理

*****六、编写标准的数据库连接池
	实现了javax.sql.DataSource的才是标准的数据库连接池，按照字面意思，一般称之为数据源。
	
	对于一个已知类的某个方法进行功能上的改变有以下三种方式：
	1、定义子类，扩展父类的某个功能。（此处行不通）
	2、利用包装设计模式改写原有的类的功能
		a、编写一个类实现与被改写类（com.mysql.jdbc.Connection）相同的接口
		b、定义一个引用，记住被改写类的实例
		c、定义构造方法，传入被改写类的实例
		d、对于要改写的方法，改写即可
		e、对于不需要改写的方法，调用原有的对象的对应方法
		
		*****包装设计模式
		*****默认适配器设计模式
		
	3、动态代理
		*****基于接口的动态代理
	java.lang.reflect.Proxy
	static Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h) 
 
	作用：返回代理类的实例
	参数：loader：类加载器，一般与被代理对象使用同一个
		 interfaces：被代理对象所实现的接口
		 h：怎么代理
			 Object invoke(Object proxy, Method method, Object[] args) ：调用原有类的任何方法，都会经过此方法。
			 
***七、开源的数据源使用
		DBCP：DataBase Connection Pool
			1、需要的jar：commons-dbcp.jar  commons-pool.jar
			2、把DBCP的配置文件拷贝到构建路径中
			3、
			

			public class DBCPUtil {
				private static DataSource ds;
				static{
					try {
						InputStream in = DBCPUtil.class.getClassLoader().getResourceAsStream("dbcpconfig.properties");
						Properties props = new Properties();
						props.load(in);
						ds = BasicDataSourceFactory.createDataSource(props);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				public static Connection getConnection(){
					try {
						return ds.getConnection();
					} catch (SQLException e) {
						throw new RuntimeException(e);
					}
				}
				public static void release(ResultSet rs,Statement stmt,Connection conn){
					if(rs!=null){
						try {
							rs.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
						rs = null;
					}
					if(stmt!=null){
						try {
							stmt.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
						stmt = null;
					}
					if(conn!=null){
						try {
							conn.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
						conn = null;
					}
				}
			}

		C3P0：是一个机器人的代号
			拷贝jar包
			
**八、数据库元信息的获取（编写框架时使用）
*****九、编写属于自己的JDBC框架（反射）
			策略设计模式
			
Lesson 4

一、DBUtil框架的使用（DBAssist一样的）

	new QueryRunner()  //Connection 不自动释放
	new QueryRunner(DataSource)  //Connection 自动释放
	
二、DBUtil框架中的所有结果处理器

	new BeanHandler<People>(People.class) //封装到javaBean中
	new BeanListHandler<People>(People.class) //封装到List中
	new ArrayHandler() //把结果集中的第一行数据转成对象数组。只适合结果集有一条记录的情况
	new ArrayListHandler() //把结果集中的每一行数据都转成一个数组，再存放到List中。
	new ColumnListHandler("name") //将结果集中某一列的数据存放到List中
	new KeyedHandler("name") //将结果集中的每一行数据都封装到一个Map<列名,列值>里，再把这些map再存到一个map里，其key为指定的key。
	new MapHandler()  //将结果集中的每一行数据都封装到一个Map里，然后再存放到List
	new ScalarHandler()  //适合取一条一列的记录。比如记录总数
	
*****三、实际开发中的事务控制
*****四、ThreadLocal类

		public class TransactionUtil {
			private static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();
			
			private static DataSource ds;
			static{
				try {
					InputStream in = DBCPUtil.class.getClassLoader().getResourceAsStream("dbcpconfig.properties");
					Properties props = new Properties();
					props.load(in);
					ds = BasicDataSourceFactory.createDataSource(props);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			public static DataSource getDataSource(){
				return ds;
			}
			public static Connection getConnection(){
				try {
					Connection conn = tl.get();
					if(conn==null){
						conn = ds.getConnection();
						tl.set(conn);
					}
					return conn;
				} catch (SQLException e) {
					throw new RuntimeException(e);
				}
			}
			public static void startTransaction(){
				try {
					Connection conn = tl.get();
					if(conn==null){
						conn = this.getConnection();
					}
					conn.setAutoCommit(false);
				} catch (SQLException e) {
					throw new RuntimeException(e);
				}
			}
			public static void rollback(){
				try {
					Connection conn = tl.get();
					if(conn==null){
						conn = this.getConnection();
					}
					conn.rollback();
				} catch (SQLException e) {
					throw new RuntimeException(e);
				}
			}
			public static void commit(){
				try {
					Connection conn = tl.get();
					if(conn==null){
						conn = this.getConnection();
					}
					conn.commit();
				} catch (SQLException e) {
					throw new RuntimeException(e);
				}
			}
			public static void relase(){
				try {
					Connection conn = tl.get();
					if(conn!=null){
						conn.close();
						tl.remove();
					}
				} catch (SQLException e) {
					throw new RuntimeException(e);
				}
			}
		}
		
五、多表的增删改查
	一对多
	多对多
	一对一