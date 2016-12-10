//添加window对象load事件
addEvent(window,'load',function(){
	//用户名
	var err1=/\D/;
	var err2=/[^(0-9a-zA-Z)]/;
	var err3=/[^(0-9a-zA-Z\@\.)]/;
	//键盘释放事件
	addEvent($('tel_number'),'keyup',function(){
		if(err1.test($('tel_number').value)){
			$('tel_number_mes').innerHTML='有非法字符请重新输入';
		}else{
			$('tel_number_mes').innerHTML='';
		}
	});

	//文本框失去焦点事件
	addEvent($('tel_number'),'blur',function(){
		if($('tel_number').value.length<11&&$('tel_number').value.length>0){
			$('tel_number_mes').innerHTML='输入的手机号码小于11位';
		}else if($('tel_number').value.length>11){
			$('tel_number_mes').innerHTML='输入的手机号码大于11位';
		}else if($('tel_number').value.length==0){
			$('tel_number_mes').innerHTML='您输入的手机号为空，请重新输入';
		}else if(err1.test($('tel_number').value)){
			$('tel_number_mes').innerHTML='有非法字符';
		}else{
			// $('tel_number_mes').innerHTML='通过';
			requestAjax('GET','url','',$('tel_number_mes'));
		}	
	});

	// 密码
	//键盘释放事件
	addEvent($('registe_pswd'),'keyup',function(){
		//匹配非数字
		if(err2.test($('registe_pswd').value)){
			$('registe_pswd_mes').innerHTML='有非法字符请重新输入';
		}else{
			$('registe_pswd_mes').innerHTML='';
		}
	});

	//文本框失去焦点事件
	addEvent($('registe_pswd'),'blur',function(){
		if($('registe_pswd').value.length<6&&$('registe_pswd').value.length>0){
			$('registe_pswd_mes').innerHTML='输入的密码小于6位';
		}else if($('registe_pswd').value.length==0){
			$('registe_pswd_mes').innerHTML='您输入的密码为空，请重新输入';
		}else if(err2.test($('registe_pswd').value)){
			$('registe_pswd_mes').innerHTML='有非法字符';
		}else{
			$('registe_pswd_mes').innerHTML='通过';
		}
	});

	// 确认密码
	//文本框失去焦点事件
	addEvent($('registe_pw'),'blur',function(){
		if($('registe_pw').value!=$('registe_pswd').value){
			$('registe_pw_mes').innerHTML='密码不一致，请重新输入';
		}else if($('registe_pw').value.length==0){
			$('registe_pw_mes').innerHTML='密码不可为空';
		}else{
			$('registe_pw_mes').innerHTML='通过';
		}
	});

	// 邮箱
	//键盘释放事件
	addEvent($('registe_email'),'keyup',function(){
		if(err3.test($('registe_email').value)){
			$('registe_email_mes').innerHTML='有非法字符请重新输入';
		}else{
			$('registe_email_mes').innerHTML='';
		}
	});

	//文本框失去焦点事件
	addEvent($('registe_email'),'blur',function(){
		//匹配邮箱
		var right=/^(\d|[a-z]){3,}\@(\d{2}|[a-z]{2})\.(com)$/;
		if(right.test($('registe_email').value)){
			// $('registe_email_mes').innerHTML='通过';
			requestAjax('GET','url','',$('registe_email_mes'));
		}else if($('registe_email').value.length==0){
			$('registe_email_mes').innerHTML='邮箱不可为空'
		}else if(err3.test($('registe_email').value)){
			$('registe_email_mes').innerHTML='有非法字符';
		}else{
			$('registe_email_mes').innerHTML='邮箱格式不正确';
		}
	});

	// 验证码
	addEvent($('identifying_code'),'blur',function(){
		var right=/^(CQ7W)$/i;
		if(right.test($('identifying_code').value)){
			$('identifying_code_mes').innerHTML='通过';
		}else if($('identifying_code').value.length==0){
			$('identifying_code_mes').innerHTML='验证码不可为空'
		}else{
			$('identifying_code_mes').innerHTML='验证码错误'
		}
	});

	// 立即注册
	if($('tel_number_mes').innerHTML=='通过'&&$('registe_pswd_mes').innerHTML=='通过'&&$('registe_pw_mes').innerHTML=='通过'&&$('registe_email_mes').innerHTML=='通过'&&$('identifying_code_mes').innerHTML=='通过'){
		if($('choose').checked){
			addEvent($('registe_sub'),'click',function(){
				var data=$('tel_number').value+$('registe_pswd').value+$('registe_pw').value+$('registe_email').value+$('identifying_code').value;
				requestAjax("POST",'url',data);
			});
		}else{
			alert("请选择同意");
		}
	}
});

// ajax验证
function requestAjax(method,url,paramter,obj){
	var request=new XMlHttpRequest();
	request.open(method,url);
	if(method=="POST"){
		request.setRequestHeader('content_type','application/x-www-form-unlencoded');
	}
	request.send(paramter);
	addEvent(request,'readystatechange',function(){
		if(request.readyState==4){
			if(request.status==200){
				obj.innerHTML=request.responseText;
			}else{
				alert('发生错误：'+request.status);
			}
		}
	});
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

//获取元素对象
function $(id){
	return document.getElementById(id);
}