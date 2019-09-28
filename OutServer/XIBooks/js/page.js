"use strict";

class Page {
	constructor(parent, nextChapter, prevChapter) {
		this.parent = parent;

		this.moving = 0;
		this.fontSize = 0;
		this.lineHeight = 1.5;

		this.rowHeight = 0;
		this.rowNum = 0;
		this.height = 0;
		this.pageNum = 0;
		this.curNum = 0;
		this.nextChapter = nextChapter || function () { };
		this.prevChapter = prevChapter || function () { };
		this.bmenuShow = false;
		this.info = null;

		this.create();
	}
	create() {
		/*
		 * <div id="PageCover">
					<div id="Page"></div>
				</div>
		 */
		$(this.parent).css({
			position: "relative",
			background: "rgb(210,229,210)",
			overflowX: "hidden"
		});
		$(this.parent).html(`
			<div id="BackBar" class="mui-bar mui-bar-nav">
				<a class="backBtn mui-icon mui-icon-back"></a>
				<a id="catalogueBtn" class="mui-icon mui-icon-bars mui-pull-right" style="color:white;font-weight: bolder;"></a>
			</div>
			<div id="Content">
				<div class="Page prev">
					<div class="Title">
						<div class="name1"></div>
						<div class="name2"></div>
					</div>
					<div class="PageCover">
						<div class="Text"></div>
					</div>
					<div class="Process"></div>
					<div class="Battery"></div>
					<div class="Time">00:00</div>
				</div>
				<div class="Page now">
					<div class="Title">
						<div class="name1"></div>
						<div class="name2"></div>
					</div>
					<div class="PageCover">
						<div class="Text"></div>
					</div>
					<div class="Process"></div>
					<div class="Battery"></div>
					<div class="Time">00:00</div>
				</div>
				<div class="Page next">
					<div class="Title">
						<div class="name1"></div>
						<div class="name2"></div>
					</div>
					<div class="PageCover">
						<div class="Text"></div>
					</div>
					<div class="Process"></div>
					<div class="Battery"></div>
					<div class="Time">00:00</div>
				</div>
				<div class="pageBtn" id="prev"></div>
				<div class="pageBtn" id="next"></div>
				<div class="pageBtn" id="menu"></div>
			</div>
			<div id="ToolBar" class="mui-bar mui-bar-nav"></div>
			<div id="Catalogue">
				<div class="mui-bar mui-bar-nav">
					<a id="catalogueCloseBtn" class="mui-icon mui-icon-closeempty mui-pull-right" style="color:white;font-weight: bolder;"></a>
				</div>
				<div>
					<div class="mui-scroll">
						<ul class="mui-table-view" id="Cataloguelist">

						</ul>
					</div>
				</div>
			</div>
		`);
		setInterval(()=>{
			$(".Time").text(new Date().toTimeString().substr(0,5));
		},60*1000);
		$(".Page", this.parent).on("transitionend", event => {
			--this.moving;
			if ($(event.currentTarget).hasClass("next")) {
				$(event.currentTarget).css("z-index", "");
				$("#prev.pageBtn", this.parent).before($(event.currentTarget));
				$(".Page.next .Text").css({
					"margin-top": (this.curNum + 1) * this.height * -1 + "px"
				});
				$(".Page.next .Process").text(`${this.curNum+2}/${this.pageNum}`);
			}
			if ($(event.currentTarget).hasClass("prev")) {
				$(event.currentTarget).css("z-index", "");
				$("#Content", this.parent).prepend($(event.currentTarget));
				$(".Page.prev .Text").css({
					"margin-top": (this.curNum - 1) * this.height * -1 + "px"
				});
				$(".Page.prev .Process").text(`${this.curNum}/${this.pageNum}`);
			}
			if(dev.constructor == Promise){
				navigator.getBattery().then(data=>{
					$(".Battery").css("background-size", data.level * 90 + "% 8px");
				});
			} else{
				$(".Battery").css("background-size", dev.batteryLevel() * 90 + "% 8px");
			}
		});

		$("#prev")[0].addEventListener("tap", () => {
			if (this.bmenuShow) {
				this.bmenuShow = false;
				$("#BackBar,#ToolBar").hide();
				return;
			}
			if (this.curNum === 0) {
				this.prevChapter(this.info);
				return;
			}
			if (this.moving != 0) {
				return;
			}
			this.moving = 6;
			this.curNum -= 1;
			this.info.curNum = this.curNum;
			let prev = $(".prev").removeClass("prev");
			$(".next").addClass("prev").removeClass("next").css("z-index", "-1");;
			$(".now").addClass("next").removeClass("now");
			prev.addClass("now");
		});
		$("#next")[0].addEventListener("tap", () => {
			if (this.bmenuShow) {
				this.bmenuShow = false;
				$("#BackBar,#ToolBar").hide();
				return;
			}
			if (this.curNum === this.pageNum - 1) {
				this.nextChapter(this.info);
				return;
			}
			if (this.moving != 0) {
				return;
			}
			this.moving = 6;
			this.curNum += 1;
			this.info.curNum = this.curNum;
			let next = $(".next").removeClass("next");
			$(".prev").addClass("next").removeClass("prev").css("z-index", "-1");
			$(".now").addClass("prev").removeClass("now");
			next.addClass("now");
		});
		$("#menu")[0].addEventListener("tap", () => {
			if (this.bmenuShow) {
				this.bmenuShow = false;
				$("#BackBar,#ToolBar").hide();
			} else {
				this.bmenuShow = true;
				$("#BackBar,#ToolBar").show();
			}
		});
		$("#BackBar .backBtn").click(() => {
			let storage = localStorage.getItem(this.info.id);
			if (!storage) {
				var btnArray = ['否', '是'];
				mui.confirm(this.info.bookname, '是否加入书架？', btnArray, e => {
					if (e.index == 1) {
						addBook(this.info);
					}
				})
			} else {
				localStorage.setItem(this.info.id, JSON.stringify(this.info));
			}
			$("#menu").trigger("tap");
			$(".mainPage").hide();
			$($("#BackBar").data("from")).show();
			$(".Page .Text").html("");
			if (window.plus) {
				plus.navigator.setFullscreen(false);
			}
		});
		$("#catalogueBtn").click(() => {
			$("#Catalogue").show();
			$("#BackBar,#ToolBar").hide();
		});
		$("#catalogueCloseBtn").click(() => {
			$("#Catalogue").hide();
			$("#BackBar,#ToolBar").show();
		});
	}
	resize(fontSize, lineHeight, curNum) {
		this.fontsize = fontSize;
		this.lineHeight = lineHeight;
		this.rowHeight = fontSize * lineHeight;

		$(".Page .Text").css({
			fontSize,
			lineHeight,
			"margin-top": "0px",
			height: "unset"
		});
		$(".PageCover").css({
			bottom: "1em",
			height: "unset"
		});

		this.rowNum = parseInt($(".PageCover").css("height").split("px")[0] * 1 / this.rowHeight);
		this.height = this.rowNum * this.rowHeight;
		this.pageNum = Math.ceil($(".Page .Text").css("height").split("px")[0] * 1 / this.height);
		this.curNum = curNum;
		if (curNum == -1) {
			this.curNum = this.pageNum - 1;
		}
		this.info.curNum = this.curNum;
		$(".PageCover").css({
			height: this.height + "px"
		});
		$(".Page .Text").css({
			height: this.height * this.pageNum + "px"
		});
		$(".Page.now .Text").css({
			"margin-top": this.curNum * this.height * -1 + "px"
		});
		$(".Page.prev .Text").css({
			"margin-top": (this.curNum - 1) * this.height * -1 + "px"
		});
		$(".Page.next .Text").css({
			"margin-top": (this.curNum + 1) * this.height * -1 + "px"
		});
		$(".Page.now .Process").text(`${this.curNum+1}/${this.pageNum}`);
		$(".Page.prev .Process").text(`${this.curNum}/${this.pageNum}`);
		$(".Page.next .Process").text(`${this.curNum+2}/${this.pageNum}`);
		$(".Time").text(new Date().toTimeString().substr(0,5));
		if(dev.constructor == Promise){
			navigator.getBattery().then(data=>{
				$(".Battery").css("background-size", data.level * 90 + "% 8px");
			});
		} else{
			$(".Battery").css("background-size", dev.batteryLevel() * 90 + "% 8px");
		}
	}
	createCatalogue(info) {
		this.info = info;
		$("#Cataloguelist").empty();
		info.chapterlist.forEach((chapter) => {
			$("#Cataloguelist").append(`
				<li class="mui-table-view-cell mui-media">
					<a href="javascript:;" chapter="${chapter.id}">
						<div class="mui-media-body">
							${chapter.name}
						</div>
					</a>
				</li>
				`);
		});
		let p = this;
		$("#Cataloguelist a").click(function () {
			catalogueListClick(p.info, $(this).attr("chapter") * 1);
		});
	}
	show(bookname,title, text, curNum) {
		$(".Title .name1").text(bookname);
		$(".Title .name2").text(title);
		text = text.replace(/\n+/g, "<br>").replace(/[	]/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
		$(".Page .Text").html(text);
		this.resize(22, 1.5, curNum);
	}
	changeTheme(background, color) {
		$(this.parent, ".Page .Text").css({
			background,
			color
		});
	}
}

function catalogueListClick(info, chapter) {
	nextChapter(info, chapter * 1);
	$("#catalogueCloseBtn").click();
	$("#menu").trigger("tap");
}