



				ArrayList							LinkedList
add				add(Obj) / add(index)				add(Obj) / add(index) 			时间复杂度上不相伯仲，版本 +1
remove			remove(index) / remove(Obj) 		remove(index) / remove(Obj) 	LinkedList好，版本 +1
set				set(index)							set(index) 						ArrayList比LinkedList好，版本不变
get				get(index)							get(index) 						ArrayList比LinkedList好，版本不变


增强for循环其实是创建了一个迭代对象，hasNext去判断是否含有下一个元素，next去获取下一个元素，在next方法调用时会检查当前版本，如果被改变则抛出异常。
