<template>
    <div>
    <div class="detail_header">
       <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
	    <div class="tab_header">
	    <tab :line-width="2" :custom-bar-width="getBarWidth" v-model="index" bar-active-color="#ffb845">
	      <tab-item @on-item-click="onItemClick">商品</tab-item>
        <tab-item @on-item-click="onItemClick">详情</tab-item>
	      <tab-item @on-item-click="onItemClick">评价</tab-item>
	    </tab>
	    </div>
    </div>

    <div class="detail_content">
    	<router-view></router-view>
    </div>
  </div>
</template>

<script type="ecmascript-6">
import { Tab, TabItem } from 'vux';
 export default {
    name: '',
    data(){
      return { 
        index: 0,
        getBarWidth: function (index) {
              return 30 + 'px'
        },
    }
    },
    created:function(){
         /*根据参数确定Tab*/
         if(this.$route.query.page){
          this.index = Number(this.$route.query.page);
       }else {
         this.index = 0;
       }


        /*根据参数确定跳转*/
       switch (this.index) {
         case 0:
           this.$router.replace({path:"/detail/goodDetail",query: { id: this.$route.query.id }});
           break;
        case 1:
           this.$router.replace({path:"/detail/detailed",query: { id: this.$route.query.id }});
           break;
        case 2:
            this.$router.replace({path:"/detail/comment",query: { id: this.$route.query.id }});
           break;
         default:
           break;
       }
    },
    methods:{
    	goBack(){
         window.history.go(-1);
      },
      /*点击tab跳转*/
      onItemClick(index){
      	  if(index == 0){
      	  	 this.$router.replace({path:"/detail/goodDetail", query: { id: this.$route.query.id }});
      	  };
           if(index == 1){
             this.$router.replace({path:"/detail/detailed", query: { id: this.$route.query.id }});
          };
      	  if(index == 2){
      	  	this.$router.replace({path:"/detail/comment", query: { id: this.$route.query.id }});
      	  }
      }
      
    },

    components: {
    Tab,
    TabItem
  }
   
  }
</script>
<style lang="less" src="../../../static/style/popup.less" scoped></style>
<style lang="less" scoped>

@rem: 23.45rem;
    
    .detail_header {
    	position: fixed;
    	left: 0 ;
    	right:  0;
    	z-index: 500;
    	background-color: #fff;
    	border-bottom: 1px solid #eee;
    	.tab_header {
         width: 200/@rem;
         margin: 0 auto;
         background-color: #fff;
         }
         span {
         	position: absolute;
         	display: block;
         	height: 40/@rem;
         	width: 40/@rem;
         	padding-top: 4/@rem;
         	font-size: 28/@rem;
         	text-align: center;
         }
    }
    .detail_content {
    	padding-top: 48/@rem;
    	padding-bottom: 5/@rem;
    	margin-bottom: 5/@rem;
    }
</style>