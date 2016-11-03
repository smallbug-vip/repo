-----------------------------------------

linux或者mac上直接运行.py文件

!/usr/bin/env python3

统一编码格式
# -*- coding: utf-8 -*-

-----------------------------------------

输出方式：
	print('The quick brown fox', 'jumps over', 'the lazy dog')  //遇到逗号“,”会输出一个空格

	print(r'\\\t\\')  //r''表示''内部的字符串默认不转义

	print('''line1 //交互模式换行
	... line2
	... line3''')

	print('''line1 //编程模式换行
	line2
	line3''')

	'Hi, %s, you have $%d.' % ('Michael', 1000000)

	%d	整数
	%f	浮点数
	%s	字符串
	%x	十六进制整数

	'%2d-%02d' % (3, 1)  //' 3-01' 		是否补0
	'%.2f' % 3.1415926  //'3.14' 		小数的位数
	%%来表示一个%  转译

-----------------------------------------

输入方式：
	name = input('please enter your name: ')

-----------------------------------------

boolean : True False    and or not

int()
float()
bool()
str()

-----------------------------------------

除法： 10/3 = 3.3333333333333335    10 // 3 = 3

-----------------------------------------

Unicode :最常用的是用两个字节表示一个字符（如果要用到非常偏僻的字符，就需要4个字节）
UTF-8编码把一个Unicode字符根据不同的数字大小编码成1-6个字节，常用的英文字母被编码成1个字节，汉字通常是3个字节，只有很生僻的字符才会被编码成4-6个字节。
如果你要传输的文本包含大量英文字符，用UTF-8编码就能节省空间


ord()函数获取字符的整数表示，chr()函数把编码转换为对应的字符

'ABC'.encode('ascii')  --> b'ABC'
'中文'.encode('utf-8')  --> b'\xe4\xb8\xad\xe6\x96\x87'
b'ABC'.decode('ascii') --> 'ABC'
b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')   ->  '中文'


 len('中文')  //字符串长度


-----------------------------------------

l = ['Michael', 'Bob', 'Tracy']

l[0]
l[-1]
l.append('aa')
l.insert(0,'bb')
l.pop()
l[1] = 'ccc'
l.sort()
t = (1,)



字符串：
	a.replace('a', 'A')

元组-->列表
    list()
列表-->元组
    tuple()
元组或者列表转字符串
"".join(list)
-----------------------------------------

age = 20
if age >= 6:
    print('teenager')
elif age >= 18:
    print('adult')
else:
    print('kid')

-----------------------------------------

for x : range(50):
	print(x)

while x--<10:
	print(x)

-----------------------------------------

d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
d['Michael']
d['Adam'] = 67

判断字典是否包含该Key，不包含的话就会报错
'Thomas' in d 

d.get('Thomas', -1)
d.get('Thomas')==None  //True
d.pop('ss')


s = set([1, 2, 3])
s.add(4)
s.remove(4)
-----------------------------------------

def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x

-----------------------------------------

import math

def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny

x, y = move(100, 100, 60, math.pi / 6)
print(x, y)

-----------------------------------------

默认参数：
	def power(x, n=2):
	    s = 1
	    while n > 0:
	        n = n - 1
	        s = s * x
	    return s

-----------------------------------------

def add_end(L=[]):
    L.append('END')
    return L
add_end()		//多次调用会出现多个END
add_end([])		//就不会出现这种情况

-----------------------------------------

可变参数
	def calc(*numbers):
	    sum = 0
	    for n in numbers:
	        sum = sum + n * n
	    return sum
调用方式：
	nums = [1, 2, 3]
	calc(*nums)

-----------------------------------------

关键字参数
	def person(name, age, **kw):
	    print('name:', name, 'age:', age, 'other:', kw)

调用方式
    erson('Adam', 45, gender='M', job='Engineer')

-----------------------------------------

命名关键字参数
	def person(name, age, *, city, job):
    	print(name, age, city, job)

	person('Jack', 24, city='Beijing', job='Engineer')

