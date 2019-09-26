"use strict";

function cutStringToWidth(str, container) {
	$(container).html(str);
}

class Page {
	constructor(parent) {
		this.parent = parent;
		this.fontSize = 0;
		this.lineHeight = 0;
		this.rowHeight = 0;
		this.rowNum = 0;
		this.pageNum = 0;
		this.curNum = 0;
		this.height = 0;
		this.create();
	}
	create() {
		$(this.parent).html(`<div id="BackBar" class="mui-bar mui-bar-nav">
				<a class="backBtn mui-icon mui-icon-back"></a>
			</div>
			<div id="Content">
				<div class="PageCover">
					<div id="prevPage"></div>
					<div id="Page"></div>
					<div id="nextPage"></div>
				</div>
				<div class="pageBtn" id="prev"></div>
				<div class="pageBtn" id="next"></div>
				<div class="pageBtn" id="menu"></div>
			</div>
			<div id="ToolBar" class="mui-bar mui-bar-nav"></div>`);
		$("#prev").click(() => {
			if(this.curNum === 0) {
				return;
			}
			this.curNum -= 1;
			$("#Page").css("margin-top", this.curNum * this.height * -1 + "px");
		});
		$("#next").click(() => {
			if(this.curNum === this.pageNum - 1) {
				return;
			}
			this.curNum += 1;
			$("#Page").css("margin-top", this.curNum * this.height * -1 + "px");
		});
		$("#menu").click(() => {});
	}
	resize(fontSize, lineHeight) {
		this.curNum = 0;
		this.fontSize = fontSize;
		this.lineHeight = lineHeight;
		$("#Page").css({
			"margin-top": "0px",
			"font-size": fontSize + "px",
			"line-height": lineHeight
		});
		this.rowHeight = this.fontSize * this.lineHeight;
		$(".PageCover").css({
			"height": "unset",
			"bottom": "1em"
		});
		this.rowNum = parseInt($(".PageCover").height() * 1 / this.rowHeight);
		this.height = this.rowNum * this.rowHeight;
		$(".PageCover").css({
			"height": this.height + "px",
			"bottom": "unset"
		});
		this.pageNum = Math.ceil($("#Page")[0].scrollHeight / this.height);
	}
	show(text) {
		text = text.replace(/<br>\n<br>/g, "<br>");
		cutStringToWidth(text, "#Page");
		this.resize(20, 1.5);
	}
}