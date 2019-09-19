$(document.body).ready(() => {
	let UIDevice = plus.ios.import("UIDevice");
	let dev = UIDevice.currentDevice();
	if(!dev.isBatteryMonitoringEnabled()) {
		dev.setBatteryMonitoringEnabled(true);
	}
	let level = dev.batteryLevel();
	$("#searchBtn").click(() => {
		$(".mainPage").hide();
		$("#Search").show();
	});
	$(".backBtn").click(function() {
		switch($(this).parent().attr("id")) {
			case "SearchNav":
				{
					$(".mainPage").hide();
					$("#Book").show();
					$("#searchList").empty();
				}
				break;
			case "BookInfoNav":
				{
					$(".mainPage").hide();
					$("#Search").show();
					$("#bookInfo").empty();
				}
				break;
			case "BackBar":
				{
					$(".mainPage").hide();
					$($("#BackBar").data("from")).show();
				}
				break;
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
		$("#BackBar").data("from", "#BookInfo");
		readBook(info);
	});

	$("#addBook").click(function() {
		let info = $(this).data("info");
		info.chapterid = 0;
		addBook(info);
	});

	$("#removeBook").click(function() {
		let info = $(this).data("info");
		removeBook(info);
	});

	$(".pageBtn").click(function() {
		switch($(this).attr("id")) {
			case "prev":
				{
					console.log("prev clicked");

					console.log(level)
				}
				break;
			case "next":
				{
					console.log("next clicked");
				}
				break;
			case "menu":
				{
					console.log("menu clicked");
				}
				break;
		}
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
					<div class="meta-info">
						<div class="info">${item.author}</div>
						<div class="info">${item.type}</div>
						<div class="info">${item.state}</div>
						<div class="info mui-ellipsis-2">最新章节:${item.lastchapter}</div>
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
	$(".mainPage").hide();
	$("#BookInfo").show();
	$("#BookInfoNav .mui-title").text(info.bookname);
	$("#bookInfo").html(`
		<img class="mui-media-object mui-pull-left" src="${info.img}">
		<div class="mui-media-body">
			<div  class="bookname mui-ellipsis-2">${info.bookname}</div>
		</div>
		<div class="meta-info">
			<div class="info">${info.author}</div>
			<div class="info">${info.type}</div>
			<div class="info">${info.state}</div>
			<div class="info mui-ellipsis-2">最新章节:${info.lastchapter}</div>
			<div class="info">更新日期:${info.lastdate}</div>
		</div>
		<div class="mui-media-body" style="margin-top:1em;">
			<div  class="info">${info.intro}</div>
		</div>
	`);
	if(!localStorage[info.id]) {
		$("#removeBook").hide();
		$("#addBook").css("display", "");
	} else {
		$("#removeBook").css("display", "");
		$("#addBook").hide();
	}
	$("#readBook,#addBook,#removeBook").data("info", info);
}

function addBook(info) {
	let book = localStorage[info.id];
	if(!book) {
		localStorage.setItem(info.id, info);
		$("#removeBook").css("display", "");
		$("#addBook").hide();
	}
}

function removeBook(info) {
	let book = localStorage[info.id];
	if(book) {
		localStorage.removeItem(info.id);
		$("#removeBook").hide();
		$("#addBook").css("display", "");
	}
}

function readBook(info) {
	$(".mainPage").hide();
	$("#BookPages").show();
}