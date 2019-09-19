$(document.body).ready(() => {

	$("#searchBtn").click(() => {
		$("#BookNav,#BookContent").hide();
		$("#SearchNav,#SearchContent").show();
	});
	$(".backBtn").click(function() {
		if($(this).parent().attr("id") === "SearchNav") {
			$("#BookNav,#BookContent").show();
			$("#SearchNav,#SearchContent").hide();
			$("#searchList").empty();
		} else {
			$("#SearchNav,#SearchContent").show();
			$("#BookInfoNav,#BookInfoContent,#BookInfoFooter").hide();
			$("#bookInfo").empty();
		}
	});
	$("#searchInput").keydown(function(event) {
		switch(event.keyCode) {
			case 13:
				{
					search($(this).val());
					$(this).blur();
				}
				break;
		}
	});
	$("#readBook").click(function() {
		let info = $(this).data("info");
		info.chapterid = 0;
		readBook(info);
	});

	$("#addBook").click(function() {
		let info = $(this).data("info");
		info.chapterid = 0;
		addBook(info);
	});
	
	$("#removeBook").click(function(){
		let info = $(this).data("info");
		removeBook(info);
	});
});

function search(str) {
	if(str === "") {
		return;
	}
	let net = new Net();
	net.require(`search?bk=${str}`, (err, result) => {
		if(!err) {
			//				console.log(JSON.stringify(result));
			createSearchlist(result);
		} else {
			mui.toast('搜索失败');
		}
	});
}

function createSearchlist(list) {
	let searchList = $("#searchList");
	searchList.empty();

	if(list.error) {

	} else {
		list.forEach((item, index, arr) => {
			let li = $(`<li class="mui-table-view-cell mui-media"">
				<a href="javascript:;" onclick="searchListClick(this);">
					<img class="mui-media-object mui-pull-left" src="${item.img}">
					<div class="mui-media-body">
						<div  class="bookname mui-ellipsis-2">${item.bookname}</div>
					</div>
					<div class="meta-info" style="margin-top: .8em;">
						<div class="info">${item.author}</div>
						<div class="info">${item.type}</div>
						<div class="info">${item.state}</div>
						<div class="info">最新章节:${item.lastchapter}</div>
						<div class="info">更新日期:${item.lastdate}</div>
					</div>
				</a>
			</li>`);
			li.data("info", item);
			searchList.append(li);
		});
	}

}

function searchListClick(p) {
	let net = new Net();
	let info = $(p).parent().data("info");
	net.require(`getinfo?bk=${info.bookname}&at=${info.author}`, (err, result) => {
		if(!err) {
			createBookInfoPage(result);
		} else {
			mui.toast('获取失败');
		}
	});
}

function createBookInfoPage(info) {
	console.log(info);
	$("#SearchNav,#SearchContent").hide();
	$("#BookInfoNav,#BookInfoContent").show();
	$("#BookInfoNav .mui-title").text(info.bookname);
	$("#bookInfo").html(`
		<img class="mui-media-object mui-pull-left" src="${info.img}">
		<div class="mui-media-body">
			<div  class="bookname mui-ellipsis-2">${info.bookname}</div>
		</div>
		<div class="meta-info"  style="margin-top: .8em;">
			<div class="info">${info.author}</div>
			<div class="info">${info.type}</div>
			<div class="info">${info.state}</div>
			<div class="info">最新章节:${info.lastchapter}</div>
			<div class="info">更新日期:${info.lastdate}</div>
		</div>
		<div class="mui-media-body">
			<div  class="info mui-ellipsis-2">${info.intro}</div>
		</div>
	`);
	if(!localStorage[info.id]){
		$("#removeBook").hide();
		$("#addBook").css("display","");
	}else{
		$("#removeBook").css("display","");
		$("#addBook").hide();
	}
	$("#BookInfoFooter").css("display", "table");
	$("#readBook,#addBook,#removeBook").data("info", info);
}

function addBook(info) {
	let book = localStorage[info.id];
	if(!book){
		localStorage.setItem(info.id,info);
		$("#removeBook").css("display","");
		$("#addBook").hide();
	}
}
function removeBook(info) {
	let book = localStorage[info.id];
	if(book){
		localStorage.removeItem(info.id);
		$("#removeBook").hide();
		$("#addBook").css("display","");
	}
}