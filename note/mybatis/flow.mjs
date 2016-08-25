MyBatis执行器Executor根据SqlSession传递的参数执行query()方法

	1.根据具体传入的参数，动态地生成需要执行的SQL语句，用BoundSql对象表示  

	2.为当前的查询创建一个缓存Key 

	3.缓存中没有值，直接从数据库中读取数据

	4. 执行查询，返回List 结果，然后将查询的结果放入缓存之中 

	5. 根据既有的参数，创建StatementHandler对象来执行查询操作

	6. 创建java.Sql.Statement对象，传递给StatementHandler对象 

	7. 调用StatementHandler.query()方法，返回List结果集  



一级缓存

	1.对于某个查询，根据statementId,params,rowBounds来构建一个key值，根据这个key值去缓存Cache中取出对应的key值存储的缓存结果

	2. 判断从Cache中根据特定的key值取的数据数据是否为空，即是否命中；

	3. 如果命中，则直接将缓存结果返回；

	4. 如果没命中：
	        4.1  去数据库中查询数据，得到查询结果；
	        4.2  将key和查询到的结果分别作为key,value对存储到Cache中；
	        4.3. 将查询结果返回；

	5. 结束。

MyBatis认为，对于两次查询，如果以下条件都完全一样，那么就认为它们是完全相同的两次查询：

1. 传入的 statementId 

2. 查询时要求的结果集中的结果范围 （结果的范围通过rowBounds.offset和rowBounds.limit表示）；

3. 这次查询所产生的最终要传递给JDBC Java.sql.Preparedstatement的Sql语句字符串（boundSql.getSql() ）

4. 传递给java.sql.Statement要设置的参数值


使用二级缓存

MyBatis对二级缓存的支持粒度很细，它会指定某一条查询语句是否使用二级缓存。
     虽然在Mapper中配置了<cache>,并且为此Mapper分配了Cache对象，这并不表示我们使用Mapper中定义的查询语句查到的结果都会放置到Cache对象之中，我们必须指定Mapper中的某条选择语句是否支持缓存，即如下所示，在<select> 节点中配置useCache="true"，Mapper才会对此Select的查询支持缓存特性，否则，不会对此Select查询，不会经过Cache缓存。如下所示，Select语句配置了useCache="true"，则表明这条Select语句的查询会使用二级缓存。

总之，要想使某条Select查询支持二级缓存，你需要保证：
   1.  MyBatis支持二级缓存的总开关：全局配置变量参数   cacheEnabled=true
   2. 该select语句所在的Mapper，配置了<cache> 或<cached-ref>节点，并且有效
   3. 该select语句的参数 useCache=true