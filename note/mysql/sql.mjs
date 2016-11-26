每一个班的前两名学生
	SELECT a.* FROM stu a WHERE 2 > (SELECT COUNT(*) FROM stu WHERE class = a.class AND score > a.score) ORDER BY class ASC,score DESC




SELECT
		[ALL | DISTINCT | DISTINCTROW ]
		[HIGH_PRIORITY]
		[STRAIGHT_JOIN]
		[SQL_SMALL_RESULT] [SQL_BIG_RESULT] [SQL_BUFFER_RESULT]
		[SQL_CACHE | SQL_NO_CACHE] [SQL_CALC_FOUND_ROWS]
		select_expr, ...
		[INTO OUTFILE 'file_name' export_options | INTO DUMPFILE 'file_name']
[FROM table_references
	[WHERE where_definition]
	[GROUP BY {col_name | expr | position} [ASC | DESC], ... [WITH ROLLUP]]
	[HAVING where_definition]
	[ORDER BY {col_name | expr | position} [ASC | DESC] , ...]
	[LIMIT {[offset,] row_count | row_count OFFSET offset}]
	[PROCEDURE procedure_name(argument_list)]
	[FOR UPDATE | LOCK IN SHARE MODE]
]
