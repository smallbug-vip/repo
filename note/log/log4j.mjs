### log4j.rootLogger表示根日志器，DEBUG是指定根日志器的输出级别，
### 只要大于等于DEBUG级别的日志就可以输出。stdout是说明发送器（Appender）的名称
log4j.rootLogger=ERROR, stdout

### 表示发送器，org.apache.log4j.ConsoleAppender表示发送器为控制台发送器，
### ConsoleAppender：向控制台输出日志
### FileAppender：向文件输出日志
### DailyRollingFileAppender：向文件输出日志，每天一个日志文件
### ### log4j.appender.stdout=org.apache.log4j.DailyRollingFileAppender
### ### log4j.appender.stdout.File=E:/localhost/log/smallbug.log
### ### log4j.appender.stdout.DatePattern='.'yyyy-MM-dd
### ### log4j.appender.file.encoding=UTF-8
### RollingFileAppender：向文件输出日志，当文件大小达到指定大小后，生成新文件
log4j.appender.stdout=org.apache.log4j.ConsoleAppender

### 格式化日志的输出
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} [%-5p] %c{1}-%t:%L - %m%n

### 自定义日志器,要么是自定义日志器的子类要么是跟日志器的子类
log4j.logger.cn.smallbug=DEBUG



	%t：当前线程；
	%l：输出日志的Java类相关信息。
	%m：信息本身；
	%c：日志器的名称；
	%d：日期，还可以指定日期的格式，例如：%d{yyyy-MM-dd HH:mm:ss}；
	%p：日志级别；
	%n：换行；


	FATAL：重大错误，例如系统崩溃；
	ERROR：错误，例如某模块瘫痪；
	WARN：警告，程序的隐患，如果不处理，将来可能就是错误；
	INFO：信息，可以用来查看程序执行的流程；
	DEBUG：调试，用来调试程序的bug。






log4j.category.SQLLOG=DEBUG,SL
log4j.rootLogger=INFO,A1,R

log4j.appender.A1=org.apache.log4j.ConsoleAppender
log4j.appender.A1.stdout.Target=System.out
log4j.appender.A1.Threshold=INFO
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS}[%c][%p]%m%n

log4j.appender.R=org.apache.log4j.DailyRollingFileAppender
log4j.appender.R.Threshold=INFO
log4j.appender.R.File=/home/logs/apps/vipbackend/vip.log
log4j.appender.R.DatePattern='.'yyyy-MM-dd
log4j.appender.R.layout=org.apache.log4j.PatternLayout
log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss,SSS}[%c][%p]%m%n

log4j.appender.SL=org.apache.log4j.DailyRollingFileAppender
log4j.appender.SL.Threshold=DEBUG
log4j.appender.SL.File=/home/logs/apps/vipbackend/sql.log
log4j.appender.SL.DatePattern='.'yyyy-MM-dd
log4j.appender.SL.layout=org.apache.log4j.PatternLayout
log4j.appender.SL.layout.ConversionPattern=%d{yyyy-MM-dd HH\:mm\:ss,SSS}[%c][%p]%m%n



二、优先级层次 

1.fatal  记录严重及致命的错误

2.error  运行时错误及不希望出现的条件

3.warn  警告（比如：使用了不建议的API，运行时一些不一定是错误的情况）

4.info  一般的运行时提示信息

5.debug  调试信息

6.trace   最详细的细节信息

默认的消息优先级为info