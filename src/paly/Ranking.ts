class Ranking {
	/**
     * 排行榜关闭按钮
     */
	public btnClose: eui.Image;
	/**开 */
	public btnStart: eui.Image;

	private obj: egret.DisplayObjectContainer;

	private bg: egret.Bitmap;
	/** 0为竞速，1为普通 */
	public type: number;
	/** 输入的数值 */
	public curScore: number;
	/**不管开始模式 */
	public flayRanking: boolean = false;
	/**是否全国 */
	public flayAll: boolean = false;
	/**分数排行 */
	public rankingScore;
	/**时间排行 */
	public rankingTime;

	public constructor() {
		this.bg = GameConst.CreateBitmapByName("main1_bg_jpg")
		//排行榜按钮
		this.btnStart = new eui.Image();
		this.btnStart.source = "btn_restart_ranking_png";
		this.btnStart.scaleX = this.btnStart.scaleY = GameConst.StageW / 640 + 0.2
		this.btnStart.y = (GameConst.StageH + 35) * 4 / 5
		this.btnStart.horizontalCenter = 0;
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			this.btnStart.scaleX = this.btnStart.scaleY = GameConst.StageW / 640
		}, this)
		this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.btnStart.scaleX = this.btnStart.scaleY = GameConst.StageW / 640 + 0.2
		}, this)
		//返回
		this.btnClose = new eui.Image();
		this.btnClose.source = "btn_back_blue_png";
		this.btnClose.scaleX = this.btnClose.scaleY = GameConst.StageW / 640
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
			this.btnClose.scaleX = this.btnClose.scaleY = GameConst.StageW / 640 - 0.2
		}, this)
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.btnClose.scaleX = this.btnClose.scaleY = GameConst.StageW / 640
		}, this)
	}

	public initParent(obj: egret.DisplayObjectContainer) {
		this.obj = obj
		this.hasRestart = true
	}

	public updateMessage() {
		let platform: any = window.platform;
		platform.openDataContext.postMessage({
			year: (new Date()).getFullYear(),
			curScore: this.curScore,
			type: this.type,
			command: "update",
		});
	}

	public allRanking() {
		let url: string = GameConst.url + "/carPro/RankingScoreList.do"
		let param: string = "num=" + 100
		let req = GameConst.reqGetJSON(url + "?" + param)
		req.addEventListener(egret.Event.COMPLETE, () => {
			this.rankingScore = req.response;

			url = GameConst.url + "/carPro/RankingTimeList.do"
			param = "num=" + 100
			let rreq = GameConst.reqGetJSON(url + "?" + param)
			rreq.addEventListener(egret.Event.COMPLETE, () => {
				this.rankingTime = rreq.response;
				this.flayAll = true;
				this.onButtonClick();
			}, this)
		}, this)
	}

	/**
	* 排行榜遮罩，为了避免点击开放数据域影响到主域，在主域中建立一个遮罩层级来屏蔽点击事件.</br>
	* 根据自己的需求来设置遮罩的 alpha 值 0~1.</br>
	*/
	private rankingListMask: egret.Shape;
	private isdisplay = false;
	public hasRestart: boolean;

    /**
     * 点击按钮
     * Click the button
     */
	public onButtonClick() {
		// let openDataContext = wx.getOpenDataContext();
		console.log('点击btnStart按钮');
		let btnY = this.btnStart.y + 30;
		let platform: any = window.platform;
		if (this.isdisplay) {
			GameConst.Ranking.parent && GameConst.Ranking.parent.removeChild(GameConst.Ranking);
			this.rankingListMask.parent && this.rankingListMask.parent.removeChild(this.rankingListMask);
			this.bg.parent && this.bg.parent.removeChild(this.bg);
			//关闭排行榜按钮
			GameConst.removeChild(this.btnStart)
			GameConst.removeChild(this.btnClose)
			this.isdisplay = false;
			platform.openDataContext.postMessage({
				isDisplay: this.isdisplay,
				year: (new Date()).getFullYear(),
				command: "close"
			});

		} else {
			this.obj.addChild(this.bg)
			//处理遮罩，避免开放数据域事件影响主域。
			this.rankingListMask = new egret.Shape();
			this.rankingListMask.graphics.beginFill(0x000000, 1);
			this.rankingListMask.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
			this.rankingListMask.graphics.endFill();
			this.rankingListMask.alpha = 0.5;
			//禁止底层的事件操作
			this.rankingListMask.touchEnabled = true;
			this.obj.addChild(this.rankingListMask);

			//绑定，关闭排行榜
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this)
			//主要示例代码开始
			GameConst.Ranking = platform.openDataContext.createDisplayObject(null, GameConst.StageW, GameConst.StageH);

			//主域向子域发送自定义消息
			if (this.flayAll) {
				platform.openDataContext.postMessage({
					isDisplay: this.isdisplay,
					year: (new Date()).getFullYear(),
					curScore: this.curScore,
					type: this.type,
					command: "all",
					openid: GameConst.player.openid,
					rankingScore: this.rankingScore,
					rankingTime:this.rankingTime,
					flayRanking:this.flayRanking
				});
			} else {
				platform.openDataContext.postMessage({
					isDisplay: this.isdisplay,
					year: (new Date()).getFullYear(),
					curScore: this.curScore,
					type: this.type,
					command: "open",
					openid: GameConst.player.openid,
					data: JSON.stringify([]),
					flayRanking:this.flayRanking
				});
			}
			this.obj.addChild(GameConst.Ranking);
			//简单实现，打开这关闭使用一个按钮。
			if (this.hasRestart)
				this.obj.addChild(this.btnStart);
			this.obj.addChild(this.btnClose)

			//主要示例代码结束            
			this.isdisplay = true;
		}

	}
}