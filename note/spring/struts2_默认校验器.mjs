在 xwork-2.0.4.jar 包中，请读者在 \com\opensymphony\xwork2\validator\validators 路径下找一个名字为“ default.xml ”的 xml 文件。在该文件中有所有 Struts2 自带的输入校验器定义。具体代码如下：
[html] view plaincopy
<!---------文件名：default.xml-------->      
<validators>     
<validator name="required"    
class="com.opensymphony.xwork2.validator.validators.RequiredFieldValidator"/>     
<validator name="requiredstring"    
class="com.opensymphony.xwork2.validator.validators.RequiredStringValidator"/>     
<validator name="int"    
class="com.opensymphony.xwork2.validator.validators.IntRangeFieldValidator"/>     
<validator name="double"    
class="com.opensymphony.xwork2.validator.validators.DoubleRangeFieldValidator"/>     
<validator name="date"    
class="com.opensymphony.xwork2.validator.validators.DateRangeFieldValidator"/>     
<validator name="expression"    
class="com.opensymphony.xwork2.validator.validators.ExpressionValidator"/>     
<validator name="fieldexpression"    
class="com.opensymphony.xwork2.validator.validators.FieldExpressionValidator"/>     
<validator name="email"    
class="com.opensymphony.xwork2.validator.validators.EmailValidator"/>     
<validator name="url"    
class="com.opensymphony.xwork2.validator.validators.URLValidator"/>     
<validator name="visitor"    
class="com.opensymphony.xwork2.validator.validators.VisitorFieldValidator"/>     
<validator name="conversion"    
class="com.opensymphony.xwork2.validator.validators.ConversionErrorFieldValidator"/>     
<validator name="stringlength"    
class="com.opensymphony.xwork2.validator.validators.StringLengthFieldValidator"/>     
<validator name="regex"    
class="com.opensymphony.xwork2.validator.validators.RegexFieldValidator"/>     
</validators>    
以上代码是所有 Struts2 输入校验器的定义，下面将这些输入校验器（一共有 13 个）的字段和非字段格式的校验形式写在如下，本例中没有程序代码示例，所有输入校验器的应用代码都是笔者自己定义的。当校验文件的取名为ActionClassName-validation.xml时，会对 action中的所有处理方法实施输入验证。如果你只需要对action中的某个action方法实施校验，那么，校验文件的取名应为:ActionClassName-ActionName-validation.xml，其中ActionName为struts.xml中action的名称。
[html] view plaincopy
<!-- 必填校验 -->     
  <!-- 非字段校验 -->     
  <validator type="required">     
      <param name="fidleName">field</param>                      
      <message>请输入数据</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="required">                
          <message>请输入数据</message>     
      </field-validator>     
  </field>     
    
  <!-- 必填字符串校验 -->     
  <!-- 非字段校验 -->     
  <validator type="requiredstring">     
      <param name="fidleName">field</param>     
      <param name="trim">true</param>                     
      <message>请输入数据</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="requiredstring">     
          <param name="trim">true</param>               
          <message>请输入数据</message>     
      </field-validator>     
  </field>     
    
  <!-- 整数校验 -->     
  <!-- 非字段校验 -->     
  <validator type="int">     
      <param name="fidleName">field</param>                      
      <param name="min">1</param>     
      <param name="max">80</param>     
      <message>数字必须在${min}-${max}岁之间</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="int">     
          <param name="min">1</param>     
          <param name="max">80</param>     
          <message>数字必须在${min}-${max}岁之间</message>     
      </field-validator>     
  </field>     
    
  <!-- 浮点校验 -->     
  <!-- 非字段校验 -->     
  <validator type="double">     
      <param name="fidleName">field</param>     
      <param name="minExclusive">0.1</param>     
      <param name="maxExclusive">10.1</param>                
      <message>输入浮点无效</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="double">     
          <param name="minExclusive">0.1</param>     
          <param name="maxExclusive">10.1</param>                
          <message>输入浮点无效</message>     
      </field-validator>     
  </field>     
      
  <!-- 日期校验 -->     
  <!-- 非字段校验 -->     
  <validator type="date">     
      <param name="fidleName">field</param>     
      <param name="min">2009-01-01</param>     
      <param name="max">2019-01-01</param>     
      <message>日期无效</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="date">     
         <param name="min">2009-01-01</param>     
         <param name="max">2019-01-01</param>     
         <message>日期无效</message>     
      </field-validator>     
  </field>     
    
  <!-- 表达式校验 -->     
  <!-- 非字段校验 -->     
  <validator type="expression">     
      <param name="expression">password==repassword</param>     
          <message>两者输入不一致</message>     
  </validator>     
      
  <!-- 字段表达式校验 -->     
  <!-- 非字段校验 -->     
  <validator type="fieldexpression">     
      <param name="expression">password==repassword</param>     
      <message>两者输入不一致</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="fieldexpression">     
          <param name="expression"><![CDATA[#password==#repassword]]></param>     
          <message>两者输入不一致</message>     
      </field-validator>     
  </field>     
    
  <!-- 邮件校验 -->     
  <!-- 非字段校验 -->     
  <validator type="email">     
      <param name="fidleName">field</param>                      
      <message>非法邮件地址</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="email">     
          <message>非法邮件地址</message>     
      </field-validator>     
  </field>     
      
  <!-- 网址校验 -->     
  <!-- 非字段校验 -->     
  <validator type="url">     
      <param name="fidleName">field</param>                  
      <message>无效网址</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="url">                  
          <message>无效网址</message>     
      </field-validator>     
  </field>     
      
  <!-- visitor校验 -->     
  <!-- 非字段校验 -->     
  <validator type="visitor">     
      <param name="fidleName">field</param>     
      <param name="context">fieldContext</param>     
      <param name="appendPrefix">true</param>                  
      <message>输入校验</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="visitor">                 
          <param name="context">fieldContext</param>     
          <param name="appendPrefix">true</param>                  
          <message>输入校验</message>     
      </field-validator>     
  </field>     
      
  <!-- 类型转换校验 -->     
  <!-- 非字段校验 -->     
  <validator type="conversion">     
      <param name="fidleName">field</param>     
      <message>类型转换错误</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="conversion">     
          <message>类型转换错误</message>     
      </field-validator>     
  </field>     
      
  <!-- 字符串长度校验 -->     
  <!-- 非字段校验 -->     
  <validator type="stringlength">     
      <param name="fidleName">field</param>     
      <param name="minLength">1</param>     
      <param name="maxLength">10</param>     
      <param name="trim">true</param>                     
      <message>字符串长度必须为10位</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="stringlength">     
          <param name="minLength">1</param>     
          <param name="maxLength">10</param>     
          <param name="trim">true</param>                  
          <message>字符串长度必须为10位</message>     
      </field-validator>     
  </field>     
      
  <!-- 正则表达式校验 -->     
  <!-- 非字段校验 -->     
  <validator type="regex">     
      <param name="fidleName">field</param>                      
      <param name="expression"><![CDATA[(/^13[13567890](\d{8})$/)]]></param>     
      <message>手机号码必须为数字并且是11位</message>     
  </validator>     
  <!-- 字段校验 -->     
  <field name="field">     
      <field-validator type="regex">     
          <param name="expression"><![CDATA[(/^13[13567890](\d{8})$/)]]></param>     
          <message>手机号码必须为数字并且是11位</message>     
      </field-validator>     
  </field>    

代码解释
（ 1 ）必填校验器 required 是用来判断输入的字段是否为空。如果未输入任何数据则会显示错误信息。
	fieldName 属性是指定校验的字段名。这个属性是所有 Struts2 自带的输入校验器都具有的属性。
	因此介绍其他输入校验器时，笔者略过不谈。但是读者自己要知道该属性是输入校验器共有的。
	该校验器其他标签都和前几章节中有过介绍，笔者也略过不谈。
	
（ 2 ）必填字符串校验器 requiredstring 用来判断输入字段是否是 1 个非空字符串 。
	如果不是也显示错误信息。其中的 trim 属性是在校验之前对字符串进行处理。默认是“ true ”。
	
（ 3 ）整数校验器 int 判断输入的字段数据是在一个整数范围内。 min 属性是最小值， max 是最大值。
	<message> 标签内可用“ ${ 属性名 } ”格式类表示他们具体的值。
	
（ 4 ）浮点校验器 double 是 t 判断输入的字段数据是在 1 个浮点数范围内。 minInclusive 表示这个范围的最小值。 
	max Inclusive 表示这个范围的最大值。还有 minExclusive 和 maxExclusive 两个属性，前者表明在浮点范围之外
	的最小值，后者是在浮点范围之外的最大值。
	注意：以上四个属性如果没有声明，则输入校验不会去检查。
	
（ 5 ）日期校验器 date 判断输入的字段的日期值是否在 1 个日期范围内。 min 是该范围的最小值， 
	max是最大值。他们两个属性也和浮点校验器的四个属性相同，如果没有声明则输入校验不检查。
	
（ 6 ）表达式校验器 expression 只有非字段校验格式。不能在字段校验中声明。它的属性也是 expression。
	如代码所示开发者可以使用 OGNL 表达式来定义校验规则。
	
（ 7 ）字段表达式校验器 fieldexpression 判断字段是否满足一个表达式。如代码所示，
	当用来判断输入的密码和确认密码值是否一致就可以使用该校验器。它的属性 expression 和表达式校验器相同。
	不过它可以用在字段校验中。
	
（ 8 ）邮件校验器 email 来判断输入的字段是 1 个 email 时候是否符合 email 的格式。

（ 9 ）网址校验器 ur l 来判断输入的字段是 1 个网址时候是否符合网址的格式。

（ 10 ） visitor 校验器就是判断集合类型的字段。前面章节有所介绍。这里在重申一下 context 属性是可以应用
	的集合类型中元素对象的别名。 appendPrefix 属性是指定在错误信息中前面是否加上特定前缀。该前缀内容可
	在 <message> 标签中定义。另外这两个属性也是没有声明时候，校验器不会去执行检查。
	
（ 11 ）类型转换校验器 conversion 用来判断输入字段是否进行类型转换。它有 1 个 repopulateField 属性，
	如果为“ true ”表明如果发生类型转换错误，返回到 struts.xml 中指定的 Action 的 input 视图界面时候还是
	否把原来错误的输入内容显示出来。“ false ”则相反。从这也可以看出笔者一直坚持的观点类型转换也属于输入
	校验的一种是有理论依据的。
	
（ 12 ）字符串长度校验器 stringlength 用于判断输入的字符串长度是否是指定的长度范围。其中minLength 是最小
	字符串长度， maxLength 是最大字符串长度。 trim 属性和上述必填字符串校验器requiredstring 中 trim 属性拥有
	相同功能。这三者也是属于不声明则不执行检查的可选属性。
	
（ 13 ）正则表达式校验器 regex 检查字段输入值是否和 1 个正则表达式匹配。 expression 属性中内容就是该正则表达式。
	还有个 caseSensitive 属性，为“ true ”则表明匹配时候对字母大小写敏感。反之则不敏感。如代码所示笔者用了 1 个判断
	输入的值是否是 11 位，全部由数字组成的正则表达式。对于输入手机号码数据的字段，该校验规则是最适用的。