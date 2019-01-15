var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**常用常量类 */
var GameConst = (function () {
    function GameConst() {
    }
    /**根据名字创建位图 */
    GameConst.CreateBitmapByName = function (name) {
        var texture = RES.getRes(name);
        var bitmap = new egret.Bitmap(texture);
        return bitmap;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
     */
    GameConst.createBitmapFromSheet = function (name, sheetName) {
        var texture = RES.getRes(sheetName + "_json." + name);
        var result = new egret.Bitmap(texture);
        return result;
    };
    GameConst.getTextureFromSheet = function (name, sheetName) {
        var result = RES.getRes(sheetName + "_json." + name);
        return result;
    };
    /**
     * 面罩
     */
    GameConst.createLoadingMask = function (alpha, coloer, touch) {
        if (alpha === void 0) { alpha = 0.5; }
        if (coloer === void 0) { coloer = 0x000000; }
        if (touch === void 0) { touch = false; }
        var loadingMask = new egret.Shape();
        loadingMask.graphics.beginFill(coloer, alpha);
        loadingMask.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
        loadingMask.graphics.endFill();
        loadingMask.touchEnabled = touch;
        return loadingMask;
    };
    /**
     * 块显示，删除
     */
    GameConst.controlBacksh = function (backShp, flay, that) {
        if (flay) {
            that.addChild(backShp);
        }
        else {
            GameConst.removeChild(backShp);
        }
    };
    /**get请求 */
    GameConst.reqGetJSON = function (url) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        request.send();
        return request;
    };
    /**post请求 */
    GameConst.reqPostJSON = function (url) {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        request.send();
        return request;
    };
    /**移除子类方法 */
    GameConst.removeChild = function (child) {
        if (child && child.parent) {
            if (child.parent.removeElement) {
                child.parent.removeElement((child));
            }
            else {
                child.parent.removeChild(child);
            }
        }
    };
    /**路径 */
    GameConst.url = "https://zerosky.zerosky.top/";
    return GameConst;
}());
__reflect(GameConst.prototype, "GameConst");
//# sourceMappingURL=GameConst.js.map