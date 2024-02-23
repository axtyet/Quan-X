#使用请删掉注释
# 导入所需模块
import urllib
import urllib2
import cookielib
import lxml.html as HTML

class Weibo(object):
    def __init__(self, username, password):
        # 创建一个 cookie jar 来管理 cookie
        self.cookie = cookielib.LWPCookieJar()
        # 创建一个 cookie processor 来处理 cookie
        self.cookie_processor = urllib2.HTTPCookieProcessor(self.cookie)
        # 创建一个 opener 来打开网页
        self.opener = urllib2.build_opener(self.cookie_processor)
        # 将 opener 安装为全局 opener
        urllib2.install_opener(self.opener)

        # 设置请求头信息
        self.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20100101 Firefox/14.0.1',
                        'Referer': '', 'Content-Type': 'application/x-www-form-urlencoded'}

        self.username = username
        self.password = password

    def get_rand(self, url):
        # 设置请求头信息
        headers = {'User-Agent': 'Mozilla/5.0 (Windows;U;Windows NT 5.1;zh-CN;rv:1.9.2.9)Gecko/20100824 Firefox/3.6.9',
                   'Referer': ''}
        # 发送请求获取登录页面
        req = urllib2.Request(url, urllib.urlencode({}), headers)
        resp = urllib2.urlopen(req)
        login_page = resp.read()
        # 使用 lxml 库解析登录页面，获取 rand、passwd 和 vk
        rand = HTML.fromstring(login_page).xpath("//form/@action")[0]
        passwd = HTML.fromstring(login_page).xpath("//input[@type='password']/@name")[0]
        vk = HTML.fromstring(login_page).xpath("//input[@name='vk']/@value")[0]
        return rand, passwd, vk

    def login(self):
        # 设置登录地址
        login_url = 'http://login.weibo.cn/login/'
        # 获取登录所需的 rand、passwd 和 vk
        rand, passwd, vk = self.get_rand(login_url)

        # 构造登录数据
        login_data = urllib.urlencode({
            'mobile': self.username,
            passwd: self.password,
            'remember': 'on',
            'backURL': 'http://weibo.cn/',
            'backTitle': '新浪微博',
            'vk': vk,
            'submit': '登录',
            'encoding': 'utf-8'
        })

        # 构造登录请求地址
        url = login_url + rand
        # 发送登录请求
        req = urllib2.Request(url, login_data, self.headers)
        result = urllib2.urlopen(req)
        # 打印登录结果
        print result.read()

# 填入你的新浪微博用户名和密码
username = ''
password = ''

# 创建 Weibo 类的实例并执行登录
test = Weibo(username, password)
test.login()
