# -*- coding: utf-8 -*-

'''
Created on 2016年10月17日

@author: i-jiashuomeng
'''

import pymysql


def t1():
    conn = pymysql.connect(host='10.200.20.194',
                           port=3306,
                           user='pplive_vip_usr',
                           passwd='@!0550b2-007f-11',
                           db='pplive_vip',
                           charset='utf8')
    cur = conn.cursor()
    cur.execute("SELECT * FROM vip_member_validate LIMIT 0,20")
    for r in cur.fetchall():
        print(r)

    conn.close()
if __name__ == '__main__':
    t1()
    pass
