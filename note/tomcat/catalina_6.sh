#!/bin/sh
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# -----------------------------------------------------------------------------
# Start/Stop Script for the CATALINA Server
#
# Environment Variable Prerequisites
#
#   CATALINA_HOME   May point at your Catalina "build" directory.
#
#   CATALINA_BASE   (Optional) Base directory for resolving dynamic portions
#                   of a Catalina installation.  If not present, resolves to
#                   the same directory that CATALINA_HOME points to.
#
#   CATALINA_OUT    (Optional) Full path to a file where stdout and stderr
#                   will be redirected.
#                   Default is $CATALINA_BASE/logs/catalina.out
#
#   CATALINA_OPTS   (Optional) Java runtime options used when the "start",
#                   or "run" command is executed.
#
#   CATALINA_TMPDIR (Optional) Directory path location of temporary directory
#                   the JVM should use (java.io.tmpdir).  Defaults to
#                   $CATALINA_BASE/temp.
#
#   JAVA_HOME       Must point at your Java Development Kit installation.
#                   Required to run the with the "debug" argument.
#
#   JRE_HOME        Must point at your Java Development Kit installation.
#                   Defaults to JAVA_HOME if empty.
#
#   JAVA_OPTS       (Optional) Java runtime options used when the "start",
#                   "stop", or "run" command is executed.
#
#   JAVA_ENDORSED_DIRS (Optional) Lists of of colon separated directories
#                   containing some jars in order to allow replacement of APIs
#                   created outside of the JCP (i.e. DOM and SAX from W3C).
#                   It can also be used to update the XML parser implementation.
#                   Defaults to $CATALINA_HOME/endorsed.
#
#   JPDA_TRANSPORT  (Optional) JPDA transport used when the "jpda start"
#                   command is executed. The default is "dt_socket".
#
#   JPDA_ADDRESS    (Optional) Java runtime options used when the "jpda start"
#                   command is executed. The default is 8000.
#
#   JPDA_SUSPEND    (Optional) Java runtime options used when the "jpda start"
#                   command is executed. Specifies whether JVM should suspend
#                   execution immediately after startup. Default is "n".
#
#   JPDA_OPTS       (Optional) Java runtime options used when the "jpda start"
#                   command is executed. If used, JPDA_TRANSPORT, JPDA_ADDRESS,
#                   and JPDA_SUSPEND are ignored. Thus, all required jpda
#                   options MUST be specified. The default is:
#
#                   -agentlib:jdwp=transport=$JPDA_TRANSPORT,
#                       address=$JPDA_ADDRESS,server=y,suspend=$JPDA_SUSPEND
#
#   CATALINA_PID    (Optional) Path of the file which should contains the pid
#                   of catalina startup java process, when start (fork) is used
#
#   LOGGING_CONFIG  (Optional) Override Tomcat's logging config file
#                   Example (all one line)
#                   LOGGING_CONFIG="-Djava.util.logging.config.file=$CATALINA_BASE/conf/logging.properties"
#
#   LOGGING_MANAGER (Optional) Override Tomcat's logging manager
#                   Example (all one line)
#                   LOGGING_MANAGER="-Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager"
#
# $Id: catalina.sh 1146097 2011-07-13 15:25:05Z markt $
# -----------------------------------------------------------------------------
export JRE_HOME=/usr/java/jdk1.6.0_38

export CATALINA_HOME=/home/xrltest1/tomcat

JAVA_OPTS="-server -Xms2048m -Xmx2048m -Xmn768m -XX:PermSize=128m 
-XX:MaxPermSize=256m -XX:+UseParallelOldGC -XX:+PrintGCDateStamps -XX:+PrintGCDetails 
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/xrltest1/tomcat/dumpfile/heap.bin  
-Xloggc:/home/xrltest1/tomcat/logs/gc.log"

#作者添加的环境申明，如果一台服务器中有多台tomcat要使用不同版本的JVM，就可以直接这这边添加JRE_HOME，
#不需要再/etc/profile.d中再配置JRE_HOME环境变量