-----------------------------------------

参数组合
	def f1(a, b, c=0, *args, **kw):
	    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)

	def f2(a, b, c=0, *, d, **kw):			# *后面的参数被视为命名关键字参数
	    print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)

-----------------------------------------

L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']

L[0:3] == L[:3]				#  ['Michael', 'Sarah', 'Tracy']
L[-2:] 			# ['Bob', 'Jack']
L[:10:2] 		# 前10个每两个取一个

-----------------------------------------

d = {'name':'smallbug','age':12,'desc':'hello'}

for x in d.values():
	print(x)


d = {'x': 'A', 'y': 'B', 'z': 'C' }
for k, v in d.items():
	print(k, '=', v)


from collections import Iterable
isinstance('abc', Iterable)


for i, value in enumerate(['A', 'B', 'C']):
	print(i, value)

0 A
1 B
2 C

for x, y in [(1, 1), (2, 4), (3, 9)]:
	print(x, y)

-----------------------------------------

列表生成式

[x * x for x in range(1, 11)]

[x * x for x in range(1, 11) if x % 2 == 0]

[m + n for m in 'ABC' for n in 'XYZ']

[k + '=' + v for k, v in d.items()]

[s.lower() for s in L]

-----------------------------------------

生成器
	g = (x * x for x in range(10))

	next(g)

def fib(max):
    n, a, b = 0, 0, 1
    while n < max:
        yield b
        a, b = b, a + b
        n = n + 1
    return 'done'

f = fib(6)

-----------------------------------------

map/reduce

r = map(f, [1, 2, 3, 4, 5, 6, 7, 8, 9])

list(map(str, [1, 2, 3, 4, 5, 6, 7, 8, 9]))

reduce(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)


//字符串转数字
1>
from functools import reduce
def fn(x, y):
	return x * 10 + y
def char2num(s):
	return {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}[s]
reduce(fn, map(char2num, '13579'))

2>
def str2int(s):
    def fn(x, y):
        return x * 10 + y
    def char2num(s):
        return {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}[s]
    return reduce(fn, map(char2num, s))

3>
def char2num(s):
    return {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}[s]
def str2int(s):
    return reduce(lambda x, y: x * 10 + y, map(char2num, s))

-----------------------------------------

filter

def _odd_iter():
    n = 1
    while True:
        n = n + 2
        yield n

def _not_divisible(n):
    return lambda x: x % n > 0

def primes():
    yield 2
    it = _odd_iter() # 初始序列
    while True:
        n = next(it) # 返回序列的第一个数
        yield n
        it = filter(_not_divisible(n), it) # 构造新序列

# 打印1000以内的素数:
for n in primes():
    if n < 1000:
        print(n)
    else:
        break

-----------------------------------------

sorted([36, 5, -12, 9, -21], key=abs)

sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower)

sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True)

-----------------------------------------

返回函数

def lazy_sum(*args):
    def sum():
        ax = 0
        for n in args:
            ax = ax + n
        return ax
    return sum

返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。

def count():
    def f(j):
        def g():
            return j*j
        return g
    fs = []
    for i in range(1, 4):
        fs.append(f(i)) # f(i)立刻被执行，因此i的当前值被传入f()
    return fs

-----------------------------------------

匿名函数

def build(x, y):
    return lambda: x * x + y * y

-----------------------------------------




__name__	函数名




-----------------------------------------

装饰器

1>
def log(func):
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper

@log
def now():
    print('2015-3-25')


2>
def log(text):
    def decorator(func):
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')

def now():
    print('2015-3-25')

/////////////////////////////////////////////

import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kw):
        print('call %s():' % func.__name__)
        return func(*args, **kw)
    return wrapper

或者针对带参数的decorator：

import functools

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

-----------------------------------------

偏函数：
	import functools
	int2 = functools.partial(int, base=2)

作用：
	可以在函数外面包装一层，以此指定默认参数

-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------
-----------------------------------------