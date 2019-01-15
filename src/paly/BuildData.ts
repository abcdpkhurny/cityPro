/**建筑常量类 */
class BuildData {
	/**总能量上限 */
	public static upperEnes: number
	/**用户能量 */
	public static playEne: number

	/**建筑总数据集合 */
	public static builds: any[] =
	[
		{ image: "resource/art/icon/icon_b1_1.png", text: "电厂", no: 1, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b2_1.png", text: "工厂", no: 2, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b3_1.png", text: "办公楼", no: 3, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b4_1.png", text: "办公楼", no: 4, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b5_1.png", text: "公寓", no: 5, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b6_1.png", text: "住房", no: 6, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b7_1.png", text: "房屋", no: 7, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b8_1.png", text: "商店", no: 8, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b9_1.png", text: "学校", no: 9, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b10_1.png", text: "医院", no: 10, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b11_1.png", text: "公园", no: 11, expend: 1, grade: 1 },
		{ image: "resource/art/icon/icon_b1_2.png", text: "电厂", no: 1, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b1_3.png", text: "电厂", no: 1, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b1_4.png", text: "电厂", no: 1, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b2_2.png", text: "工厂", no: 2, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b2_3.png", text: "工厂", no: 2, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b2_4.png", text: "工厂", no: 2, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b3_2.png", text: "办公楼", no: 3, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b3_3.png", text: "办公楼", no: 3, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b3_4.png", text: "办公楼", no: 3, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b4_2.png", text: "办公楼", no: 4, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b4_3.png", text: "办公楼", no: 4, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b4_4.png", text: "办公楼", no: 4, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b5_2.png", text: "公寓", no: 5, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b5_3.png", text: "公寓", no: 5, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b5_4.png", text: "公寓", no: 5, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b6_2.png", text: "住房", no: 6, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b6_3.png", text: "住房", no: 6, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b7_2.png", text: "房屋", no: 7, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b7_3.png", text: "房屋", no: 7, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b7_4.png", text: "房屋", no: 7, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b8_2.png", text: "商店", no: 8, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b8_3.png", text: "商店", no: 8, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b8_4.png", text: "商店", no: 8, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b9_2.png", text: "学校", no: 9, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b9_3.png", text: "学校", no: 9, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b9_4.png", text: "学校", no: 9, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b10_2.png", text: "医院", no: 10, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b10_3.png", text: "医院", no: 10, expend: 3, grade: 3 },
		{ image: "resource/art/icon/icon_b10_4.png", text: "医院", no: 10, expend: 4, grade: 4 },
		{ image: "resource/art/icon/icon_b11_2.png", text: "公园", no: 11, expend: 2, grade: 2 },
		{ image: "resource/art/icon/icon_b11_3.png", text: "公园", no: 11, expend: 3, grade: 3 },
	]

	/**获取建筑信息 */
	public static fetchBuild(no: number, grade: number): any {
		for (var i = 0; i < BuildData.builds.length; i++) {
			var build = BuildData.builds[i]
			if (build.no == no && build.grade == grade) {
				return build
			}
		}
	}

	/**获取所以基础建筑信息 */
	public static getAllBasics(): any[] {
		var array: any[] = []
		for (var i = 0; i < BuildData.builds.length; i++) {
			var build = BuildData.builds[i]
			if (build.grade == 1) {
				array.push(build)
			}
		}
		return array
	}


}