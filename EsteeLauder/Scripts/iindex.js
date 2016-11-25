var TRANSTION_SPEED = 'all .5s'
var LASTINDEX = 1;
// var TranslateZ = Zhu._translateZ();
var PAGEINDEX = 1;
var Bstop = true;

var ZINDEX = 10;
var Bstop = true;

window.Timer = null;
window.stopped = false;

//document.addEventListener('touchmove' , function (ev){
//		ev.preventDefault();
//		return false;
//	} , false)
	
//检测横板竖版
//function orientationchange() {
//	if (window.orientation == 0 || window.orientation == 180) {
//		document.getElementById("horizontal").style.display = 'none';
//		jQuery('#main').show();
//	} else {
//		document.getElementById("horizontal").style.display = 'block';
//		jQuery('#main').hide();
//	}
//};

function is_weixn(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
}

if(is_weixn())
{
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			WeixinJSBridge.call('hideToolbar');
	});	
}

var SRC_DOMAIN = './images/';

jQuery(function () {
    setTimeout(scrollTo, 0, 0, 0);
    //翻转
    window.onorientationchange = function () {
        orientationchange();
    };
    //预加载
    var LoadArr = [
		SRC_DOMAIN + 'icon1.png',
		SRC_DOMAIN + 'icon2.png',
		SRC_DOMAIN + 'icon3.png',
		SRC_DOMAIN + 'icon4.png',
		SRC_DOMAIN + 'bigbg.jpg',
		SRC_DOMAIN + 'btn1.png',
		SRC_DOMAIN + 'btn2.png',
		SRC_DOMAIN + 'home.png',
		SRC_DOMAIN + 'loading.png',
		SRC_DOMAIN + 'lala.png',
		SRC_DOMAIN + 'music.png',
		SRC_DOMAIN + 'x.png'
	];
    jQuery('img').each(function () {
        LoadArr.push(jQuery(this).attr('src'));
    });
    LoadFn(LoadArr, function () {
        //默认第一个为显示
        jQuery('.box-step:first').fadeIn();
        //动画开始
        Animate();
        window.stopped = false;
    })

    jQuery('#main').swipe({
        swipeLeft: function () {
            return;
        },
        swipeRight: function () {
            return;
        },
        swipeUp: function () {
            if (PAGEINDEX == jQuery('.box-step').size()) {
                PAGEINDEX = 1;
                PageUp(PAGEINDEX);
                return;
            }
            PageUp(++PAGEINDEX);
        },
        swipeDown: function () {
            if (PAGEINDEX == 1) {
                return;
            }
            PageDown(--PAGEINDEX);
            return;
        }
    })
});

//loading页面
function LoadFn(arr , fn )
{
	var loader = new PxLoader();

	for ( var i = 0 ; i < arr.length ; i ++)
	{
		loader.addImage(arr[i]);
	}

	loader.addProgressListener(function(e) {
		var percent = Math.round( e.completedCount / e.totalCount * 100 );
		jQuery('.load-tips').html(''+percent+'%');
	});
	loader.addCompletionListener(fn);
	loader.start();
};
	
function PageUp ( index )
{
//	var PAGEINDEX = jQuery('.pagebox' + index).index();
//	jQuery('.pagebox' + index).css("display","block").siblings().css("display","none");
//	jQuery(".music-ico").css("display","block");
//	jQuery(".upImg").css("display","block");
//	Animate();
}
	
function PageDown ( index )
{
//	var PAGEINDEX = jQuery('.pagebox' + index).index();
//	jQuery('.pagebox' + index).css("display","block").siblings().css("display","none");
//	jQuery(".music-ico").css("display","block");
//	jQuery(".upImg").css("display","block");
//	Animate();
}

var mzAnimate = new Array();

function Animate(){

	window.stopped = true;

	// jQuery('.animated').css("opacity", "0");
	switch ( PAGEINDEX ) {
		
		case 1 :
			clearAnimate();
			
			jQuery('.st-4').css("opacity", "0");
            jQuery('.st-4').removeClass('animated fadeIn');
			mzAnimate[0] = setTimeout(function() {
            	jQuery('.st-4').css("opacity", "1").addClass('animated fadeIn');
            }, 600);
			break;
			
		case 2 :
			clearAnimate();
			jQuery('.sp2').css("opacity", "0");
            jQuery('.sp2').removeClass('animated fadeIn');
            mzAnimate[1] = setTimeout(function() {
            	jQuery('.sp2').css("opacity", "1").addClass('animated fadeIn');
            }, 400);
			break;

		case 3 :
			clearAnimate();
			jQuery('.p5-1').css("opacity", "0");
            jQuery('.p5-1').removeClass('animated fadeIn');
            
            mzAnimate[20] = setTimeout(function() {
            	jQuery('.p5-1').css("opacity", "1").addClass('animated fadeIn');
            }, 400);
			break;
			
		case 4 :
			clearAnimate();
			jQuery('.p6-1').css("opacity", "0");
            jQuery('.p6-1').removeClass('animated fadeIn');
            mzAnimate[20] = setTimeout(function() {
            	jQuery('.p6-1').css("opacity", "1").addClass('animated fadeIn');
            }, 400);
			break;
			
		case 5 :
			clearAnimate();
			jQuery('.p7-1').css("opacity", "0");
			jQuery('.p7-1').removeClass('animated fadeIn');
			mzAnimate[70] = setTimeout(function() {
            	jQuery('.p7-1').css("opacity", "1").addClass('animated fadeIn');
            }, 400);
			break;
	};
}

//清除动画
function clearAnimate()
{
	for (x in mzAnimate)
	{
		if(mzAnimate[x] != null && mzAnimate[x] != "")  
			clearTimeout(mzAnimate[x]);
	}
}