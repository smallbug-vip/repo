 账号密码：
 
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <user username="tomcat" password="smallbug" roles="manager-gui,manager-script"/>



配置远程监听：

catalina.sh
  # ----- Execute The Requested Command -----------------------------------------


JAVA_OPTS="$JAVA_OPTS -Djava.rmi.server.hostname=192.168.88.132 -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.port=77
58 -Dcom.sun.management.jmxremote.authenticate=true -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.access.fi
le=/opt/tomcat/apache-tomcat-7.0.67/conf/jmxremote.access -Dcom.sun.management.jmxremote.password.file=/opt/tomcat/apache-tomcat-7.0.
67/conf/jmxremote.password"

export JAVA_OPTS


配置NIO模式
 <Connector port=”8080″  
       protocol=”org.apache.coyote.http11.Http11NioProtocol” 
       connectionTimeout=”20000″ 
       redirectPort=”8443″  
       maxThreads=”500″  
       minSpareThreads=”20″ 
       acceptCount=”100″
       disableUploadTimeout=”true”
       enableLookups=”false”  
       URIEncoding=”UTF-8″ />