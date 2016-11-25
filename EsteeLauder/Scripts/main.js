	var adaptUILayout = (function(){
		var regulateScreen = (function(){
			var cache = {};
			
			
			var defSize = {
				width  : window.screen.width,
				height : window.screen.height
			};
			
			var ver = window.navigator.appVersion;
			var s = window.orientation;
			var _ = null;
			
			var check = function(key){
				return key.constructor == String ? ver.indexOf(key) > -1 : ver.test(key);
			};
			
			var add = function(name, key, size){
				if(name && key)
					cache[name] = {
						key : key,
						size : size
					};
			};
			
			var del = function(name){
				if(cache[name])
					delete cache[name];
			};
			var cal = function(){
				if(_ != null)
					return _;
					
				for(var name in cache){
					if(check(cache[name].key)){
						_ = cache[name].size;
						break;
					}
				}
				
				if(_ == null)
					_ = defSize;
				
				return _;
			};
			return {
				add : add,
				del : del,
				cal : cal,
				s : s
			};
		})();
		var adapt = function(uiWidth){
			var 
			deviceWidth,
			devicePixelRatio,
			targetDensitydpi,
			//meta,
			initialContent,
			head,
			viewport,
			ua;
	
			ua = navigator.userAgent.toLowerCase();
			isiOS = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;
		
			
			devicePixelRatio = window.devicePixelRatio;
			devicePixelRatio < 1.5 ? 2  : devicePixelRatio;
			
			if(window.orientation == 0 || window.orientation == 180){
				$("#horizontal").hide();
				$("#main").show();
				if(regulateScreen.s!=0){
					if(regulateScreen.cal().width < regulateScreen.cal().height){
						deviceWidth      = regulateScreen.cal().width; 
					}else{
						deviceWidth      = regulateScreen.cal().height; 
					}
				}else{
					deviceWidth      = regulateScreen.cal().width; 
				}
			}else{
				$("#horizontal").show();
				if(regulateScreen.s!=0){
					$(function(){
						$("#horizontal").fadeIn(100);
					});
					if(regulateScreen.cal().width > regulateScreen.cal().height){
						deviceWidth      = regulateScreen.cal().width; 
					}else{
						deviceWidth      = regulateScreen.cal().height; 
					}
				}else{
					deviceWidth      = regulateScreen.cal().height; 
				}
			}
	
			if(devicePixelRatio==2 && (deviceWidth==320 || deviceWidth==360 || deviceWidth==592 || deviceWidth==640)){
				deviceWidth*=2;
			};
			if(devicePixelRatio==1.5 && (deviceWidth==320)){
				deviceWidth*=2;
				devicePixelRatio = 2;
			};
			if(devicePixelRatio==1.5 && (deviceWidth==640)){
				devicePixelRatio = 2;
			};
	
			targetDensitydpi = uiWidth / deviceWidth * devicePixelRatio * 160;
			initialContent   = isiOS 
				? 'width=' + uiWidth + 'px, user-scalable=no'
				: 'target-densitydpi=' + targetDensitydpi + ', width='+ uiWidth +', user-scalable=no';
			$("#viewport").remove();
			head = document.getElementsByTagName('head');
			viewport = document.createElement('meta');
			viewport.name = 'viewport';
			viewport.id = 'viewport';
			viewport.content = initialContent;
			
			if(isiOS && window.orientation != 0 && window.orientation != 180){
				viewport.content = 'width=640';
				head.length > 0 && head[head.length - 1].appendChild(viewport);
			}else{
				head.length > 0 && head[head.length - 1].appendChild(viewport);
			}
		};
		return {
			regulateScreen : regulateScreen,
			adapt : adapt
		};
	})();
	
	adaptUILayout.adapt(750);
	$(window).bind( 'orientationchange', function(e){
		//adaptUILayout.adapt(640);
	});



 	var isMobile = {
    Android: function() {
    return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
	
    return navigator.userAgent.match(/iPhone|ipad|iPod/i) ? true : false;
    },
    Windows: function() {
    return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
    };
    if(!isMobile.any()){
		//window.location.href="error.html";
	
		$( function (){
			$('#horizontal').remove();	
		})
    } 
	
	
	var Zhu = {
		_elementStyle	: document.createElement('div').style,	
		_UC 			: RegExp("Android").test(navigator.userAgent)&&RegExp("UC").test(navigator.userAgent)? true : false,
		_weixin			: RegExp("MicroMessenger").test(navigator.userAgent)? true : false,
		_iPhoen			: RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)? true : false,
		_Android		: RegExp("Android").test(navigator.userAgent)? true : false,
		_IsPC			: function(){ 
						var userAgentInfo = navigator.userAgent; 
						var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
						var flag = true; 
						for (var v = 0; v < Agents.length; v++) { 
							if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
						} 
						return flag; 
		} ,	
		_isOwnEmpty		: function (obj) { 
						for(var name in obj) { 
							if(obj.hasOwnProperty(name)) { 
								return false; 
							} 
						} 
						return true; 
					},
		// 微信初始化函数
		_WXinit			: function(callback){
							if(typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined'){
								setTimeout(function(){
									this.WXinit(callback);
								},200);
							}else{
								callback();
							}
						},
		// 判断浏览器内核类型
		_vendor			: function () {
							var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
								transform,
								i = 0,
								l = vendors.length;
					
							for ( ; i < l; i++ ) {
								transform = vendors[i] + 'ransform';
								if ( transform in document.createElement('div').style ) return vendors[i].substr(0, vendors[i].length-1);
							}
							return false;
						},
		// 判断浏览器来适配css属性值
		_prefixStyle	: function (style) {
							if ( this._vendor() === false ) return false;
							if ( this._vendor() === '' ) return style;
							return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
						},
		// 判断是否支持css transform-3d（需要测试下面属性支持）
		_hasPerspective	: function(){
							var ret = this._prefixStyle('perspective') in this._elementStyle;
							if ( ret && 'webkitPerspective' in this._elementStyle ) {
								this._injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
									ret = node.offsetLeft === 9 && node.offsetHeight === 3;
								});
							}
							return !!ret;
						},
		_translateZ : function(){
							if(Zhu._hasPerspective){
								return ' translateZ(0)';
							}else{
								return '';
							}
						},
	
		// 判断属性支持是否
		_injectStyles 	: function( rule, callback, nodes, testnames ) {
							var style, ret, node, docOverflow,
								div = document.createElement('div'),
								body = document.body,
								fakeBody = body || document.createElement('body'),
								mod = 'modernizr';
	
							if ( parseInt(nodes, 10) ) {
								while ( nodes-- ) {
									node = document.createElement('div');
									node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
									div.appendChild(node);
									}
							}
	
							style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
							div.id = mod;
							(body ? div : fakeBody).innerHTML += style;
							fakeBody.appendChild(div);
							if ( !body ) {
								fakeBody.style.background = '';
								fakeBody.style.overflow = 'hidden';
								docOverflow = docElement.style.overflow;
								docElement.style.overflow = 'hidden';
								docElement.appendChild(fakeBody);
							}
	
							ret = callback(div, rule);
							if ( !body ) {
								fakeBody.parentNode.removeChild(fakeBody);
								docElement.style.overflow = docOverflow;
							} else {
								div.parentNode.removeChild(div);
							}
	
							return !!ret;
						},
		// 自定义事件操作
		_handleEvent 	: function (type) {
							if ( !this._events[type] ) {
								return;
							}
	
							var i = 0,
								l = this._events[type].length;
	
							if ( !l ) {
								return;
							}
	
							for ( ; i < l; i++ ) {
								this._events[type][i].apply(this, [].slice.call(arguments, 1));	
							}
						},
		// 给自定义事件绑定函数
		_on				: function (type, fn) {
							if ( !this._events[type] ) {
								this._events[type] = [];
							}
	
							this._events[type].push(fn);
						},
		//禁止滚动条
		_scrollStop		: function(){
							//禁止滚动
							$(window).on('touchmove.scroll',this._scrollControl);
							$(window).on('scroll.scroll',this._scrollControl);
						},
		//启动滚动条
		_scrollStart 	: function(){		
							//开启屏幕禁止
							$(window).off('touchmove.scroll');
							$(window).off('scroll.scroll');
						},
		//滚动条控制事件
		_scrollControl	: function(e){e.preventDefault();}
	}
	
	

	var eventStr = ((navigator.userAgent.indexOf('Windows NT') > -1) || (navigator.userAgent.indexOf('Macintosh') > -1)) ? 'mousedown' : 'touchstart';
	var CLICK = ((navigator.userAgent.indexOf('Windows NT') > -1) || (navigator.userAgent.indexOf('Macintosh') > -1)) ? 'click' : 'touchend';
	var eventMove = ((navigator.userAgent.indexOf('Windows NT') > -1) || (navigator.userAgent.indexOf('Macintosh') > -1)) ? 'mousemove' : 'touchmove';
		
		
	

	
	function getTextRealLength(str){
		return  Math.ceil(String(str).replace(/[^\x00-\xff]/g,'bb').length/2);
	};
	
	//navigator.userAgent.indexOf('IE 8')>0||navigator.userAgent.indexOf('IE 7')>0||navigator.userAgent.indexOf('IE 6')>0?true:false;
	function isIe678 () {
		var IE = eval('"v"=="\v"');
		return 	IE;
	};
	//IP
	function isIP(value){
	  return /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i.test(value);
	};
	//URL
	function isURL(value){
	  return /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(value);
	};
	//Chinese
	function isChinese(value){
	  return /^[\u4E00-\u9FA3]{1,}$/.test(value);
	};
	//身份证
	function isIDCard(value){
	  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value);
	};
	//手机
	function isPhoneNum(value){
	   return /^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/.test(value);
	};
	//电话
	function isTel(value) {
		return /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(value);	
	};
	//Email
	function isEmail(value){
	   return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
	}
	//数字
	function isNum(value){
	   return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
	};
	//日期
	function isDate(value){
	   return !/Invalid|NaN/.test(new Date(value).toString());
	};
	//匹配字母和下划线开头，允许n-m字节，允许字母数字下划线
	function isAccountValid(value,m,n){
	   var _n = n-1, _m = m-1;
	   return new RegExp("^[a-zA-Z_][a-zA-Z0-9_]{"+_n+","+_m+"}$").test(value);
	}
	
	
