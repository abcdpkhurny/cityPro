class BuildUI extends eui.Component implements eui.UIComponent {
	public src_build: eui.Scroller;
	public list_build: eui.List;
	public btnClose: eui.Image;

	public upgrade: Upgrade;

	public buildData: BuildData
	public checkUI: CheckUI

	public callback: any

	public base: eui.Image

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			console.log("关闭选择建造")
			GameConst.removeChild(this)
		}, this)
		// 数组数据
		let dataArr: any[] = BuildData.getAllBasics()
		// 把数组数据转成EUI数组
		let euiArr: eui.ArrayCollection = new eui.ArrayCollection(dataArr)
		// 把EUI数组作为list的数据源
		this.list_build.dataProvider = euiArr
		// 隐藏进度条
		this.src_build.horizontalScrollBar.autoVisibility = false
		
		var datalist = (<any>this.list_build.dataProvider).source
		//对数据增加事件
		this.list_build.addEventListener(eui.ItemTapEvent.ITEM_TAP, (e) => {
			//获取对象数据
			var data = datalist[e.itemIndex]
			//console.log(data)
			//这里处理点击后是否选中肯定
			if (!this.upgrade) {
				this.upgrade = new Upgrade();
			}
			this.controlBacksh(true)
			this.addChild(this.upgrade)
			//初始化肯定，取消
			this.upgrade.faly = false
			this.upgrade.init(data.grade, data.expend, data.text)
			//这里弄一个切片

			this.upgrade.once(egret.Event.REMOVED_FROM_STAGE, () => {
				this.controlBacksh(false)
				//选择为肯定
				if (this.upgrade.faly && !this.upgrade.isOK) {
					//点数不足
					if (!this.checkUI) this.checkUI = new CheckUI();
					else this.checkUI.init()
					this.controlBacksh(true)
					this.addChild(this.checkUI)
					this.checkUI.once(egret.Event.REMOVED_FROM_STAGE, () => {
						console.log("删除切片")
						this.controlBacksh(false)
					}, this)
				} else if (this.upgrade.faly) {
					//点数足够
					//console.log(data)
					//回调方法
					this.callback(data, this.base)
					this.base = null
					GameConst.removeChild(this)
				}
			}, this)
		}, this);
		//this.src_build.horizontalScrollBar.autoVisibility = false
	}
	private backShp: egret.Shape

	/**
	 * 控制黑底出现
	 */
	private controlBacksh(flay: boolean = false) {
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


}