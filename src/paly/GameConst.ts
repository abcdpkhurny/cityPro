/**常用常量类 */
class GameConst {
	/**舞台宽度 */
	public static StageW: number;
	/**舞台高度 */
	public static StageH: number;
	/**路径 */
	public static url: String = "https://zerosky.zerosky.top/";
	/**玩家信息 */
	public static player;
	/**排行榜 */
	public static Ranking: egret.Bitmap;
	/**根据名字创建位图 */
	public static CreateBitmapByName(name: string): egret.Bitmap {
		let texture: egret.Texture = RES.getRes(name);
		let bitmap: egret.Bitmap = new egret.Bitmap(texture);
		return bitmap;
	}

	/**
	 * 根据name关键字创建一个Bitmap对象。此name 是根据TexturePacker 组合成的一张位图
	 */

	public static createBitmapFromSheet(name: string, sheetName: string): egret.Bitmap {
		let texture: egret.Texture = RES.getRes(`${sheetName}_json.${name}`);
		let result: egret.Bitmap = new egret.Bitmap(texture);
		return result;
	}

	public static getTextureFromSheet(name: string, sheetName: string): egret.Texture {
		let result: egret.Texture = RES.getRes(`${sheetName}_json.${name}`);
		return result;

	}

	/**
	 * 面罩
	 */
	public static createLoadingMask(alpha: number = 0.5, coloer: number = 0x000000, touch = false): egret.Shape {
		let loadingMask = new egret.Shape();
		loadingMask.graphics.beginFill(coloer, alpha);
		loadingMask.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
		loadingMask.graphics.endFill();
		loadingMask.touchEnabled = touch
		return loadingMask
	}

	/**
	 * 块显示，删除
	 */
	public static controlBacksh(backShp: egret.Shape, flay: boolean, that) {
		if (flay) {
			that.addChild(backShp)
		} else {
			GameConst.removeChild(backShp)
		}
	}

	/**get请求 */
	public static reqGetJSON(url: string): egret.HttpRequest {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(url, egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		request.send();
		return request
	}

	/**post请求 */
	public static reqPostJSON(url: string): egret.HttpRequest {
		var request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(url, egret.HttpMethod.POST);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
		request.send();
		return request
	}
	
	/**移除子类方法 */
	public static removeChild(child: egret.DisplayObject) {
		if (child && child.parent) {
			if ((<any>child.parent).removeElement) {
				(<any>child.parent).removeElement(<any>(child));
			}
			else {
				child.parent.removeChild(child);
			}
		}
	}
}