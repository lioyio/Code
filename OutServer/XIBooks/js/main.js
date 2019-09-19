
$(document.body).ready(() => {
	let xhr = null;

	$("#searchBtn").click(() => {
		$("#BookNav,#BookContent").hide();
		$("#SearchNav,#SearchContent").show();
	});
	$("#backBtn").click(() => {
		$("#BookNav,#BookContent").show();
		$("#SearchNav,#SearchContent").hide();
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

	function search(str) {
		console.log(str);
		if(str === "") {
			return;
		}
		let net = new Net();
		net.require(`search?bk=${str}`, (status, result) => {
			if(status === 200) {
				console.log(result);
			} else {
				mui.toast('搜索失败');
			}
		});
	}
});