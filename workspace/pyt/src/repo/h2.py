# -*- coding: utf-8 -*-

'''
Created on 2016年10月10日

@author: i-jiashuomeng
'''
''' 带有序号的遍历，遍历元组 '''

from collections import Iterable
from functools import reduce
import functools


def itf():
    print(isinstance('abc', Iterable))
    for i, value in enumerate(['A', 'B', 'C']):
        print(i, value)
    for x, y in [(1, 1), (2, 4), (3, 9)]:
        print(x, y)

''' map reduce '''


def str2int(s):
    def fn(x, y):
        return x * 10 + y

    def char2num(s):
        return {'0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9}[s]
    return reduce(fn, map(char2num, s))


''' 查找素数'''


def _odd_iter():
    n = 1
    while True:
        n = n + 2
        yield n


def _not_divisible(n):
    return lambda x: x % n > 0


def primes():
    yield 2
    it = _odd_iter()  # 初始序列
    while True:
        n = next(it)  # 返回序列的第一个数
        yield n
        it = filter(_not_divisible(n), it)  # 构造新序列
        print("-->", it)

def su():
    for n in primes():
        if n < 1000:
            print(n)
        else:
            break
        
''' 排序高阶函数 '''
       
       
       
def so():
    l = [36, 5, -12, 9, -21]
    print(sorted(l, key=abs))
    print(sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower))
    print(sorted(['bob', 'about', 'Zoo', 'Credit'], key=str.lower, reverse=True))


''' 循环创建函数中，所引用的i是全局变量， '''
    
def count():
    fs = []
    for x in range(1, 4):
        def f():
            return x * x
        fs.append(f)
    return fs

def count2():
    def f(j):
        def g():
            return j * j
        return g
    fs = []
    for i in range(1, 4):
        fs.append(f(i))  # f(i)立刻被执行，因此i的当前值被传入f()
    return fs

def clp():
    f1, f2, f3 = count()
    print(f1())
    print(f2())
    print(f3())
    
''' 过滤器 '''

def log(text):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kw):
            print('%s %s():' % (text, func.__name__))
            return func(*args, **kw)
        return wrapper
    return decorator

@log('execute')
def now(d, **k):
    print('2015-3-25')


''' 偏函数 '''

def pian():
    int2 = functools.partial(int, base=2)
    print(int2('1111'))
    
''' 入口函数 '''
    
    
if __name__ == '__main__':
    pian()
