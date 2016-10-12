

1、jps [options] [hostid]
	-q 不输出类名、Jar名和传入main方法的参数
	-m 输出传入main方法的参数
	-l 输出main类或Jar的全限名
	-v 输出传入JVM的参数

2、jstat   (demo: jstat -class 10184) 

	–class <pid> : 显示加载class的数量，及所占空间等信息。
		Loaded				装载的类的数量
		Bytes				装载类所占用的字节数
		Unloaded			卸载类的数量
		Bytes				卸载类的字节数
		Time				装载和卸载类所花费的时间

	-compiler <pid> ：显示JIT实时编译的数量等信息。
		Compiled			编译任务执行数量
		Failed 				编译任务执行失败数量
		Invalid				编译任务执行失效数量
		Time				编译任务消耗时间
		FailedType			最后一个编译失败任务的类型
		FailedMethod		最后一个编译失败任务所在的类及方法

	-gc <pid>: 可以显示gc的信息，查看gc的次数，及时间。
		S0C					年轻代中第一个survivor（幸存区）的容量 (字节)
		S1C					年轻代中第二个survivor（幸存区）的容量 (字节)
		S0U					年轻代中第一个survivor（幸存区）目前已使用空间 (字节)
		S1U 				年轻代中第二个survivor（幸存区）目前已使用空间 (字节)
		EC 					年轻代中Eden（伊甸园）的容量 (字节)
		EU					年轻代中Eden（伊甸园）目前已使用空间 (字节)
		OC					Old代的容量 (字节)
		OU					Old代目前已使用空间 (字节)
		PC 					Perm(持久代)的容量 (字节)
		PU 					Perm(持久代)目前已使用空间 (字节)
		YGC  				从应用程序启动到采样时年轻代中gc次数
		YGCT 				从应用程序启动到采样时年轻代中gc所用时间(s)
		FGC 				从应用程序启动到采样时old代(全gc)gc次数
		FGCT				从应用程序启动到采样时old代(全gc)gc所用时间(s)
		GCT 				从应用程序启动到采样时gc用的总时间(s)

	-gccapacity <pid>:可以显示，VM内存中三代（young,old,perm）对象的使用和占用大小
		NGCMN 				年轻代(young)中初始化(最小)的大小(字节)
		NGCMX 				年轻代(young)的最大容量 (字节)
		NGC 				年轻代(young)中当前的容量 (字节)
		S0C 				年轻代中第一个survivor（幸存区）的容量 (字节)
		S1C					年轻代中第二个survivor（幸存区）的容量 (字节)
		EC					年轻代中Eden（伊甸园）的容量 (字节)
		OGCMN 				old代中初始化(最小)的大小 (字节)
		OGCMX 				old代的最大容量(字节)
		OGC 				old代当前新生成的容量 (字节)
		OC  				Old代的容量 (字节)
		PGCMN 				perm代中初始化(最小)的大小 (字节)
		PGCMX 				perm代的最大容量 (字节)  
		PGC 				perm代当前新生成的容量 (字节)
		PC 					Perm(持久代)的容量 (字节)
		YGC 				从应用程序启动到采样时年轻代中gc次数
		FGC 				从应用程序启动到采样时old代(全gc)gc次数


      -gcutil <pid>:统计gc信息
		S0 					年轻代中第一个survivor（幸存区）已使用的占当前容量百分比
		S1 					年轻代中第二个survivor（幸存区）已使用的占当前容量百分比
		E 					年轻代中Eden（伊甸园）已使用的占当前容量百分比
		O 					old代已使用的占当前容量百分比
		P 					perm代已使用的占当前容量百分比
		YGC 				从应用程序启动到采样时年轻代中gc次数
		YGCT 				从应用程序启动到采样时年轻代中gc所用时间(s)
		FGC 				从应用程序启动到采样时old代(全gc)gc次数
		FGCT 				从应用程序启动到采样时old代(全gc)gc所用时间(s)
		GCT 				从应用程序启动到采样时gc用的总时间(s)

详情：http://www.cnblogs.com/litaobupt/articles/3044982.html