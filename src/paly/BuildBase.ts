class BuildBase extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public groupBase: eui.Group
	public groupBuild: eui.Group
	public btnClose: eui.Image
	public imgInfo: eui.Image
	public textName: eui.Label
	public textEnergy: eui.Label

	/**地基数组 */
	public bases: any[] = []
	/**建筑数组 */
	public builds: any[] = []

	protected childrenCreated(): void {
		super.childrenCreated();
		//this.bases = [this.imgBase1_1, this.imgBase1_2, this.imgBase1_3]
		//this.builds = [this.imgBuild1_1, this.imgBuild1_3, this.imgBuild1_2]
		this.bases = this.groupBase.$children
		this.builds = this.groupBuild.$children
		//玩家头像
		//if (GameConst.player.avatarUrl) this.imgInfo.source = "icon_avatarUrl_png"
		if (GameConst.player.avatarUrl) this.imgInfo.source = GameConst.player.avatarUrl
		else this.imgInfo.source = "icon_avatarUrl_png"
		this.imgInfo.width = 93
		this.imgInfo.height = 93
		//画一个红色的正方形
		var square: egret.Shape = new egret.Shape();
		square.graphics.beginFill(0xff0000);
		square.graphics.drawRoundRect(this.imgInfo.x, this.imgInfo.y, this.imgInfo.width, this.imgInfo.height, 40, 40);
		square.graphics.endFill();
		this.addChild(square);
		this.imgInfo.mask = square
		//判断名字
		var nickName: string = GameConst.player.nickName
		var path = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
		var regEx: RegExp = new RegExp(path);
		//判断是否存在中文
		if (regEx.test(nickName) == false) {
			console.log('不存在中文')
			if (nickName.length > 14) this.textName.text = nickName.substring(0, 14) + '...'
			else this.textName.text = nickName
		} else {
			console.log('存在中文')
			if (nickName.length > 7) this.textName.text = nickName.substring(0, 7) + '...'
			else this.textName.text = nickName
		}
		this.updateEnergy()
	}

	/**初始化建筑 */
	public initBuilds() {
		console.log(GameConst.player)
		var builddata = []
		if (GameConst.player) {
			builddata = GameConst.player.houselist
		}
		for (var i = 0; i < this.builds.length; i++) {
			var build = this.builds[i]
			build["house"] = true
			build["infoData"] = null
			build.source = ""
			//这是测试，判断从数据库拿出的数据，对上贴图
			for (var j = 0; j < builddata.length; j++) {
				var data = builddata[j]
				if (build.name == data.name && data.no != 0) {
					//console.log(build.name)
					var infoData = BuildData.fetchBuild(data.no, data.grade)
					build["infoData"] = infoData
					//这里字符串截取
					var str = infoData.image.substring(infoData.image.lastIndexOf("/") + 1).replace(".", "_")
					build.source = str
				}
			}
		}
	}

	/**初始化建筑事件 */
	public initBuildEvet(): any[] {
		var list = []
		//这里应该是，有房子的绑定房子，没房子的绑定地面
		for (var i = 0; i < this.builds.length; i++) {
			var build = this.builds[i]
			//不空为绑定房子，空为绑定地基
			if (build.source == "") {
				var base = this.fetchBase(build.name)
				if (base) list.push(base)
			} else {
				list.push(build)
			}
		}
		return list
	}

	/**按名字寻找地基 */
	public fetchBase(name: String): any {
		for (var i = 0; i < this.bases.length; i++) {
			var base = this.bases[i]
			if (base.name == name) return base
		}
		return
	}

	/**按名字寻找建筑 */
	public fetchBuild(name: String): any {
		for (var i = 0; i < this.builds.length; i++) {
			var build = this.builds[i]
			if (build.name == name) return build
		}
		return
	}

	/**更新建筑贴图 */
	public updateImgOfBuild(img: any, build) {
		var newBuild = this.fetchBuild(build.name)
		newBuild["infoData"] = img
		//这里字符串截取
		var str = img.image.substring(img.image.lastIndexOf("/") + 1).replace(".", "_")
		newBuild.source = str
	}

	/**删除建筑贴图 */
	public delImgofBuild(build: eui.Image) {
		build["infoData"] = null
		build.source = ""
	}

	/**更新能量 */
	public updateEnergy() {
		GameConst.player.energy = BuildData.playEne
		this.textEnergy.text = "能量：" + GameConst.player.energy
	}
}