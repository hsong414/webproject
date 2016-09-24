;(function($){
	//var myscoll=new IScroll("#activity")
	function Classroom(){
		this.ct_scroll = new IScroll("#content");
		this.at_scroll = new IScroll("#activity");
		this.has=true;
		
		this.bindEvent();
	}
	Classroom.prototype={
		bindEvent:function(){
			var that=this;
			//ajax请求渲染页面
			$.getJSON("classroom_list.json",function(data){
				var str="";
				$.each(data,function(i,val){
					str+='<dl data-list='+i+'>'
						+'<dt><img src='+val.src+' alt="" /></dt>'
						+'<dd>'
						+'<h3 class="tit">'+val.tit+'</h3>'
						+createP(val.status)
						+'<span>'+val.time+'</span>'
						+'</dd>'
					+'</dl>'
				})
			$("#content .wrap").html(str);
				that.ct_scroll.refresh();
			})
			//向上滑动到最低端创建盒子
			$("#content .wrap").on("swipeUp",function(){
				var _top=Math.abs($(this).position().top),
					_pH=$(this).parents().height(),
					_tH=$(this).height(),
					node="";
				if(_tH-_top<_pH){
					if(that.has){
						node=$("<div class='more'>没有更多了</div>");
						$(this).append(node);
						node.css({"height":"0.8rem","text-align":"center","line-height":"0.8rem"});
						that.ct_scroll.refresh();
						that.has=false;
					}
				}
			})
			//进入活动状态页
			$("#content div").on("tap","dl",function(){
				var _section=$(this).parents("section"),
					_text=$(this).find(".tit").text(),
					_list=$(this).data("list"),
					_status=$(this).find("p").hasClass("p_status");
				$("#activity").css("left",0).siblings().css("left","100%");
				$("#back").show();
				changeHead(_text);
				back(_section);
				$.ajax({
					url:"classroom_list.json",
					type:"get",
					dataType:"json",
					success:function(data){
						var _data=data[_list].activity,
							str="";
						if(_status){
							$("#footer .ft_btn").show().siblings().hide();
							str='<ul>'
								+'<li data-location="#Top"><img src='+_data.top.src+' alt="" /></li>'
								+'<li data-location="#Center"><img src='+_data.center.src+' alt="" /></li>'
								+'<li data-location="#Bottom"><img src='+_data.bottom.src+' alt="" /></li>'
								+'</ul>'
								+'<div class="a_start">'
									+'<h2>开课时间</h2>'
									+'<ol>'
										+'<li>'+_data.date+'</li>'
										+'<li>'+_data.time+'</li>'
									+'</ol>'
								+'</div>'
						}
						else{
							$("#footer").hide();
							str='<ul>'
								+'<li data-location="#Top"><img src='+_data.top.src+' alt="" /></li>'
								+'<li data-location="#Center"><img src='+_data.center.src+' alt="" /></li>'
								+'<li data-location="#Bottom"><img src='+_data.bottom.src+' alt="" /></li>'
								+'</ul>'
								+'<div class="a_over">'
								+'</div>'
						}
						$("#activity .wrap").html(str);
						that.at_scroll.refresh();
						dtailed(_data);
					},
					error:function(){
						alert("请求失败！")
					}
				})
			})
			//详细页面
			function dtailed(data){
				$("#activity .wrap").on("tap","li",function(){
					var _location=$(this).data("location"),
						_section=$(this).parents("section");
					back(_section);
					if(_location=="#Top"){
						$("#footer").show();
						$("#footer .ft_Top").show().siblings().hide();
					}
					else if(_location=="#Center"){
						changeHead("问题征集")
					}
					else if(_location=="#Bottom"){
						changeHead('幼师宝典"伙伴计划"详情介绍')
						$("#footer .ft_Top").show().siblings().hide();
					}
					$(_location).css("left",0).siblings().css("left","100%");
				})
			}
			//后退功能
			function back(targent){
				//console.log($(targent).attr("id"))
				$("#back").on("tap",function(){
					$("#content").css("left",0).siblings().css("left","100%");
					//if($(targent[id="content"])){
						$("#header").find("h1").text("幼师讲堂");
						$(this).hide();
						$("#footer").show();
						$("#footer .ft_a").show().siblings().hide();
					//}
				})
			}
			//改变头部标题
			function changeHead(val){
				$("#header").find("h1").text(val);
			}
			//创建一个标签判断活动是否结束
			function createP(status){
				if(status=="start"){
					return '<p class="p_status">【尚未开始】</p>';
				}
				else{
					return '<p>【已结束】</p>'
				}
			}//end
		}
	}
	var classroom=new Classroom();
})(Zepto) 