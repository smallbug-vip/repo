约定：
shell>window下输入的命令

mysql>进入MySQL程序后，输入的MySQL的命令

一、SQL简介
	1、SQL：Structured Query Language结构化查询语言
	他是客户与数据库打交道的通道<abbr title=""></abbr>
	2、SQL是有工业标准的。ANSI
	符合工业标准的SQL，称之为普通话。
	不同的数据库都在SQL工业标准的基础上进行扩展，扩展的部分称之为方言。
	3、验证安装是否成功
	shell>mysql -u root -p
	mysql>SHOW DATABASES;        //显示目前有几个库

二、DDL：数据定义语言 Data Definition Language
	作用：定义数据库或者表结构的。
	操作的对象：数据库或表的结构的。
	关键字：CREATE ALTER DROP
		
		创建一个名称为mydb1的数据库。
		mysql>CREATE DATABASE mydb1;
		查看数据库的创建细节
		mysql>SHOW CREATE DATABASE mydb1;
		创建一个使用gbk字符集的mydb2数据库。
		mysql>CREATE DATABASE mydb2 CHARACTER SET gbk;
		创建一个使用gbk字符集，并带校对规则的mydb3数据库。
		mysql>CREATE DATABASE mydb3 CHARACTER SET gbk COLLATE gbk_chinese_ci;
		查看当前数据库服务器中的所有数据库
		mysql>SHOW DATABASES;
		查看前面创建的mydb2数据库的定义信息
		mysql>SHOW CREATE DATABASE mydb1;
		删除前面创建的mydb3数据库
		mysql>DROP DATABASE mydb3;

		创建表之前一定先选择数据库
		mysql>USE test;
		创建一个员工表
		mysql>CREATE TABLE employee(
			id int,
			name varchar(200),
			gender varchar(10),
			birthday date,
			entry_date date,
			job varchar(200),
			salary float(8,2),
			resume text
		);
		显示当前数据库中的所有表格
		mysql>SHOW TABLES;
		在上面员工表的基本上增加一个image列。
		mysql>ALTER TABLE employee ADD image blob;
		查看表结构的定义
		mysql>DESC employee;
		修改job列，使其长度为60。
		mysql>ALTER TABLE employee MODIFY job varchar(60);
		删除image列。
		mysql>ALTER TABLE employee DROP image;
		表名改为user。
		mysql>RENAME TABLE employee TO user;
		查看表的创建细节
		mysql>SHOW CREATE TABLE user;
		修改表的字符集为gbk
		mysql>ALTER TABLE user CHARACTER SET gbk;
		列名name修改为username
		mysql>ALTER TABLE user CHANGE name username varchar(100);
	
三、DML:Data Manipulation Language 数据操作语言
	作用：操作表中的数据的。
	关键：INSERT UPDATE DELETE
	
	特别注意：日期或字符串、字符要使用单引号引起来。

		查看表中的所有记录
		mysql>SELECT * FROM user;
		使用insert语句向表中插入三个员工的信息。
		建议：mysql>INSERT INTO user (	) VALUES (1,'zql','0','1991-09-07','2013-04-12','CTO',10000.00,'beauty');
		mysql>INSERT INTO user VALUES (3,'老黑','1','1987-09-07','2013-04-12','CEO',10000.00,'hand');
		mysql>INSERT INTO user (id,username,gender,birthday,entry_date,job,salary,resume) VALUES (3,'王翔云','1','1989-09-07','2013-04-12','UFO',10000.00,'good boy');

		插入中文时的问题：（编码问题）
		查看数据库目前的各种编码：
		mysql>SHOW VARIABLES LIKE 'character%';
		通知服务器客户端使用的编码字符集
		mysql>SET character_set_client=gbk;
		显示时乱码
		mysql>SET character_set_results=gbk;


		将所有员工薪水修改为5000元。
		mysql>UPDATE user SET salary=5000;
		将姓名为’王翔云’的员工薪水修改为3000元。
		mysql>UPDATE user SET salary=3000 WHERE username='王翔云';
		将姓名为’王翔云’的员工薪水修改为4000元,job改为CMO。
		mysql>UPDATE user SET salary=4000,job='CMO' WHERE username='王翔云';
		将zql的薪水在原有基础上增加1000元。	
		mysql>UPDATE user SET salary=salary+1000 WHERE username='zql';

		删除表中名称为’王翔云’的记录。
		mysql>DELETE FROM user WHERE username='王翔云';
		删除表中所有记录。
		mysql>DELETE FROM user;(一条一条的删除)
		使用TRUNCATE删除表中记录。
		mysql>TRUNCATE user;(摧毁整张表，然后重建表结构)


