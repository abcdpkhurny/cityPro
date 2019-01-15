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
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.onceOpen = false;
        return _this;
    }
    GameScene.prototype.toPlay = function () {
        var _this = this;
        this.onceOpen = true;
        //初始建造列表
        if (!this.buildUI)
            this.buildUI = new BuildUI();
        if (!this.updateBuild)
            this.updateBuild = new UpdateBuild();
        if (!this.maxBuild)
            this.maxBuild = new MaxBuild();
        if (!this.loading)
            this.loading = new LoadingUI();
        if (!this.loadingMask) {
            //处理遮罩，避免底层事件影响
            this.loadingMask = new egret.Shape();
            this.loadingMask.graphics.beginFill(0x000000, 1);
            this.loadingMask.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
            this.loadingMask.graphics.endFill();
            this.loadingMask.alpha = 0.5;
            //禁止底层的事件操作
            this.loadingMask.touchEnabled = true;
        }
        this.buildUI.callback = this.createBuild.bind(this);
        BuildData.upperEnes = 15;
        //这里是测试，应为数据的
        BuildData.playEne = GameConst.player.energy;
        //建筑显示
        this.buildBase = new BuildBase();
        this.addChild(this.buildBase);
        this.buildBase.initBuilds();
        this.builds = this.buildBase.initBuildEvet();
        //建筑绑定事件
        for (var i = 0; i < this.builds.length; i++) {
            var build = this.builds[i];
            if (build["house"]) {
                var nbuild = build;
                var fun = this.clickBuild.bind(this, nbuild);
                nbuild["fun"] = fun;
                nbuild.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);
            }
            else {
                var nbuild = build;
                var fun = this.clickBase.bind(this, nbuild);
                nbuild["fun"] = fun;
                nbuild.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);
            }
        }
        this.buildBase.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            GameConst.removeChild(_this);
        }, this);
        this.buildUI.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            _this.controlBacksh(false);
            console.log("关闭了buildUI");
            _this.buildBase.updateEnergy();
        }, this);
        this.maxBuild.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            _this.controlBacksh(false);
            console.log("关闭了maxBuild");
            //摧毁
            if (_this.maxBuild.isDel) {
                _this.updateBuild.isDel = false;
                _this.DelBuild(_this.maxBuild.rootBuild);
            }
            _this.buildBase.updateEnergy();
        }, this);
        this.updateBuild.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
            _this.controlBacksh(false);
            console.log("关闭了updateBuild");
            //这里是也是跨服请求
            //正确升级
            if (_this.updateBuild.isOK) {
                _this.updateBuild.isOK = false;
                var build_1 = _this.updateBuild.updateBuild;
                var infoData = _this.updateBuild.updateImg;
                _this.addChild(_this.loadingMask);
                _this.addChild(_this.loading);
                var url = GameConst.url + "cityPro/updateHouse.do";
                var param = "openid=" + GameConst.player.openid + "&name=" + build_1.name + "&no=" + infoData.no + "&grade=" + infoData.grade + "&expend=" + (-infoData.expend);
                var req_1 = GameConst.reqGetJSON(url + "?" + param);
                req_1.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                    console.log("更新超时");
                    _this.removeChildAll();
                }, _this);
                req_1.addEventListener(egret.Event.COMPLETE, function () {
                    var data = req_1.response;
                    // console.log(data);
                    // console.log(param);
                    var josnDate = JSON.parse(data);
                    if (josnDate.code == 0) {
                        _this.buildBase.updateImgOfBuild(_this.updateBuild.updateImg, _this.updateBuild.updateBuild);
                        _this.buildBase.updateEnergy();
                        console.log("更新成功");
                        _this.removeChildAll();
                    }
                }, _this);
            }
            //摧毁
            if (_this.updateBuild.isDel) {
                _this.updateBuild.isDel = false;
                console.log("摧毁");
                _this.DelBuild(_this.updateBuild.rootBuild);
            }
        }, this);
    };
    GameScene.prototype.clickBase = function (nbuild) {
        console.log("点中了空地" + nbuild.name);
        this.controlBacksh(true);
        this.addChild(this.buildUI);
        this.buildUI.base = nbuild;
        this.buildUI.src_build.viewport.scrollV = 0;
    };
    GameScene.prototype.clickBuild = function (nbuild) {
        console.log("点中了房子:" + nbuild.name);
        var infoData = nbuild["infoData"];
        var newImg = BuildData.fetchBuild(infoData.no, infoData.grade + 1);
        this.controlBacksh(true);
        if (newImg) {
            console.log("还能升上去");
            var img = newImg.image.substring(newImg.image.lastIndexOf("/") + 1).replace(".", "_");
            this.addChild(this.updateBuild);
            this.updateBuild.rootBuild = nbuild;
            this.updateBuild.init(infoData.grade + 1, newImg.expend, infoData.text, nbuild.source, img, newImg, nbuild);
        }
        else {
            console.log("升不上了");
            this.addChild(this.maxBuild);
            this.maxBuild.init(nbuild);
        }
    };
    /**更新选中地基后的建造 */
    GameScene.prototype.createBuild = function (data, base) {
        var _this = this;
        var build = this.buildBase.fetchBuild(base.name);
        var infoData = BuildData.fetchBuild(data.no, data.grade);
        //这里为建筑添加点击事件，而且发送数据到后台更新
        this.addChild(this.loadingMask);
        this.addChild(this.loading);
        var url = GameConst.url + "cityPro/addHouse.do";
        var param = "openid=" + GameConst.player.openid + "&name=" + base.name + "&no=" + infoData.no + "&grade=" + infoData.grade + "&expend=" + (-infoData.expend);
        var req = GameConst.reqGetJSON(url + "?" + param);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            console.log("添加超时");
            _this.removeChildAll();
        }, this);
        req.addEventListener(egret.Event.COMPLETE, function () {
            var data = req.response;
            //console.log(data);
            var josnDate = JSON.parse(data);
            if (josnDate.code == 0) {
                build["infoData"] = infoData;
                //这里字符串截取
                var str = infoData.image.substring(infoData.image.lastIndexOf("/") + 1).replace(".", "_");
                build.source = str;
                base.removeEventListener(egret.TouchEvent.TOUCH_TAP, base["fun"], _this);
                //绑定建筑事件
                var fun = _this.clickBuild.bind(_this, build);
                build["fun"] = fun;
                build.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, _this);
                _this.buildBase.updateEnergy();
                console.log("添加成功");
                _this.removeChildAll();
            }
        }, this);
    };
    GameScene.prototype.removeChildAll = function () {
        GameConst.removeChild(this.loading);
        GameConst.removeChild(this.loadingMask);
    };
    //删除建筑
    GameScene.prototype.DelBuild = function (build) {
        var _this = this;
        var infoData = build["infoData"];
        this.buildBase.delImgofBuild(build);
        this.addChild(this.loadingMask);
        this.addChild(this.loading);
        var url = GameConst.url + "cityPro/updateHouse.do";
        var param = "openid=" + GameConst.player.openid + "&name=" + build.name + "&no=" + 0 + "&grade=" + infoData.grade + "&expend=-1";
        var req = GameConst.reqGetJSON(url + "?" + param);
        req.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            console.log("删除超时");
            _this.removeChildAll();
        }, this);
        req.addEventListener(egret.Event.COMPLETE, function () {
            var data = req.response;
            var josnDate = JSON.parse(data);
            if (josnDate.code == 0) {
                //删除建筑事件
                build.removeEventListener(egret.TouchEvent.TOUCH_TAP, build["fun"], _this);
                //绑定地基事件
                var name = build.name;
                var base = _this.buildBase.fetchBase(name);
                var fun = _this.clickBase.bind(_this, base);
                base["fun"] = fun;
                base.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, _this);
                _this.buildBase.updateEnergy();
                console.log("后台删除成功");
                _this.removeChildAll();
            }
        }, this);
    };
    /**
     * 控制黑底出现
     */
    GameScene.prototype.controlBacksh = function (flay) {
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
    return GameScene;
}(eui.Component));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map