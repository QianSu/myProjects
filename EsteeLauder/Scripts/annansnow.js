//annan
var x, y, z, W, H;
var nums = 20;
var img = new Image();
var angle = 0;
var ua = '';
var interVal;
var	canvas = document.getElementById("canvas");
var	ctx = canvas.getContext("2d");
function deviceMotionHandler(eventData) {
    var acceleration =eventData.accelerationIncludingGravity;
    x = acceleration.x/5;
    y = acceleration.y/4;
}
(function () {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion',deviceMotionHandler,false);
    }
    W = document.body.clientWidth;
    H = document.body.clientHeight;
    // canvas.width = W;
    // canvas.height = H;
})()
ua = navigator.userAgent.toLowerCase();
var particles = [];
for (var i = 0; i < nums; i++) {
    particles.push(new create_particle());
}

function create_particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.w = Math.random() * 30;
    this.vx = Math.random()*10-5;
    this.vy = Math.random()*10-5;
    this.radius = Math.random()*40;
}
function draw() {
    angle += 0.001;
    for (var t = 0; t < particles.length; t++) {
        var p = particles[t];
        ctx.beginPath();
        speedX = Math.cos(angle) + 4*x;
        speedY = Math.sin(angle) + y*3;
        if (/iphone|ipad|ipod/.test(ua)) {
        } else if (/android/.test(ua)) {
            speedX = -speedX;
            speedY = -speedY;
        }
        if (p.x < 5) p.x = 00;
        if (p.y < 5) p.y = 00;
        if (p.x > W - 50) p.x = W - 50;
        if (p.y > H - 50) p.y = H - 50;
        p.x +=p.vx + speedX;
        p.y -=p.vy + speedY;
        $(".snow").each(function () {
            var _index = $(this).index();
            if (_index == t) {
                $(".snow").eq(_index).css({
                    left: Math.floor(particles[t].x) + "px",
                    top: Math.floor(particles[t].y) + "px"
                })
            }   
        })
    }
}
//setInterval(draw, 33);draw, 33);sadfsDDFDF
$(".git").on("touchend", function () {
    $('.box-step:first').fadeOut(200).siblings().fadeIn(200, function () {
        interVal = setInterval(draw, 33);
    });
    $(".noSwipe").css("z-index", 66);
    $(".window1").animate({
        "top": 135
    }, 1200);
    $(".window2").animate({
        "top": 135
    }, 600);
    $(".window3").animate({
        "top": 460,
        "width": 100 + "px",
        "height": 82 + "px"
    }, 600);
    $(".window4").animate({
        "top": 460,
        "width": 100 + "px",
        "height": 82 + "px"
    }, 900, function () {
        $(".magic").css("zIndex", 9);
    });
})
//setTimeout(function () {
//    
//}, 6000);

function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
};
//susfsadfsdafadsfsafasfdfsdafadsfsafasf
$(function () {
    setTimeout(function () {
        $('.music-ico').addClass('css3');
    }, 500);
    // var audio = $("#audio")[0];
    // $('.music-ico').click(function () {
    //     audio.pause();
    // })
    audio.play();
    /////////////////////开�?////////////
//    setTimeout(function () {
//        $(".window1").animate({
//            "top": 135
//        }, 1200);
//        $(".window2").animate({
//            "top": 135
//        }, 600);
//        $(".window3").animate({
//            "top": 460,
//            "width": 100 + "px",
//            "height": 82 + "px"
//        }, 600);
//        $(".window4").animate({
//            "top": 460,
//            "width": 100 + "px",
//            "height": 82 + "px"
//        }, 900, function () {
//            $(".magic").css("zIndex", 9);
//        });
//    }, 6000)
//    ////////////////////////////点击遮罩/////////////
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        touchRatio: 1,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        loop: true,
        initialSlide: 3
    });
    $(document).on("touchend", ".git1", function () {
        $("#shade").show();
        swiper.slideTo(1, 1000, false);
    })
    $(document).on("touchend", ".git2", function () {
        $("#shade").show();
        swiper.slideTo(2, 1000, false);
    })
    $(document).on("touchend", ".git3", function () {
        $("#shade").show();
        swiper.slideTo(3, 1000, false);
    })
    $(document).on("touchend", ".git4", function () {
        $("#shade").show();
        swiper.slideTo(4, 1000, false);
    })
    $(document).on("touchend", ".xx", function () {
        $("#shade").hide();
    })
    ///////////////////////长图文上�?/////////
    var flag = true;
    $(document).on("touchmove", ".upImg", function () {
        return false;
    })
    $(document).on("touchend", ".upImg", function () {
        if (flag) {
            $(this).animate({ "top": 20 }, 300);
            $(".noSwipe").animate({ "top": 0 }, 300);
            $(".upImg").css({ "margin-top": 0 });
            $("body").css("overflow", "scroll");
            flag = false;
        } else {
            $(".noSwipe").animate({ "top": 100 + "%" }, 300);
            $(".upImg").css({ "margin-top": "-300px" });
            $("body").css("overflow", "hidden");
            flag = true;
        }
    })
})