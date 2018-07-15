Vue.component('schedule_list', {
    data: function () {
        return {
			rect:{
				show:false,
				left:0,
				right:0,
				top:0,
				bottom:0
			}
		};
    },
	props:['colors','rows','cols','cells','data','selcolor'],
    template: '\
				<table :style="{userSelect:`none`,position:`relative`}">\
					<template v-for="(row,rowindex) in rows">\
						<tr is="schedule_list_row" v-for="(color,colorindex) in colors"\
						:color="color" :cols="cols" :cells="cells" :row="rowindex" :selcolor="selcolor"\
						:data="data[colorindex][rowindex]" :rect="rect"></tr>\
					</template>\
				</table>',
});

Vue.component('schedule_list_row', {
    data: function () {
        return {
		};
    },
	props: ['color','cols','cells','data','selcolor','row','rect'],
	methods:{
		triggle(index){
			console.log("click")
			Vue.set(this.data,index,!this.data[index]*1);
		},
		startDrag(index){
			Vue.set(this.rect,show,true);
			console.log("start:row ",this.row,",col ",index);
		},
		endDrag(index){
			Vue.set(this.rect,show,false);
			console.log("start:row ",this.row,",col ",index);
		},
		dragOut(){}
	},
    template: '<tr><td @click="triggle(colindex)"\
						@mousedown="startDrag(colindex)"\
						@mouseup="endDrag(colindex)"\
						@mouseleave="dragOut"\
						v-for="(col,colindex) in cols"\
						:style="{height:cells.height,width:cells.width,backgroundColor:data[colindex]?color:``}"></td></tr>'
});
