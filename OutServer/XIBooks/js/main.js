let page
$(document.body).ready(() => {
	let dev = {};
	if(window.plus && plus.ios){
		let UIDevice = plus.ios.import("UIDevice");
		dev = UIDevice.currentDevice();
		if(!dev.isBatteryMonitoringEnabled()) {
			dev.setBatteryMonitoringEnabled(true);
		}
	}else{
		dev.batteryLevel = ()=>"1";
	}
	
	let level = dev.batteryLevel();
	
	page = new Page("#Book");
	page.show(`
        &nbsp;&nbsp;&nbsp;&nbsp;“对不起，我们已经尽力了，准备后事吧。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;病房外医生的声音很轻，但病床上的林羽却听得一清二楚。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;可能人死之前连听觉都会变得格外灵敏吧，尤其是母亲的哭声，分外尖锐。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;因为见义勇为付出生命，林羽并不是第一个，对此他并不后悔，只是觉得对不起母亲。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;父亲死的早，母亲一手把他拉扯到，不知道吃了多少苦，如今他以优异的成绩考入清海市人民医院，与母亲的生活正要明亮起来，没想到却出了这种意外。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“该死的老天。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;好人果真没有好报，林羽低声咒骂了一声，眼皮再也撑不住，缓缓合上。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“我的儿啊！”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;一声凄厉的哭声猛地将林羽惊醒，他睁眼一看，发现自己此时竟然站在床尾，而母亲正扑在床上嚎啕大哭。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“妈，你哭什么，我这不好端端的在这吗？”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽大喜，以为自己神奇痊愈了，伸手一拍母亲，发现自己的手竟然从母亲的身体中穿了过去。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;母亲没有丝毫的反应，依旧扑在床上痛哭。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽神色一变，抬头看到床上竟然还躺着一个自己，面色干瘪发青，显然已经没了生气。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;我死了？<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽低头看了眼站在床尾的自己，发现身子有些虚白，而且微微有些透明。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽大惊，原来人死之后真的有魂魄！<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;无论他说什么，做什么，母亲都感受不到。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;在护士的帮助下，母亲忍痛给林羽穿上了寿衣，随后护工把他的尸体运上了殡葬车。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;母亲跟着上了车，坐在他的尸体旁，紧紧的攥着他的手，红肿的眼窝中泪水不停地往外涌，“羽儿，你放心走，妈把这边的事情办完了，立马就下去陪你。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;对于她来说，儿子就是她的全部，儿子死了，她活在世上，也没有任何意义了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;一听母亲想要寻短见，林羽顿时急了，学着电影里还魂的场景躺到尸体上，但是没有任何作用，每次坐起的，都只有自己的魂魄。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;车子很快到了火葬场，缴费之后，工作人员简单给林羽化了个妆，递给林羽母亲一个号码牌，接着焚化人员推着林羽的尸体去了焚化大厅。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“不要！”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;当焚化人员将他的尸体推进焚化炉的刹那，林羽瞬间崩溃。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;随着肉身的燃烧，林羽感觉自己的意识正在变弱，身上有无数淡淡的光点向四周流散而去，魂魄也正在慢慢的变淡。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;与此同时，他的眼前开始闪现出另一个世界，入眼所及都是无尽的黑暗，夹杂着红通通的火焰以及凄厉的惨叫声。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;地狱！<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;这是林羽意识中闪过的第一个念头，强大的恐惧感瞬间将他吞没。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;他的魂魄下意识的在空中乱冲乱撞，光点仍旧不停的从他魂体中飘出，而且速率越来越快。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;他眼中的地狱世界也越来越清晰，能听到下面一个神秘沙哑的声音正在呼唤他。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;此时焚化炉内林羽的身体近乎燃尽了，灰烬中一块碧玉色的吊坠突然在烈火中焕发出耀眼的光芒。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;这是林羽外公去世时留给他的，自小戴到现在，穿寿衣的时候，母亲特意没有摘下来。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;吊坠光芒越来越盛，随后砰的一声破裂，一缕碧绿色的光影猛地从吊坠中窜出，一下附着到了林羽的魂魄上。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;紧接着他脑海中传来一个苍老的声音，“我乃你祖上圣人，从今日起，你便是我传人，得我医道术法，悬壶济世，渡人渡己……”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;随后声音消散，庞大的信息量陡然间充斥进林羽的脑海，医道玄术、修行法诀及祖上的一些游历经验一股脑的涌入了林羽的脑海中。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;阅读着脑海中的信息，林羽感觉十分兴奋，仿佛打开了一新世界的大门。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;但这股兴奋劲转瞬即逝，得到秘术传承又有何用，自己已经是个马上要下地狱的死人了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;这个念头闪过，林羽脑海中突然跳出一条有关还魂术的记忆。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;记忆显示，通过还魂术，死去后魂魄未散的人可以附体重生。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;但是林羽的肉身已经在大火中化为灰烬了，不过好在关于肉身损坏的还魂方法也有记录，“肉身陨灭，化鬼，觅活体，后附之。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽倒吸了一口冷气，意思是说自己肉身损坏，要想复活的话，只能通过还魂术化为鬼，找别人的肉身附体。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;要知道在人类的意识里，鬼可是邪恶的化身啊，况且自己要是上了别人的身，不相当于变相剥夺了别人的生命吗？<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;犹豫的功夫，林羽的魂魄已经越来越淡，只剩下了一道幻影，耳边的声音也愈发的清晰。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽咬咬牙，看着接连被推进焚化大厅的尸体，突然来了主意，死人不行，那活死人应该可以吧？<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;数分钟后，林羽来到了清海市最大的植物人托养中心。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;很多植物人是没有意识的，一辈子都醒不过来，他们活着的只有身体，林羽认为，选这种人附身，就不算杀人。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;起先林羽还一个病房一个病房的找过去，寻找合适的身体。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;但发现自己的意识越来越淡薄，很快将要消弭殆尽，那个来自地狱的呼唤声也越来越急促。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽来不及多做思考，瞅准一个二十来岁的男性植物人，念起还魂术，陡然间化为一缕白烟，奋不顾身的钻了进去。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“你逃不掉的！”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;与此同时，耳边的呼唤声陡然变成一声凄厉的惨叫，随后林羽便失去了全部的意识。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;等林羽再醒过来的时候，只感觉强光刺眼，过了片刻才适应过来，低头一看，自己正躺在病房里。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;成功了！<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽兴奋的差点叫出来，猛地坐起，看了眼自己的新身体，迫不及待的撕掉手上的针管，接着跳下了床，但脚一落地，身子一个踉跄摔到了地上。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;可能因为长时间躺着的原因，这个年轻人的肌肉有些轻微的萎缩。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽踉跄着爬起来，抬头看了眼墙上的日历，发现已经是第二天了，触摸着床和墙壁，感受着手上传来的冰冷温度，感觉就跟做梦一样，自己昨天才死，没想到今天又复活了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;稍微活动下，适应了这具新身体，接着他便迫不及待的冲出了医院，他现在心里只有一件事，就是去见自己的母亲。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;此时包子店里挤满了人，十几个小混混叫嚣着让林羽母亲还钱。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;为了给林羽做手术，林羽母亲被迫借了十几万的高利贷，得知林羽死了，小混混们便急不可耐的来讨债了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“你们放心，我这几天就把店卖了，拿到钱就还给你们，求你们先离开吧。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽母亲红肿着双眼恳求道，希望赶快把他们打发走，儿子刚走，她不希望他走的不安宁。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“草，你这个破店才值几个钱，你儿子都死了，我们一走，你要是跑了我们管谁要钱去？”领头的黄毛混混骂骂咧咧道。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“你们放心，我肯定不会跑的，我凑够钱，马上就还给你们。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“不行，今天说什么我们也要拿到钱！”黄毛不依不饶。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“可是我现在真的没钱，你们也知道，为了给我儿子治病，钱都花光了……”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽母亲心如刀割，沙哑的声音里带着一丝哀求。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“没钱也行，这样吧，你把你家那栋破房子过户给我们吧，就当还债了。”黄毛眼睛滴溜一转，说出了自己真正的目的。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽母亲微微一怔，房子是林羽外公留下的，虽然有些老旧，但是地段很好，按照清海现在的房价，起码能卖个两三百万，他们这简直是在明抢啊。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;但是现在儿子死了，家也就没了，留着房子还有什么意义呢，还清债，自己也就能安心的去了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;想到这里，林羽母亲万念俱灰的点点头，刚要答应，这时门外突然传来一声怒喝。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“不行！我们家房子起码值几百万，你们这是抢劫！”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;紧接着林羽驾驭着他的新身体风风火火的冲了进来。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“操你妈的，哪来的野崽子，关你屁事！”黄毛气不打一出来，看着林羽身上的病号服，还以为是哪里跑出来的神经病，冲过来扬手就是一巴掌。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽下意识一躲，伸手一推，黄毛整个人瞬间飞了出去，飞了足足有五六米远，在空中划过一到弧线，砰的摔到了里面的桌子上。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“给老子弄死他！”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;黄毛捂着胸口惨叫了两声，随后一声令下，其他十几个混混立马冲了上来，围着林羽就是一顿拳打脚踢，林羽连忙抬手还击。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;接着包子店里响起了一片哀嚎声，小混混们惨叫连连。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;他们十几个人一起上，竟然连林羽的衣角都没有碰到，而林羽的拳脚打在他们身上，就如同被车撞了一般。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;只需要一拳，他们便疼的起不了身。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽自己也无比震惊，都说鬼上身力大无穷，没想到竟然是真的，而且这些人的动作在他眼里显得十分缓慢，很好躲避。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“报警！报警！”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;黄毛被眼前这一幕吓坏了，他见过能打的，但是没见过这么能打的，简直非人类啊。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;一听要报警，林羽母亲赶紧冲过来抓住林羽的手，急声道：“小伙子，他们要报警了，你快走吧，这里我来处理。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“妈，你说的什么话啊，我哪儿能扔下您啊。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽高兴地眼泪都要出来了，还能活着见到老妈，真是太好了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;听到他的称呼，母亲微微一怔，一脸茫然的看着他。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;看着母亲的眼神，林羽瞬间醒悟了过来，自己是活过来了，但是却换了一副身体，母亲根本不认识自己。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“不好意思阿姨，看到您我就想起了我妈，所以情不自禁的脱口而出，您别介意。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽怕说出自己的真实身份吓坏母亲，急忙编了个瞎话。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“没关系，小伙子，你快走吧，我们家的事不能连累你。”林羽母亲一边说，一边把他往外推。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽没答话，摸起桌上的筷子一扔，筷子飞速射向黄毛，砰的一声，将黄毛刚按上110的手机钉到了墙上。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;黄毛吓得脸都白了，墙上的筷子离着自己耳朵也就一厘米，要是稍微出点偏差，那钉在墙上的可就是自己的脑袋。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“救命啊！杀人了！救命啊！”黄毛吓得顿时惨叫了起来，声音里说不出的委屈，明明是他们先欠自己钱的啊。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“别嚷嚷了，这钱我替秦阿姨还！”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽冷声说道，既然自己复活了，那这些债理应由自己来还。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“小伙子，这怎么能行，你我第一次见，怎么能让你替我还钱？”林羽母亲有些疑惑的看着林羽，不知道为什么，这个小伙子给她一种似曾相识的感觉。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;对于林羽知道她姓氏这点，她并不吃惊，儿子见义勇为付出生命的事情好多网友都知道，她的姓名和联系方式也都被扒了，很多好心人都要来给儿子送行，她都谢绝了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“好，这可是你说的，那你把钱给我们吧。”黄毛可不管林羽为什么替别人还钱，只要能拿到钱，他的任务就算完成了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“给我三天时间。”林羽说道。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“……”黄毛有些无语，说的这么牛逼，还以为立马就能把钱拿出来呢。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“怎么？你不相信我？”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;见黄毛没说话，林羽皱了皱眉头，语气有些冰冷。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“相信，相信，不过大哥您得跟我说下您的名字吧？”看着林羽冰冷的眼神，黄毛禁不住打了个寒颤。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;名字？<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;对啊，早上走的急，连这个人的名字都没来的及看呢。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“你放心，我答应你的一定会做到，这样，三天后，还是这里，你只管过来，我到时候连本带利一起还给你。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽之所以这么有底气，全赖自己这具身体。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;他心想既然能住在托养中心，这个年轻人家里再普通，起码也能拿个十几二十万出来吧，先要来用用，等自己赚了钱，再还回去。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;见识过林羽的身手，黄毛也不敢多说什么，刚要点头答应，突然眼神怔怔的望向店外，好似被什么吸引住了一般。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽也好奇的跟着往外看去，只见门口不知何时来了一辆红色的宝马X5，车门一开，迈出来一截白皙修长的美腿，随后车上下来一个身材高挑，身穿白色波西米亚长裙的美女。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;长裙美女拨了下乌黑的长发，摘下墨镜，白皙的皮肤和精致的容颜简直惊为天人，黄毛和他一帮手下都看呆了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽不禁也被吸引了，这个美女相貌和气质确实都属于极品。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;长裙美女抬头看了眼包子铺，微微皱了皱眉头，接着快步走了进来。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“美女，买包子吗，要什么馅儿的？”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽不由的脱口而出，以前老帮母亲卖包子，见人就这么一腔，已经成为一种条件反射了。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“你叫我什么？”长裙美女冷冷的扫了他一眼，语气不悦。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;“美女啊。”<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;林羽觉得自己的称呼没问题，不禁有些疑惑，头一次见喊美女还有不愿意听的。<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp;长裙美女打量他一眼，冷声道：“行啊，何家荣，昏迷两个月，连自己老婆都不认识了。”        `);
	
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
	page.show(info);
}