四、DQL简单的：Data Query Language
	关键字：SELECT

		查询表中所有学生的信息。
		mysql>SELECT * FROM student;(不建议使用)
		mysql>SELECT id,name,chinese,english,math FROM student;
		查询表中所有学生的姓名和对应的英语成绩。
		mysql>SELECT name,english FROM student;
		过滤表中重复数据。
		mysql>SELECT DISTINCT english FROM student;

		SELECT语句支持一些基本的运算

		在所有学生数学分数上加10分特长分。
		mysql>SELECT id,name,math+10 FROM student;
		统计每个学生的总分。
		mysql>SELECT name,chinese+english+math FROM student;
		使用别名表示学生分数。
		mysql>SELECT name AS 姓名,chinese+english+math 总分 FROM student;
		查询姓名为王五的学生成绩
		msyql>SELECT name,english,chinese,math FROM student WHERE name='王五';
		查询英语成绩大于90分的同学
		msyql>SELECT name,english,chinese,math FROM student WHERE english>90;
		查询总分大于200分的所有同学
		mysql>SELECT name,chinese+english+math FROM student WHERE (chinese+english+math)>200;

		WHERE语句支持运算表达式

		查询英语分数在 80－90之间的同学。
		mysql>SELECT * FROM student WHERE english BETWEEN 84 AND 85;
		查询数学分数为89,90,91的同学。
		mysql>SELECT * FROM student WHERE math IN (89,90,91);
		查询所有姓李的学生成绩。
		mysql>SELECT * FROM student WHERE name LIKE '李%';
		查询数学分>80，语文分>80的同学。
		mysql>SELECT * FROM student WHERE math>80 AND chinese>80;
		对数学成绩排序后输出。
		mysql>SELECT * FROM student ORDER BY math;//默认是升序
		对总分排序后输出，然后再按从高到低的顺序输出
		mysql>SELECT name,chinese+english+math FROM student ORDER BY (chinese+english+math) DESC;
		对姓李的学生数学成绩排序输出
		mysql>SELECT name,math FROM student WHERE name LIKE '李%' ORDER BY math;

五、数据完整性
	三个方面：
		1、实体完整性：规定表中的一行在表中是唯一的实体。
		一般是通过定义主键的形式来实现的。
		关键字：PRIMARY KEY
		特点：不能为null，必须唯一
		
		CREATE TABLE SHANG_HAI1(
			id int PRIMARY KEY,
			name varchar(100)
		);
		//实际开发中不建议使用。
		CREATE TABLE shanghai2(
			id int PRIMARY KEY auto_increment,
			name varchar(100)
		);
		insert into shanghai2 (name) values('aa');
		2、域完整性
		指数据库表的列（即字段）必须符合某种特定的数据类型或约束。
		NOT NULL：不能为空
		UNIQUE：必须唯一
		CREATE TABLE shanghai3(
			id int PRIMARY KEY,
			name varchar(100) NOT NULL,
			idnum varchar(100) unique
		);
		
		关于主键：
			（建议）逻辑主键：给编程人员用的。与具体业务无关
			业务主键：用户也可以用。与具体业务有关了。
		
		3、参照完整性（多表设计）	
			一对多
			create table department(
				id int primary key,
				name varchar(100)
			);
			create table employee(
				id int primary key,
				name varchar(100),
				salary float(8,2),
				dept_id int,
				constraint dept_id_fk foreign key(dept_id) references department(id)
				
			);
			
			多对多
			create table teacher(
				id int primary key,
				name varchar(100),
				salary float(8,2)
			);
			create table student1(
				id int primary key,
				name varchar(100),
				grade varchar(10)
			);
			create table teacher_student1(
				t_id int,
				s_id int,
				primary key(t_id,s_id),
				constraint t_id_fk foreign key(t_id) references teacher(id),
				constraint s_id_fk foreign key(s_id) references student1(id)
			);
			
			一对一
			create table human(
				id int primary key,
				name varchar(100)
			);
			create table idcard(
				id int primary key,
				num varchar(100),
				constraint huanm_id_fk foreign key(id) references human(id)
			);
		
