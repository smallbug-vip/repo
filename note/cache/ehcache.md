
----------

### CacheManager管理cache，cache由Element组成 ###

----------
### ehcache标签属性 ###
1. **xsd文件地址 xsi**:noNamespaceSchemaLocation="http://ehcache.org/ehcache.xsd"
2. **name**:指定当前CacheManager的名称。
3. **dynamicConfig**：boolean类型。表示是否可以动态的更新配置，默认为true。当设置为false的时候，我们在运行期通过CacheManager的Configuration来改变配置信息时将不会发生作用。使用代码进行配置时我们可以通过Configuration对象的dynamicConfig(boolean dynamicConfig)方法来指定该配置。
4. **maxBytesLocalDisk**：在CacheManager级别指定能够使用的本地磁盘的最大容量。当指定了该属性后隐式的使所有Cache的overflowToDisk变为true，如需关闭则需要在对应的Cache上设置overflowToDisk为false。
5. **maxBytesLocalHeap**：在CacheManager级别指定能够使用的堆内存的最大容量。
6. **maxBytesLocalOffHeap**：在CacheManager级别指定能够使用的非堆内存的最大容量。当指定了该属性后会隐式的使所有Cache的overflowToDisk变为true，如需关闭则需在对应的Cache上设置overflowToOffHeap为false。该属性只对企业版Ehcache有用。
7. **updateCheck**：boolean类型，是否检查更新，默认为true。当设置为true时，CacheManager会定期的从网上去检查当前的Ehcache是否是最新的版本，如果不是，则会将比当前版本新的版本列出来。

----------
### cache 标签属性 ###
1. **name**：指定cache的名称。
2. **maxEntriesLocalDisk**：指定允许在硬盘上存放元素的最大数量，0表示不限制。这个属性我们也可以在运行期通过CacheConfiguration来更改。
3. **maxEntriesLocalHeap**：指定允许在内存中存放元素的最大数量，0表示不限制。这个属性也可以在运行期动态修改。
4. **maxEntriesInCache**：指定缓存中允许存放元素的最大数量。这个属性也可以在运行期动态修改。但是这个属性只对Terracotta分布式缓存有用。
5. **maxBytesLocalDisk**：指定当前缓存能够使用的硬盘的最大字节数，其值可以是数字加单位，单位可以是K、M或者G，不区分大小写，如：30G。当在CacheManager级别指定了该属性后，Cache级别也可以用百分比来表示，如：60%，表示最多使用CacheManager级别指定硬盘容量的60%。该属性也可以在运行期指定。当指定了该属性后会隐式的使当前Cache的overflowToDisk为true。
6.  **maxBytesLocalHeap**：指定当前缓存能够使用的堆内存的最大字节数，其值的设置规则跟maxBytesLocalDisk是一样的。
7.  **maxBytesLocalOffHeap**：指定当前Cache允许使用的非堆内存的最大字节数。当指定了该属性后，会使当前Cache的overflowToOffHeap的值变为true，如果我们需要关闭overflowToOffHeap，那么我们需要显示的指定overflowToOffHeap的值为false。
8.  **overflowToDisk**：boolean类型，默认为false。当内存里面的缓存已经达到预设的上限时是否允许将按驱除策略驱除的元素保存在硬盘上，默认是LRU（最近最少使用）。当指定为false的时候表示缓存信息不会保存到磁盘上，只会保存在内存中。该属性现在已经废弃，推荐使用cache元素的子元素persistence来代替，如：`<persistence strategy=”localTempSwap”/>。`
9.  **diskSpoolBufferSizeMB**：当往磁盘上写入缓存信息时缓冲区的大小，单位是MB，默认是30。
10.  **overflowToOffHeap**：boolean类型，默认为false。表示是否允许Cache使用非堆内存进行存储，非堆内存是不受Java GC影响的。该属性只对企业版Ehcache有用。
11.  **copyOnRead**：当指定该属性为true时，我们在从Cache中读数据时取到的是Cache中对应元素的一个copy副本，而不是对应的一个引用。默认为false。
12.  **copyOnWrite**：当指定该属性为true时，我们在往Cache中写入数据时用的是原对象的一个copy副本，而不是对应的一个引用。默认为false。
13.  **timeToIdleSeconds**：单位是秒，表示一个元素所允许闲置的最大时间，也就是说一个元素在不被请求的情况下允许在缓存中待的最大时间。默认是0，表示不限制。
14.  **timeToLiveSeconds**：单位是秒，表示无论一个元素闲置与否，其允许在Cache中存在的最大时间。默认是0，表示不限制。
15.  **eternal**：boolean类型，表示是否永恒，默认为false。如果设为true，将忽略timeToIdleSeconds和timeToLiveSeconds，Cache内的元素永远都不会过期，也就不会因为元素的过期而被清除了。
16.  **diskExpiryThreadIntervalSeconds** ：单位是秒，表示多久检查元素是否过期的线程多久运行一次，默认是120秒。
17.  **clearOnFlush**：boolean类型。表示在调用Cache的flush方法时是否要清空MemoryStore。默认为true。
18.  **memoryStoreEvictionPolicy**：当内存里面的元素数量或大小达到指定的限制后将采用的驱除策略。默认是LRU（最近最少使用），可选值还有LFU（最不常使用）和FIFO（先进先出）。

----------
### cache 子元素标签属性 ###
1. **persistence**：表示Cache的持久化，它只有一个属性strategy，表示当前Cache对应的持久化策略。其可选值如下：  
　1. **localTempSwap**：当堆内存或者非堆内存里面的元素已经满了的时候，将其中的元素临时的存放在磁盘上，一旦重启就会消失。  
　2. **localRestartable**：该策略只对企业版Ehcache有用。它可以在重启的时候将堆内存或者非堆内存里面的元素持久化到硬盘上，重启之后再从硬盘上恢复元素到内存中。  
　3. **none**：不持久化缓存的元素  
　4. **distributed**：该策略不适用于单机，是用于分布式的。  
2.  **copyStrategy**：当我们指定了copyOnRead或copyOnWrite为true时，就会用到我们的copyStrategy，即拷贝策略了。默认的copyStrategy是通过序列化来实现的，我们可以通过实现net.sf.ehcache.store.compound.CopyStrategy接口来实现自己的CopyStrategy，然后只需在cache元素下定义一个copyStrategy元素并指定其class属性为我们的CopyStrategy实现类。如：`<copyStrategy class="xxx.xxx.xxx"/>`。
3.  **pinning**：表示将缓存内的元素固定住，除非过期，否则不会对它进行删除和驱除到其它储存容器中。pinning元素只定义了一个属性store，表示将把元素固定在哪个位置。其可选值有localMemory和inCache。
4.  **localMemory**：表示将元素固定在内存中
5.  **inCache**：表示将元素固定在任何其正在保存的容器中。

----------
8/26/2016 7:06:42 PM 