一、安装
	1.下载
		wget http://120.52.72.53/download.redis.io/c3pr90ntcsf0/releases/redis-2.8.24.tar.gz
	2.解压
		tar zxvf redis-2.8.24.tar.gz
	3.安装
		切换到src目录下
		make
	4.运行服务端
		./redis-server 	##未指定配置文件
		./redis-server ../../config/redis.conf 		##指定运行时配置文件
	5.运行客户端
		src/redis-cli 		##显示 127.0.0.1:6379> 安装成功

二、配置
	config get loglevel 		##以这种格式，查看配置信息
	config get * 				##查看所有配置信息
	配置信息详解：http://www.runoob.com/redis/redis-conf.html
	配置文件样本：https://raw.githubusercontent.com/antirez/redis/2.8/redis.conf

三、命令

	1> del key_name 		## 删除已存在的键。不存在的 key 会被忽略。

	2> dump key_name 		## 序列化给定 key ，并返回被序列化的值。如果 key 不存在，那么返回 nil 。版本可用>=2.6

	3> exists key_name 	## 用于检查给定 key 是否存在，若 key 存在返回 1 ，否则返回 0 

	4> expire key_name time_in_seconds 	## 设置 key 的过期时间。key 过期后将不再可用。设置成功返回 1

	5> expireat key_name time_in_unix_timestamp 	## 基本同上，只是接收时间为Unix时间戳

	6> pexpireat key_name time_in_milliseconds_in_unix_timestamp 	## 设置 key 的过期时间，以毫秒计

	7> keys pattern 		## 返回符合给定模式的 key 列表 (Array)。

	8> move key_name destination_database 	## 将当前数据库的 key 移动到给定的数据库 db 当中

	9> persist key_name 		## 移除给定 key 的过期时间，使得 key 永不过期

	10> pttl key_name 			## 以毫秒为单位返回 key 的剩余过期时间

	11> ttl key_name 			## 以秒为单位返回 key 的剩余过期时间

	12> randomkey 				## 从当前数据库中随机返回一个 key

	13> rename old_key_name new_key_name 		## 修改 key 的名称
												当 old_key_name 和 new_key_name 相同，
												或者 old_key_name 不存在时，返回一个错误。 
												当 new_key_name 已经存在时，原始数据消失，被重命名的数据取代

	14> renamenx old_key_name new_key_name 		## 在新的 key 不存在时修改 key 的名称
												修改成功时，返回 1 。 如果 NEW_KEY_NAME 已经存在，返回 0 。

	15> type key_name 			## 返回 key 所储存的值的类型
									-> none (key不存在)
									-> string (字符串)
									-> list (列表)
									-> set (集合)
									-> zset (有序集)
									-> hash (哈希表)

	16> select number 切库

四、字符串

	1> set name smallbug

	2> get name

	3> getrange name 0 3 		## 返回子字符串

	4> getset name smallbug 	## 替换字符串，返回旧值

	5> getbit name 2 			## 获取指定偏移量的bit

	6> mget name school  		## 获取多个key的值

	7> setbit 2 1 				## 设置或清除指定偏移量上的位(bit)

	8> setex name 60 smallbug 	## 设置值及其过期时间。如果 key 已经存在， SETEX 命令将会替换旧的值。

	9> setnx name smallbug 		## 在指定的 key 不存在时，为 key 设置指定的值。

	10> setrange name 5 hadoop 	## 覆盖给定 key 所储存的字符串值，覆盖的位置从偏移量 offset 开始。

	11> strlen name 			## 获取指定 key 所储存的字符串值的长度。当 key 储存的不是字符串值时，返回一个错误

	12> mset name smallbug job student ## 同时设置一个或多个 key-value 对

	13> msetnx name smallbug pp jj ## 当所有给定 key 都不存在时，同时设置一个或多个 key-value 对，原子操作

	14> psetex mykey 10000 hello ## 以毫秒为单位设置 key 的生存时间

	15> incr num 				## 将num +1，如果num不存在将先初始化为0再 +1，如果不能加就报错

	16> incrby num 100 			## 将 key 中储存的数字加上指定的增量值

	17> incrbyfloat num 1.2 	## key 中所储存的值加上指定的浮点数增量值

	18> decr num 				## 将 key 中储存的数字值减一,目标值不能是浮点数

	19> decrby num 10 			## 将 key 所储存的值减去指定的减量值

	20> append name _hahahha 	## 为指定的 key 追加值