# OS specific support.  $var _must_ be set to either true or false.
#此处语句判断操作系统，同时对操作系统支持
#os400是 IBM的AIX
#darwin是MacOSX 操作环境的操作系统成份
#Darwin是windows平台上运行的类UNIX模拟环境
cygwin=false
os400=false
darwin=false
case "`uname`" in
CYGWIN*) cygwin=true;;
OS400*) os400=true;;
Darwin*) darwin=true;;
esac
# resolve links - $0 may be a softlink
#此处的RPG抓取的是文件名，因为可能是符号链接，所以下面循环语句的作用就是找到文件真实源路径
PRG="$0"
while [ -h "$PRG" ]; do
  ls=`ls -ld "$PRG"`
  link=`expr "$ls" : '.*-> \(.*\)$'`
  if expr "$link" : '/.*' > /dev/null; then
    PRG="$link"
  else
    PRG=`dirname "$PRG"`/"$link"
  fi
done
#获取脚本目录真实目录地址
# Get standard environment variables
PRGDIR=`dirname "$PRG"`
# Only set CATALINA_HOME if not already set
[ -z "$CATALINA_HOME" ] && CATALINA_HOME=`cd "$PRGDIR/.." >/dev/null; pwd`
# Copy CATALINA_BASE from CATALINA_HOME if not already set
[ -z "$CATALINA_BASE" ] && CATALINA_BASE="$CATALINA_HOME"
#上面两个语句判断变量$CATALINA_HOME和$CATALINA_BASE是否存在，不存在则给予附值
#CATALINA_BASE="$CATALINA_HOME"
# Ensure that any user defined CLASSPATH variables are not used on startup,
# but allow them to be specified in setenv.sh, in rare case when it is needed.
CLASSPATH=
#test –r File 文件存在并且可读
if [ -r "$CATALINA_BASE/bin/setenv.sh" ]; then
  . "$CATALINA_BASE/bin/setenv.sh"
elif [ -r "$CATALINA_HOME/bin/setenv.sh" ]; then
  . "$CATALINA_HOME/bin/setenv.sh"
fi
#默认的tomcat的bin目录下没有这个文件，可以自行编写setenv.sh这个文件设定环境变量
# For Cygwin, ensure paths are in UNIX format before anything is touched
if $cygwin; then
  [ -n "$JAVA_HOME" ] && JAVA_HOME=`cygpath --unix "$JAVA_HOME"`
  [ -n "$JRE_HOME" ] && JRE_HOME=`cygpath --unix "$JRE_HOME"`
  [ -n "$CATALINA_HOME" ] && CATALINA_HOME=`cygpath --unix "$CATALINA_HOME"`
  [ -n "$CATALINA_BASE" ] && CATALINA_BASE=`cygpath --unix "$CATALINA_BASE"`
  [ -n "$CLASSPATH" ] && CLASSPATH=`cygpath --path --unix "$CLASSPATH"`
fi
# For OS400
if $os400; then
  # Set job priority to standard for interactive (interactive - 6) by using
  # the interactive priority - 6, the helper threads that respond to requests
  # will be running at the same priority as interactive jobs.
  COMMAND='chgjob job('$JOBNAME') runpty(6)'
  system $COMMAND
  # Enable multi threading
  export QIBM_MULTI_THREADED=Y
fi
# Get standard Java environment variables
if $os400; then
  # -r will Only work on the os400 if the files are:
  # 1. owned by the user
  # 2. owned by the PRIMARY group of the user
  # this will not work if the user belongs in secondary groups
  BASEDIR="$CATALINA_HOME"
  . "$CATALINA_HOME"/bin/setclasspath.sh
else
  #这点一定要注意了，本脚本中没有赋值却突然冒出的变量
  #都是在setclasspath.sh这个脚本中执行赋值的。比如$_RUNJAVA
  #作者会在下一篇文章中，分析setclasspath.sh这个脚本
  if [ -r "$CATALINA_HOME"/bin/setclasspath.sh ]; then
    BASEDIR="$CATALINA_HOME"
    . "$CATALINA_HOME"/bin/setclasspath.sh
  else
    echo "Cannot find $CATALINA_HOME/bin/setclasspath.sh"
    echo "This file is needed to run this program"
    exit 1
  fi
fi
#以上是出现在其他操作环境下的脚本的可用性设置，因默认linux系统，上面就不做解读了
if [ -z "$CATALINA_BASE" ] ; then
  CATALINA_BASE="$CATALINA_HOME"
fi
#将变量赋值
# Add tomcat-juli.jar and bootstrap.jar to classpath
# tomcat-juli.jar can be over-ridden per instance
if [ ! -z "$CLASSPATH" ] ; then
  CLASSPATH="$CLASSPATH":
