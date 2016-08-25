控制线程优先级：
	getPriority()
	setPriority()
	//默认是5，取值1~10
休眠：
   sleep(long)

该线程执行完之后其他线程才能执行
    join()

放弃CPU执行权，重新抢占资源
    yield()

设置守护线程
    setDaemon(true)//线程执行前调用

线程中断,如果有wait，sleep,join等方法，抛出InterruptedException()
    interrupt()

暴力终结
    stop()

void notify(): 唤醒一个正在等待该对象的线程。

void notifyAll(): 唤醒所有正在等待该对象的线程。




//////////////////////////////////////////////////////////

CountDownLatch  闭锁
	初始化时规定参数2，c.await()之后必须要有2次的c.countDown();才会解锁
	
CyclicBarrier 循环屏障，只有await一定数量的线程之后，所有线程才可同时运行

偏向锁
    实现方式：对象指向偏向线程
    解决的问题：不存在锁竞争关系，平白浪费性能

轻量级锁
    解决问题：短时间内可能就会获取到锁，自旋一段时间尝试获取锁，避免了每次都挂起线程带来的巨大消耗
    实现方式：对象指向线程，线程保存对象的markword

重量级锁：
        线程挂起
    实现方式：维护挂起队列