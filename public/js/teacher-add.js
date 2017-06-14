define(['jquery','util','template'],function($,util,template) {
	util.setMenu('/teacher/list');
	$('#addTeacherId').click(function() {
		$.ajax({
			type : 'post',
			url : '/api/teacher/add',
			data : $('#addTeacherForm').serialize(),
			dataType : 'json',
			success : function(data) {
				// console.log(data);

			}
		});
	});
	//获取参数中的tc_id
	var tcId = util.qs('tc_id',location.search);
	if(tcId){
		//根据id查询数据
		$.ajax({
			type : 'get',
			url : '/api/teacher/edit',
			data : {tc_id : tcId},
			dataType : 'json',
			success : function(data) {
				// console.log(data);
				$('#navsFlag').text('讲师编辑');
				data.result.operateFlag = '编辑';
				var html = template('addTeacherTpl',data.result);
				$('#addTeacherInfo').html(html);
			}
		});
	}else {
		$('#navsFlag').text('讲师添加');
		var html = template('addTeacherTpl',{operateFlag : '添加'});
		$('#addTeacherInfo').html(html);
	}
	
});