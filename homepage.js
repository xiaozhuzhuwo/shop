//添加load事件
addEvent(window,'load',function(){
	// 添加鼠标点击事件切换商城和店铺的css样式
	var search_shop=$('midshopul1').getElementsByTagName('li');
	for(var i=0;i<search_shop.length;i++){
		(function(i){
			addEvent(search_shop[i],'click',function(){
				changeClass(search_shop,i,'search_shop');
			});
		})(i);
	}
	
	//tab选项卡
	var li=$('tabul').getElementsByTagName('li');
	var div=$('tab_outdiv').getElementsByTagName('div');
	for(var i=0;i<li.length;i++){
		(function(i){
			addEvent(li[i],'mouseover',function(){
				changeClass(li,i,'tab_li_def',div,"display");
			});
		})(i);
	}
	//弹出登录框
	openLoginwindow($('top_login_a'));
	openLoginwindow($('advert_a1'));
		
	//固定搜索框滚动,显示回到顶部按钮
	addEvent(window,'scroll',function(){
		var scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
		// 显示回到顶部按钮
		if(scrollTop>getTop($('tab'))){
			$('backtop').style.display="block";
			$('backtop').style.left=getLeft($('tab'))+$('tab').offsetWidth+20+'px';
		}else{
			$('backtop').style.display="none";
		}
	});

	// 回到顶部
	var backtop_time=null;
	addEvent($('backtop'),'click',function(){ 
		clearInterval(backtop_time);
		backtop_time=setInterval(function(){
			var backtop_scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
			if(backtop_scrollTop==0){
				clearInterval(backtop_time);
			}else{
				document.body.scrollTop=document.documentElement.scrollTop=backtop_scrollTop-backtop_scrollTop/10;
			}
		},30);
	});

	// 轮播图
	var turn_li=$('turn_list').getElementsByTagName('li');
	var turn_length=turn_li.length;
	var turn_num=0;
	var turn_speed=0;

	// 鼠标移入事件
	addEvent($('turn_box'),'mouseover',function(){
		$('turn_left').style.display='block';
		$('turn_right').style.display='block';
	});

	// 鼠标移除事件
	addEvent($('turn_box'),'mouseout',function(){
		$('turn_left').style.display='none';
		$('turn_right').style.display='none';
	});

	//点击按钮切换图片
	addEvent($('turn_left'),'click',function(){
		if(turn_flag){
			animation($('turnimage1'),530,53);
			turn_num--;
			if(turn_num==-1){
				turn_num=turn_length-1;
			}
			changeClass(turn_li,turn_num,'turn_same');
		}
	});
	addEvent($('turn_right'),'click',function(){
		if(turn_flag){
			animation($('turnimage1'),-530,-53);
			turn_num++;
			if(turn_num==turn_length){
				turn_num=0;
			}
			changeClass(turn_li,turn_num,'turn_same');
		}
	});

	//点击数字列表切换图片
	for(var i=0;i<turn_length;i++){
		(function(i){
			addEvent(turn_li[i],'click',function(){
				if(turn_flag){
					// 遍历元素获取元素class存在的Id值
					clearInterval(turn_time);
					var start=0;
					var end=0;
					for(var j=0;j<turn_length;j++){
						if(turn_li[j].className=='turn_same'){
							start=parseInt(turn_li[j].getAttribute('id'));
							break;
						}
					}
					end=parseInt(turn_li[i].getAttribute('id'));
					if(end-start>0){
						if(end-start==1){
							turn_speed=-53;
						}else{
							turn_speed=-265;
						}
					}else{
						if(end-start==-1){
							turn_speed=53;
						}else{
							turn_speed=265;
						}
					}
					turn_num=end-1;
					changeClass(turn_li,turn_num,'turn_same');
					animation($('turnimage1'),-(end-start)*530,turn_speed);
				}
			});
		})(i);
	}

	// 轮播图无线滚动
	function roll(obj){
		setTimeout(function(){
			if(turn_flag){
				animation(obj,-530,-53);
				turn_num++;
				if(turn_num==turn_length){
					turn_num=0;
				}
				changeClass(turn_li,turn_num,'turn_same');
			}
			roll(obj);
		},6000);
	}
	roll($('turnimage1'));

	//品牌图无线滚动
	function brandScroll(obj){
		obj.brand_time=null;
		setTimeout(function(){ 
			obj.brand_time=setInterval(function(){
				obj.style.left=obj.offsetLeft-2+'px';
				if(obj.offsetLeft%(-94)==0){
					clearInterval(obj.brand_time);
					if(obj.offsetLeft<=-752){
						obj.style.left=0+'px';
					}
					brandScroll(obj);
				}
			},10);
		},2000);
	}
	brandScroll($("menulist_scrollbox1"));
	brandScroll($("menulist_scrollbox2"));
	brandScroll($("menulist_scrollbox3"));
	brandScroll($("menulist_scrollbox4"));
	
	//倒计时抢购
	var limit_timer=null;
	limit_timer=setInterval(function(){
		limitTimer($('limit_timer'),limit_timer,'2017/2/7,00:00:00');
	},500);

	// 淡入淡出
	var tabimg=$('tab_outdiv').getElementsByTagName('img');
	var opa1=$('opa1').getElementsByTagName('img');
	var opa2=$('opa2').getElementsByTagName('img');
	var opa3=$('opa3').getElementsByTagName('img');
	var opa4=$('opa4').getElementsByTagName('img');
	opa(tabimg);
	opa(opa1);
	opa(opa2);
	opa(opa3);
	opa(opa4);

	//手风琴
	var turnimage2_img=$("turnimage2").getElementsByTagName("img");
	for(var i=0;i<turnimage2_img.length;i++){
		(function(i){
			var that=turnimage2_img[i];
			addEvent(turnimage2_img[i],"mouseover",function(){
				that.style.width=that.offsetWidth+20+"px";
			});
			addEvent(turnimage2_img[i],"mouseout",function(){
				that.style.width=that.offsetWidth-20+"px";
			});
		})(i);
	}
});
// 淡入淡出
function opa(obj){
	for(var i=0;i<obj.length;i++){
		obj[i].time=null;
		obj[i].alpha=100;
		//鼠标移入事件
		obj[i].onmouseover=function(){
			movement(this,{opacity:70});
		}
		// 鼠标移除事件
		obj[i].onmouseout=function(){
			movement(this,{opacity:100});
		}
	}
}

