 

 Pointcut //切入点

 ClassFilter //匹配要切入的类

 MethodMatcher //匹配要切入的方法

 Advice //代表通知

 Advisor //表示一个切面，组织通知

 Advised //将切面、目标对象、需要代理的接口组织起来



 AdvisedSupport implements Advised //它可以动态添加，修改，删除通知和动态切换目标对象，即使代理对象已经创建