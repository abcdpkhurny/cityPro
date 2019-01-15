class GameScene extends eui.Component {
	public constructor() {
		super()
	}

	public buildUI: BuildUI
	public buildBase: BuildBase
	public updateBuild: UpdateBuild
	public maxBuild: MaxBuild

	public bg: egret.Bitmap
	public builds: eui.Image[]

	public saveFun;

	private loading: LoadingUI
	private loadingMask: egret.Shape

	public onceOpen: boolean = false

	public toPlay() {
		this.onceOpen = true
		//初始建造列表
		if (!this.buildUI) this.buildUI = new BuildUI();
		if (!this.updateBuild) this.updateBuild = new UpdateBuild();
		if (!this.maxBuild) this.maxBuild = new MaxBuild()
		if (!this.loading) this.loading = new LoadingUI()
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
		BuildData.upperEnes = 15
		//这里是测试，应为数据的
		BuildData.playEne = GameConst.player.energy
		//建筑显示
		this.buildBase = new BuildBase()
		this.addChild(this.buildBase)
		this.buildBase.initBuilds()
		this.builds = this.buildBase.initBuildEvet()
		//建筑绑定事件
		for (var i = 0; i < this.builds.length; i++) {
			var build = this.builds[i]
			if (build["house"]) {
				let nbuild = build
				var fun = this.clickBuild.bind(this, nbuild)
				nbuild["fun"] = fun

				nbuild.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this)
			} else {
				let nbuild = build
				var fun = this.clickBase.bind(this, nbuild)
				nbuild["fun"] = fun
				nbuild.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this)
			}
		}

		this.buildBase.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			GameConst.removeChild(this)
		}, this)

		this.buildUI.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.controlBacksh(false)
			console.log("关闭了buildUI")
			this.buildBase.updateEnergy()
		}, this)

		this.maxBuild.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.controlBacksh(false)
			console.log("关闭了maxBuild")
			//摧毁
			if (this.maxBuild.isDel) {
				this.updateBuild.isDel = false
				this.DelBuild(this.maxBuild.rootBuild)
			}
			this.buildBase.updateEnergy()
		}, this)

		this.updateBuild.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.controlBacksh(false)
			console.log("关闭了updateBuild")
			//这里是也是跨服请求
			//正确升级
			if (this.updateBuild.isOK) {
				this.updateBuild.isOK = false

				let build = this.updateBuild.updateBuild
				let infoData = this.updateBuild.updateImg
				this.addChild(this.loadingMask)
				this.addChild(this.loading)

				let url: string = GameConst.url + "cityPro/updateHouse.do"
				let param: string = "openid=" + GameConst.player.openid + "&name=" + build.name + "&no=" + infoData.no + "&grade=" + infoData.grade + "&expend=" + (-infoData.expend)
				let req = GameConst.reqGetJSON(url + "?" + param);
				req.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
					console.log("更新超时")
					this.removeChildAll();
				}, this)
				req.addEventListener(egret.Event.COMPLETE, () => {
					var data: string = req.response;
					// console.log(data);
					// console.log(param);
					let josnDate = JSON.parse(data)
					if (josnDate.code == 0) {
						this.buildBase.updateImgOfBuild(this.updateBuild.updateImg, this.updateBuild.updateBuild)
						this.buildBase.updateEnergy()
						console.log("更新成功")
						this.removeChildAll();
					}
				}, this)
			}
			//摧毁
			if (this.updateBuild.isDel) {
				this.updateBuild.isDel = false
				console.log("摧毁")
				this.DelBuild(this.updateBuild.rootBuild)
			}
		}, this)

	}

	public clickBase(nbuild: eui.Image) {
		console.log("点中了空地" + nbuild.name)
		this.controlBacksh(true)
		this.addChild(this.buildUI)
		this.buildUI.base = nbuild
		this.buildUI.src_build.viewport.scrollV = 0
	}

	public clickBuild(nbuild: eui.Image) {
		console.log("点中了房子:" + nbuild.name)
		var infoData = nbuild["infoData"]
		var newImg = BuildData.fetchBuild(infoData.no, infoData.grade + 1)
		this.controlBacksh(true)
		if (newImg) {
			console.log("还能升上去")
			var img = newImg.image.substring(newImg.image.lastIndexOf("/") + 1).replace(".", "_")
			this.addChild(this.updateBuild)
			this.updateBuild.rootBuild = nbuild
			this.updateBuild.init(infoData.grade + 1, newImg.expend, infoData.text, <string>nbuild.source, img, newImg, nbuild)
		} else {
			console.log("升不上了")
			this.addChild(this.maxBuild)
			this.maxBuild.init(nbuild)
		}
	}

	/**更新选中地基后的建造 */
	public createBuild(data, base: eui.Image) {
		var build = this.buildBase.fetchBuild(base.name)
		var infoData = BuildData.fetchBuild(data.no, data.grade)

		//这里为建筑添加点击事件，而且发送数据到后台更新
		this.addChild(this.loadingMask)
		this.addChild(this.loading)

		let url: string = GameConst.url + "cityPro/addHouse.do"
		let param: string = "openid=" + GameConst.player.openid + "&name=" + base.name + "&no=" + infoData.no + "&grade=" + infoData.grade + "&expend=" + (-infoData.expend)
		let req = GameConst.reqGetJSON(url + "?" + param);
		req.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
			console.log("添加超时")
			this.removeChildAll();
		}, this)
		req.addEventListener(egret.Event.COMPLETE, () => {
			var data: string = req.response;
			//console.log(data);
			let josnDate = JSON.parse(data)
			if (josnDate.code == 0) {
				build["infoData"] = infoData
				//这里字符串截取
				var str = infoData.image.substring(infoData.image.lastIndexOf("/") + 1).replace(".", "_")
				build.source = str
				base.removeEventListener(egret.TouchEvent.TOUCH_TAP, base["fun"], this)

				//绑定建筑事件
				var fun = this.clickBuild.bind(this, build)
				build["fun"] = fun
				build.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this)
				this.buildBase.updateEnergy()
				console.log("添加成功")
				this.removeChildAll();
			}
		}, this)
	}

	public removeChildAll() {
		GameConst.removeChild(this.loading)
		GameConst.removeChild(this.loadingMask)
	}

	//删除建筑
	private DelBuild(build: eui.Image) {
		var infoData = build["infoData"]
		this.buildBase.delImgofBuild(build)

		this.addChild(this.loadingMask)
		this.addChild(this.loading)

		let url: string = GameConst.url + "cityPro/updateHouse.do"
		let param: string = "openid=" + GameConst.player.openid + "&name=" + build.name + "&no=" + 0 + "&grade=" + infoData.grade + "&expend=-1"
		let req = GameConst.reqGetJSON(url + "?" + param);
		req.addEventListener(egret.IOErrorEvent.IO_ERROR, () => {
			console.log("删除超时")
			this.removeChildAll();
		}, this)
		req.addEventListener(egret.Event.COMPLETE, () => {
			var data: string = req.response;
			let josnDate = JSON.parse(data)
			if (josnDate.code == 0) {
				//删除建筑事件
				build.removeEventListener(egret.TouchEvent.TOUCH_TAP, build["fun"], this)

				//绑定地基事件
				var name = build.name
				var base = this.buildBase.fetchBase(name)
				var fun = this.clickBase.bind(this, base)
				base["fun"] = fun
				base.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this)
				this.buildBase.updateEnergy()
				console.log("后台删除成功")
				this.removeChildAll();
			}
		}, this)
	}

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
}