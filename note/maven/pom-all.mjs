<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<groupId>cn.smallbug</groupId>
	<artifactId>operate</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<packaging>war</packaging>
	<name>operate</name>
	<properties>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<hibernate.version>4.2.16.Final</hibernate.version>
		<hibernate-validator.version>5.0.3.Final</hibernate-validator.version>
		<struts2.version>2.3.20</struts2.version>
		<shiro.version>1.2.4</shiro.version>
		<lucene.version>4.10.4</lucene.version>
		<poi.version>3.12</poi.version>
		<solr.version>4.10.4</solr.version>
		<activiti.version>5.17.0</activiti.version>
		<spring.security.version>3.2.8.RELEASE</spring.security.version>
		<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
		<spring.version>4.1.8.RELEASE</spring.version>
		<json.version>2.2.1</json.version>
	</properties>

	<repositories>
		<repository>
			<snapshots>
				<enabled>true</enabled>
			</snapshots>
			<id>public</id>
			<name>Public Repositories</name>
			<url>http://192.168.94.135:8081/nexus/content/groups/public/</url>
		</repository>
	</repositories>

	<pluginRepositories>
		<pluginRepository>
			<id>public</id>
			<name>Public Repositories</name>
			<url>http://192.168.94.135:8081/nexus/content/groups/public/</url>
		</pluginRepository>
	</pluginRepositories>
	<dependencies>
		<dependency>
			<groupId>junit</groupId>
			<artifactId>junit</artifactId>
			<version>4.11</version>
			<scope>provide</scope>
		</dependency>

