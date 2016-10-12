# -*- coding: utf-8 -*-

'''
Created on 2016年10月10日

@author: i-jiashuomeng
'''


''' 带有序号的遍历，遍历元组 '''

from collections import Iterable
from functools import reduce


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
    
if __name__ == '__main__':
    so()
