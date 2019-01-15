class CheckUI extends eui.Component implements eui.UIComponent {
	private imgText: eui.Image
	public mbtnYse: eui.ToggleButton
	private imgBtn: eui.Image
	private imgClose: eui.Image

	public textCheck: eui.TextInput
	public textError: eui.Label
	public textEnes: eui.Label
	/**加载次数，防止无限加载 */
	public toLoadSum: number = 0

	public pic: string
	public picName: string
	public pass: boolean
	private loading: LoadingUI
	private loadingMask: egret.Shape

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		if (!this.loading) {
			this.loading = new LoadingUI()
		}
		this.textCheck.addEventListener(egret.FocusEvent.FOCUS_IN, () => {
			this.y = -235
		}, this)
		this.textCheck.addEventListener(egret.FocusEvent.FOCUS_OUT, () => {
			this.y = 0
		}, this)
		this.mbtnYse.addEventListener(egret.TouchEvent.TOUCH_END, this.checkout, this)
		this.textCheck.addEventListener(egret.Event.CHANGE, () => {
			if (this.textCheck.text == "") {
				this.mbtnYse.touchEnabled = false;
				this.imgBtn.source = "check_yes1_png"
			} else {
				this.mbtnYse.touchEnabled = true;
				this.imgBtn.source = "check_yes_png"
				this.textError.alpha = 0;
			}
		}, this)
		this.imgClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GameConst.removeChild(this)
		}, this)
		//处理遮罩，避免开放数据域事件影响主域。
		this.loadingMask = new egret.Shape();
		this.loadingMask.graphics.beginFill(0x000000, 1);
		this.loadingMask.graphics.drawRect(0, 0, GameConst.StageW, GameConst.StageH);
		this.loadingMask.graphics.endFill();
		this.loadingMask.alpha = 0.5;
		//禁止底层的事件操作
		this.loadingMask.touchEnabled = true;
		this.init()
	}

	/**
	 * 初始化
	 */
	public init() {
		this.y = 0
		this.toLoadSum = 0
		this.imgText.scaleX = 1
		this.imgText.scaleY = 1
		this.textError.alpha = 0;
		this.textCheck.text = ""
		this.isExit = false
		this.update()
		this.mbtnYse.touchEnabled = false;
		//这里是检测问题
		this.imgBtn = (<any>this.mbtnYse).imgBtn;
		this.imgBtn.source = "check_yes1_png"
		//这里是图片处理
		this.receiveCheck()
	}

	private ChanReqType = "YCW_JSONP"
	private cooper_id = "GhaniAG68ks%3D"
	private session_id = "4231"
	private Pcsg_Tsk_ID;

	private receiveCheck() {
		let self = this
		this.addChild(this.loadingMask)
		this.addChild(this.loading)
		//这里拿session_id,先写死
		//this.session_id = Math.floor(Math.random()*10000).toString()
		//console.log(this.session_id)
		let url: string = "https://zerosky.zerosky.top/game/servlet/ccbNewClient"
		let param: string = "TXCODE=YCW004&ChanReqType=" + this.ChanReqType + "&cooper_id=" + this.cooper_id + "&session_id=" + this.session_id
		let req = GameConst.reqGetJSON(url + "?" + param);
		req.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
			console.log("加载切片超时")
		}, this)
		req.addEventListener(egret.Event.COMPLETE, () => {
			this.toLoadSum++
			var data: string = req.response;
			var start: number = data.indexOf("(") + 1;
			var end: number = data.lastIndexOf(")");
			data = data.substring(start, end)
			//console.log(data);
			let josnDate = JSON.parse(data)
			if (josnDate.status == "0") {
				var tu = josnDate.base64_Pic_Txn_Inf
				if (tu == "") {
					self.receiveCheck()
				} else {
					this.Pcsg_Tsk_ID = josnDate.Pcsg_Tsk_ID
					this.drawBase64(tu);
				}
			} else {
				this.onErr();
			}
		}, this)
		//网络超时，失败
		req.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onErr, this)
	}
	private onErr() {
		if (!this.errUI) this.errUI = new ErrUI()
		else this.errUI.init()
		this.addChild(this.errUI)
		this.errUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
			if (this.errUI.isRe) this.receiveCheck();
			if (this.errUI.isExit) {
				this.isExit = true
				this.pass = true
				GameConst.removeChild(this)
			}
		}, this)
	}
	public isExit: boolean
	public errUI: ErrUI

	public drawBase64(base64) {
		let self = this;
		var bitmapdata: egret.BitmapData = egret.BitmapData.create("base64", base64, function (bdata) {
			var texture = new egret.Texture();
			texture.bitmapData = bdata;
			self.imgText.source = texture
			GameConst.removeChild(self.loading)
			GameConst.removeChild(self.loadingMask)
			self.imgText.scaleX = 1
			self.imgText.scaleY = 1
		});
	}

	public completePess: boolean = false

	/**
	 * 确认检验
	 */
	private checkout() {
		if (this.mbtnYse.selected)
			this.mbtnYse.selected = false
		let Inpt_Cntnt = this.textCheck.text
		let url: string = GameConst.url + "game/servlet/ccbNewClient"
		let param: string = "TXCODE=YCW005&cooper_id=" + this.cooper_id + "&session_id=" + this.session_id + "&Pcsg_Tsk_ID="
			+ this.Pcsg_Tsk_ID + "&ChanReqType=" + this.ChanReqType + "&Inpt_Cntnt=" + Inpt_Cntnt
		let req = GameConst.reqGetJSON(url + "?" + param)
		req.addEventListener(egret.Event.COMPLETE, () => {
			this.toLoadSum++
			let data: string = req.response
			var start: number = data.indexOf("(") + 1;
			var end: number = data.lastIndexOf(")");
			data = data.substring(start, end)
			let josnDate = JSON.parse(data)
			//判断切片通过
			if (josnDate.isCorrect == "1") {
				//这里应该为用户添加1能量
				let eurl: string = GameConst.url + "cityPro/plusEnes.do"
				let eparam: string = "openid=" + GameConst.player.openid
				let ereq = GameConst.reqGetJSON(eurl + "?" + eparam);
				ereq.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onErr, this)
				ereq.addEventListener(egret.Event.COMPLETE, () => {
					let eDate = JSON.parse(ereq.response)
					//更新成功
					if (eDate.code == 0) {
						this.textError.alpha = 0;
						//输入正确
						this.pass = true
						console.log("通过")
						this.completePess = true
						BuildData.playEne++
						this.init()
					}
				}, this)
			} else {
				this.textError.alpha = 1;
				this.textCheck.text = ""
				this.receiveCheck();
			}
		}, this)
		//网络超时，失败
		req.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onErr, this)
	}

	public removeChildAll() {
		GameConst.removeChild(this.loading)
		GameConst.removeChild(this.loadingMask)
	}

	/**更新 */
	public update() {
		this.textEnes.text = "现有点数：" + BuildData.playEne
	}


}