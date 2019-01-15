class MainScene extends eui.Component implements eui.UIComponent {
	public mbtnStart: eui.ToggleButton;
	public mbtnShare: eui.ToggleButton;
	public mbtnInfo: eui.ToggleButton;
	public mbtnRanking: eui.ToggleButton;
	public mbtnMore: eui.ToggleButton;
	public mbtns: eui.ToggleButton[];

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
    /**
     * 排行榜关闭按钮
     */
	private btnClose: eui.Button;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.mbtns = [this.mbtnStart, this.mbtnShare, this.mbtnInfo, this.mbtnRanking, this.mbtnMore];
		for (var i: number = this.mbtns.length - 1; i > -1; --i) {
			// 事件委托, 点击按钮的时候触发toggleBtn
			this.mbtns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
				let theBtn = <eui.ToggleButton>e.target
				this.toggleBtn(theBtn)
			}, this)
		}
		

		//下面都是测试用,数据录入用于微信小游戏
		////////////////////////////////
		//处理遮罩，避免开放数据域事件影响主域。
		// this.loadingMask = new egret.Shape();
		// this.loadingMask.graphics.beginFill(0x000000, 1);
		// this.loadingMask.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
		// this.loadingMask.graphics.endFill();
		// this.loadingMask.alpha = 0.5;
		// //禁止底层的事件操作
		// this.loadingMask.touchEnabled = true;

		// this.loading = new LoadingUI()

		// this.addChild(this.loadingMask)
		// this.addChild(this.loading)

		// let url: string = GameConst.url + "cityPro/userInfo.do"
		// let param: string = "openid=onJoc5JSThWszGrGVmWaONpLss6k"
		// let req = GameConst.reqGetJSON(url + "?" + param);
		// req.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
		// 	console.log("加载切片超时")
		// 	this.removeChildAll();
		// }, this)
		// req.addEventListener(egret.Event.COMPLETE, () => {
		// 	var data: string = req.response;
		// 	//console.log(data);
		// 	let josnDate = JSON.parse(data)
		// 	//查询成功
		// 	if (josnDate.code == 0) {
		// 		//录入数据
		// 		GameConst.player = josnDate.data
		// 		this.removeChildAll()

		// 		var btn = new eui.Button();
		// 		btn.label = "Click"
		// 		btn.verticalCenter = 0
		// 		btn.horizontalCenter = 0
		// 		this.addChild(btn)
		// 		btn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
		// 			SceneManager.toGameScene()
		// 		}, this)
		// 	}
		// }, this)
		////////////////////////////////
	}

	public removeChildAll() {
		GameConst.removeChild(this.loading)
		GameConst.removeChild(this.loadingMask)
	}

	private loading: LoadingUI
	private loadingMask: egret.Shape

	private receiveCheck() {

	}

	/**
	 * 切换按钮
	 * @param btn 参数是eui.ToggleButton的时候切换按钮, 参数是0的时候设置为全部不选中
	 */
	public toggleBtn(btn: eui.ToggleButton | number) {
		//console.log('点击')

		// 先把所有的按钮都设置为不选中
		for (var i: number = this.mbtns.length - 1; i > -1; --i) {
			this.mbtns[i].selected = false
		}
		if (btn === 0) {
			//console.log('返回');
			return
		}

		btn = <eui.ToggleButton>btn

		// 获取当前点击的按钮的下标, 用来实现不同按钮对应的功能
		// 0 1 2 3 4 对应 开始游戏, 分享, 说明
		let index = this.mbtns.lastIndexOf(btn)
		switch (index) {
			case 0:
				SceneManager.toGameScene()
				break
			case 1:
				platform.shareAppMessage()
				console.log("分享")
				break
			case 2:
				if (!this.mainInfo) this.mainInfo = new MainInfo()
				this.controlBacksh(true)
				this.addChild(this.mainInfo)
				this.mainInfo.once(egret.Event.REMOVED_FROM_STAGE, () => {
					this.controlBacksh(false)
				}, this)
				console.log("说明")
				break
			case 3:
			//这里是排行榜
			//this.onButtonClick()
			default:
				break
		}
	}

	public mainInfo: MainInfo

	private backShp: egret.Shape

	/**
	 * 控制黑底出现
	 */
	private controlBacksh(flay: boolean) {
		if (!this.backShp) {
			this.backShp = new egret.Shape();
			this.backShp.graphics.beginFill(0x000000, 0.2);
			this.backShp.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
			this.backShp.graphics.endFill();
			this.backShp.touchEnabled = true
		}
		if (flay) {
			this.addChild(this.backShp)
		} else {
			GameConst.removeChild(this.backShp)
		}
	}

	//public ranking: Ranking

    /**
     * 点击按钮
     * Click the button
     */
	// private onButtonClick() {
	// 	this.ranking = SceneManager.instance.ranking
	// 	this.ranking.initParent(this)
	// 	this.ranking.hasRestart = false
	// 	//this.ranking.curScore = 0;
	// 	this.ranking.flayRanking = true;
	// 	this.ranking.type = 0;
	// 	this.ranking.allRanking()
	// }
}