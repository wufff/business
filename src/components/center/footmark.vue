<template>
    <div>
      <div class="pu_header clearfix" >
         <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left">我的足迹</div>
      </div>
       <div class="markt_content"  
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
       	   <ul class="listWrap">
                   <li v-for="item in liData">
                     <router-link :to ="{ path: '/detail',query:{ id: item.productId }}" class="clearfix">
                        <div class="left imgWrap">
                             <div class="imgbox" :style="{backgroundImage: 'url('+item.imgUrl+')'}"></div>
                        </div>
                        <div class="right infoWrap">
                           <h5>{{item.name}}</h5>
                           <p>{{item.storeName}}</p>                   
                           <div><span class="price">￥ {{item.price}}</span></div>
                        </div>  
                       <!--  <span class="addCartBt">adf </span> -->
                     </router-link>
                   </li>
           </ul>  
           <div class="spinnerWap" v-show="!isBottom" v-if="liData.length>0">
                    <spinner type="spiral" size="20px"></spinner><span class="jz">努力加载中...</span>
          </div>
       </div>
    </div>
</template>

<script type="ecmascript-6">
import {Spinner} from 'vux';
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	scroll:false,
        isBottom:false,
        liData:[],
        loading:false,
        page:1
      }
    },
    created:function(){
       api.ajaxLaoding('',
        "CustomerCenter/history",{"pageIndex":this.page,"pageSize":5}
          ).then(res=>{
         console.log(res);
         var data = res.data.result.historyInfos;
        this.liData = data;
        this.scroll = true;
        this.page++;
        if(!res.data.result.haxNext){
              this.isBottom = true;
              this.scroll = false ;
         }
         }).catch(()=>{
          console.log("失败");
        });
    },
    methods:{
    	goBack(){
    	   window.history.go(-1);
    	},
      loadMore(){
          if(this.scroll == false){
           return;
        }
        console.log("进入更多");
        this.loading = true; 
         api.ajax('',
        "CustomerCenter/history",{"pageIndex":this.page,"pageSize":5}
          ).then(res=>{
        var data = res.data.result.historyInfos;
        this.liData.push(...data);
        this.page++;
        this.loading = false;
        if(!this.hasnext){
              this.isBottom = true;
              this.scroll = false ;
         }
         }).catch(()=>{
          console.log("失败");
        });
      }
    },
     components: {
      Spinner
  }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .listWrap {
    padding:0/@rem 8/@rem 0 8/@rem;
    li {
      margin-bottom:8/@rem; 
      background-color: #fff;
      a {
         height: 120/@rem;
         position: relative;
         .imgWrap {
          width: 120/@rem;
          padding: 10/@rem;
          height: 100%;
          .imgbox {
             border: 1px solid #d4d4d4;
             width: 100%;
             height: 100%;
             background-repeat: no-repeat;
             background-position: center;
             background-size: cover;
          }
         }
         .right {
           width: 237/@rem;
           height: 100%;
           
           padding: 12/@rem 12/@rem 12/@rem 0;
           h5{
              margin-bottom: 8/@rem;
              max-height: 38.4/@rem;
              overflow: hidden;
              text-overflow:ellipsis;
              font-weight: normal;
           }
           p {
              font-size: 13/@rem;
              margin-bottom: 5/@rem;
           }
         }
        .addCartBt {
          position: absolute;
          right: 15/@rem;
          bottom: 15/@rem;
          font-size: 20/@rem;
        }

      }
    }

}
.markt_content {
       padding-top:56/@rem;
    }
.spinnerWap {
    margin: 0 auto;
    text-align:  center;
    background-color: #eee;
    padding: 0 3/@rem;
    color: #fff;
    height: 35/@rem;
    padding-top: 7/@rem;
    .jz{
      margin-left: 10/@rem;
      color: #999;
    }
 }
</style>