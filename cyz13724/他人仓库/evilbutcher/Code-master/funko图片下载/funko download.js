var itemlist = [];

$http.request({
  method: "post",
  url: "https://www.funko.com/api/collections/sorted",
  header: {
    Host: "www.funko.com",
    UserAgent: "Popspedia/6 CFNetwork/1126 Darwin/19.5.0",
    Authorization:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzZjI3NjU0MmJmZmU0NWU5OGMyMGQ2MDNlYmUyYmExMTc2ZWRhMzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZnVua29hdXRocHJvZCIsImF1ZCI6ImZ1bmtvYXV0aHByb2QiLCJhdXRoX3RpbWUiOjE1NzI5NjUzNzYsInVzZXJfaWQiOiI3Tk9SM2hNRjJqVE8xSHBUMkJvYndkSEJnTUwyIiwic3ViIjoiN05PUjNoTUYyalRPMUhwVDJCb2J3ZEhCZ01MMiIsImlhdCI6MTU5MzA0NDk1OCwiZXhwIjoxNTkzMDQ4NTU4LCJlbWFpbCI6Ijg5NTU4MjA4M0BxcS5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiODk1NTgyMDgzQHFxLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.F9N0iippjdO5RFSumPIGjTj1KKNW2dX56AAWbrDA-KDg3U9cR4iLRxQjtW0l9Uc8iCl_CJRMcG55bkgd4Zkl9nfcMc8ZaiZ7FQy-bY1CEZu2bdRr_Mp5UIr0Xlyv8Xmx3dhAnLs54DTKNG33aHBJp3czkZZbe_8151G9TpdKpoDtwnsjQhkTjTYVtbO7OIz8XC22gxjF_hC3h9bnS0gGUQ6Ml2ewQnaEN0HBRTpINY8yhABFXrSKmSp47uQy8smRwGZrFYE1nQy0aEYqdBT0fdvTmmoPUzT46OK1ctdqxA8DqozlsrqcMJGGhAsVb2l26NJQ7EXN_2_Dx1Sk8MzfOA"
  },
  body: {
    page: 1,
    pageCount: 200,
    type: "catalog"
  },
  handler: function(resp) {
    var data = resp.data;
    var item = data.search.hits;
    //console.log(item);
    for (var i = 0; i < item.length; i++) {
      var name = item[i].title;
      var series = item[i].licenses;
      var link = "www.funko.com" + item[i].imageUrl;
      itemlist.push({
        title: name + "_" + series,
        url: link
      });
    }
    $drive.write({
      data: $data({ string: JSON.stringify(itemlist) }),
      path: "funkoimg/itemlist.json"
    });
  }
});











































































// Adding a dummy sgmodule commit(29)
// Adding a dummy plugin commit(27)
// Adding a dummy stoverride commit(24)