***六、表的复杂查询
	1、连接查询
		1.0连接的基本语法格式：
			from TABLE1 join_type TABLE2 [on (join_condition)][where (query_condition)]
			TABLE1:左表
			TABLE2：右表
			join_type：连接的类型。交叉、内连接、左外连接、右外连接
			on：设置连接条件
			where：对连接查询的结果进步一的筛选
		1.1交叉连接
			select * from CUSTOMER cross join ORDERS;
			或者
			select * from CUSTOMER,ORDERS;
			
			select c.name,o.order_number from CUSTOMER c,ORDERS o;
		1.2内连接：
			隐式内连接：(不使用on关键字，使用where)
				select * from CUSTOMER c,ORDERS o where c.id=o.customer_id;
			显式内连接：(使用on关键字)
				select * from CUSTOMER c inner join ORDERS o on c.id=o.customer_id;
		1.3外连接：
			左外连接：(返回符合连接条件的所有记录，同时还返回左表中其余的所有记录)
				select * from CUSTOMER c left outer join ORDERS o on c.id=o.customer_id;
			右外连接：(返回符合连接条件的所有记录，同时还返回右表中其余的所有记录)
				select * from CUSTOMER c right outer join ORDERS o on c.id=o.customer_id;
	2、子查询（嵌套查询）
		查询“陈冠希”的所有订单信息
		查询“陈冠希”的客户id select id from customer where name='陈冠希';
		查询订单信息：  select * from orders where customer_id=1;
		
		子查询： select * from orders where customer_id=(select id from customer where name='陈冠希');
	3、联合查询
		SELECT * FROM orders WHERE price>200 UNION SELECT * FROM orders WHERE customer_id=1;
		取两条语句的并集，并去除重复的记录。
	4、报表查询（合计函数）（使用原来的test数据库）
		
		统计一个班级共有多少学生？
		select count(*) from student;
		统计数学成绩大于90的学生有多少个？
		select count(*) from student where math>=90;
		统计总分大于250的人数有多少？
		select count(*) from student where (chinese+math+english)>250;
		
		统计一个班级数学总成绩？
		select sum(math) from student;
		统计一个班级语文、英语、数学各科的总成绩
		select sum(chinese),sum(english),sum(math) from student;
		统计一个班级语文、英语、数学的成绩总和
		select sum(chinese+english+math) from student;
		统计一个班级语文成绩平均分
		select sum(chinese)/count(*) from student;
		求一个班级数学平均分？
		select avg(math) from student;
		求一个班级总分平均分
		select avg(chinese+english+math) from student;

Tips:如果要使用关键字作为表名，要使用`(Esc按键下面的)包围起来。
		对订单表中商品归类后，显示每一类商品的总价
		select product,sum(price) from test group by product;
		查询购买了几类商品，并且每类总价大于100的商品
		select product,sum(price) from test group by product having sum(price)>100;
七、MySQL的数据库的备份与恢复
	数据库的备份：(不会备份数据库名)
		shell>mysqldump -u root -psorry test>c:/test.sql 
	恢复数据库：(数据库名必须存在)
		方式一：
		shell>mysql -u root -psorry test<c:/test.sql
		
		方式二：
		mysql>USE test;
		mysql>SOURCE c:/test.sql;


DATE_FORMAT(createTime,'%Y-%m-%d')
CASE WHEN (BankId = '' OR BankId IS NULL OR BankId = 'WAP') THEN PayAmount ELSE 0.0 END