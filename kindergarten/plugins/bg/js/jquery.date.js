/**
 * jQuery date plugin v0.0.2
 * momentjs: http://momentjs.cn/
 * project: http://steamcommunity.com/sharedfiles/filedetails/?id=921617616&searchtext=
 * @license MIT licensed
 * @author Alice
 * @date 2017/05/24
 */

(function (global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function ($) {
            return factory($, global, global.document, global.Math);
        });
    } else if (typeof exports === "object" && exports) {
        module.exports = factory(require('jquery'), global, global.document, global.Math);
    } else {
        factory(jQuery, global, global.document, global.Math);
    }
})(typeof window !== 'undefined' ? window : this, function ($, window, document, Math, undefined) {

    'use strict';

    //兼容requestAnimFrame、cancelAnimationFrame
    //--------------------------------------------------------------------------------------------------------------

    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());

    //私有变量
    //--------------------------------------------------------------------------------------------------------------

    var canvas;                     // canvas对象
    var context;                    // context对象
    var canvasWidth, canvasHeight;  // canvas宽度和高度
    var originX, originY;           // 原点位置
    var minLength = 300;            // 最小长度

    var timer = null;  // 时间计时器

    //私有方法
    //--------------------------------------------------------------------------------------------------------------

    /**
     * 时间格式说明：
     * YYYY：年 MMM：月（非数字） MM：月（数字） Do：日（非数字） DD：日（数字）
     * HH：小时(二十四小时制) hh：小时(十二小时制) mm：分钟 ss：秒
     * a：时间段 dddd：星期
     */

    /**
     * 获取时间
     *
     * @param  {int} timeStyle 时间风格选择
     * @return {string} 时间字符串
     */
    function getTime(timeStyle) {
        switch (timeStyle) {
            case 1:
                return moment().format('hh:mm:ss a');
            case 2:
                return moment().format('hh:mm:ss');
            case 3:
                return moment().format('HH:mm:ss a');
            case 4:
                return moment().format('HH:mm:ss');
            case 5:
                return moment().format('hh:mm a');
            case 6:
                return moment().format('hh:mm');
            case 7:
                return moment().format('HH:mm a');
            case 8:
                return moment().format('HH:mm');
        }
    }

    /**
     * 获取日期
     *
     * @param  {int} dateStyle 日期风格选择
     * @return {string} 时间字符串
     */
    function getDate(dateStyle) {
        switch (dateStyle) {
            case 1:
                return moment().format('LL');
            case 2:
                return moment().format('LL dddd');
            case 3:
                return moment().format('MM - DD dddd');
            case 4:
                return moment().format('MM - DD');
            case 5:
                return moment().format('MMM Do dddd');
            case 6:
                return moment().format('MMM Do');
            case 7:
                return moment().format('[Days] DDDD');
        }
    }

    /**
     * 开始时间计时器
     *
     * @param that {!Object} that 对象Date
     * - that.offsetX      {float}   X坐标偏移
     * - that.offsetY      {float}   Y坐标偏移
     * - that.isDate       {boolean} 是否显示日期
     * - that.timeFontSize {int}     时间字体大小
     * - that.timeStyle    {int}     时间显示风格
     * - that.dateFontSize {int}     日期字体大小
     * - that.dateStyle    {int}     日期显示风格
     */
    function runDateTimer(that) {
        timer = setInterval(
            function () {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                originX = canvasWidth * that.offsetX;
                originY = canvasHeight * that.offsetY;
                if (that.isDate) {
                    context.font = that.timeFontSize + 'px 微软雅黑';
                    context.fillText(getTime(that.timeStyle), originX, originY - that.timeFontSize / 2);
                    context.font = that.dateFontSize + 'px 微软雅黑';
                    context.fillText(getDate(that.dateStyle), originX, originY + that.dateFontSize / 2);
                }
            }, 1000);
    }

    /** 停止时间计时器 */
    function stopDateTimer() {
        setInterval(timer);
    }

    //构造函数和公共方法
    //--------------------------------------------------------------------------------------------------------------

    /**
     *  初始化Date
     *
     * @param {!Object} el      被选中的节点
     * @param {Object}  options 参数对象
     */
    var Date = function (el, options) {
        this.$el = $(el);

        // 全局参数
        this.opacity = options.opacity;              // 不透明度
        this.color = options.color;                  // 颜色
        this.shadowColor = options.shadowColor;      // 阴影颜色
        this.shadowBlur = options.shadowBlur;        // 发光程度
        // 坐标参数
        this.offsetX = options.offsetX;              // X坐标偏移
        this.offsetY = options.offsetY;              // Y坐标偏移
        this.isClickOffset = options.isClickOffset;  // 鼠标坐标偏移
        // 日期参数
        this.isDate = options.isDate;                // 是否显示日期
        this.timeStyle = options.timeStyle;          // 时间显示风格
        this.dateStyle = options.dateStyle;          // 日期显示风格
        this.timeFontSize = options.timeFontSize;    // 字体大小
        this.dateFontSize = options.dateFontSize;    // 字体大小
        this.language = options.language;            // 日期语言

        // 创建并初始化canvas
        canvas = document.createElement('canvas');
        canvas.id = 'canvas-date'; // canvas ID
        $(canvas).css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'z-index': 3,
            'opacity': this.opacity
        });  // canvas CSS
        canvasWidth = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        canvasHeight = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        // 获取最小宽度以及原点
        minLength = Math.min(canvasWidth, canvasHeight);
        originX = canvasWidth * this.offsetX;
        originY = canvasHeight * this.offsetY;

        // 创建并初始化绘图的环境
        context = canvas.getContext('2d');
        context.fillStyle = 'rgb(' + this.color + ')';
        // 线条属性
        context.lineWidth = this.lineWidth;
        context.strokeStyle = 'rgb(' + this.color + ')';
        // 阴影属性
        context.shadowColor = 'rgb(' + this.color + ')';
        context.shadowBlur = this.shadowBlur;
        // 文字属性
        context.font = this.timeFontSize + 'px 微软雅黑';
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        $(this.$el).append(canvas);  // 添加canvas

        moment.lang('zh-cn');  // 默认日期语言为中文

        // 默认开启
        this.setupPointerEvents();
        this.startDate();

    };

    // 公共方法
    Date.prototype = {

        /** 设置交互事件 */
        setupPointerEvents: function () {

            // 点击事件
            var that = this;
            $(this.$el).click(function (e) {
                if (that.isClickOffset) {
                    var x = e.clientX || canvasWidth * that.offsetX;
                    var y = e.clientY || canvasHeight * that.offsetY;
                    that.offsetX = x / canvasWidth;
                    that.offsetY = y / canvasHeight;
                    this.drawDate();
                }
            });

            // 窗体改变事件
            $(window).on('resize', function() {
                // 改变宽度和高度
                canvasWidth =  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                canvasHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                // 获取最小宽度以及原点
                minLength = Math.min(canvasWidth, canvasHeight);
                originX = canvasWidth * this.offsetX;
                originY = canvasHeight * this.offsetY;
            });

        },

        /** 清除Canvas内容 */
        clearCanvas: function () {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
        },

        /** 绘制时间 */
        drawDate: function () {
            this.clearCanvas();
            originX = canvasWidth * this.offsetX;
            originY = canvasHeight * this.offsetY;
            if (this.isDate) {
                context.font = this.timeFontSize + 'px 微软雅黑';
                context.fillText(getTime(this.timeStyle), originX, originY - this.timeFontSize / 2);
                context.font = this.dateFontSize + 'px 微软雅黑';
                context.fillText(getDate(this.dateStyle), originX, originY + this.dateFontSize / 2);
            }
        },

        /** 开始绘制时间 */
        startDate: function () {
            runDateTimer(this);
        },

        /** 停止绘制时间 */
        stopDate: function () {
            stopDateTimer();
        },

        /** 移除canvas */
        destroy: function() {
            this.$el
                .off('#canvas-date')
                .removeData('date');
            $('#canvas-date').remove();
        },

        /**
         * 修改参数
         * @param {string} property 属性名
         * @param {*}      value    属性对应值
         */
        set: function (property, value) {
            switch (property) {
                case 'opacity':
                    $(canvas).css(property, value);
                    break;
                case 'color':
                    context.fillStyle = 'rgb(' + value + ')';
                    context.strokeStyle = 'rgb(' + value + ')';
                    this.drawDate();
                    break;
                case 'shadowColor':
                    context.shadowColor = 'rgb(' + value + ')';
                    this.drawDate();
                    break;
                case 'shadowBlur':
                    context.shadowBlur = value;
                    this.drawDate();
                    break;
                case 'isClickOffset':
                    this[property] = value;
                    break;
                case 'isDate':
                case 'timeStyle':
                case 'dateStyle':
                case 'timeFontSize':
                case 'dateFontSize':
                case 'offsetX':
                case 'offsetY':
                    this[property] = value;
                    this.drawDate();
                    break;
                case 'language':
                    moment.lang(value);
                    this.drawDate();
                    break;
            }
        }

    };

    // 默认参数
    Date.DEFAULTS = {
        // 全局参数
        opacity: 0.90,               // 不透明度
        color: '253,190,52',        // 颜色
        shadowColor: '255,255,255',  // 阴影颜色
        shadowBlur: 15,              // 发光程度
        // 坐标参数
        offsetX: 0.8,                // X坐标偏移
        offsetY: 0.3,                // Y坐标偏移
        isClickOffset: false,        // 鼠标坐标偏移
        // 坐标参数
        isDate: true,                // 是否显示日期
        timeStyle: 1,                // 时间显示风格
        dateStyle: 2,                // 日期显示风格
        timeFontSize: 60,            // 时间字体大小
        dateFontSize: 30,            // 日期字体大小
        language: 'zh_cn'            // 日期语言
    };

    //定义Date插件
    //--------------------------------------------------------------------------------------------------------------

    var old = $.fn.date;

    $.fn.date = function (option) {
        var args = (arguments.length > 1) ? Array.prototype.slice.call(arguments, 1) : undefined;

        return this.each(function () {
            var $this = $(this);
            var data = $this.data('date');
            var options = $.extend({}, Date.DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data && typeof option === 'string') {
                return;
            }
            if (!data) {
                $this.data('date', (data = new Date(this, options)));
            }
            else if (typeof option === 'string') {
                Date.prototype[option].apply(data, args);
            }
        });
    };

    $.fn.date.Constructor = Date;

    // 确保插件不冲突
    $.fn.date.noConflict = function () {
        $.fn.date = old;
        return this;
    };

});