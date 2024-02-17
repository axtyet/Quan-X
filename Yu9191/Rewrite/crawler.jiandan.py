#使用请删掉注释
import requests
from bs4 import BeautifulSoup
import urllib.request

# 要爬取图片的网站链接
url = 'http://www.jiandan.net'

# 设置请求头，模拟浏览器发送请求
header = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'}

# 发送 GET 请求获取网站的源代码
source_code = requests.get(url, headers=header)
plain_text = source_code.text

# 使用 BeautifulSoup 解析网页内容
Soup = BeautifulSoup(plain_text, "html.parser")

# 存储图片链接的列表
download_links = []

# 保存图片的本地文件夹路径
folder_path = '/Users/Vim/Downloads/download_pic/'

# 遍历网页中的所有 <img> 标签，找到其中的 src 属性（即图片链接），并将链接添加到 download_links 列表中
for pic_tag in Soup.find_all('img'):
    pic_link = pic_tag.get('src')
    download_links.append(pic_link)

# 遍历 download_links 列表中的图片链接，使用 urllib.request.urlretrieve() 方法下载图片到本地
# 以图片链接的最后六位字符作为文件名保存在 folder_path 文件夹中，下载完成后打印 "Done"
for item in download_links:
    urllib.request.urlretrieve(item, folder_path + item[-6:])
    print('Done')
