package com.github.smallbug.tool.jdk.annotation;

public @interface Param {
	String name() default "";

	String value() default "";

	String description() default "";
}