function openLoginwindow(obj){
	addEvent(obj,'click',function(){
		//让元素显示出来，不然后面的获取该元素的高和宽为0
		$('login').style.display="block";
		elCenter($('login'));

		//遮罩层
		$('window_mask').style.display="block";
		mask($('window_mask'));
	});

	//点击close隐藏登录框和遮罩层
	addEvent($('login_close'),'click',function(){
		$('login').style.display="none";
		$('window_mask').style.display="none";
	});

	// 登录框拖曳
	// 鼠标点击事件
	var mark=false;
	var startW,startH,strelW,strelH;
	addEvent($('login_move'),'mousedown',function(event){
		// 跨浏览器兼容获取事件对象
		var event=event || window.event;

		// 获取鼠标点击时的初始位置
		startW=event.clientX;
		startH=event.clientY;

		// 获取登录框的初始位置
		strelW=$('login').offsetLeft;
		strelH=$('login').offsetTop;

		mark=true;
	});

	// 鼠标移动事件
	addEvent(document,'mousemove',function(event){
		// 跨浏览器兼容获取事件对象
		var event=event || window.event;

		// 获取鼠标移动时的位置
		var endW=event.clientX;
		var endH=event.clientY;

		//计算移动距离
		var moveX=endW-startW;
		var moveY=endH-startH;

		// 计算位移最大值和最小值
		var maxX=document.documentElement.clientWidth-$('login').offsetWidth;
		var maxY=document.documentElement.clientHeight-$('login').offsetHeight;

		if(mark){
			$('login').style.left=Math.min(maxX,Math.max(0,(strelW+moveX)))+'px';
			$('login').style.top=Math.min(maxY,Math.max(0,(strelH+moveY)))+'px';
		}

	});

	// 鼠标移除事件
	addEvent(document,'mouseup',function(){
		mark=false;
	});
}

//元素变化函数
function movement(obj,json,fn){
  	var speed=0;
  	var value=0;
  	clearInterval(obj.time);
  	obj.time=setInterval(function(){
    	var flag=true;
    	for(var attr in json){
	      if(attr=='opacity'){
	        value=Math.round(parseFloat(getStyle(obj,attr)*100));
	        json[attr]-value>0?speed=Math.ceil((json[attr]-value)/10):speed=Math.floor((json[attr]-value)/10);
	      }else{
	        value=parseInt(getStyle(obj,attr));
	        json[attr]-value>0?speed=Math.ceil((json[attr]-value)/10):speed=Math.floor((json[attr]-value)/10);
	      }
	      if(attr=='opacity'){
	          obj.alpha+=speed;
	          obj.style[attr]=obj.alpha/100;
	          obj.style.filter='alpha(opacity:'+obj.alpha+')';
	      }else{
	          obj.style[attr]=value+speed+'px';
	      }
	      if(value!=json[attr]){
	          flag=false;      
	      }
    	}
    	if(flag){
      		clearInterval(obj.time);
	      	if(fn){
	        	fn();
	      	}
    	}
  },10);
}

