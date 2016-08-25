语法:

后代：>

缩写：nav>ul>li

<nav>
    <ul>
        <li></li>
    </ul>
</nav>
兄弟：+

缩写：div+p+bq

<div></div>
<p></p>
<blockquote></blockquote>
上级：^

缩写：div+div>p>span+em^bq

<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>
缩写：div+div>p>span+em^^bq

<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>
分组：()

缩写：div>(header>ul>li*2>a)+footer>p

<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>
缩写：(div>dl>(dt+dd)*3)+footer>p

<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>
乘法：*

缩写：ul>li*5

<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>
自增符号：$

缩写：ul>li.item$*5

<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>
缩写：h$[title=item$]{Header $}*3

<h1 title="item1">Header 1</h1>
<h2 title="item2">Header 2</h2>
<h3 title="item3">Header 3</h3>
缩写：ul>li.item$$$*5

<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>
缩写：ul>li.item$@-*5

<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>
缩写：ul>li.item$@3*5

<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>
ID和类属性

缩写：#header

<div id="header"></div>
缩写：.title

<div class="title"></div>
缩写：form#search.wide

<form id="search" class="wide"></form>
缩写：p.class1.class2.class3

<p class="class1 class2 class3"></p>
自定义属性

缩写：p[title="Hello world"]

<p title="Hello world"></p>
缩写：td[rowspan=2 colspan=3 title]

<td rowspan="2" colspan="3" title=""></td>
缩写：[a='value1' b="value2"]

<div a="value1" b="value2"></div>
文本：{}

缩写：a{Click me}

<a href="">Click me</a>
缩写：p>{Click }+a{here}+{ to continue}

<p>Click <a href="">here</a> to continue</p>
隐式标签

缩写：.class

<div class="class"></div>
缩写：em>.class

<em><span class="class"></span></em>
缩写：ul>.class

<ul>
    <li class="class"></li>
</ul>
缩写：table>.row>.col

<table>
    <tr class="row">
        <td class="col"></td>
    </tr>
</table>
HTML

所有未知的缩写都会转换成标签，例如，foo → <foo></foo>

缩写：!

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>
缩写：a

<a href=""></a>
缩写：a:link

<a href="http://"></a>
缩写：a:mail

<a href="mailto:"></a>
缩写：abbr

<abbr title=""></abbr>
缩写：acronym

<acronym title=""></acronym>
缩写：base

<base href="" />
缩写：basefont

<basefont />
缩写：br

<br />
缩写：frame

<frame />
缩写：hr

<hr />
缩写：bdo

<bdo dir=""></bdo>
缩写：bdo:r

<bdo dir="rtl"></bdo>
缩写：bdo:l

<bdo dir="ltr"></bdo>
缩写：col

<col />
缩写：link

<link rel="stylesheet" href="" />
缩写：link:css

<link rel="stylesheet" href="style.css" />
缩写：link:print

<link rel="stylesheet" href="print.css" media="print" />
缩写：link:favicon

<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
缩写：link:touch

<link rel="apple-touch-icon" href="favicon.png" />
缩写：link:rss

<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.xml" />
缩写：link:atom

<link rel="alternate" type="application/atom+xml" title="Atom" href="atom.xml" />
缩写：meta

<meta />
缩写：meta:utf

<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
缩写：meta:win

<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />
缩写：meta:vp

<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
缩写：meta:compat

<meta http-equiv="X-UA-Compatible" content="IE=7" />
缩写：style

<style></style>
缩写：script

<script></script>
缩写：script:src

<script src=""></script>
缩写：img

<img src="" alt="" />
缩写：iframe

<iframe src="" frameborder="0"></iframe>
缩写：embed

<embed src="" type="" />
缩写：object

<object data="" type=""></object>
缩写：param

<param name="" value="" />
缩写：map

<map name=""></map>
缩写：area

<area shape="" coords="" href="" alt="" />
缩写：area:d

<area shape="default" href="" alt="" />
缩写：area:c

<area shape="circle" coords="" href="" alt="" />
缩写：area:r

<area shape="rect" coords="" href="" alt="" />
缩写：area:p

<area shape="poly" coords="" href="" alt="" />
缩写：form

<form action=""></form>
缩写：form:get

<form action="" method="get"></form>
缩写：form:post

<form action="" method="post"></form>
缩写：label