五、HASH

	1> hset person name smallbug 				## 为哈希表中的字段赋值

	2> hget person name 						## 返回哈希表中指定字段的值

	3> hmset person name smallhadoop school weifang 	## 于同时将多个 field-value (字段-值)对设置到哈希表中,新值覆盖旧值

	4> hmget person name age 					## 返回哈希表中，一个或多个给定字段的值

	5> hkeys person 							## 获取哈希表中的所有字段名

	6> hgetall person							## 返回哈希表中，所有的字段和值

	7> hdel person name 						## 删除哈希表 key 中的一个或多个指定字段，不存在的字段将被忽略

	8> hexists person school 					## 用于查看哈希表的指定字段是否存在。返回（1 or 0）

	9> hlen person 								## 获取哈希表中字段的数量

	10> hsetnx person name smallbug 			## 用于为哈希表中不存在的的字段赋值，不存在创建，存在无效

	11> hincrby person age 100 					## 用于为哈希表中的字段值加上指定增量值

	12> hincrbyfloat person age 1.1 			## 为哈希表中的字段值加上指定浮点数增量值

	13> hvals person 							## 返回哈希表所有字段的值
	
	14> hscan key 0 							## 迭代hash表中的键值对

六、List
	
	1> lpush name smallbug 					## 将一个或多个值插入到列表头部

	2> lpop name 							## 移除并返回列表的第一个元素

	3> lrange name 0 -1 				## 返回列表中指定区间内的元素,0 表示列表的第一个元素, -1 表示列表的最后一个元素

	4> llen name 							## 返回列表长度

	5> lindex name -1 						## 通过索引获取列表中的元素

	6> linsert name after python css 		## 在列表的元素前或者后插入元素，直插入一个元素

	7> lpushx school a 						## 将一个或多个值插入到已存在的列表头部，列表不存在时操作无效

	8> lrem name -1 python 					## 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素

						-> count > 0 : 从表头开始向表尾搜索，移除与 VALUE 相等的元素，数量为 COUNT 。
						-> count < 0 : 从表尾开始向表头搜索，移除与 VALUE 相等的元素，数量为 COUNT 的绝对值。
						-> count = 0 : 移除表中所有与 VALUE 相等的值。

	9> lset name 7 java 					## 通过索引来设置元素的值,新值会覆盖旧值

	10> ltrim name 2 5 						## 对一个列表进行修剪(trim)，只保留指定区间内的元素，含头含尾

	11> rpush name html 					## 将一个或多个值插入到列表的尾部(最右边)

	12> rpop name 							## 移除并返回列表的最后一个元素

	13> rpushx school xml 					## 将一个或多个值插入到已存在的列表尾部(最右边)。如果列表不存在，操作无效

	14> rpoplpush name school 				## 移除列表的最后一个元素，并将该元素添加到另一个列表并返回

	15> brpop school 1000000 ## 移出并获取列表的最后一个元素，如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止

	16> blpop school 4 			# 移出并获取列表的第一个元素， 如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止

	17> brpoplpush school name 100 			## 从列表中弹出一个值，将弹出的元素插入到另外一个列表中并返回它； 														如果列表没有元素会阻塞列表直到等待超时或发现可弹出元素为止。