// media/js/libs/pxloader/PxLoader.js
/**
 * PixelLab Resource Loader
 * Loads resources while providing progress updates.
 */

function PxLoader(settings) {
    // merge settings with defaults
    settings = settings || {};

    // how frequently we poll resources for progress
    if (settings.statusInterval == null) {
        settings.statusInterval = 5252729; // every 5 seconds by default
    }

    // delay before logging since last progress change
    if (settings.loggingDelay == null) {
        settings.loggingDelay = 20 * 1252729; // log stragglers after 20 secs
    }

    // stop waiting if no progress has been made in the moving time window
    if (settings.noProgressTimeout == null) {
        settings.noProgressTimeout = Infinity; // do not stop waiting by default
    }

    var entries = [],
        // holds resources to be loaded with their status
        progressListeners = [],
        timeStarted, progressChanged = +new Date;

    /**
     * The status of a resource
     * @enum {number}
     */
    var ResourceState = {
        QUEUED: 0,
        WAITING: 1,
        LOADED: 2,
        ERROR: 3,
        TIMEOUT: 4
    };

    // places non-array values into an array.
    var ensureArray = function(val) {
        if (val == null) {
            return [];
        }

        if (Array.isArray(val)) {
            return val;
        }

        return [val];
    };

    // add an entry to the list of resources to be loaded
    this.add = function(resource) {

        // ensure tags are in an object
        resource.tags = new PxLoaderTags(resource.tags);

        // ensure priority is set
        if (resource.priority == null) {
            resource.priority = Infinity;
        }

        entries.push({
            resource: resource,
            status: ResourceState.QUEUED
        });
    };

    this.addProgressListener = function(callback, tags) {
        progressListeners.push({
            callback: callback,
            tags: new PxLoaderTags(tags)
        });
    };

    this.addCompletionListener = function(callback, tags) {
        progressListeners.push({
            tags: new PxLoaderTags(tags),
            callback: function(e) {
                if (e.completedCount === e.totalCount) {
                    callback();
                }
            }
        });
    };

    // creates a comparison function for resources
    var getResourceSort = function(orderedTags) {

        // helper to get the top tag's order for a resource
        orderedTags = ensureArray(orderedTags);
        var getTagOrder = function(entry) {
            var resource = entry.resource,
                bestIndex = Infinity;
            for (var i = 0; i < resource.tags.length; i++) {
                for (var j = 0; j < Math.min(orderedTags.length, bestIndex); j++) {
                    if (resource.tags[i] == orderedTags[j] && j < bestIndex) {
                        bestIndex = j;
                        if (bestIndex === 0) break;
                    }
                    if (bestIndex === 0) break;
                }
            }
            return bestIndex;
        };
        return function(a, b) {
            // check tag order first
            var aOrder = getTagOrder(a),
                bOrder = getTagOrder(b);
            if (aOrder < bOrder) return -1;
            if (aOrder > bOrder) return 1;

            // now check priority
            if (a.priority < b.priority) return -1;
            if (a.priority > b.priority) return 1;
            return 0;
        }
    };

    this.start = function(orderedTags) {
        timeStarted = +new Date;

        // first order the resources
        var compareResources = getResourceSort(orderedTags);
        entries.sort(compareResources);

        // trigger requests for each resource
        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i];
            entry.status = ResourceState.WAITING;
            entry.resource.start(this);
        }

        // do an initial status check soon since items may be loaded from the cache
        setTimeout(statusCheck, 100);
    };

    var statusCheck = function() {
        var checkAgain = false,
            noProgressTime = (+new Date) - progressChanged,
            timedOut = (noProgressTime >= settings.noProgressTimeout),
            shouldLog = (noProgressTime >= settings.loggingDelay);

        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i];
            if (entry.status !== ResourceState.WAITING) {
                continue;
            }

            // see if the resource has loaded
            if (entry.resource.checkStatus) {
                entry.resource.checkStatus();
            }

            // if still waiting, mark as timed out or make sure we check again
            if (entry.status === ResourceState.WAITING) {
                if (timedOut) {
                    entry.resource.onTimeout();
                } else {
                    checkAgain = true;
                }
            }
        }

        // log any resources that are still pending
        if (shouldLog && checkAgain) {
            log();
        }

        if (checkAgain) {
            setTimeout(statusCheck, settings.statusInterval);
        }
    };

    this.isBusy = function() {
        for (var i = 0, len = entries.length; i < len; i++) {
            if (entries[i].status === ResourceState.QUEUED || entries[i].status === ResourceState.WAITING) {
                return true;
            }
        }
        return false;
    };

    var onProgress = function(resource, statusType) {
        // find the entry for the resource
        var entry = null;
        for (var i = 0, len = entries.length; i < len; i++) {
            if (entries[i].resource === resource) {
                entry = entries[i];
                break;
            }
        }

        // we have already updated the status of the resource
        if (entry == null || entry.status !== ResourceState.WAITING) {
            return;
        }
        entry.status = statusType;
        progressChanged = +new Date;

        var numResourceTags = resource.tags.length;

        // fire callbacks for interested listeners
        for (var i = 0, numListeners = progressListeners.length; i < numListeners; i++) {
            var listener = progressListeners[i],
                shouldCall;

            if (listener.tags.length === 0) {
                // no tags specified so always tell the listener
                shouldCall = true;
            } else {
                // listener only wants to hear about certain tags
                shouldCall = resource.tags.contains(listener.tags);
            }

            if (shouldCall) {
                sendProgress(entry, listener);
            }
        }
    };

    this.onLoad = function(resource) {
        onProgress(resource, ResourceState.LOADED);
    };
    this.onError = function(resource) {
        onProgress(resource, ResourceState.ERROR);
    };
    this.onTimeout = function(resource) {
        onProgress(resource, ResourceState.TIMEOUT);
    };

    // sends a progress report to a listener
    var sendProgress = function(updatedEntry, listener) {
        // find stats for all the resources the caller is interested in
        var completed = 0,
            total = 0;
        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i],
                includeResource = false;

            if (listener.tags.length === 0) {
                // no tags specified so always tell the listener
                includeResource = true;
            } else {
                includeResource = entry.resource.tags.contains(listener.tags);
            }

            if (includeResource) {
                total++;
                if (entry.status === ResourceState.LOADED || entry.status === ResourceState.ERROR || entry.status === ResourceState.TIMEOUT) {
                    completed++;
                }
            }
        }

        listener.callback({
            // info about the resource that changed
            resource: updatedEntry.resource,

            // should we expose StatusType instead?
            loaded: (updatedEntry.status === ResourceState.LOADED),
            error: (updatedEntry.status === ResourceState.ERROR),
            timeout: (updatedEntry.status === ResourceState.TIMEOUT),

            // updated stats for all resources
            completedCount: completed,
            totalCount: total
        });
    };

    // prints the status of each resource to the console
    var log = this.log = function(showAll) {
        if (!window.console) {
            return;
        }

        var elapsedSeconds = Math.round((+new Date - timeStarted) / 1000);
        window.console.log('PxLoader elapsed: ' + elapsedSeconds + ' sec');

        for (var i = 0, len = entries.length; i < len; i++) {
            var entry = entries[i];
            if (!showAll && entry.status !== ResourceState.WAITING) {
                continue;
            }

            var message = 'PxLoader: #' + i + ' ' + entry.resource.getName();
            switch(entry.status) {
                case ResourceState.QUEUED:
                    message += ' (Not Started)';
                    break;
                case ResourceState.WAITING:
                    message += ' (Waiting)';
                    break;
                case ResourceState.LOADED:
                    message += ' (Loaded)';
                    break;
                case ResourceState.ERROR:
                    message += ' (Error)';
                    break;
                case ResourceState.TIMEOUT:
                    message += ' (Timeout)';
                    break;
            }

            if (entry.resource.tags.length > 0) {
                message += ' Tags: [' + entry.resource.tags.join(',') + ']';
            }

            window.console.log(message);
        }
    };
}

