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
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this) || this;
    }
    MainScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    MainScene.prototype.childrenCreated = function () {
        var _this = this;
        _super.prototype.childrenCreated.call(this);
        this.mbtns = [this.mbtnStart, this.mbtnShare, this.mbtnInfo, this.mbtnRanking, this.mbtnMore];
        for (var i = this.mbtns.length - 1; i > -1; --i) {
            // 事件委托, 点击按钮的时候触发toggleBtn
            this.mbtns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                var theBtn = e.target;
                _this.toggleBtn(theBtn);
            }, this);
        }
        //下面都是测试用,数据录入用于微信小游戏
        ////////////////////////////////
        //处理遮罩，避免开放数据域事件影响主域。
        this.loadingMask = new egret.Shape();
        this.loadingMask.graphics.beginFill(0x000000, 1);
        this.loadingMask.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
        this.loadingMask.graphics.endFill();
        this.loadingMask.alpha = 0.5;
        //禁止底层的事件操作
        this.loadingMask.touchEnabled = true;
        this.loading = new LoadingUI();
        this.addChild(this.loadingMask);
        this.addChild(this.loading);
        var url = GameConst.url + "cityPro/userInfo.do";
        var param = "openid=onJoc5JSThWszGrGVmWaONpLss6k";
        var req = GameConst.reqGetJSON(url + "?" + param);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            console.log("加载切片超时");
            _this.removeChildAll();
        }, this);
        req.addEventListener(egret.Event.COMPLETE, function () {
            var data = req.response;
            //console.log(data);
            var josnDate = JSON.parse(data);
            //查询成功
            if (josnDate.code == 0) {
                //录入数据
                GameConst.player = josnDate.data;
                _this.removeChildAll();
                var btn = new eui.Button();
                btn.label = "Click";
                btn.verticalCenter = 0;
                btn.horizontalCenter = 0;
                _this.addChild(btn);
                btn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    SceneManager.toGameScene();
                }, _this);
            }
        }, this);
        ////////////////////////////////
    };
    MainScene.prototype.removeChildAll = function () {
        GameConst.removeChild(this.loading);
        GameConst.removeChild(this.loadingMask);
    };
    MainScene.prototype.receiveCheck = function () {
    };
    /**
     * 切换按钮
     * @param btn 参数是eui.ToggleButton的时候切换按钮, 参数是0的时候设置为全部不选中
     */
    MainScene.prototype.toggleBtn = function (btn) {
        //console.log('点击')
        var _this = this;
        // 先把所有的按钮都设置为不选中
        for (var i = this.mbtns.length - 1; i > -1; --i) {
            this.mbtns[i].selected = false;
        }
        if (btn === 0) {
            //console.log('返回');
            return;
        }
        btn = btn;
        // 获取当前点击的按钮的下标, 用来实现不同按钮对应的功能
        // 0 1 2 3 4 对应 开始游戏, 分享, 说明
        var index = this.mbtns.lastIndexOf(btn);
        switch (index) {
            case 0:
                SceneManager.toGameScene();
                break;
            case 1:
                platform.shareAppMessage();
                console.log("分享");
                break;
            case 2:
                if (!this.mainInfo)
                    this.mainInfo = new MainInfo();
                this.controlBacksh(true);
                this.addChild(this.mainInfo);
                this.mainInfo.once(egret.Event.REMOVED_FROM_STAGE, function () {
                    _this.controlBacksh(false);
                }, this);
                console.log("说明");
                break;
            case 3:
            //这里是排行榜
            //this.onButtonClick()
            default:
                break;
        }
    };
    /**
     * 控制黑底出现
     */
    MainScene.prototype.controlBacksh = function (flay) {
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
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=MainScene.js.map