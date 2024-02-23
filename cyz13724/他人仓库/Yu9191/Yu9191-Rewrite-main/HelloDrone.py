#!/usr/bin/env python
# -*- coding: utf-8 -*-

# 这是一个 Shebang 行，它告诉系统使用哪个解释器来执行这个脚本。
# 在这里，/usr/bin/env python 表示使用系统中的 Python 解释器来运行这个脚本。

# 这是一个文件编码的声明，指定了 Python 源代码文件中的字符编码为 UTF-8，
# 以支持在源代码中使用中文等非 ASCII 字符。

import urllib2

# 创建一个请求对象，指定要访问的URL（这里是百度的网址）
request = urllib2.Request('http://www.baidu.com')

# 使用urllib2.urlopen()函数发送请求，并返回一个响应对象response，其中包含从百度网页返回的数据
response = urllib2.urlopen(request)

# 输出响应对象的内容，response.read()是一个方法，用于读取响应的内容
print response.read()