// Tag object to handle tag intersection; once created not meant to be changed
// Performance rationale: http://jsperf.com/lists-indexof-vs-in-operator/3

function PxLoaderTags(values) {

    this.array = [];
    this.object = {};
    this.value = null; // single value
    this.length = 0;

    if (values !== null && values !== undefined) {
        if (Array.isArray(values)) {
            this.array = values;
        } else if (typeof values === 'object') {
            for (var key in values) {
                this.array.push(key);
            }
        } else {
            this.array.push(values);
            this.value = values;
        }

        this.length = this.array.length;

        // convert array values to object with truthy values, used by contains function below
        for (var i = 0; i < this.length; i++) {
            this.object[this.array[i]] = true;
        }
    }

    // compare this object with another; return true if they share at least one value
    this.contains = function(other) {
        if (this.length === 0 || other.length === 0) {
            return false;
        } else if (this.length === 1 && this.value !== null) {
            if (other.length === 1) {
                return this.value === other.value;
            } else {
                return other.object.hasOwnProperty(this.value);
            }
        } else if (other.length < this.length) {
            return other.contains(this); // better to loop through the smaller object
        } else {
            for (var key in this.object) {
                if (other.object[key]) {
                    return true;
                }
            }
            return false;
        }
    }
}

// shims to ensure we have newer Array utility methods
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) == '[object Array]';
    };
}