fi
#虽然前面已将做出CATALINA_BASE="$CATALINA_HOME"的语句
#此处还是添加了判断，增强了代码的健壮性
#添加变量$CLASSPATH的值
if [ "$CATALINA_BASE" != "$CATALINA_HOME" ] && [ -r "$CATALINA_BASE/bin/tomcat-juli.jar" ] ; then
  CLASSPATH="$CLASSPATH""$CATALINA_BASE"/bin/tomcat-juli.jar:"$CATALINA_HOME"/bin/bootstrap.jar
else
  CLASSPATH="$CLASSPATH""$CATALINA_HOME"/bin/bootstrap.jar
fi
#确认日志路径$CATALINA_OUT
#这部分主要判断这些变量是否预定义，有就以预定义为主，没有就设置为默认格式
if [ -z "$CATALINA_OUT" ] ; then
  CATALINA_OUT="$CATALINA_BASE"/logs/catalina.out
fi
if [ -z "$CATALINA_TMPDIR" ] ; then
  # Define the java.io.tmpdir to use for Catalina
  CATALINA_TMPDIR="$CATALINA_BASE"/temp
fi
# Bugzilla 37848: When no TTY is available, don't output to console
#获取当前shell运行的终端设备
have_tty=0
if [ "`tty`" != "not a tty" ]; then
    have_tty=1
fi
# For Cygwin, switch paths to Windows format before running java
if $cygwin; then
  JAVA_HOME=`cygpath --absolute --windows "$JAVA_HOME"`
  JRE_HOME=`cygpath --absolute --windows "$JRE_HOME"`
  CATALINA_HOME=`cygpath --absolute --windows "$CATALINA_HOME"`
  CATALINA_BASE=`cygpath --absolute --windows "$CATALINA_BASE"`
  CATALINA_TMPDIR=`cygpath --absolute --windows "$CATALINA_TMPDIR"`
  CLASSPATH=`cygpath --path --windows "$CLASSPATH"`
  JAVA_ENDORSED_DIRS=`cygpath --path --windows "$JAVA_ENDORSED_DIRS"`
fi
# Set juli LogManager config file if it is present and an override has not been issued
#确认$LOGGING_CONFIG变量
if [ -z "$LOGGING_CONFIG" ]; then
  if [ -r "$CATALINA_BASE"/conf/logging.properties ]; then
    LOGGING_CONFIG="-Djava.util.logging.config.file=$CATALINA_BASE/conf/logging.properties"
  else
    # Bugzilla 45585
    LOGGING_CONFIG="-Dnop"
  fi
fi
#确认$LOGGING_MANAGER变量
if [ -z "$LOGGING_MANAGER" ]; then
  JAVA_OPTS="$JAVA_OPTS -Djava.util.logging.manager=org.apache.juli.ClassLoaderLogManager"
else
  JAVA_OPTS="$JAVA_OPTS $LOGGING_MANAGER"
fi
# ----- Execute The Requested Command -----------------------------------------
# Bugzilla 37848: only output this if we have a TTY
#正常情况下have_tty=1
if [ $have_tty -eq 1 ]; then
  echo "Using CATALINA_BASE:   $CATALINA_BASE"
  echo "Using CATALINA_HOME:   $CATALINA_HOME"
  echo "Using CATALINA_TMPDIR: $CATALINA_TMPDIR"
  if [ "$1" = "debug" ] ; then
     echo "Using JAVA_HOME:       $JAVA_HOME"
  else
     echo "Using JRE_HOME:        $JRE_HOME"
  fi
      echo "Using CLASSPATH:       $CLASSPATH"
  #以下这句判断设置的$CATALINA_PID变量如果不存在，则显示"Using CATALINA_PID:    $CATALINA_PID"，如果存在则不显示
  if [ ! -z "$CATALINA_PID" ]; then
    echo "Using CATALINA_PID:    $CATALINA_PID"
  fi
fi
#以上就是在启动tomcat是输出的环境变量信息
#
#获取第一次参数，jpda在后面的说明为：jpda start        Start Catalina under JPDA debugger
if [ "$1" = "jpda" ] ; then
  if [ -z "$JPDA_TRANSPORT" ]; then
JPDA_TRANSPORT="dt_socket"
  fi
  if [ -z "$JPDA_ADDRESS" ]; then
JPDA_ADDRESS="8000"
  fi
  if [ -z "$JPDA_SUSPEND" ]; then
JPDA_SUSPEND="n"
  fi
  if [ -z "$JPDA_OPTS" ]; then