// 倒计时抢购
function limitTimer(obj,time,endTime){
	var start=new Date();
	var end=new Date(endTime);
	//计算距离时间的差值，结果是毫秒
	var distance=end.getTime()-start.getTime();
	//计算天数
	var day=Math.floor(distance/(24*60*60*1000));
	 //计算小时
	var hour=Math.floor(distance/(60*60*1000)-day*24);
	//计算分钟
	var minute=Math.floor(distance/(1000*60)-day*24*60-hour*60);
	//计算秒
	var second=Math.floor(distance/(1000)-minute*60-day*24*60*60-hour*60*60);
	//将计算的时间显示在div中
	if(day<0){
	  	obj.innerHTML="产品抢购时间还剩余已经结束，谢谢惠顾";
	  	clearInterval(time);
	}else{
	  	obj.innerHTML=day+"天"+hour+"时"+minute+"分"+second+"秒结束";
	}
}

//图片移动
var turn_time=null;
var turn_flag=true;
function animation(obj,moveX,speed){
	turn_flag=false;
	var target=obj.offsetLeft+moveX;
	turn_time=setInterval(function(){
		if(obj.offsetLeft==target){
			clearInterval(turn_time);
			if(obj.offsetLeft<=-5300){
				obj.style.left=-530+'px';
			}else if(obj.offsetLeft>=0){
				obj.style.left=-4770+'px';
			}
			turn_flag=true;
		}else{
			obj.style.left=obj.offsetLeft+speed+'px';
		}
	},30);
}

//遍历元素设置class样式
function changeClass(obj,num,classname,el,type){
	for(var i=0;i<obj.length;i++){
		obj[i].className='';
		if(type){
			el[i].style[type]="none";
		}
	}
	obj[num].className=classname;
	if(type){
		el[num].style[type]="block";
	}
}

//元素相对窗口居中
function elCenter(obj){
	//获取视口的宽和高
	var windowW=document.documentElement.clientWidth;
	var windowH=document.documentElement.clientHeight;

	// 获取登录框的高和宽
	var elW=obj.offsetWidth;
	var elH=obj.offsetHeight;

	//设置距离左上角的位置
	obj.style.left=(windowW-elW)/2+'px';
	obj.style.top=(windowH-elH)/2+'px';
}

//设置元素覆盖整个窗口
function mask(obj){
	//获取视口的宽和高
	var windowW=document.documentElement.clientWidth;
	var windowH=document.documentElement.clientHeight;

	obj.style.width=windowW+'px';
	obj.style.height=windowH+'px';
}

//获取元素的纵坐标（相对于窗口）
function getTop(obj){
  var offset=obj.offsetTop;
  if(obj.offsetParent!=null){
  	offset+=getTop(obj.offsetParent);
  }
  return offset;
}

//获取元素的横坐标（相对于窗口）
function getLeft(obj){
  var offset=obj.offsetLeft;
  if(obj.offsetParent!=null){
  	offset+=getLeft(obj.offsetParent);
  }
  return offset;
}

//跨浏览器添加事件兼容
function addEvent(obj,type,callback){
	if(obj.addEventListener){
		obj.addEventListener(type,callback,false);
	}else if(obj.attachEvent){
		obj.attachEvent('on'+type,callback);
	}else{
		obj['on'+type]=callback;
	}
}

//通过ID获取元素对象
function $(id){
	return document.getElementById(id);
}

// 通过className获取元素对象
function getClass(obj,cla){
	var all=obj.getElementsByTagName('*');
	var arr=[];
	for(var i=0;i<all.length;i++){
		if(all[i].className==cla){
			arr.push(all[i]);
		}
	}
	return arr;
}

//获取css内部样式
function getStyle(obj,attr){
	if(obj.currentStyle){
	  return obj.currentStyle[attr];
	}else{
	  return getComputedStyle(obj,false)[attr];
	}
}