//media/js/libs/pxloader/PxLoaderImage.js
// @depends PxLoader.js
/**
 * PxLoader plugin to load images
 */

function PxLoaderImage(url, tags, priority) {
    var self = this,
        loader = null;

    this.img = new Image();
    this.tags = tags;
    this.priority = priority;

    var onReadyStateChange = function() {
        if (self.img.readyState == 'complete') {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    var onLoad = function() {
        removeEventHandlers();
        loader.onLoad(self);
    };

    var onError = function() {
        removeEventHandlers();
        loader.onError(self);
    };

    var removeEventHandlers = function() {
        self.unbind('load', onLoad);
        self.unbind('readystatechange', onReadyStateChange);
        self.unbind('error', onError);
    };

    this.start = function(pxLoader) {
        // we need the loader ref so we can notify upon completion
        loader = pxLoader;

        // NOTE: Must add event listeners before the src is set. We
        // also need to use the readystatechange because sometimes
        // load doesn't fire when an image is in the cache.
        self.bind('load', onLoad);
        self.bind('readystatechange', onReadyStateChange);
        self.bind('error', onError);

        self.img.src = url;
    };

    // called by PxLoader to check status of image (fallback in case
    // the event listeners are not triggered).
    this.checkStatus = function() {
        if (self.img.complete) {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    // called by PxLoader when it is no longer waiting
    this.onTimeout = function() {
        removeEventHandlers();
        if (self.img.complete) {
            loader.onLoad(self);
        } else {
            loader.onTimeout(self);
        }
    };

    // returns a name for the resource that can be used in logging
    this.getName = function() {
        return url;
    };

    // cross-browser event binding
    this.bind = function(eventName, eventHandler) {
        if (self.img.addEventListener) {
            self.img.addEventListener(eventName, eventHandler, false);
        } else if (self.img.attachEvent) {
            self.img.attachEvent('on' + eventName, eventHandler);
        }
    };

    // cross-browser event un-binding
    this.unbind = function(eventName, eventHandler) {
        if (self.img.removeEventListener) {
            self.img.removeEventListener(eventName, eventHandler, false);
        } else if (self.img.detachEvent) {
            self.img.detachEvent('on' + eventName, eventHandler);
        }
    };

}

// add a convenience method to PxLoader for adding an image
PxLoader.prototype.addImage = function(url, tags, priority) {
    var imageLoader = new PxLoaderImage(url, tags, priority);
    this.add(imageLoader);

    // return the img element to the caller
    return imageLoader.img;
};


