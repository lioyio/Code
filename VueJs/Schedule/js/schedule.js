function mouseCoords(e,parent) {
    return {
        x: (e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft)-parent[0].offsetLeft,
        y: (e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop)-parent[0].offsetTop
    };
}

Vue.component('schedule_list', {
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
			}
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
		}
	},
    props: ['colors', 'rows', 'cols', 'cells', 'data', 'selcolor'],
	methods:{
		dragMove(e){
			if(!this.rect.show)
				return;
			var coords = mouseCoords(e,document.getElementsByClassName('schedule_parent'));
			Vue.set(this.rect, 'right', coords.x);
			Vue.set(this.rect, 'bottom', coords.y);
		},
		endDrag(){
			Vue.set(this.rect,'show',false);
			var flag = !this.data[this.selcolor][this.range.start.y][this.range.start.x]*1;
			for(var i = this.adjustedRange.start.y;i <= this.adjustedRange.end.y;++i){
				for(var j = this.adjustedRange.start.x;j <= this.adjustedRange.end.x;++j){
					Vue.set(data[this.selcolor][i],j,flag);
				}
			}
			this.range.start.x = -1;
			this.range.start.y = -1;
			this.range.end.x = -1;
			this.range.end.y = -1;
		},
		documentMouseUp(){
			if(!this.rect.show)
				return;
			this.endDrag();
		}
	},
	created:function(){
		document.addEventListener("mouseup", this.documentMouseUp);
	},
	destroyed:function(){
		document.removeEventListener("mouseup", this.documentMouseUp);
	},
    template: '<div class="schedule_parent" :style="{position:`relative`,userSelect:`none`}">\
					<table @mousemove="dragMove" @mouseup.left="endDrag">\
						<template v-for="(row,rowindex) in rows">\
							<tr is="schedule_list_row" v-for="(color,colorindex) in colors"\
							:color="color" :cols="cols" :cells="cells" :row="rowindex" :selcolor="selcolor"\
							:data="data[colorindex][rowindex]" :rect="rect" :range="range"></tr>\
						</template>\
					</table>\
					<div v-show="rect.show" class="schedule_mask" :style="{position:`absolute`,top:adjustedRect.top+`px`,left:adjustedRect.left+`px`,width:adjustedRect.width+`px`,height:adjustedRect.height+`px`,pointerEvents:`none`}"></div>\
				</div>',
});

Vue.component('schedule_list_row', {
    props: ['color', 'cols', 'cells', 'data', 'selcolor', 'row', 'rect','range'],
    methods: {
		startDrag(e, col) {
			var coords = mouseCoords(e,document.getElementsByClassName('schedule_parent'));
			Vue.set(this.rect, 'show', true);
			Vue.set(this.rect, 'left', coords.x);
			Vue.set(this.rect, 'top', coords.y);
			Vue.set(this.rect, 'right', coords.x);
			Vue.set(this.rect, 'bottom', coords.y);
			this.range.start.x = col;
			this.range.start.y = this.row;
        },
        endDrag(e, col) {
			Vue.set(this.rect, 'left', 0);
			Vue.set(this.rect, 'top', 0);
			Vue.set(this.rect, 'right', 0);
			Vue.set(this.rect, 'bottom', 0);
			this.range.end.x = col;
			this.range.end.y = this.row;
        },
		dragMove(col){
			this.range.end.x = col;
			this.range.end.y = this.row;
		}
    },
    template: '<tr><td @click.right.prevent.stop=""\
						@mousemove="dragMove(colindex)"\
						@mousedown.left="startDrag($event,colindex)"\
						@mouseup.left="endDrag($event,colindex)"\
						v-for="(col,colindex) in cols"\
						:style="{height:cells.height,width:cells.width,backgroundColor:data[colindex]?color:``}"></td></tr>'
});
