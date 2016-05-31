(function(root,factory){
	if(typeof define==='function' && define.amd){
		define([],factory)
	}else if(typeof exports === 'object'){
		module.exports = factory();
	}else{
		root.Modal = factory();
	}
}(this,function(){
	var defaults = {
		title:'',
		text:'',
		hasMask:true, //是否需要遮罩
		hasFoot:true, //是否需要foot
		hasCancelBtn:true,
		okButText:'确定',
		cancelButText:'取消',
		autoCloseDelay:0,
		divEl:document.createElement('div'),
	};
	function Modal(options){
		defaults = extend(defaults,options)
		this.defaults = defaults;
		this.init();
	}
	Modal.prototype.init = function(){
		var self = this;
		this.renderTemplate();
		this.defaults.hasFoot&&bindEvents(this.defaults.okBtnCallback,this.cancelCallback,this);
		this.defaults.autoCloseDelay&&
		setTimeout(function(){
			self.cancelCallback();
		},this.defaults.autoCloseDelay)
	}
	Modal.prototype.renderTemplate = function(){
		this.defaults.divEl.className = 'modal-pop' 
		var html = setTemplate(this.defaults);
		this.defaults.divEl.innerHTML = html;
		document.getElementsByTagName('body')[0].appendChild(this.defaults.divEl);
	}
	Modal.prototype.cancelCallback = function(){
		var bodyEl = document.getElementsByTagName('body')[0];
		bodyEl.removeChild(this.defaults.divEl);
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
		var maskHtml = obj.hasMask?'<div class="modal-msk"></div>':'',
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
		console.log(obj)
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


