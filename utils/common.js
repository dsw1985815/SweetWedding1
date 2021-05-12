const news = [{
  id: '1',
  title: '套餐A',
  poster: 'cloud://cloud1-6gev19tc65b830e9.636c-cloud1-6gev19tc65b830e9-1305734786/shanuo/套餐A.jpg',
  content: '套餐1的详细解释',
  add_date: '2021-3-27'
},
{
  id: '2',
  title: '套餐B',
  poster: 'cloud://cloud1-6gev19tc65b830e9.636c-cloud1-6gev19tc65b830e9-1305734786/shanuo/套餐B.jpg',
  content: '套餐2的详细解释',
  add_date: '2021-04-27'
},
{
  id: '3',
  title: '套餐C',
  poster: 'cloud://cloud1-6gev19tc65b830e9.636c-cloud1-6gev19tc65b830e9-1305734786/shanuo/套餐C.jpg',
  content: '套餐3的详细解释',
  add_date: '2021-05-28'
}
];


// 自定义函数：获取新闻列表
function getNewsList() {
let list = [];
for (var i = 0; i < news.length; i++) {
  let obj = {};
  obj.id = news[i].id;
  obj.title = news[i].title;
  obj.add_date = news[i].add_date;
  obj.poster = news[i].poster;

  list.push(obj)
}

return list;
}


// 自定义函数：获取新闻内容
function getNewsDetail(newsID) {
let msg = {
  code: '404',
  news: {}
};

for (var i = 0; i < news.length; i++) {
  if (newsID == news[i].id) {
    msg.code = '200';
    msg.news = news[i];
    break;
  }
}

return msg;

}

module.exports = {
getNewsList: getNewsList,
getNewsDetail: getNewsDetail
}