<dependency>
			<groupId>org.wltea</groupId>
			<artifactId>analyzer</artifactId>
			<version>1</version>
			<scope>system</scope>
			<systemPath>${basedir}\lib\IKAnalyzer2012FF_u1.jar</systemPath>
		</dependency>
		
		<!--Apache begin -->
		<dependency>
			<groupId>commons-io</groupId>
			<artifactId>commons-io</artifactId>
			<version>2.4</version>
		</dependency>
		<dependency>
			<groupId>commons-lang</groupId>
			<artifactId>commons-lang</artifactId>
			<version>2.6</version>
		</dependency>
		<dependency>
			<groupId>commons-beanutils</groupId>
			<artifactId>commons-beanutils</artifactId>
			<version>1.9.2</version>
		</dependency>
		<dependency>
			<groupId>commons-fileupload</groupId>
			<artifactId>commons-fileupload</artifactId>
			<version>1.2.2</version>
		</dependency>
		<dependency>
			<groupId>commons-logging</groupId>
			<artifactId>commons-logging</artifactId>
			<version>1.2</version>
		</dependency>
		<dependency>
			<groupId>commons-codec</groupId>
			<artifactId>commons-codec</artifactId>
			<version>1.10</version>
		</dependency>
		<!-- Apache end -->

		<!-- Spring -->
		<dependency>
			<groupId>org.aspectj</groupId>
			<artifactId>aspectjweaver</artifactId>
			<version>1.7.4</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-core</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-beans</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jdbc</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-aspects</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-context-support</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-tx</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-test</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-expression</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-jms</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-messaging</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-orm</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-websocket</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-web</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-oxm</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework</groupId>
			<artifactId>spring-webmvc</artifactId>
			<version>${spring.version}</version>
		</dependency>
		<!-- <dependency> <groupId>org.springframework</groupId> <artifactId>spring-asm</artifactId> 
			<version>3.1.4.RELEASE</version> </dependency> -->
		<!-- Spring end -->


		<!-- JSON -->
		<dependency>
			<groupId>com.fasterxml.jackson.core</groupId>
			<artifactId>jackson-databind</artifactId>
			<version>${json.version}</version>
		</dependency>
		<!-- JSON end -->


		<!-- sql driver begin -->
		<dependency>
			<groupId>mysql</groupId>
			<artifactId>mysql-connector-java</artifactId>
			<version>5.1.36</version>
		</dependency>
		<!-- sql driver end -->

		<!-- log begin -->
		<dependency>
			<groupId>log4j</groupId>
			<artifactId>log4j</artifactId>
			<version>1.2.17</version>
		</dependency>
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-log4j12</artifactId>
			<version>1.7.9</version>
		</dependency>
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>slf4j-api</artifactId>
			<version>1.7.9</version>
		</dependency>
		<dependency>
			<groupId>org.slf4j</groupId>
			<artifactId>jcl-over-slf4j</artifactId>
			<version>1.7.9</version>
		</dependency>
		<!-- log end -->

		<dependency>
			<groupId>javax.servlet</groupId>
			<artifactId>jstl</artifactId>
			<version>1.2</version>
		</dependency>

		<!-- httpClient begin -->
		<dependency>
			<groupId>org.apache.httpcomponents</groupId>
			<artifactId>httpclient</artifactId>
			<version>4.4.1</version>
		</dependency>
		<!-- httpClient end -->

		<!-- simpleImage begin -->
		<dependency>
			<groupId>com.sun.media</groupId>
			<artifactId>jai-codec</artifactId>
			<version>1.1.3</version>
		</dependency>
		<!-- SimpleImage end -->

		<!-- hibernate begin -->
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-core</artifactId>
			<version>${hibernate.version}</version>
		</dependency>
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-ehcache</artifactId>
			<version>${hibernate.version}</version>
		</dependency>
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-entitymanager</artifactId>
			<version>${hibernate.version}</version>
		</dependency>
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-c3p0</artifactId>
			<version>${hibernate.version}</version>
		</dependency>
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-validator</artifactId>
			<version>${hibernate-validator.version}</version>
		</dependency>
		<dependency>
			<groupId>org.hibernate</groupId>
			<artifactId>hibernate-validator-annotation-processor</artifactId>
			<version>${hibernate-validator.version}</version>
		</dependency>
		<dependency>
			<groupId>javax.transaction</groupId>
			<artifactId>jta</artifactId>
			<version>1.1</version>
		</dependency>
		<!-- hibernate end -->

		<!-- struts2 begin -->
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-core</artifactId>
			<version>${struts2.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-json-plugin</artifactId>
			<version>${struts2.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-junit-plugin</artifactId>
			<version>${struts2.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.struts</groupId>
			<artifactId>struts2-spring-plugin</artifactId>
			<version>${struts2.version}</version>
		</dependency>
		<!-- struts2 end -->

		<!-- lucene begin -->
		<dependency>
			<groupId>org.apache.lucene</groupId>
			<artifactId>lucene-core</artifactId>
			<version>${lucene.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.lucene</groupId>
			<artifactId>lucene-highlighter</artifactId>
			<version>${lucene.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.lucene</groupId>
			<artifactId>lucene-analyzers-common</artifactId>
			<version>${lucene.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.lucene</groupId>
			<artifactId>lucene-queryparser</artifactId>
			<version>${lucene.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.lucene</groupId>
			<artifactId>lucene-memory</artifactId>
			<version>${lucene.version}</version>
		</dependency>
		<!-- lucene end -->

		<!-- solr begin -->
		<!-- <dependency> <groupId>org.apache.solr</groupId> <artifactId>solr-core</artifactId> 
			<version>${solr.version}</version> </dependency> -->
		<!-- solr end -->

		<!-- poi begin -->
		<dependency>
			<groupId>org.apache.poi</groupId>
			<artifactId>poi</artifactId>
			<version>${poi.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.poi</groupId>
			<artifactId>poi-ooxml</artifactId>
			<version>${poi.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.poi</groupId>
			<artifactId>poi-scratchpad</artifactId>
			<version>${poi.version}</version>
		</dependency>
		<!-- poi end -->

		<!-- activiti begin -->
		<!-- activiti -->
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-engine</artifactId>
			<version>${activiti.version}</version>
		</dependency>
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-spring</artifactId>
			<version>${activiti.version}</version>
		</dependency>
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-json-converter</artifactId>
			<version>${activiti.version}</version>
		</dependency>

		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-explorer</artifactId>
			<version>${activiti.version}</version>
			<exclusions>
				<exclusion>
					<artifactId>vaadin</artifactId>
					<groupId>com.vaadin</groupId>
				</exclusion>
				<exclusion>
					<artifactId>dcharts-widget</artifactId>
					<groupId>org.vaadin.addons</groupId>
				</exclusion>
				<exclusion>
					<artifactId>activiti-simple-workflow</artifactId>
					<groupId>org.activiti</groupId>
				</exclusion>
			</exclusions>
		</dependency>
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-modeler</artifactId>
			<version>${activiti.version}</version>
		</dependency>
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-rest</artifactId>
			<version>${activiti.version}</version>
		</dependency>
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-diagram-rest</artifactId>
			<version>${activiti.version}</version>
		</dependency>
		<dependency>
			<groupId>org.activiti</groupId>
			<artifactId>activiti-cxf</artifactId>
			<version>${activiti.version}</version>
		</dependency>
		<dependency>
			<groupId>org.jodd</groupId>
			<artifactId>jodd</artifactId>
			<version>3.3.2</version>
		</dependency>
		<dependency>
			<groupId>joda-time</groupId>
			<artifactId>joda-time</artifactId>
			<version>2.1</version>
		</dependency>
		<!-- 支持activiti缓存 -->
		<dependency>
			<groupId>org.infinispan</groupId>
			<artifactId>infinispan-core</artifactId>
			<version>5.1.7.Final</version>
		</dependency>
		<!-- activiti end -->

		<!-- cxf的http支持 -->
		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-api</artifactId>
			<version>2.7.6</version>
		</dependency>
		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-rt-frontend-jaxws</artifactId>
			<version>2.7.6</version>
		</dependency>
		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-rt-transports-http-jetty</artifactId>
			<version>2.7.6</version>
			<scope>test</scope>
		</dependency>
		<dependency>
			<groupId>org.apache.cxf</groupId>
			<artifactId>cxf-rt-transports-http</artifactId>
			<version>2.7.6</version>
		</dependency>

		<!-- Jackson JSON Mapper -->
		<!-- SpringMVC的@ResponseBody需要使用 -->
		<dependency>
			<groupId>org.codehaus.jackson</groupId>
			<artifactId>jackson-mapper-asl</artifactId>
			<version>1.9.7</version>
		</dependency>

		<!-- jxl begin -->
		<dependency>
			<groupId>net.sourceforge.jexcelapi</groupId>
			<artifactId>jxl</artifactId>
			<version>2.6.10</version>
		</dependency>
		<!-- jxl end -->

		<!-- charts begin -->
		<dependency>
			<groupId>jfree</groupId>
			<artifactId>jfreechart</artifactId>
			<version>1.0.13</version>
		</dependency>
		<dependency>
			<groupId>com.github.abel533</groupId>
			<artifactId>ECharts</artifactId>
			<version>2.2.6</version>
		</dependency>
		<!-- charts end -->

		<!-- mybatis begin -->
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis</artifactId>
			<version>3.2.8</version>
		</dependency>
		<dependency>
			<groupId>org.mybatis</groupId>
			<artifactId>mybatis-spring</artifactId>
			<version>1.2.2</version>
		</dependency>
		<dependency>
			<groupId>org.mybatis.generator</groupId>
			<artifactId>mybatis-generator-core</artifactId>
			<version>1.3.2</version>
		</dependency>
		<dependency>
			<groupId>cglib</groupId>
			<artifactId>cglib</artifactId>
			<version>3.1</version>
		</dependency>
		<!-- mybaties end -->

		<!-- DOM 解析 -->
		<dependency>
			<groupId>jaxen</groupId>
			<artifactId>jaxen</artifactId>
			<version>1.1.6</version>
		</dependency>
		<dependency>
			<groupId>dom4j</groupId>
			<artifactId>dom4j</artifactId>
			<version>1.6.1</version>
		</dependency>
		<!-- DOM 解析 end -->

		<!-- data source begin -->
		<dependency>
			<groupId>commons-dbcp</groupId>
			<artifactId>commons-dbcp</artifactId>
			<version>1.4</version>
		</dependency>
		<dependency>
			<groupId>c3p0</groupId>
			<artifactId>c3p0</artifactId>
			<version>0.9.1.2</version>
		</dependency>
		<!-- data source end -->

		<!-- dbutils begin -->
		<dependency>
			<groupId>commons-dbutils</groupId>
			<artifactId>commons-dbutils</artifactId>
			<version>1.6</version>
		</dependency>
		<!-- dbutils end -->

		<!-- shiro begin -->
		<dependency>
			<groupId>org.apache.shiro</groupId>
			<artifactId>shiro-spring</artifactId>
			<version>${shiro.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.shiro</groupId>
			<artifactId>shiro-ehcache</artifactId>
			<version>${shiro.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.shiro</groupId>
			<artifactId>shiro-all</artifactId>
			<version>${shiro.version}</version>
		</dependency>
		<dependency>
			<groupId>org.apache.shiro</groupId>
			<artifactId>shiro-aspectj</artifactId>
			<version>${shiro.version}</version>
		</dependency>
		<!-- shiro end -->

		<!-- jsoup begin -->
		<dependency>
			<groupId>org.jsoup</groupId>
			<artifactId>jsoup</artifactId>
			<version>1.7.3</version>
		</dependency>
		<!-- jsoup end -->

		<!-- Spring Security -->
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-core</artifactId>
			<version>${spring.security.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-web</artifactId>
			<version>${spring.security.version}</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.security</groupId>
			<artifactId>spring-security-config</artifactId>
			<version>${spring.security.version}</version>
		</dependency>
		<dependency>
			<groupId>javax.xml.ws</groupId>
			<artifactId>jaxws-api</artifactId>
			<version>2.2.11</version>
		</dependency>
		<dependency>
			<groupId>jaxen</groupId>
			<artifactId>jaxen</artifactId>
			<version>1.1.6</version>
		</dependency>
	</dependencies>

	<!-- deploy -->
	<build>
		<plugins>
			<plugin>
				<groupId>org.apache.tomcat.maven</groupId>
				<artifactId>tomcat7-maven-plugin</artifactId>
				<version>2.2</version>
				<configuration>
					<url>http://192.168.88.132:8080/manager/text</url>
					<!-- <path>/</path> -->
					<server>tomcat</server>
					<username>tomcat</username>
					<password>smallbug</password>
				</configuration>
			</plugin>
		</plugins>
	</build>
	
</project>