一、主配置文件
	1、配置数据库信息
		connection.username
		connection.password				
		connection.driver_class			com.mysql.jdbc.Driver
		hibernate.dialect				org.hibernate.dialect.MySQLDialect
		connection.url					jdbc:mysql://localhost:3306/database
	2、其他配置
		<property ...>
			show_sql		显示生成的SQL语句
			format_sql		格式化生成的SQL语句
			hbm2ddl.auto	自动生成表结构
	3、生成表结构的两种方式：
		1，hbm2ddl.auto 
				create：先删除，再创建
				update：如果表不存在就创建，不一样就更新，一样就什么都不做。
				create-drop：初始化时创建表，SessionFactory执行close()时删除表。
				validate：验证表结构是否一致，如果不一致，就抛异常。
			
		2，使用SchemaExport工具类
二、映射配置文件
	1、主键：
		如果是数字，建议使用包装类型。

		identity		使用数据库的自动增长策略，不是所有数据库都支持，比如oracle就不支持 
		sequence		在 DB2，PostgreSQL，Oracle，SAP DB，McKoi 中使用序列（sequence）
		hilo			使用高低位算法生成主键值。只需要一张额外表，所有的数据都支持。
		native			 根据底层数据库的能力选择 identity、sequence 或者 hilo中的一个。
		assigned		手工指定主键值
		uuid
		foreign			
		increment		由Hibernate维护的自动增长。先查询当前最大的id值，再加1使用.不推荐使用，因为在多线程下会问题。
		...
	2、映射基础
	3、普通属性
		not-null="true"    非空约束
	4、集合属性
	5、关联属性
	
		inverse属性:
				默认为false，表示本方维护关联关系。
				如果为true，表示本方不维护关联关系。
				只是影响是否能设置外键列的值（设成有效值或是null值），对获取信息没有影响。
				
		cascade属性：
				默认为none，代表不级联。
				级联是指操作主对象时，对关联的对象也做相同的操作。
				可设为：delete, save-update, all, none ...
		property-ref属性：
				写的是对方映射中外键列对应的属性名。
		双向关联
			一对多/多对一
				Employee:
					<many-to-one name="dep" class="com.mjs.f_one_to_many_double.Department" column="departmentId"></many-to-one>
				Department:
					<set name="emps" cascade="all" inverse="true">
						<key column="departmentId"></key>
						<one-to-many class="com.mjs.f_one_to_many_double.Employee" />
					</set>
			
			多对多
				Student:	<set name="teachers" table="teacher_student" inverse="false">
								<key column="studentId"></key>
								<many-to-many class="Teacher" column="teacherId"></many-to-many>
							</set>
				Teacher:	<set name="students" table="teacher_student" inverse="true">
								<key column="teacherId"></key>
								<many-to-many class="Student" column="studentId"></many-to-many>
							</set>
			一对一
				IdCard:<many-to-one name="person" class="com.mjs.h_one_to_one.Person" column="personid" unique="true" cascade="delete"></many-to-one>
				Person:<one-to-one name="idcard" class="com.mjs.h_one_to_one.IdCard" property-ref="person"></one-to-one>
				
				id <--->id
					IdCard:		<generator class="foreign">
									<param name="property">person</param>
								</generator>
								<one-to-one name="person" class="Person" constrained="true" cascade="delete"></one-to-one>
								
					Person:		<generator class="native"></generator>
								<one-to-one name="idCard" class="IdCard"></one-to-one>
		单向关联：
			单向多对一
				Employee : <many-to-one name="dep" class="Department" column="departmentId">
				Department :
				
				session.save(dep);
				session.save(emp1);			3条insert语句
				session.save(emp2);
				
			单向一对多
				Employee：
				Department：<set name="emps" cascade="all">
								<key column="departmentId"></key>
								<one-to-many class="com.mjs.e_one_to_many.Employee" />
							</set>
				session.save(dep);			3条insert语句+两条update语句
				
			单向多对多
				Teacher:	<set name="stus" cascade="all" table="stu_tea_single">
								<key column="teacherId"></key>
								<many-to-many class="com.mjs.g_many_to_many.Student" column="studentId"></many-to-many>
							</set>
				
				Student:
				
			单向一对一（只能做从有外键方到无外键方的单向关联）
				IdCard:<many-to-one name="person" class="com.mjs.h_one_to_one.Person" column="personid" unique="true" cascade="delete"></many-to-one>
				Person:
		
