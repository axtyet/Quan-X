#!SCOPES 是一个包含请求的授权范围（scopes）的列表。在这个代码中，我们将授权范围设置为 'https://www.googleapis.com/auth/analytics.readonly'，这表示我们请求的是只读权限，可以读取 Google Analytics 数据。

KEY_FILE_LOCATION 是一个字符串，表示服务账号的 JSON 密钥文件的路径。服务账号是用于进行服务器到服务器的身份验证，以便访问受保护资源，如 Google Analytics 数据。你需要将该变量的值替换为你自己的服务账号的 JSON 密钥文件的路径。

VIEW_ID 是一个字符串，表示你要查询的 Google Analytics 视图（View）的 ID。视图是你在 Google Analytics 中定义的数据视图，用于查看特定的数据。你需要将该变量的值替换为你自己的 Google Analytics 视图的 ID。

initialize_analyticsreporting() 函数用于初始化一个 Analytics Reporting API V4 服务对象并进行授权。它使用 ServiceAccountCredentials.from_json_keyfile_name() 方法从 JSON 密钥文件中加载服务账号的认证信息，然后构建一个用于进行 Google Analytics API 调用的服务对象。

get_report(analytics) 函数用于查询 Google Analytics 数据并返回响应。它通过调用 analytics.reports().batchGet() 方法来向 Google Analytics API 发送请求。在这个例子中，我们查询的是过去 7 天到今天的网站会话数（sessions）和国家（country）维度的数据。

print_response(response) 函数用于解析并打印响应中的数据。它从响应中获取每个维度的名称（dimensionHeaders）和每个指标的名称（metricHeaders），然后将数据逐行打印出来。

main() 函数是程序的入口点。它依次调用 initialize_analyticsreporting() 来初始化服务对象，然后调用 get_report(analytics) 来获取数据，并最后调用 print_response(response) 来打印数据结果。

在运行这个脚本之前，确保你已经完成了以下几个步骤：

在 Google Analytics 中创建一个项目，并获得对应的 View ID。
创建一个服务账号，并下载 JSON 密钥文件。
将密钥文件路径和 View ID 分别替换 <REPLACE_WITH_JSON_FILE> 和 <REPLACE_WITH_VIEW_ID>。
运行脚本后，它将向 Google Analytics 发送 API 请求并获取数据，然后在控制台上打印出来。这样你就可以查看过去 7 天到今天的网站会话数，并按国家维度进行分类。

"""""Hello Analytics Reporting API V4."""

from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials

SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
KEY_FILE_LOCATION = '<REPLACE_WITH_JSON_FILE>'
VIEW_ID = '<REPLACE_WITH_VIEW_ID>'

def initialize_analyticsreporting():
  """Initializes an Analytics Reporting API V4 service object.

  Returns:
    An authorized Analytics Reporting API V4 service object.
  """
  credentials = ServiceAccountCredentials.from_json_keyfile_name(
      KEY_FILE_LOCATION, SCOPES)

  # Build the service object.
  analytics = build('analyticsreporting', 'v4', credentials=credentials)

  return analytics

def get_report(analytics):
  """Queries the Analytics Reporting API V4.

  Args:
    analytics: An authorized Analytics Reporting API V4 service object.
  Returns:
    The Analytics Reporting API V4 response.
  """
  return analytics.reports().batchGet(
      body={
        'reportRequests': [
        {
          'viewId': VIEW_ID,
          'dateRanges': [{'startDate': '7daysAgo', 'endDate': 'today'}],
          'metrics': [{'expression': 'ga:sessions'}],
          'dimensions': [{'name': 'ga:country'}]
        }]
      }
  ).execute()

def print_response(response):
  """Parses and prints the Analytics Reporting API V4 response.

  Args:
    response: An Analytics Reporting API V4 response.
  """
  for report in response.get('reports', []):
    columnHeader = report.get('columnHeader', {})
    dimensionHeaders = columnHeader.get('dimensions', [])
    metricHeaders = columnHeader.get('metricHeader', {}).get('metricHeaderEntries', [])

    for row in report.get('data', {}).get('rows', []):
      dimensions = row.get('dimensions', [])
      dateRangeValues = row.get('metrics', [])

      for header, dimension in zip(dimensionHeaders, dimensions):
        print header + ': ' + dimension

      for i, values in enumerate(dateRangeValues):
        print 'Date range: ' + str(i)
        for metricHeader, value in zip(metricHeaders, values.get('values')):
          print metricHeader.get('name') + ': ' + value

def main():
  analytics = initialize_analyticsreporting()
  response = get_report(analytics)
  print_response(response)

if __name__ == '__main__':
  main()
