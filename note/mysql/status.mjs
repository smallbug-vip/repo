mysql> show engine innodb status\g;


*************************** 1. row ***************************
  type: innodb
  name: 
status: 
=====================================
2016-03-19 04:51:37 7f7562642700 innodb monitor output
=====================================
per second averages calculated from the last 9 seconds
-----------------
background thread
-----------------
srv_master_thread loops: 0 srv_active, 0 srv_shutdown, 841449 srv_idle
srv_master_thread log flush and writes: 841448
----------
semaphores
----------
os wait array info: reservation count 2
os wait array info: signal count 2
mutex spin waits 2, rounds 0, os waits 0
rw-shared spins 2, rounds 60, os waits 2
rw-excl spins 0, rounds 0, os waits 0
spin rounds per wait: 0.00 mutex, 30.00 rw-shared, 0.00 rw-excl
------------
transactions
------------
trx id counter 19715
purge done for trx's n:o < 16530 undo n:o < 0 state: running but idle
history list length 2693
list of transactions for each session:
---transaction 0, not started
mysql thread id 4, os thread handle 0x7f7562642700, query id 32 localhost root init
show engine innodb status
--------
file i/o
--------
i/o thread 0 state: waiting for completed aio requests (insert buffer thread)
i/o thread 1 state: waiting for completed aio requests (log thread)
i/o thread 2 state: waiting for completed aio requests (read thread)
i/o thread 3 state: waiting for completed aio requests (read thread)
i/o thread 4 state: waiting for completed aio requests (read thread)
i/o thread 5 state: waiting for completed aio requests (read thread)
i/o thread 6 state: waiting for completed aio requests (write thread)
i/o thread 7 state: waiting for completed aio requests (write thread)
i/o thread 8 state: waiting for completed aio requests (write thread)
i/o thread 9 state: waiting for completed aio requests (write thread)
pending normal aio reads: 0 [0, 0, 0, 0] , aio writes: 0 [0, 0, 0, 0] ,
 ibuf aio reads: 0, log i/o's: 0, sync i/o's: 0
pending flushes (fsync) log: 0; buffer pool: 0
425 os file reads, 5 os file writes, 5 os fsyncs
0.00 reads/s, 0 avg bytes/read, 0.00 writes/s, 0.00 fsyncs/s
-------------------------------------
insert buffer and adaptive hash index
-------------------------------------
ibuf: size 1, free list len 0, seg size 2, 0 merges
merged operations:
 insert 0, delete mark 0, delete 0
discarded operations:
 insert 0, delete mark 0, delete 0
hash table size 276671, node heap has 1 buffer(s)
0.00 hash searches/s, 0.00 non-hash searches/s
---
log
---
log sequence number 4583977
log flushed up to   4583977
pages flushed up to 4583977
last checkpoint at  4583977
0 pending log writes, 0 pending chkp writes
8 log i/o's done, 0.00 log i/o's/second
----------------------
buffer pool and memory
----------------------
total memory allocated 137363456; in additional pool allocated 0
dictionary memory allocated 52165
buffer pool size   8191
free buffers       7779
database pages     411
old database pages 0
modified db pages  0
pending reads 0
pending writes: lru 0, flush list 0, single page 0
pages made young 0, not young 0
0.00 youngs/s, 0.00 non-youngs/s
pages read 411, created 0, written 1
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
no buffer pool page gets since the last printout
pages read ahead 0.00/s, evicted without access 0.00/s, random read ahead 0.00/s
lru len: 411, unzip_lru len: 0
i/o sum[0]:cur[0], unzip sum[0]:cur[0]
--------------
row operations
--------------
0 queries inside innodb, 0 queries in queue
0 read views open inside innodb
main thread process no. 2083, id 140142023010048, state: sleeping
number of rows inserted 0, updated 0, deleted 0, read 0
0.00 inserts/s, 0.00 updates/s, 0.00 deletes/s, 0.00 reads/s
----------------------------
end of innodb monitor output
============================

1 row in set (0.02 sec)