JPDA_OPTS="-agentlib:jdwp=transport=$JPDA_TRANSPORT,address=$JPDA_ADDRESS,server=y,suspend=$JPDA_SUSPEND"
  fi
  CATALINA_OPTS="$CATALINA_OPTS $JPDA_OPTS"
  shift
fi
#JPDA 模式是开启远程debug模式，端口就是JPDA_ADDRESS,生产环境用不到，不去深入
#这个是debug模式
#值得注意的是变量$_RUNJDB，居然在全文没有找到赋值的语句。
#从这边开始就注意了，里面的if-fi判断很多，一定要先调好格式再看
if [ "$1" = "debug" ] ; then
if $os400; then
echo "Debug command not available on OS400"
exit 1
else
shift
if [ "$1" = "-security" ] ; then
  if [ $have_tty -eq 1 ]; then
echo "Using Security Manager"
  fi
  shift
  exec "$_RUNJDB" "$LOGGING_CONFIG" $JAVA_OPTS $CATALINA_OPTS \
-Djava.endorsed.dirs="$JAVA_ENDORSED_DIRS" -classpath "$CLASSPATH" \
-sourcepath "$CATALINA_HOME"/../../java \
-Djava.security.manager \
-Djava.security.policy=="$CATALINA_BASE"/conf/catalina.policy \
-Dcatalina.base="$CATALINA_BASE" \
-Dcatalina.home="$CATALINA_HOME" \
-Djava.io.tmpdir="$CATALINA_TMPDIR" \
org.apache.catalina.startup.Bootstrap "$@" start
else
  exec "$_RUNJDB" "$LOGGING_CONFIG" $JAVA_OPTS $CATALINA_OPTS \
-Djava.endorsed.dirs="$JAVA_ENDORSED_DIRS" -classpath "$CLASSPATH" \
-sourcepath "$CATALINA_HOME"/../../java \
-Dcatalina.base="$CATALINA_BASE" \
-Dcatalina.home="$CATALINA_HOME" \
-Djava.io.tmpdir="$CATALINA_TMPDIR" \
org.apache.catalina.startup.Bootstrap "$@" start
fi
    fi
   #上面语句是适配AIX环境的，不做解读
   
#当参数是debug时  
elif [ "$1" = "run" ]; then
shift
#当使用shift命令之后，原来的$2会变成$1，并且原有的$1变得不可用，通过$#命令获得的参数个数也会少1
#这样就可以使用$1获取第二个参数
  if [ "$1" = "-security" ] ; then
if [ $have_tty -eq 1 ]; then
  echo "Using Security Manager"
fi
shift
#作废掉前两个参数
exec "$_RUNJAVA" "$LOGGING_CONFIG" $JAVA_OPTS $CATALINA_OPTS \
  -Djava.endorsed.dirs="$JAVA_ENDORSED_DIRS" -classpath "$CLASSPATH" \
  -Djava.security.manager \
  -Djava.security.policy=="$CATALINA_BASE"/conf/catalina.policy \
  -Dcatalina.base="$CATALINA_BASE" \
  -Dcatalina.home="$CATALINA_HOME" \
  -Djava.io.tmpdir="$CATALINA_TMPDIR" \
  org.apache.catalina.startup.Bootstrap "$@" start
  else
exec "$_RUNJAVA" "$LOGGING_CONFIG" $JAVA_OPTS $CATALINA_OPTS \
  -Djava.endorsed.dirs="$JAVA_ENDORSED_DIRS" -classpath "$CLASSPATH" \
  -Dcatalina.base="$CATALINA_BASE" \
  -Dcatalina.home="$CATALINA_HOME" \
  -Djava.io.tmpdir="$CATALINA_TMPDIR" \
  org.apache.catalina.startup.Bootstrap "$@" start
#这个命令其实就是java命令，指定org.apache.catalina.startup.Bootstrap 这个class文件，$@和"start"作用类似于传参到前面的安格class里
  fi
#正式进入启动的过程啦~
elif [ "$1" = "start" ] ; then
  if [ ! -z "$CATALINA_PID" ]; then
  #test –z 字符串 字符串的长度为零 ,判断这个变量或者文件内有数据
if [ -f "$CATALINA_PID" ]; then
#-f 该『文件名』是否为文件(file)？(常用)
  if [ -s "$CATALINA_PID" ]; then
  #-s 侦测该文件名是否为『非空白文件』？