三、API
	Configuration	配置
		configure()	
		configure(String resource)
		addResource(String resource)	导入一个指定位置的映射文件
		addClass(Class clazz)			导入与指定类同一个包中的以类名为前缀，后缀为.hbm.xml的映射文件
		buildSessionFactory()

	SessionFactory	Session工厂
		openSession()
		getCurrentSession()
		close()

	Session			很重要的一个对象
		操作对象的方法
		save(Object)
		update(Object)
		delete(Object)
		查询的方法
		createQuery(String)	--> Query
		createCriteria(Class)
		管理事务的方法
		beginTransaction() --> Transaction
		getTransaction()   --> Transaction	获取当前Session中关联的事务对象
		其他的方法
		...

	Transaction		事务
		commit()
		rollback()

	Query			查询
		list()			查询一个结果集合。
		uniqueResult()	查询一个唯一的结果，如果没有结果，则返回null，如果结果有多个，就抛异常。
		...
四、其他特性
	1、数据库连接池
	2、懒加载
	3、二级缓存
	4、Session管理
		对象的状态：
		
			临时状态：
				与数据库没有对应，跟Session没有关联。
				一般是新new出的对象。

			持久化状态：
				对象在Session的管理之中，最终会有对应的数据库记录。
				特点：
					1，有OID
					2，对对象的修改会同步到数据库。

			游离状态：
				数据库中有对应记录，但对象不在Session管理之中。
				修改此状态对象时数据库不会有变化。

			删除状态：
				执行了delete()后的对象。
		==============================================================
			1、操作实体对象的
				save()                把临时状态变为持久化状态（交给Sessioin管理）
				update()			  把游离状态变为持久化状态    在更新时，对象不存在就报错
				saveOrUpdate()		  把临时或游离状态转为持久化状态    
									  本方法是根据id判断对象是什么状态的：如果id为原始值（对象的是null，原始类型数字是0）就是临时状态，如果不是原始值就是游离状态。
				delete()			  把持久化或游离转为删除状态		如果删除的对象不存在，就会抛异常
				
			2、操作缓存的
				clear()
				evict()
				flush()

			3、查询实体对象的
				get()				  get()：获取数据，是持久化状态  会马上执行sql语句  如果数据不存在，就返回null
				load()				  获取数据，是持久化状态
									  load()后返回的是一个代理对象，要求类不能是final的，否则不能生成子类代理，就不能使用懒加载功能了
									  让懒加载失效的方式：一、把实体写成final的；二、在hbm.xml中写<class ... lazy="false">
									  不会马上执行sql语句，而是在第1次使用非id或class属性时执行sql。
									  如果数据不存在，就抛异常：ObjectNotFoundException
				createQuery()
				createCriteria()
				
						加载方式		返回值		如果数据不存在
				---------------------------------------------------------
				get		立即加载	真实对象或null		返回null
				load	延迟加载	代理对象			抛异常
				
