(function (window) {
	/**
	 * 1- 创建本地模拟数据,根据数据的长度来显示结构,如果什么数据都没有,那么我们就不显示结构
	 *
	 * 2- 处理本地数据,我们把数据处理成,存放到localStorage中,在从localStorage中获取
	 * 	 - 当数据有变化的时候,使用watch监听我数据的变化
	 *
	 * 3- 设置自定义指令,实现自动获取光标
	 *
	 * 4- 添加数据
	 *
	 * 5- 计算属性,根据isFinish的状态来计算当前为false的项,false代表是未选中状态
	 *
	 * 6- 让全部删除按钮,根据isFinish的状态,来隐藏全部删除按钮
	 *	
	*/

	new Vue({
		el:'#app',
		data:{
			dataList:JSON.parse(window.localStorage.getItem('dataList'))||[],
			newTodo:''
		},
		methods: {
			// 添加数据
			addTodo(){
				if(!this.newTodo.trim()){
					return
				}
				this.dataList.push({
					content:this.newTodo,
					isFinish:false,
					id:this.dataList?this.dataList.sort((a,b)=>a.id-b.id)[this.dataList.length-1]['id']+1:1
				}),
				this.newTodo=""
			},
			delTodo(index){
				// 根据index来删除
				return this.dataList.splice(index,1)
			}
		},
		// 监听
		watch:{
			dataList:{
				handler(newArr){
					window.localStorage.setItem('dataList',JSON.stringify(newArr))
				},
				deep:true
			}
		},
		// 自定义指令
		directives: {
			focus:{
				inserted(el){
					el.focus()
				}
			}
		},
		computed: {
			activeNum(){
				inserted:{
					return this.dataList.filter((item)=>!item.isFinish).length
				}
			}
		}
	})

})(window);
