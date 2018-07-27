var ScheduleRadioEnum = {
	TOP:0,
	BOTTOM:1,
	LEFT:2,
	RIGHT:3
};

function mouseCoords(e,parent) {
    return {
        x: (e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft)-parent[0].offsetLeft,
        y: (e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop)-parent[0].offsetTop
    };
}

Vue.component('schedule-list', {
    data: function () {
        return {
            rect: {
                show: false,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
			range:{
				start:{x:-1,y:-1},
				end:{x:-1,y:-1}
			},
			
        };
    },
	computed:{
		adjustedRect:function(){
			var temprect = {};
			temprect.left = this.rect.left<this.rect.right?this.rect.left:this.rect.right;
			temprect.top = this.rect.top<this.rect.bottom?this.rect.top:this.rect.bottom;
			temprect.width = Math.abs(this.rect.left-this.rect.right);
			temprect.height = Math.abs(this.rect.top-this.rect.bottom);
			return temprect;
		},
		adjustedRange:function(){
			var temprange = {start:{},end:{}};
			temprange.start.x = this.range.start.x<this.range.end.x?this.range.start.x:this.range.end.x;
			temprange.end.x = this.range.start.x>this.range.end.x?this.range.start.x:this.range.end.x;
			temprange.start.y = this.range.start.y<this.range.end.y?this.range.start.y:this.range.end.y;
			temprange.end.y = this.range.start.y>this.range.end.y?this.range.start.y:this.range.end.y;
			return temprange;
		},
		radioStyle:function(){
			var style={};
			switch(this.schedule.radio){
				case ScheduleRadioEnum.TOP:
				{
					style.width = (this.schedule.cells.width.split('px')[0]*1+4) * 48 + 'px';
					style.height = this.schedule.radioWidth;
					style.marginLeft = (this.schedule.cells.width.split('px')[0]*1+4) * 4 + 'px';
				}
				break;
				case ScheduleRadioEnum.BOTTOM:
				{
					style.width = (this.schedule.cells.width.split('px')[0]*1+4) * 48 + 'px';
					style.height = this.schedule.radioWidth;
					style.marginTop = '10px';
					style.marginLeft = (this.schedule.cells.width.split('px')[0]*1+4) * 4 + 'px';
				}
				break;
				case ScheduleRadioEnum.LEFT:
				{
					style.float = 'left';
					style.marginTop = (this.schedule.cells.height.split('px')[0]*1)*this.schedule.colors.length+'px';
				}
				break;
				case ScheduleRadioEnum.RIGHT:
				{
					style.float = 'left';
					//style.marginTop = (this.schedule.cells.height.split('px')[0]*1)*this.schedule.colors.length+'px';
				}
				break;
			}
			return style;
		}
	},
    props: {
    		schedule:{
    			type:Object,
    			validator: function (value) {
    				if(!value.rows){
						Vue.set(value,'rows',7);
					}
					if(!value.cols){
						Vue.set(value,'cols',48);
					}
					if(!value.cells){
						Vue.set(value,'cells',{width:'10px',height:'10px'});
					}
					if(!value.radioWidth){
						Vue.set(value,'radioWidth','20px');
					}
					if(!value.radio){
						Vue.set(value,'radio',3);
					}
					if(!value.selcolor){
						Vue.set(value,'selcolor',0);
					}
    				if(!value.data){
    					console.log('require schedule.data!')
    					return false;
    				}
    				if(!value.colors){
    					console.log('require schedule.colors!')
    					return false;
    				}
    				if(!value.words){
    					console.log('require schedule.words!')
    					return false;
    				}
    				if(value.colors.length == value.data.length && value.colors.length == value.words.length){
    					return true;
    				}
    				console.log('schedule.data schedule.colors schedule.words\' length must equle!')
					return false;
				}
    		}
    	},
	methods:{
		dragMove:function(e){
			if(!this.rect.show)
				return;
			var coords = mouseCoords(e,document.getElementsByClassName('schedule_parent'));
			Vue.set(this.rect, 'right', coords.x);
			Vue.set(this.rect, 'bottom', coords.y);
		},
		endDrag:function(){
			Vue.set(this.rect,'show',false);
			var flag = !this.schedule.data[this.schedule.selcolor][this.range.start.y][this.range.start.x]*1;
			for(var i = this.adjustedRange.start.y;i <= this.adjustedRange.end.y;++i){
				for(var j = this.adjustedRange.start.x;j <= this.adjustedRange.end.x;++j){
					Vue.set(this.schedule.data[this.schedule.selcolor][i],j,flag);
				}
			}
			this.range.start.x = -1;
			this.range.start.y = -1;
			this.range.end.x = -1;
			this.range.end.y = -1;
		},
		documentMouseUp:function(){
			if(!this.rect.show)
				return;
			this.endDrag();
		}
	},
	mounted:function(){
		document.addEventListener("mouseup", this.documentMouseUp);
	},
	unmounted:function(){
		document.removeEventListener("mouseup", this.documentMouseUp);
	},
    template: '<div :style="{userSelect:\'none\',display:\'flow-root\'}">\
    			<schedule-list-radio v-if="schedule.radio==0||schedule.radio==2" :style="radioStyle" :radioWidth="schedule.radioWidth" :colors="schedule.colors" :cells="schedule.cells" :selcolor.sync="schedule.selcolor" :words="schedule.words" :radio="schedule.radio"></schedule-list-radio>\
    			<schedule_list_scale :cells="schedule.cells"></schedule_list_scale>\
    			<schedule_list_week :weeks="schedule.weeks" :cells="schedule.cells" :colors="schedule.colors"></schedule_list_week>\
    			<div class="schedule_parent" :style="{position:\'relative\',float:\'left\'}">\
					<table @mousemove="dragMove" @mouseup.left="endDrag">\
						<template v-for="(row,rowindex) in schedule.rows">\
							<tr is="schedule-list-row" v-for="(color,colorindex) in schedule.colors"\
							:color="color" :cols="schedule.cols" :cells="schedule.cells" :row="rowindex" :selcolor="schedule.selcolor"\
							:data="schedule.data[colorindex][rowindex]" :rect="rect" :range="range"></tr>\
						</template>\
					</table>\
					<div v-show="rect.show" class="schedule_mask" :style="{position:\'absolute\',top:adjustedRect.top+\'px\',left:adjustedRect.left+\'px\',width:adjustedRect.width+\'px\',height:adjustedRect.height+\'px\',pointerEvents:\'none\'}"></div>\
				</div>\
				<schedule-list-radio v-if="schedule.radio==1||schedule.radio==3" :style="radioStyle" :radioWidth="schedule.radioWidth" :colors="schedule.colors" :cells="schedule.cells" :selcolor.sync="schedule.selcolor" :words="schedule.words" :radio="schedule.radio"></schedule-list-radio>\
				<div :style="{float:\'right\'}"></div>\
			</div>',
	components:{
		'schedule-list-row':{
			props: ['color', 'cols', 'cells', 'data', 'selcolor', 'row', 'rect','range','words'],
			methods: {
				startDrag:function(e, col) {
					var coords = mouseCoords(e,document.getElementsByClassName('schedule_parent'));
					Vue.set(this.rect, 'show', true);
					Vue.set(this.rect, 'left', coords.x);
					Vue.set(this.rect, 'top', coords.y);
					Vue.set(this.rect, 'right', coords.x);
					Vue.set(this.rect, 'bottom', coords.y);
					this.range.start.x = col;
					this.range.start.y = this.row;
				},
				endDrag:function(e, col) {
					Vue.set(this.rect, 'left', 0);
					Vue.set(this.rect, 'top', 0);
					Vue.set(this.rect, 'right', 0);
					Vue.set(this.rect, 'bottom', 0);
					this.range.end.x = col;
					this.range.end.y = this.row;
				},
				dragMove:function(col){
					this.range.end.x = col;
					this.range.end.y = this.row;
				}
			},
			template: '<tr><td @click.right.prevent.stop=""\
								@mousemove="dragMove(colindex)"\
								@mousedown.left="startDrag($event,colindex)"\
								@mouseup.left="endDrag($event,colindex)"\
								v-for="(col,colindex) in cols"\
								:style="{height:cells.height,width:cells.width,backgroundColor:data[colindex]?color:\'\'}">\
							</td></tr>'
		},
		'schedule_list_scale':{
			data:function(){
				return{
					scaleTableStyle:{
						borderTopWidth:0,
						borderBottomWidth:0,
						borderLeftColor:'transparent'
					}
				};
			},
			computed:{
				scaleBaseStyle:function(){
					var style = {};
					style.width = this.cells.width;
					style.height = this.cells.height.split('px')[0]*1/4+'px';
					style.borderTopWidth = 0;
					style.borderBottomWidth = 0;
					return style;
				},
				scaleNumTableStyle:function(){
					var style = {};
					style.borderColor = 'transparent';
					//style.marginLeft = '-'+(this.cells.width.split('px')[0]*1+3)*2+'px';
					return style;
				},
				scaleNumBaseStyle:function(){
					var style = {};
					style.height = this.cells.height;
					style.borderColor = 'transparent';
					style.textAlign = 'center';
					return style;
				}
			},
			methods:{
				scaleNumStyle:function(index){
					var style = {};
					if(index < 2){
						style.width = (this.cells.width.split('px')[0]*1+3)*2+'px';
					}else{
						style.width = (this.cells.width.split('px')[0]*1+3)*4+'px';
					}
					return style;
				},
				scaleStyle:function(index,row){
					var style = {};
					if(index < 5){
						style.borderLeftColor = 'transparent';
						if(index != 4){
							style.borderRightColor = 'transparent';
						}
					}else{
						if(index%4 != 1 && row == 1){
							style.borderLeftColor = 'transparent';
						}
						if(index%4 != 0 && row == 1){
							style.borderRightColor = 'transparent';
						}
					}
					return style;
				}
			},
			props:['cells'],
			template:'<div>\
						<table :style="scaleNumTableStyle">\
							<tr><td v-for="index in 14" :style="[scaleNumBaseStyle,scaleNumStyle(index)]">{{index>1?(index-2)*2:\'\'}}</td></tr>\
						</table>\
						<table :style="scaleTableStyle">\
							<tr v-for="row in 2">\
								<td v-for="index in 52" :style="[scaleBaseStyle,scaleStyle(index,row)]"></td>\
							</tr>\
						</table>\
					</div>',
		},
		'schedule_list_week':{
			props:['weeks','cells','colors'],
			template:'<table :style="weekTableStyle"><tr v-for="(day,index) in weeks"><td :style="[weekTdBaseStyle,weekTdStyle(index)]">{{day}}</td></tr></table>',
			computed:{
				weekTableStyle:function(){
					var style = {};
					style.float = 'left';
					style.textAlign = 'right';
					style.borderWidth = 0;
					style.borderBottomWidth = '1px';
					return style;
				},
				weekTdBaseStyle:function(){
					var style = {};
					style.width = (this.cells.width.split('px')[0]*1+3)*4+2+'px';
					
					style.borderLeftWidth = 0;
					style.borderTopWidth = 0;
					style.borderRightWidth = 0;
					return style;
				}
			},
			methods:{
				weekTdStyle:function(index){
					var style = {};
					if(index != 0){
						style.borderTopWidth = '1px';
						style.height = (this.cells.height.split('px')[0]*1+4)*this.colors.length-4+'px';
					}else{
						style.height = (this.cells.height.split('px')[0]*1+4)*this.colors.length-2+'px';
					}
					return style;
				}
			}
		},
		'schedule-list-radio':{
			props:['colors','selcolor','cells','words','radio','radioWidth'],
			template:'<div>\
						<div v-for="(color,index) in colors" :style="radioPosStyle">\
							<table :style="[radioStyle,radioBaseStyle(color)]"\
									@click="sel(index)">\
								<tr>\
									<td :style="[radioDotStyle,radioDotBaseStyle(index)]">\
									</td>\
								</tr>\
							</table>\
							{{words[index]}}\
						</div>\
					</div>',
			computed:{
				radioPosStyle:function(){
					var style={};
					style.lineHeight = this.radioWidth;
					switch(this.radio){
						case ScheduleRadioEnum.TOP:
						{
							style.width = 100/this.colors.length+'%';
							style.float = 'left';
						}
						break;
						case ScheduleRadioEnum.BOTTOM:
						{
							style.width = 100/this.colors.length+'%';
							style.float = 'left';
							style.marginTop = this.cells.width;
						}
						break;
						case ScheduleRadioEnum.LEFT:
						{
							style.marginTop = this.cells.width;
						}
						break;
						case ScheduleRadioEnum.RIGHT:
						{
							style.marginTop = this.cells.width;
							style.marginLeft = this.cells.width;
						}
						break;
					}
					return style;
				},
				radioStyle:function(){
					var style = {};
					style.borderWidth = (this.radioWidth.split('px')[0]*1/6)+'px';
					style.borderSpacing = (this.radioWidth.split('px')[0]*1/6)+'px';
					style.borderRadius = '100%';
					style.float = 'left';
					style.cursor = 'pointer';
					return style;
				},
				radioDotStyle:function(){
					var style = {};
					style.border = 'none';
					style.borderRadius ='100%';
					style.width = (this.radioWidth.split('px')[0]*1/3)+'px';
					style.height = (this.radioWidth.split('px')[0]*1/3)+'px';
					return style;
				}
			},
			methods:{
				sel:function(index){this.$emit('update:selcolor', index);},
				radioBaseStyle:function(color){
					var style = {};
					style.borderColor = color;
					return style;
				},
				radioDotBaseStyle:function(index){
					var style = {};
					style.backgroundColor = (this.selcolor==index)?this.colors[index]:'transparent';
					return style;
				}
			}
		}
	}
});
