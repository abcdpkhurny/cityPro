var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var BuildUI = (function (_super) {
    __extends(BuildUI, _super);
    function BuildUI() {
        return _super.call(this) || this;
    }
    BuildUI.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BuildUI.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log("关闭选择建造");
            GameConst.removeChild(_this);
        }, this);
        // 数组数据
        var dataArr = BuildData.getAllBasics();
        // 把数组数据转成EUI数组
        var euiArr = new eui.ArrayCollection(dataArr);
        // 把EUI数组作为list的数据源
        this.list_build.dataProvider = euiArr;
        // 隐藏进度条
        this.src_build.horizontalScrollBar.autoVisibility = false;
        var datalist = this.list_build.dataProvider.source;
        //对数据增加事件
        this.list_build.addEventListener(eui.ItemTapEvent.ITEM_TAP, function (e) {
            //获取对象数据
            var data = datalist[e.itemIndex];
            //console.log(data)
            //这里处理点击后是否选中肯定
            if (!_this.upgrade) {
                _this.upgrade = new Upgrade();
            }
            _this.controlBacksh(true);
            _this.addChild(_this.upgrade);
            //初始化肯定，取消
            _this.upgrade.faly = false;
            _this.upgrade.init(data.grade, data.expend, data.text);
            //这里弄一个切片
            _this.upgrade.once(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.controlBacksh(false);
                //选择为肯定
                if (_this.upgrade.faly && !_this.upgrade.isOK) {
                    //点数不足
                    if (!_this.checkUI)
                        _this.checkUI = new CheckUI();
                    else
                        _this.checkUI.init();
                    _this.controlBacksh(true);
                    _this.addChild(_this.checkUI);
                    _this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, function () {
                        console.log("删除切片");
                        _this.controlBacksh(false);
                    }, _this);
                }
                else if (_this.upgrade.faly) {
                    //点数足够
                    //console.log(data)
                    //回调方法
                    _this.callback(data, _this.base);
                    _this.base = null;
                    GameConst.removeChild(_this);
                }
            }, _this);
        }, this);
        //this.src_build.horizontalScrollBar.autoVisibility = false
    };
    /**
     * 控制黑底出现
     */
    BuildUI.prototype.controlBacksh = function (flay) {
        if (flay === void 0) { flay = false; }
        if (!this.backShp) {
            this.backShp = new egret.Shape();
            this.backShp.graphics.beginFill(0x000000, 0.2);
            this.backShp.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
            this.backShp.graphics.endFill();
            this.backShp.touchEnabled = true;
        }
        if (flay) {
            this.addChild(this.backShp);
        }
        else {
            GameConst.removeChild(this.backShp);
        }
    };
    return BuildUI;
}(eui.Component));
__reflect(BuildUI.prototype, "BuildUI", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BuildUI.js.map