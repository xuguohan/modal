(function(root,factory){
	if(typeof define==='function' && define.amd){
		define(['$'],factory)
	}else if(typeof exports === 'object'){
		module.exports = factory();
	}else{
		root.Modal = factory();
	}
}(this,function(){
	var defaults = {
		title:'',
		text:'',
		isMask:true, //是否需要遮罩
		hasFoot:true, //是否需要foot
		hasCancelBtn:true,
		okButText:'确定',
		cancelButText:'取消',
		autoCloseDelay:0
	}
	var Modal = function(){
		this.divEl = document.createElement('div');
	} 

	Modal.prototype.init = function(options){
		var obj = extend(defaults,options)
		var self = this;
		this.renderTemplate(obj);
		obj.hasFoot&&bindEvents(obj.okBtnCallback,this.cancelCallback,this);
		obj.autoCloseDelay&&
		setTimeout(function(){
			self.cancelCallback();
		},obj.autoCloseDelay)
	}
	Modal.prototype.renderTemplate = function(obj){
		var divEl = document.createElement('div');
		this.divEl.className = 'modal-pop' 
		var html = setTemplate(obj);
		this.divEl.innerHTML = html;
		document.getElementsByTagName('body')[0].appendChild(this.divEl);
	}
	Modal.prototype.cancelCallback = function(){
		var bodyEl = document.getElementsByTagName('body')[0];
		bodyEl.removeChild(this.divEl);
	}
	function bindEvents(okCallback,cancelCallback,context) {
		var obkBtn = document.getElementById('sureBtn');
		var cancelBtn = document.getElementById('cancelBtn');
		okCallback && 
		obkBtn.addEventListener('click',function(){
			okCallback.apply(context);
			cancelCallback.apply(context);
		},false)
		cancelBtn.addEventListener('click',function(){
			cancelCallback.apply(context)
		},false)
	}
	
	
	function setTemplate(obj){
		var maskHtml = obj.isMask?'<div class="modal-msk"></div>':'',
			html= '',
			keys = {
				title: titleTemplate,
				tetx:textTemplate,
				foot:footTemplate
			}
			for(var i in keys){
				var strHtml = keys[i](obj);
				html += strHtml;
			}
		return maskHtml+'<div class="modal-con">'+html+"</div>"
	}
	function titleTemplate(obj){
		return	obj.title ? '<h1 class="modal-head">'+obj.title+'</h1>':'';
	}
	function textTemplate(obj){
		return  obj.text ? '<div class="modal-text">'+obj.text+'</div>':'';
	}
	function footTemplate(obj){
		var cancelBtn = obj.hasCancelBtn?'<span>'+obj.cancelButText+'</span>':'';
		return obj.hasFoot?'<div class="modal-btns"><span id="sureBtn">'+obj.okButText+'</span><span id="cancelBtn">'+cancelBtn+'</span></div>':''
	}
	
	function _isObject(o){
        return Object.prototype.toString.call(o) === '[object Object]';
    }
	function _extend(destination, source) {
        var property;
        for (property in destination) {
            if (destination.hasOwnProperty(property)) {

                // 若destination[property]和sourc[property]都是对象，则递归
                if (_isObject(destination[property]) && _isObject(source[property])) {
                    self(destination[property], source[property]);
                };

                // 若sourc[property]已存在，则跳过
                if (source.hasOwnProperty(property)) {
                    continue;
                } else {
                    source[property] = destination[property];
                }
            }
        }
    }
	function extend(sorce,target){
		var arr = arguments,
            result = {},
            i;

        if (!arr.length) return {};

        for (i = arr.length - 1; i >= 0; i--) {
            if (_isObject(arr[i])) {
                _extend(arr[i], result);
            };
        }

        arr[0] = result;
        return result;
	}


	return Modal;
}))