echo "Existing PID file found during start."
if [ -r "$CATALINA_PID" ]; then
#-r 侦测该文件名是否具有『可读』的属性？
#以上if语句主要判断这个$CATALINA_PID，是否能正常可读
  PID=`cat "$CATALINA_PID"`
  ps -p $PID >/dev/null 2>&1
  if [ $? -eq 0 ] ; then
  #判断这个ＰＩＤ现在有没有被占用，有就输出这个tomcat依旧在运行，退出
  #上面这段语句功能非常好，可以判断出这个PID是否还在运行
echo "Tomcat appears to still be running with PID $PID. Start aborted."
exit 1
  else
echo "Removing/clearing stale PID file."
rm -f "$CATALINA_PID" >/dev/null 2>&1
#删除了这个$CATALINA_PID文件
if [ $? != 0 ]; then
  if [ -w "$CATALINA_PID" ]; then
  #-w 侦测该文件名是否具有『可写』的属性？ 
cat /dev/null > "$CATALINA_PID"
#清空$CATALINA_PID文件
  else
  #如果不具有可写权限，则输出信息，退出
echo "Unable to remove or clear stale PID file. Start aborted."
exit 1
  fi
fi
  fi
else
#如果"$CATALINA_PID"没有可读权限，任然输出信息退出。
  echo "Unable to read PID file. Start aborted."
  exit 1
fi
  else
  #"$CATALINA_PID"是空白文件
rm -f "$CATALINA_PID" >/dev/null 2>&1
#强制删除$CATALINA_PID文件
if [ $? != 0 ]; then
#成功则进行判断，没有读权限则退出脚本
  if [ ! -w "$CATALINA_PID" ]; then
echo "Unable to remove or write to empty PID file. Start aborted."
exit 1
  fi
fi
  fi
fi
fi
#这段语句，主要目的就是清空$CATALINA_PID文件，如果出现不可读写，则输出信息退出
  shift
  #作废掉前面参数，$1将表示第二个参数
  touch "$CATALINA_OUT"
  #创建$CATALINA_OUT变量路径文件
  if [ "$1" = "-security" ] ; then
  #如果第二个参数是-security
if [ $have_tty -eq 1 ]; then
  echo "Using Security Manager"
fi
shift
"$_RUNJAVA" "$LOGGING_CONFIG" $JAVA_OPTS $CATALINA_OPTS \
  -Djava.endorsed.dirs="$JAVA_ENDORSED_DIRS" -classpath "$CLASSPATH" \
  -Djava.security.manager \
  -Djava.security.policy=="$CATALINA_BASE"/conf/catalina.policy \
  -Dcatalina.base="$CATALINA_BASE" \
  -Dcatalina.home="$CATALINA_HOME" \
  -Djava.io.tmpdir="$CATALINA_TMPDIR" \
  org.apache.catalina.startup.Bootstrap "$@" start \
  >> "$CATALINA_OUT" 2>&1 &
  else
  #我们平时执行启动tomcat核心就是这一句了
  #
"$_RUNJAVA" "$LOGGING_CONFIG" $JAVA_OPTS $CATALINA_OPTS \
  -Djava.endorsed.dirs="$JAVA_ENDORSED_DIRS" -classpath "$CLASSPATH" \
  -Dcatalina.base="$CATALINA_BASE" \
  -Dcatalina.home="$CATALINA_HOME" \
  -Djava.io.tmpdir="$CATALINA_TMPDIR" \
  org.apache.catalina.startup.Bootstrap "$@" start \
  >> "$CATALINA_OUT" 2>&1 &
#从&可以看出启动的命令在后台启动
  fi
if [ ! -z "$CATALINA_PID" ]; then
#判断CATALINA_PID如果不是空字符，则将Shell最后运行的后台Process的PID 传给$CATALINA_PID
echo $! > "$CATALINA_PID"
#在使用命令运行进程至后台时，可以使用$!抓取前面启动运行在后台进程的进程号
fi
fi
#下面开始了tomcat停止模块了
elif [ "$1" = "stop" ] ; then
  shift
  SLEEP=5
    
  if [ ! -z "$1" ]; then
    echo $1 | grep "[^0-9]" >/dev/null 2>&1
    if [ $? -gt 0 ]; then
      SLEEP=$1
      shift
    fi
  fi
  #上面语句主要是判断停止语句执行到此时，设定几秒后再执行停止语句
  #用来配合stop n 
   
  FORCE=0
  if [ "$1" = "-force" ]; then
    shift
    FORCE=1
  fi
  #如果参数中使用了-force，则FORCE=1
   
  if [ ! -z "$CATALINA_PID" ]; then
  #$CATALINA_PID文件不是非空
    if [ -f "$CATALINA_PID" ]; then
      if [ -s "$CATALINA_PID" ]; then
        kill -0 `cat "$CATALINA_PID"` >/dev/null 2>&1
