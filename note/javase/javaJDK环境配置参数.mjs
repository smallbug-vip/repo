CLASSPATH

.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar

JAVA_HOME

D:\java

Path

%JAVA_HOME%\bin


/////////////////////////////////////////////////////////////////////////////////////

一、取得GC信息
-Xms20M -Xmx20M -Xmn10M -XX:SurvivorRatio=8
-verbose:gc -XX:+PrintGCDetails -XX:+PrintGCTimeStamps  -Xloggc:c:\gc.log

二、堆分配参数总结
	-Xms：设置Java应用程序启动的初始堆大小，一般设置成和-Xmx一样可以减少minor GC次数

	-Xmx：设置java应用程序能获得的最大堆大小，设置太小会增加GC次数，太大会增加GC时间

	-Xss：设置线程栈的大小，与支持的线程数相关 这个就要依据你的程序，看一个线程 大约需要占用多少内存，可能会有多少线程同时运行等。一般不易设置超过1M

	-XX:MinHeapFreeRatio：设置堆空间的最小空闲比例。当堆空间的空闲内存小于这个数值时，JVM变回扩展空间

	-XX:MaxHeapFreeRatio：置堆空间的最大空闲比例。当堆空间的空闲内存大于这个数值时，JVM变回扩展空间

	-Xmn：Sun官方推荐配置为整个堆的3/8

	-XX:NewSize：设置新生代的大小

	-XX:NewRatio：设置老年代和新生代的比例 等于老年代大小/新生代大小

	-XX:SurviorRatio：设置新生代中eden区与survivior区的比例

	-XX:PermSize：设置永久区的初始值 默认是物理内存的1/64

	-XX:MaxPermSize：设置最大的永久区大小 默认是物理内存的1/4

	-XX:TargetSurvivorRatio ：设置survivior区的可使用率，当survivior区的空间使用率达到这个数值时，会将对象送入老年代

	-XX:+DisableExplicitGC:禁用显式GC

一般Xms、Xmx设置相同，PermSize、MaxPermSize设置相同，这样可以避免伸缩堆大小带来的性能损耗



四、与并行GC相关的参数
	-XX:+UseParNewGC ：在新生代使用并行收集器

	-XX:+UseParallelOldGC：老年代使用并行回收收集器

	-XX:ParallelGCThreads：设置用于垃圾回收的线程数，通常情况下可以和CPU数量相等。但在CPU数量比较多的情况下，设置相对较小

	-XX:MaxGCPauserMillis 设置最大垃圾收集停顿时间。他的值是一个大于0的整数，在收集器工作时，会调整JAVA堆大小或则其他一些参数，尽可能地把停顿时间控制在MaxGCPauseMillls内

	-XX:GCTimeRatio：设置吞吐量的大小，它的值是一个0到100的整数，系统花费不超过1/(1+n)的时间用于垃圾收集，默认99

	-XX:+UseAdaptiveSizePolicy 自适应GC策略






五 、与CMS回收器相关的参数

1、启用CMS：-XX:+UseConcMarkSweepGC。 
 
2。CMS默认启动的回收线程数目是  (ParallelGCThreads + 3)/4) ，如果你需要明确设定，可以通过-XX:ParallelCMSThreads=20来设定,其中ParallelGCThreads是年轻代的并行收集线程数
 
3、CMS是不会整理堆碎片的，因此为了防止堆碎片引起full gc，通过会开启CMS阶段进行合并碎片选项：-XX:+UseCMSCompactAtFullCollection，开启这个选项一定程度上会影响性能，

4.为了减少第二次暂停的时间，开启并行remark: -XX:+CMSParallelRemarkEnabled。如果remark还是过长的话，可以开启-XX:+CMSScavengeBeforeRemark选项，强制remark之前开始一次minor gc，减少remark的暂停时间，但是在remark之后也将立即开始又一次minor gc。

5.为了避免Perm区满引起的full gc，建议开启CMS回收Perm区选项：
+CMSPermGenSweepingEnabled -XX:+CMSClassUnloadingEnabled

6.默认CMS是在tenured generation沾满68%的时候开始进行CMS收集，如果你的年老代增长不是那么快，并且希望降低CMS次数的话，可以适当调高此值：
-XX:CMSInitiatingOccupancyFraction=80
这里修改成80%沾满的时候才开始CMS回收。

7.年轻代的并行收集线程数默认是(cpu <= 8) ? cpu : 3 + ((cpu * 5) / 8)，如果你希望降低这个线程数，可以通过-XX:ParallelGCThreads= N 来调整。






UseSerialGC	虚拟机运行在Client模式下的默认值，打开此开关后，使用Serial+Serial Old的收集器组合进行内存回收

UseParNewGC	打开此开关后，使用ParNew+Serial Old的收集器组合进行内存回收

UseConcMarkSweepGC	打开此开关后，使用ParNew+CMS+Serial Old的收集器组合进行内存回收。Serial Old收集器将作为CMS收集器出现Concurrent Mode Failure失败后的后壁收集器使用

UseParallelGC	虚拟机运行在Server模式下的默认值，打开此开关后，使用Parallel Scavenge+Serial Old（PS MarkSweep）的收集器组合进行内存回收

UseParallelOldGC	打开此开关后，使用Parallel Scavenge+Parallel Old的收集器组合进行内存回收

SurvivorRatio	新生代中Eden区域与Survivor区域的容量比值，默认为8，代表Eden:Survivor=8:1

PretenureSizeThreshold	直接晋升到老年代的对象大小，设置这个参数后，大于这个参数的对象将直接在老年代分配

MaxTenuringThreshold	晋升到老年代的对象年龄。每个对象在坚持过一次Minor GC之后，年龄加1，当超过这个参数值时就进入老年代

UseAdaptiveSizePolicy	
动态调整Java堆中各个区域的大小以及进入老年代的年龄

HandlePromotionFailure | 是否允许分配担保失败，即老年代的剩余空间不足以应对新生代的整个Eden和Survivor区的所有对象都存活的极端情况

ParallelGCThreads | 设置并行GC时进行内存回收的线程数

GCTimeRatio | GC时间占总时间的比率，默认值为99，即允许1%的GC时间。仅在使用Parallel Scavenge收集器时生效

MaxGCPauseMillis | 设置GC的最大停顿时间。仅在使用Parallel Scavenge收集器时生效

CMSinitiatingOccupancyFraction | 设置CMS收集器在老年代空间被使用多少后出发垃圾收集。默认值为68%，仅在使用CMS收集器时生效

UseCMSCompactAtFullCollection | 设置CMS收集器在完成垃圾收集后是否要进行一次内存碎片整理。仅在使用CMS收集器时生效

CMSFullGCsBeforeCompaction | 设置CMS收集器在进行若干次垃圾收集后再启动一次内存碎片整理。仅在使用CMS收集器时生效