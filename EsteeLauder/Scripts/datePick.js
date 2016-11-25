var timesection = [{ "id": "101", "value": "11:00-12:00" }, { "id": "101", "value": "13:00-14:00" }, { "id": "101", "value": "14:00-15:00" }, { "id": "101", "value": "15:00-16:00" }, { "id": "101", "value": "16:00-17:00" }, { "id": "101", "value": "18:00-19:00"}];
var cityLength, dateLength, cityData, dateData, selectCityName;
var cityNmae, cityNm;
var i, j, k, appendTime;
var suData, weiData;
weiData = timesection;
var need = [];

jQuery(function () {
    //添加城市
    getCityNmae();
    jQuery("#storeName").change(function () {
        cityNm = jQuery("#storeName option:selected").val();
        getCity(cityNm);
    });
})

//            生成详细时间
function getCity(cityNm) {
    jQuery.ajax({
        type: "GET",
        dataType: "JSON",
        url: "city.json",
        success: function (data) {
            //所有数据cityData 
            cityData = data.data;
            //所有数据的长度cityLength 
            cityLength = data.data.length;
            for (i = 0; i < cityLength; i++) {
                //单条数据长度
                dateLength = cityData[i].date.length;
                selectCityName = cityData[i].city;
                if (cityNm == selectCityName) {
                    //                    console.log(cityData[i].date);
                    need = cityData[i].date;
                    suData = need;
//                    console.log(JSON.stringify(need));
                    //    for (j = 0; j < cityData[i].date.length; j++) {
                    //    dateData = cityData[i].date[j];
                    //     //单挑数据的每个时间段
                    //   for (appendTime = 0; appendTime < timesection.length; appendTime++) {
                    //   jQuery("#date").append("<option>" + dateData + " " + timesection[appendTime] + "</option>");
                    //  }
                    //   }
                    return;
                }
            }
            return;
        },
        error: function () { },
        complete: function () { }
    })
}

//获取城市列表
function getCityNmae() {
    jQuery.ajax({
        type: "GET",
        dataType: "JSON",
        url: "city.json",
        success: function (data) {
            cityNmae = data.data;
//                        jQuery("#storeName").html("<option>请选择</option>");
            for (var t = 0; t < cityNmae.length; t++) {
                jQuery("#storeName").append("<option>" + cityNmae[t].city + "</option>");
            }
        },
        error: function () {
            alert("获取城市列表失败，请刷新重试1");
        },
        complete: function () { }
    })
}


var date = document.querySelector('#date');
var showGeneralDom = document.querySelector('#showGeneralDom');
date.addEventListener('touchend', function () {
    var sanguoSelect = new IosSelect(2,
            [suData, weiData],
            {
                title: '选择你的预约时间',
                itemHeight: 35,
                oneLevelId: suId,
                twoLevelId: weiId,
                callback: function (selectOneObj, selectTwoObj) {
                    jQuery("#date").html(selectOneObj.value + ' ' + selectTwoObj.value);
                    setTimeout(function () {
                        if (jQuery("#date").text() == "undefined undefined") {
                            jQuery("#date").text('');
                        }
                    }, 100);
                }
            });
});

