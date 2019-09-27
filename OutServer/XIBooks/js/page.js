"use strict";

class Page {
	constructor(parent, nextChapter, prevChapter) {
		this.parent = parent;

		this.fontSize = 0;
		this.lineHeight = 1.5;

		this.rowHeight = 0;
		this.rowNum = 0;
		this.height = 0;
		this.pageNum = 0;
		this.curNum = 0;
		this.nextChapter = nextChapter || function() {};
		this.prevChapter = prevChapter || function() {};
		this.bmenuShow = false;
		this.info = null;

		this.create();
	}
	create() {
		$(this.parent).html(`
			<div id="BackBar" class="mui-bar mui-bar-nav">
				<a class="backBtn mui-icon mui-icon-back"></a>
				<a id="catalogueBtn" class="mui-icon mui-icon-bars mui-pull-right" style="color:white;font-weight: bolder;"></a>
			</div>
			<div id="Content">
				<div id="PageCover">
					<div id="Page"></div>
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
		$("#Catalogue").css({
			position: "absolute",
			width: "100%",
			height: "100%",
			display: "none",
			background: "white",
			top: "44px"
		});
		$("#BackBar,#ToolBar").css({
			display: "none"
		});
		$("#Content").css({
			"position": "relative",
			"width": "100%",
			"height": "100%"
		});
		$("#PageCover").css({
			position: "absolute",
			overflow: "hidden",
			top: "1em",
			bottom: "1em"
		});
		$("#Page").css({
			"margin-left": "1em",
			"margin-right": "1em"
		});
		$("#ToolBar").css({
			position: "absolute",
			top: "100%",
			transform: "translate(0,-100%)"
		});
		$("#prev").css({
			position: "absolute",
			width: "50%",
			height: "100%",
			top: "0",
			left: "0"
		});
		$("#next").css({
			position: "absolute",
			width: "50%",
			height: "100%",
			top: "0",
			right: "0"
		});
		$("#menu").css({
			position: "absolute",
			width: "30%",
			height: "50%",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)"
		})
		$(".mui-bar-nav", this.parent).css({
			background: "rgba(0,0,0,.5)"
		});
		$(".mui-bar-nav", "#Catalogue").css({
			background: "#D74B28"
		});
		$("#prev")[0].addEventListener("tap",() => {
			if(this.bmenuShow) {
				this.bmenuShow = false;
				$("#BackBar,#ToolBar").hide();
				return;
			}
			if(this.curNum === 0) {
				this.prevChapter(this.info);
				return;
			}
			this.curNum -= 1;
			this.info.curNum = this.curNum;
			$("#Page").css({
				"margin-top": this.curNum * this.height * -1 + "px"
			});
		});
		$("#next")[0].addEventListener("tap",() => {
			if(this.bmenuShow) {
				this.bmenuShow = false;
				$("#BackBar,#ToolBar").hide();
				return;
			}
			if(this.curNum === this.pageNum - 1) {
				this.nextChapter(this.info);
				return;
			}
			this.curNum += 1;
			this.info.curNum = this.curNum;
			$("#Page").css({
				"margin-top": this.curNum * this.height * -1 + "px"
			});
		});
		$("#menu")[0].addEventListener("tap",() => {
			if(this.bmenuShow) {
				this.bmenuShow = false;
				$("#BackBar,#ToolBar").hide();
			} else {
				this.bmenuShow = true;
				$("#BackBar,#ToolBar").show();
			}
		});
		$("#BackBar .backBtn").click(() => {
			let storage = localStorage.getItem(this.info.id);
			if(!storage) {
				var btnArray = ['否', '是'];
				mui.confirm(this.info.bookname, '是否加入书架？', btnArray, e=> {
					if(e.index == 1) {
						addBook(this.info);
					}
				})
			} else {
				localStorage.setItem(this.info.id, JSON.stringify(this.info));
			}
			$("#menu").trigger("tap");
			$(".mainPage").hide();
			$($("#BackBar").data("from")).show();
			$("#Page").html("");
			if(window.plus) {
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

		$("#Page").css({
			fontSize,
			lineHeight,
			"margin-top": "0px"
		});
		$("#PageCover").css({
			bottom: "1em",
			height: "unset"
		});

		this.rowNum = parseInt($("#PageCover").css("height").split("px")[0] * 1 / this.rowHeight);
		this.height = this.rowNum * this.rowHeight;
		this.pageNum = Math.ceil($("#Page").css("height").split("px")[0] * 1 / this.height);
		this.curNum = curNum;
		if(curNum == -1) {
			this.curNum = this.pageNum - 1;
		}
		this.info.curNum = this.curNum;
		$("#PageCover").css({
			height: this.height + "px"
		});
		$("#Page").css({
			"margin-top": this.curNum * this.height * -1 + "px"
		});

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
		$("#Cataloguelist a").click(function(){
			catalogueListClick(p.info, $(this).attr("chapter")*1);
		});
	}
	show(title, text, curNum) {
		text = text.replace(/\n+/g, "<br>").replace(/[	]/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
		$("#Page").html(text);
		this.resize(20, 1.5, curNum);
	}
}

function catalogueListClick(info, chapter) {
	nextChapter(info, chapter * 1);
	$("#catalogueCloseBtn").click();
	$("#menu").trigger("tap");
}