#kill -0 pid 不发送任何信号，但是系统会进行错误检查。
        if [ $? -gt 0 ]; then
          echo "PID file found but no matching process was found. Stop aborted."
          exit 1
        fi
      else
        echo "PID file is empty and has been ignored."
      fi
    else
      echo "\$CATALINA_PID was set but the specified file does not exist. Is Tomcat running? Stop aborted."
      exit 1
    fi
  fi
  #以上脚本是进行停止命令检错的，如果可能停止不了，则可以直接报错
   
  "$_RUNJAVA" $JAVA_OPTS \
    -Djava.endorsed.dirs="$JAVA_ENDORSED_DIRS" -classpath "$CLASSPATH" \
    -Dcatalina.base="$CATALINA_BASE" \
    -Dcatalina.home="$CATALINA_HOME" \
    -Djava.io.tmpdir="$CATALINA_TMPDIR" \
    org.apache.catalina.startup.Bootstrap "$@" stop
#这个就是停止脚本的核心命令了
   
  if [ ! -z "$CATALINA_PID" ]; then
    if [ -f "$CATALINA_PID" ]; then
      while [ $SLEEP -ge 0 ]; do
        kill -0 `cat "$CATALINA_PID"` >/dev/null 2>&1
        if [ $? -gt 0 ]; then
          rm -f "$CATALINA_PID" >/dev/null 2>&1
          if [ $? != 0 ]; then
            if [ -w "$CATALINA_PID" ]; then
              cat /dev/null > "$CATALINA_PID"
            else
              echo "Tomcat stopped but the PID file could not be removed or cleared."
            fi
          fi
          break
        fi
        if [ $SLEEP -gt 0 ]; then
          sleep 1
        fi
        if [ $SLEEP -eq 0 ]; then
          if [ $FORCE -eq 0 ]; then
            echo "Tomcat did not stop in time. PID file was not removed."
          fi
        fi
        SLEEP=`expr $SLEEP - 1 `
      done
    fi
  fi
  #上段语句主要是清空$CATALINA_PID
   
  #值得注意的是，生产环境偶尔不加-force选项，tomcat有时无法停止下来
  #如果参数带"-force" ，则强制kill掉tomcat
  if [ $FORCE -eq 1 ]; then
    if [ -z "$CATALINA_PID" ]; then
      echo "Kill failed: \$CATALINA_PID not set"
    else
      if [ -f "$CATALINA_PID" ]; then
        PID=`cat "$CATALINA_PID"`
        echo "Killing Tomcat with the PID: $PID"
        kill -9 $PID
#强制执行的核心命令
        rm -f "$CATALINA_PID" >/dev/null 2>&1
        if [ $? != 0 ]; then
          echo "Tomcat was killed but the PID file could not be removed."
        fi
      fi
    fi
  fi
#查看版本参数
elif [ "$1" = "version" ] ; then
    "$_RUNJAVA"   \
      -classpath "$CATALINA_HOME/lib/catalina.jar" \
      org.apache.catalina.util.ServerInfo
else
  echo "Usage: catalina.sh ( commands ... )"
  echo "commands:"
  if $os400; then
    echo "  debug             Start Catalina in a debugger (not available on OS400)"
    echo "  debug -security   Debug Catalina with a security manager (not available on OS400)"
  else
    echo "  debug             Start Catalina in a debugger"
    echo "  debug -security   Debug Catalina with a security manager"
  fi
  echo "  jpda start        Start Catalina under JPDA debugger"
  echo "  run               Start Catalina in the current window"
  echo "  run -security     Start in the current window with security manager"
  echo "  start             Start Catalina in a separate window"
  echo "  start -security   Start in a separate window with security manager"
  echo "  stop              Stop Catalina, waiting up to 5 seconds for the process to end"
  echo "  stop n            Stop Catalina, waiting up to n seconds for the process to end"
  echo "  stop -force       Stop Catalina, wait up to 5 seconds and then use kill -KILL if still running"
  echo "  stop n -force     Stop Catalina, wait up to n seconds and then use kill -KILL if still running"
  echo "  version           What version of tomcat are you running?"
  echo "Note: Waiting for the process to end and use of the -force option require that \$CATALINA_PID is defined"
  exit 1
fi