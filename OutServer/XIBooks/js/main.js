let dev;
let page;
$(document.body).ready(() => {
	if(window.plus && plus.ios) {
		let UIDevice = plus.ios.import("UIDevice");
		dev = UIDevice.currentDevice();
		if(!dev.isBatteryMonitoringEnabled()) {
			dev.setBatteryMonitoringEnabled(true);
		}
		let level = dev.batteryLevel();
	}else if(window.navigator.getBattery){
		dev = navigator.getBattery();
	}
	page = new Page("#BookPages", nextChapter, prevChapter);
	refreshBook();

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
		if(info.chapterid === undefined){
			info.chapterid = 0;
		}
		if(info.curNum === undefined){
			info.curNum = 0;
		}
		$("#BackBar").data("from", "#BookInfo");
		readBook(info);
	});

	$("#addBook").click(function() {
		let info = $(this).data("info");
		if(info.chapterid === undefined){
			info.chapterid = 0;
		}
		if(info.curNum === undefined){
			info.curNum = 0;
		}
		addBook(info);
	});

	$("#removeBook").click(function() {
		let info = $(this).data("info");
		removeBook(info.id);
	});

	$(document)[0].addEventListener("tap", function() {
		// console.log("点击")
		$(".bookRemove").hide();
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
			let li = $(`<li class="mui-table-view-cell mui-media">
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
	$(".mainPage").hide();
	$("#BookInfo").show();
	$("#BookInfoNav .mui-title").text(info.bookname);
	$("#bookInfo").html(`
		<img class="mui-media-object mui-pull-left" src="${info.img}">
		<div class="mui-media-body">
			<div class="bookname mui-ellipsis-2">${info.bookname}</div>
		</div>
		<div class="meta-info">
			<div class="info">${info.author}</div>
			<div class="info">${info.type}</div>
			<div class="info">${info.state}</div>
			<div class="info mui-ellipsis-2">最新章节:${info.lastchapter}</div>
			<div class="info">更新日期:${info.lastdate}</div>
		</div>
		<div class="mui-media-body" style="margin-top:1em;">
			<div style="font-size:small;">${info.intro}</div>
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
		localStorage.setItem(info.id, JSON.stringify(info));
		$("#removeBook").css("display", "");
		$("#addBook").hide();
	}
	refreshBook();
}

function removeBook(id) {
	let book = localStorage[id];
	if(book) {
		localStorage.removeItem(id);
		$("#removeBook").hide();
		$("#addBook").css("display", "");
	}
	refreshBook();
}

function readBook(info) {
	$(".mainPage").hide();
	$("#BookPages").show();
	if(window.plus) {
		plus.navigator.setFullscreen(true);
	}
	let storage = localStorage.getItem(info.id);
	if(storage) {
		info = JSON.parse(storage);
	}
	page.createCatalogue(info);
	openChapter(info);
}

function openChapter(info, curNum) {
	//	$("#BookPages").data("info", info);
	let net = new Net();
	if(curNum === undefined) {
		curNum = info.curNum * 1;
	}
	net.require(`getcontent?id=${info.id}&cp=${info.chapterid}`, (err, result) => {
		if(!err) {
			page.show(info.bookname,info.chapterlist[info.chapterid].name, result.content, curNum);
		} else {
			mui.toast('没有更新的了');
			if(info.chapterid !== 0) {
				info.chapterid -= 1;
			}
		}
	});
}

function prevChapter(info) {
	//	let info = $("#BookPages").data("info");
	if(info.chapterid === 0) {
		mui.toast('这是第一章');
		return;
	}
	info.chapterid -= 1;
	openChapter(info, -1);
}

function nextChapter(info, chapter) {
	if(chapter) {
		info.chapterid = chapter;
		openChapter(info, 0);
	} else {
		info.chapterid += 1;
		openChapter(info, 0);
	}

}

function refreshBook() {
	$("#BookContent .mui-content-padded").empty();
	for(let i = 0; i < localStorage.length; ++i) {
		let id = localStorage.key(i);
		let info = localStorage.getItem(id);
		info = JSON.parse(info);
		let book = $(`
			<div style="height: 10em;width: 5.714em;float: left;position: relative;margin:.7em;">
				<a class="bookRead" href="javascript:;">
					<img class="mui-media-object mui-pull-left" src="${info.img}">
					<div class="bookname mui-ellipsis-2" style="
					    position: relative;
					    width:100%;
					    text-align: center;
					    overflow: hidden;
					    font-size: small;
					    color: black;
					    line-height: 1.3;
					">${info.bookname}</div>
				</a>
				<a class="bookRemove" href="javascript:;" style="
					width: 1.5em;
				    height: 1.5em;
				    display: block;
				    position: absolute;
				    margin-top: -.5em;
				    margin-left: -.5em;
				    border-radius: 50%;
				    background: red;
				    color: white;
				    text-align: center;
				    line-height: 1.5em;
				    top: 0;
    				left: 0;
				    display:none;
				" >X</a>
			</div>`);
		book[0].addEventListener("longtap", function() {
			console.log("你正在长按");
			$(".bookRemove").show();
			$(".bookRemove").data("status", "show");
		});
		$(".bookRemove", book)[0].addEventListener("tap", ()=>{
			removeBook(id);
		});
		$(".bookRead", book)[0].addEventListener("tap", ()=>{
			openOldBook(id);
		});
		$("#BookContent .mui-content-padded").append(book);
	}
}

function openOldBook(id) {
	if($(".bookRemove").data("status") === "show") {
		return;
	}
	let info = localStorage.getItem(id);
	info = JSON.parse(info);
	$("#BackBar").data("from", "#Book");
	readBook(info);
}