const PAGE = {
  data:{
    questions: [
      {
        "id": 1,
        "title": "4%2 的值为",
        "options": [0,1,2,4],
        "correct": 0,
      },
      {
        "id": 2,
        "title": "\"0\" == false 的值为",
        "options": ["true","false"],
        "correct": 0,
      },
      {
        "id": 3,
        "title": "不设置cookie设置过期时间，cookie的默认时间长度为",
        "options": ["立刻过期","永不过期","cookie 无法设置","在浏览器会话结束时过期"],
        "correct": 3,
      },
      {
        "id": 4,
        "title": "+new Array(042) 的值为",
        "options": ["43","NaN","42","Error"],
        "correct": 1,
      },
      {
        "id": 5,
        "title": "数组的方法中，哪些方法不能改变自身数组？",
        "options": ["pop","splice","sort","concat"],
        "correct": 3,
      },
      {
        "id": 6,
        "title": "Number(null); 的值为：",
        "options": ["null",0,"undefined",1],
        "correct": 1,
      }
    ],
    currentIndex: 0,
    result: [],
  },
  init: function(){
    this.bind();
    this.render();
  },
  bind:function(){
    $('#btn').on("click",this.nextQuestion);
    let optionsList = document.getElementById
    $('#options-list').on('click','.options-item',this.answer);
  },
  answerResult: function(e){
    let result = PAGE.data.result;
    let right = result.filter(data => {
      return data.selectIndex == data.clickIndex
    })
    let wrong = result.filter(data => {
      return data.selectIndex != data.clickIndex
    })
    let detail = result.map((data,index) => {
      return `<span class="detail-info ${data.selectIndex == data.clickIndex ? ' green' : ' red'}" id="detail-info">${index+1}</span>`
    }).join('');
    let showResult = `<div class="title" id="title">一共回答正确${right.length}题,回答错误${wrong.length}题</div>`
    $('#title').html(showResult)
    $('#options-list').html(detail);
  },
  answer: function(e){
    let optionsItem = e.target;
    // 获得当前点击选项的索引
    let index = e.target.dataset.index;
    // 获得当前题目的正确选项的索引
    let questions = PAGE.data.questions;
    let currentIndex = PAGE.data.currentIndex;
    let correct = questions[currentIndex].correct;
    // 判断点击索引与正确索引是否一致
    if(index == correct){
      // 一致的话标绿
      optionsItem.className += ' green';
    }else{
      // 不一致标红
      optionsItem.className += ' red';
    }

    let hasResult = PAGE.data.result[currentIndex];
    if(!hasResult) {
      PAGE.data.result[currentIndex] = {
        // 正确选项的索引
        selectIndex: correct,
        // 点击选项的索引
        clickIndex: index
      }
    }
  },
  nextQuestion:function(e){
    // 点击按钮切换下一题
    // 获得当前索引
    let currentIndex = PAGE.data.currentIndex;
    // 获得下一题索引
    let index = currentIndex + 1;
    // 刷新数据
    PAGE.data.currentIndex = Number(index);
    // 终止操作
    // 获得总题数
    let total = PAGE.data.questions.length;
    if(index >= total){
      PAGE.answerResult() 
      return
    }
    PAGE.render();
  },
  render: function(){
    // 获取答题的数据
    let questions = PAGE.data.questions;
    // 获取每一道题目的内容
    let currentIndex = PAGE.data.currentIndex;
    let content = questions[currentIndex];
    // 题目id  即目前是第几题
    let id = content.id;
    // 标题
    let contentTitle = content.title;
    // 选项
    let options = content.options;
    // 一共有几题
    let total = questions.length;  
    // 将id、标题、选项、题号、一共有几题、目前是第几题渲染到html去
    let showTitle = `<div class="title" id="title">${id + '. '}${contentTitle}</div>`
    $('#title').html(showTitle);
    let showOptions = options.map((data,index) => {
      return `<div class="options-item" data-index = '${index}'>${data}</div>`
    }).join('');
    $('#options-list').html(showOptions);
    let showInfo = `
    <div>当前第${id}题</div>
    <div>一共${total}道题</div>
      `
    $('#footer-info').html(showInfo);  
  }
}
PAGE.init();