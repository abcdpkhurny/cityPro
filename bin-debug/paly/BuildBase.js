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
var BuildBase = (function (_super) {
    __extends(BuildBase, _super);
    function BuildBase() {
        var _this = _super.call(this) || this;
        /**地基数组 */
        _this.bases = [];
        /**建筑数组 */
        _this.builds = [];
        return _this;
    }
    BuildBase.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BuildBase.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        //this.bases = [this.imgBase1_1, this.imgBase1_2, this.imgBase1_3]
        //this.builds = [this.imgBuild1_1, this.imgBuild1_3, this.imgBuild1_2]
        this.bases = this.groupBase.$children;
        this.builds = this.groupBuild.$children;
        //玩家头像
        if (GameConst.player.avatarUrl)
            this.imgInfo.source = "icon_avatarUrl_png";
        // if (GameConst.player.avatarUrl) this.imgInfo.source = GameConst.player.avatarUrl
        // else this.imgInfo.source = "icon_avatarUrl_png"
        this.imgInfo.width = 93;
        this.imgInfo.height = 93;
        //画一个红色的正方形
        var square = new egret.Shape();
        square.graphics.beginFill(0xff0000);
        square.graphics.drawRoundRect(this.imgInfo.x, this.imgInfo.y, this.imgInfo.width, this.imgInfo.height, 40, 40);
        square.graphics.endFill();
        this.addChild(square);
        this.imgInfo.mask = square;
        //判断名字
        var nickName = GameConst.player.nickName;
        var path = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
        var regEx = new RegExp(path);
        //判断是否存在中文
        if (regEx.test(nickName) == false) {
            console.log('不存在中文');
            if (nickName.length > 14)
                this.textName.text = nickName.substring(0, 14) + '...';
            else
                this.textName.text = nickName;
        }
        else {
            console.log('存在中文');
            if (nickName.length > 7)
                this.textName.text = nickName.substring(0, 7) + '...';
            else
                this.textName.text = nickName;
        }
        this.updateEnergy();
    };
    /**初始化建筑 */
    BuildBase.prototype.initBuilds = function () {
        console.log(GameConst.player);
        var builddata = [];
        if (GameConst.player) {
            builddata = GameConst.player.houselist;
        }
        for (var i = 0; i < this.builds.length; i++) {
            var build = this.builds[i];
            build["house"] = true;
            build["infoData"] = null;
            build.source = "";
            //这是测试，判断从数据库拿出的数据，对上贴图
            for (var j = 0; j < builddata.length; j++) {
                var data = builddata[j];
                if (build.name == data.name && data.no != 0) {
                    //console.log(build.name)
                    var infoData = BuildData.fetchBuild(data.no, data.grade);
                    build["infoData"] = infoData;
                    //这里字符串截取
                    var str = infoData.image.substring(infoData.image.lastIndexOf("/") + 1).replace(".", "_");
                    build.source = str;
                }
            }
        }
    };
    /**初始化建筑事件 */
    BuildBase.prototype.initBuildEvet = function () {
        var list = [];
        //这里应该是，有房子的绑定房子，没房子的绑定地面
        for (var i = 0; i < this.builds.length; i++) {
            var build = this.builds[i];
            //不空为绑定房子，空为绑定地基
            if (build.source == "") {
                var base = this.fetchBase(build.name);
                if (base)
                    list.push(base);
            }
            else {
                list.push(build);
            }
        }
        return list;
    };
    /**按名字寻找地基 */
    BuildBase.prototype.fetchBase = function (name) {
        for (var i = 0; i < this.bases.length; i++) {
            var base = this.bases[i];
            if (base.name == name)
                return base;
        }
        return;
    };
    /**按名字寻找建筑 */
    BuildBase.prototype.fetchBuild = function (name) {
        for (var i = 0; i < this.builds.length; i++) {
            var build = this.builds[i];
            if (build.name == name)
                return build;
        }
        return;
    };
    /**更新建筑贴图 */
    BuildBase.prototype.updateImgOfBuild = function (img, build) {
        var newBuild = this.fetchBuild(build.name);
        newBuild["infoData"] = img;
        //这里字符串截取
        var str = img.image.substring(img.image.lastIndexOf("/") + 1).replace(".", "_");
        newBuild.source = str;
    };
    /**删除建筑贴图 */
    BuildBase.prototype.delImgofBuild = function (build) {
        build["infoData"] = null;
        build.source = "";
    };
    /**更新能量 */
    BuildBase.prototype.updateEnergy = function () {
        GameConst.player.energy = BuildData.playEne;
        this.textEnergy.text = "能量：" + GameConst.player.energy;
    };
    return BuildBase;
}(eui.Component));
__reflect(BuildBase.prototype, "BuildBase", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=BuildBase.js.map