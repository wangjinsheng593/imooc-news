<template>
	<view>
		<view class="feedback-title">
			意见反馈
		</view>
		<view class="feedback-content">
			<textarea class="feedback-textarea" v-model="content" placeholder="请输入您要反馈的问题" />
		</view>
		<view class="feedback-title">反馈图片：</view>
		<view class="feedback-image-box">
			<view class="feedback-image-item" v-for="(item,index) in imageList" :key='index'>
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view v-if="imageList.length<5" class="feedback-image-item" @click="addImage">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee"></uni-icons>
				</view>
			</view>
		</view>
		<button class="feedback-button" type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageList:[],
				content:''
			}
		},
		methods: {
			del(index){
				this.imageList.splice(index,1)
			},
			addImage(){
				let _this = this
				//每次选择的最大数量，H5不支持count这个字段
				const count = 5-this.imageList.length
				uni.chooseImage({
					//每次可以选择5张
					count:count,
					success(res) {
						const tempfilepaths = res.tempFilePaths
						tempfilepaths.forEach((item,index)=>{
							//处理H5多选的状况
							if(index<count){
								_this.imageList.push({
									url:item
								})
							}
					
						})
					}
				})
			},
			async submit(){
				let imagesPath = []
				uni.showLoading()
				//不支持批量上传，所以需要遍历出来一个一个上传。并且是同步上传,所以使用for循环
				for (let i = 0; i < this.imageList.length; i++) {
					const filePath = this.imageList[i].url
					filePath =await this.uploadFiles(filePath)
					imagesPath.push(filePath)
				}
				
				this.updateFeedback({
					content:this.content,
					feedbackImages:imagesPath
				})
			},

			async uploadFiles(filePath){
				const result = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath: 'a.jpg',
				})
				return result.fileID
			},
			
			updateFeedback({content,feedbackImages}){
				this.$api.update_feedback({
					content,feedbackImages
				}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交成功',
						icon:'none'
					})
					//等提示显示之后在跳转，所以需要定时器
					setTimeout(()=>{
						uni.switchTab({
							url:"../tabbar/my/my"
						})
					},2000)
				
				}).catch((Error)=>{
					uni.hideLoading()
					uni.showToast({
						title:'反馈提交失败',
						icon:'none'
					})
				})
			}
			
			
		}
	}
</script>

<style lang="scss" scoped>
.feedback-title{
	font-size: 14px;
	margin: 15px;
	margin-bottom: 0;
	color: #666;
}
.feedback-content{
	margin: 15px;
	padding: 20px;
	box-sizing: border-box;
	border: 1px #eee solid;
	.feedback-textarea{
		font-size: 12px;
		width: 100%;
		height: 100px;
	}
}
.feedback-image-box{
	display: flex;
	flex-wrap: wrap;
	padding: 10px;
	.feedback-image-item{
		position: relative;
		width: 33.33%;
		height: 0;
		padding-top: 33.33%;
		box-sizing: border-box;
		.close-icon{
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			right: 0;
			top: 0;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background-color: #ff5a5f;
			z-index: 2;
		}
		.image-box{
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 5px;
			right: 5px;
			bottom: 5px;
			left: 5px;
			border: 1px #eee solid;
			border-radius: 5px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
			
			
		}
	}
}
.feedback-button{
	margin: 0 15px;
	background-color: $mk-base-color;
}
</style>