<label for=""></label>
缩写：input

<input type="text" />
缩写：inp

<input type="text" name="" id="" />
缩写：input:hidden

别名：input[type=hidden name]

<input type="hidden" name="" />
缩写：input:h

别名：input:hidden

<input type="hidden" name="" />
缩写：input:text, input:t

别名：inp

<input type="text" name="" id="" />
缩写：input:search

别名：inp[type=search]

<input type="search" name="" id="" />
缩写：input:email

别名：inp[type=email]

<input type="email" name="" id="" />
缩写：input:url

别名：inp[type=url]

<input type="url" name="" id="" />
缩写：input:password

别名：inp[type=password]

<input type="password" name="" id="" />
缩写：input:p

别名：input:password

<input type="password" name="" id="" />
缩写：input:datetime

别名：inp[type=datetime]

<input type="datetime" name="" id="" />
缩写：input:date

别名：inp[type=date]

<input type="date" name="" id="" />
缩写：input:datetime-local

别名：inp[type=datetime-local]

<input type="datetime-local" name="" id="" />
缩写：input:month

别名：inp[type=month]

<input type="month" name="" id="" />
缩写：input:week

别名：inp[type=week]

<input type="week" name="" id="" />
缩写：input:time

别名：inp[type=time]

<input type="time" name="" id="" />
缩写：input:number

别名：inp[type=number]

<input type="number" name="" id="" />
缩写：input:color

别名：inp[type=color]

<input type="color" name="" id="" />
缩写：input:checkbox

别名：inp[type=checkbox]

<input type="checkbox" name="" id="" />
缩写：input:c

别名：input:checkbox

<input type="checkbox" name="" id="" />
缩写：input:radio

别名：inp[type=radio]

<input type="radio" name="" id="" />
缩写：input:r

别名：input:radio

<input type="radio" name="" id="" />
缩写：input:range

别名：inp[type=range]

<input type="range" name="" id="" />
缩写：input:file

别名：inp[type=file]

<input type="file" name="" id="" />
缩写：input:f

别名：input:file

<input type="file" name="" id="" />
缩写：input:submit

<input type="submit" value="" />
缩写：input:s

别名：input:submit

<input type="submit" value="" />
缩写：input:image

<input type="image" src="" alt="" />
缩写：input:i

别名：input:image

<input type="image" src="" alt="" />
缩写：input:button

<input type="button" value="" />
缩写：input:b

别名：input:button

<input type="button" value="" />
缩写：isindex

<isindex />
缩写：input:reset

别名：input:button[type=reset]

<input type="reset" value="" />
缩写：select

<select name="" id=""></select>
缩写：option

<option value=""></option>
缩写：textarea

<textarea name="" id="" cols="30" rows="10"></textarea>
缩写：menu:context

别名：menu[type=context]>

<menu type="context"></menu>
缩写：menu:c

别名：menu:context

<menu type="context"></menu>
缩写：menu:toolbar

别名：menu[type=toolbar]>

<menu type="toolbar"></menu>
缩写：menu:t

别名：menu:toolbar

<menu type="toolbar"></menu>
缩写：video

<video src=""></video>
缩写：audio

<audio src=""></audio>
缩写：html:xml

<html xmlns="http://www.w3.org/1999/xhtml"></html>
缩写：keygen

<keygen />
缩写：command

<command />
缩写：bq

别名：blockquote

<blockquote></blockquote>
缩写：acr

别名：acronym

<acronym title=""></acronym>
缩写：fig

别名：figure

<figure></figure>
缩写：figc

别名：figcaption

<figcaption></figcaption>
缩写：ifr

别名：iframe

<iframe src="" frameborder="0"></iframe>
缩写：emb

别名：embed

<embed src="" type="" />
缩写：obj

别名：object

<object data="" type=""></object>
缩写：src

别名：source

<source></source>
缩写：cap

别名：caption

<caption></caption>
缩写：colg

别名：colgroup

<colgroup></colgroup>
缩写：fst, fset

别名：fieldset

<fieldset></fieldset>
缩写：btn

别名：button

<button></button>
缩写：btn:b

别名：button[type=button]

<button type="button"></button>
缩写：btn:r

别名：button[type=reset]

<button type="reset"></button>
缩写：btn:s

别名：button[type=submit]

<button type="submit"></button>