七、Set
	
	1> sadd name hello 						## 将一个或多个成员元素加入到集合中，已经存在于集合的成员元素将被忽略。

	2> sismember name hell 					## 判断成员元素是否是集合的成员

	3> smembers name 						## 返回集合中的所有的成员。 不存在的集合 key 被视为空集合

	4> spop name 							## 移除并返回集合中的一个随机元素

	5> srandmember name -4 					## 返回集合中的一个随机元素
			-> 如果 count 为正数，且小于集合基数，那么命令返回一个包含 count 个元素的数组，数组中的元素各不相同。如果 count 大于等于集合基数，那么返回整个集合。
			-> 如果 count 为负数，那么命令返回一个数组，数组中的元素可能会重复出现多次，而数组的长度为 count 的绝对值。

	6> sscan name 0 match * 				## 迭代集合键中的元素

	7> scard name 							## 返回集合中元素的数量

	8> sdiff name person 					## 返回name中有但是person中没有的元素

	9> sdiffstore haha person name 			## 将person中有但是name中没有的元素放到haha中，haha如果有值将被覆盖

	10> sinter person name 					## 返回给定所有给定集合的交集。 不存在的集合 key 被视为空集。

	11> sinterstore xixi person name 		## 将给定集合之间的交集存储在指定的集合中。如果指定的集合已经存在，则将其覆盖

	12> smove name person css 				## 将name中的css传给person

	13> srem person css 					## 移除集合中的一个或多个成员元素，不存在的成员元素会被忽略

	14> sunion person name 					## 返回给定集合的并集。不存在的集合 key 被视为空集

	15> sunionstore xixi name person 		## 将给定集合的并集存储在指定的集合 destination 中。如果 destination 已经存在，则将其覆盖

八、SORTED SET

	1> zadd name 2 c++ 3 html 4 css 5 mysql 		## 将一个或多个成员元素及其分数值加入到有序集当中

	2> zcard name 									## 用于计算集合中元素的数量

	3> zcount name 2 4 								## 计算有序集合中指定分数区间的成员数量

	4> zincrby name 2 java 							## 对有序集合中指定成员的分数加上增量 increment

	5> zrange name 0 -1  withscores					## 返回有序集中，指定区间内的成员

	6> zrank name java 								## 返回有序集中指定成员的排名。其中有序集成员按分数值递增																(从小到大)顺序排列

	7> zrem name java 								## 移除有序集中的一个或多个成员，不存在的成员将被忽略

	8> zscore name css 								## 返回有序集中，成员的分数值。 如果成员元素不是有序集 key 的成员，														或 key 不存在，返回 nil 

	9> zscan name 0 match * 						## 迭代有序集合中的元素（包括元素成员和元素分值）

	10> zrevrank name c++ 							## 返回有序集中成员的排名,分值最高排名的数值越小。

	11> zrevrange name 0 -1 withscores 				## 返回有序集中，指定区间内的成员，分数值越大越靠前

	12> zrevrangebyscore name 3 0 				## 按分数值递减(从大到小)的次序，返回有序集中指定分数区间内的所有的成员

	13> zremrangebyscore name 1 3 				## 移除有序集中，指定分数（score）区间内的所有成员

	14> zremrangebyrank name 0 1 				## 移除有序集中，指定排名(rank)区间内的所有成员

	15> zinterstore		## 计算给定的一个或多个有序集的交集（http://www.runoob.com/redis/sorted-sets-zinterstore.html）

	16> zrangebyscore salary (5000 400000  		## 显示工资大于 5000 小于等于 400000 的成员

	17> zunionstore 	## http://www.runoob.com/redis/sorted-sets-zunionstore.html

	18> zremrangebylex ## http://www.runoob.com/redis/sorted-sets-zremrangebylex.html

	19> zrangebylex 		## http://www.runoob.com/redis/sorted-sets-zrangebylex.html

	20> zlexcount 			## http://www.runoob.com/redis/sorted-sets-zlexcount.html