五、映射注解
	1、 @Entity  	将一个类声明为一个实体bean(即一个持久化POJO类)
	
	2、 @Id 		注解声明了该实体bean的标识属性（对应表中的主键）。
	
	3、 @Table 		注解声明了该实体bean映射指定的表（table）,目录（catalog）和schema的名字
	
	4、 @Column		注解声明了属性到列的映射。该注解有如下的属性
			① name 可选，列名（默认值是属性名）
			② unique 可选，是否在该列上设置唯一约束（默认值false）
			③ nullable 可选，是否设置该列的值可以为空（默认值true）
			④ insertable 可选，该列是否作为生成的insert语句中的一个列（默认值true）
			
	5、 @GeneratedValue		注解声明了主键的生成策略。该注解有如下属性
			① strategy 指定生成的策略（JPA定义的），这是一个GenerationType。默认是GenerationType. AUTO
			② GenerationType.AUTO 主键由程序控制
			③ GenerationType.TABLE 使用一个特定的数据库表格来保存主键
			④ GenerationType.IDENTITY 主键由数据库自动生成（主要是自动增长类型）
			⑤ GenerationType.SEQUENCE 根据底层数据库的序列来生成主键，条件是数据库支持序列。（这个值要与generator一起使用）
			⑥ generator 指定生成主键使用的生成器（可能是orcale中的序列）
			
	6、	@GenericGenerator —— 注解声明了一个hibernate的主键生成策略。支持十三种策略。该注解有如下属性
			① name 指定生成器名称
			② strategy 指定具体生成器的类名（指定生成策略）
			③ parameters 得到strategy指定的具体生成器所用到的参数，其十三种策略（strategy属性的值）如下：
					① native 对于orcale采用Sequence方式，对于MySQL和SQL Server采用identity(处境主键生成机制)   @GenericGenerator(name ="paymentableGenerator", strategy ="native")
	
	7、 @OneToOne 设置一对一个关联。cascade属性有五个值(只有CascadeType.ALL好用？很奇怪)，分别是
				CascadeType.PERSIST(级联新建)，CascadeType.REMOVE（级联删除），CascadeType.ALL（全部四项）
				CascadeType.REFRESH（级联刷新），CascadeType.MERGE（级联更新）
				
	8、 @JoinColumn(name="主表外键")//这里指定的是数据库中的外键字段。
	
	9、 @OneToMany 设置一对多关联。cascade属性指定关联级别,参考@OneToOne中的说明。fetch指定是否延迟加载，
			值为FetchType.LAZY表示延迟，为FetchType.EAGER表示立即加载

	@OrderBy("progressTime DESC")放在一的一方，用来查询时排序
			
	10、@MappedSuperclass 父类注释
	
	11、@Transient 忽视不去映射
	
	12、(mappedBy="phones") Phone可维护关系
	
	
	13、@JsonIgnoreProperties(value = { "book","user" })json取数据时忽略那些属性
	
	 cascade表示级联操作   
	 CascadeType.MERGE级联更新：若items属性修改了那么order对象保存时同时修改items里的对象。对应EntityManager的merge方法   
	 CascadeType.REFRESH级联刷新：获取order对象里也同时也重新获取最新的items时的对象。对应EntityManager的refresh(object)方法有效。即会重新查询数据库里的最新数据   
	 CascadeType.PERSIST级联保存：对order对象保存时也对items里的对象也会保存。对应EntityManager的presist方法   
	 CascadeType.REMOVE级联删除：对order对象删除也对items里的对象也会删除。对应EntityManager的remove方法  
	
	
摘要:一。mappedBy单向关系不需要设置该属性，双向关系必须设置，避免双方都建立外键字段 　　数据库中1对多的关系，关联关系总是被多方维护的即外键建在多方，我们在单方对象的@OneToMany（ma.........

　　一。mappedBy 单向关系不需要设置该属性，双向关系必须设置，避免双方都建立外键字段

　　数据库中1对多的关系，关联关系总是被多方维护的即外键建在多方，我们在单方对象的@OneToMany（mappedby=" "）

　　把关系的维护交给多方对象的属性去维护关系

　　对于mappedBy复习下：

　　a） 只有OneToOne,OneToMany,ManyToMany上才有mappedBy属性，ManyToOne不存在该属性；

　　b） mappedBy标签一定是定义在the owned side（被拥有方的），他指向theowning side（拥有方）；

　　c） 关系的拥有方负责关系的维护，在拥有方建立外键。所以用到@JoinColumn

　　d）mappedBy跟JoinColumn/JoinTable总是处于互斥的一方

　　二。下面是我自己的理解，一直对hibernate中的维护关联关系不太了解，总不知道他们具体指的是什么

　　这里的维护关联关系，拿多对多来说就是中间表，在不设置cascade的情况下，中间表由负责维护关联关系的一方维护

/**使用hql语句直接将投影查询的字段放置到对象中*/
加构造方法
String hql = "SELECT DISTINCT new com.itheima.elec.domain.ElecSystemDDL(o.keyword) FROM ElecSystemDDL o";