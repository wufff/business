<template>
    <div>
    <div class="detail_header">
       <span><i class="fa fa-angle-left"></i></span>
	    <div class="tab_header">
	    <tab :line-width="2" :custom-bar-width="getBarWidth" v-model="index">
	      <tab-item>商品</tab-item>
        <tab-item>详情</tab-item>
	      <tab-item>评价</tab-item>
	    </tab>
	    </div>
    </div>

    <div class="detail_content">
      <div>123</div>
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
        index: 2,
        getBarWidth: function (index) {
              return 30 + 'px'
        },
    }
    },
    created:function(){
          this.index = Number(this.$route.query.page);
          this.$router.replace({path:"/detail",query: { id: this.$route.query.id , "page":this.$route.query.page}}); 
    },
    methods:{
   
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
    	border-bottom: 1px solid #eee;
    	margin-bottom: 5/@rem;
    }
</style>