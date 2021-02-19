'use strict';
const db = uniCloud.database()
//数据库的操作符，可以对数组进行操作
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event

	const userInfo = await db.collection('user').doc(user_id).get()
	console.log("用户数据：",userInfo)
	const article_id_ids = userInfo.data[0].article_likes_ids
	let dbCmdFuns = null
	if (article_id_ids.includes(article_id)) {
		dbCmdFuns = dbCmd.pull(article_id)
	} else {
		//addToSet：向数组添加一个元素，pull删除一个元素
		dbCmdFuns = dbCmd.addToSet(article_id)
	}

	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFuns
	})
	//event为客户端上传的参数
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: userInfo.data[0]
	}
};
