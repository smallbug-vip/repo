# -*- coding: utf-8 -*-
'''
Created on 2016年10月10日

@author: i-jiashuomeng
'''

import math  # 数学相关的函数

_a = 'a'  # 理论上的私有变量

'''输出'''


def pr1():
    print('100 + 200 =', 100 + 200)
    print('''line1
line2
line3''')
    print('Hi, %s, you have $%d.' % ('Michael', 1000000))
    print(ord('饕'))
    print(chr(66))


def dfd():
    hex(16)  # 10进制转16进制
    int('0x10', 16)  # 16进制转10进制


def list_demo():
    c = ['Michael', 'Bob', 'Tracy']
    print(c[0], c[-1])  # Michael Tracy
    c.append('cc')  # ['Michael', 'Bob', 'Tracy', 'cc']
    c.insert(1, 'bbb')
    c.pop()
    c.pop(1)  # 指定删除位置
    c.sort()


def tuple_demo():
    print((1,))


def if_demo():
    age = 3
    if age >= 18:
        print('adult')
    elif age >= 6:
        print('teenager')
    else:
        print('kid')


def dict_demo():
    d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}

    items = [('name', 'earth'), ('port', '80')]
    d = dict(items)
    d.keys()
    d.values()

    dict1 = {}.fromkeys(('x', 'y'), -1)  # {'y': -1, 'x': -1}

    dict1.popitem()  # 随机弹出键值对

    d['Michael']
    d['Adam'] = 67
    if 'Thomas' in d:
        pass

    d.get('Thomas', -1)  # 没有值默认返回-1
    d.pop('Bob')


def set_demo():
    s = set([1, 2, 3])
    s.add(4)
    s.remove(4)
    b = set([3])
    s & b  # 求交集
    s | b  # 求并集


def wed():
    print('中文'.encode('utf-8'))  # b'\xe4\xb8\xad\xe6\x96\x87'
    b'\xe4\xb8\xad\xe6\x96\x87'.decode('utf-8')
    len('ABC')  # 3


def d1():
    print(True and False)
    print(True or False)
    print(not True)

'''输入'''


def inp():
    _a = input("please enter your name:")

''' for 循环 '''


def for_demo():
    sum = 0
    for x in range(101):
        print(x)
        sum = sum + x
    print(sum)

''' 空函数 '''


def nop():
    pass  # None==nop() -> True

''' 类型检查 '''


def my_abs(x):
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')

    if x >= 0:
        return x
    else:
        return -x

''' 返回多个值 '''


def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny

''' 可变参数，以列表作为可变参数: a = [1,2,3,4,5]; variable(*a) '''


def v1(*num):
    sum = 0
    for x in num:
        sum += x
    print(sum)

''' 关键字参数 person('Adam', 45, gender='M', job='Engineer') '''


def p1(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)

'''命名关键字参数  p2('smallbug','12',city='33',job='33')  调用时必须要指定参数名'''


def p2(name, age, *, city, job):
    print(name, age, city, job)

'''参数顺序：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。'''


def f1(a, b, c=0, *args, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)


def f2(a, b, c=0, *, d, **kw):
    print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)


'''主函数入口'''

if __name__ == '__main__':
    pr1()
