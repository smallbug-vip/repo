'''
Created on 2016年11月18日

@author: i-jiashuomeng
'''

import os


'''
    读取测试环境有，预发布没有的表
'''
def t1():
    arr_s = []
    with open('E:/e.txt', 'r') as f:
        while 1:
            line = f.readline()
            if not line:
                break
            arr_s.append(line.strip(os.linesep));
    
    arr_d = set()
    with open('E:/r.txt', 'r') as f:
        while 1:
            line = f.readline()
            if not line:
                break
            a = True
            for x in arr_s:
                if x == line.strip(os.linesep):
                    a = False
                    break
            if a:
                print(line)
                arr_d.add(line)

    print(len(arr_d))
    print(arr_d)

'''
    预发布有多少要删的表
'''
def t2():
    arr_s = []
    with open('E:/r.txt', 'r') as f:
        while 1:
            line = f.readline()
            if not line:
                break
            arr_s.append(line.strip(os.linesep));
    
    arr_d = set()
    with open('E:/d.txt', 'r') as f:
        while 1:
            line = f.readline()
            if not line:
                break
            for x in arr_s:
                if x == line.strip(os.linesep):
                    print(x)
                    arr_d.add(x)

    print(len(arr_d))
    print(arr_d)
if '__main__' == __name__:
    t2()
