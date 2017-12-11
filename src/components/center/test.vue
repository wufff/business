<template>
    <div>
    <scroller style="top:44px;"
      :on-refresh="refresh" :on-infinite="infinite" ref="scroller">
          <div class="forat">
                <div class="clearfix">
                          <div class="itemWrap" v-for="(item,index) in liData">
                             <div style="position:relative;">
                               <a>
                                     <div class="goodImgwarp">
                                           <img v-lazy="item.pic">
                                      </div>
                                      <p class="name">
                                        <span class="tag"></span>{{item.title}}
                                     </p>
                              </a>
                              <div class="priceWarp">
                                     <span v-show="!item.hasLike" >
                                        <span class="icon-点赞空心">点赞</span>
                                        <span class="num">{{item.marketPrice}}</span>
                                     </span>
                                             &nbsp&nbsp&nbsp 
                                     <span><span class="icon-浏览">浏览</span><span class="num"> {{item.counterPrice}}</span></span>
                                 </div>
                            </div>
                        </div>           
                </div>
          </div>
      </scroller>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	liData:[],
        page:1,
        scroll:false
      }
    },
    created:function(){
   api.ajax('',
     "Home/hotSales",{"pageIndex":this.page,"pageSize":6}
    ).then(res=>{
      console.log(res);
      this.liData = res.data.result.data;
      this.page ++;
      this.scroll = true;
    }).catch(()=>{
      console.log("失败");
    })
    },
    methods:{
    	refresh(){
           api.ajax('',
               "Home/hotSales",{"pageIndex":2,"pageSize":6}
              ).then(res=>{
                console.log(res);
                this.liData = res.data.result.data;
                this.page = 2;
                this.scroll = true;
                this.$refs.scroller.finishPullToRefresh();
              }).catch(()=>{
                console.log("失败");
          })
      },
      infinite(){
         if(!this.scroll) {
             this.$refs.scroller.finishInfinite();
             return;
         }
          console.log("到底")    
          api.ajax('',
               "Home/hotSales",{"pageIndex":this.page,"pageSize":6}
              ).then(res=>{
                console.log(res);
                var data = res.data.result.data;
                this.liData.push(...data);
                if(!res.data.result.hasNext){
                   this.scroll = false;
                }else {
                   this.page ++;
                }
                this.$refs.scroller.finishInfinite();
              }).catch(()=>{
                console.log("失败");
          })
      }
    }
  }
</script>

<style  lang="less" scoped>
@rem: 23.45rem;
.forat {
       padding: 0 2/@rem 3/@rem 2/@rem;
       .itemWrap {
         width: 50%;
         float: left;
         padding:4/@rem 2/@rem 0 2/@rem;
         position: relative;
          .gedang {
              width: 100%;
              height: 100%;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.1);
              top:0;
              left:0;
              z-index: 3;
           }
         a {
           display: block;
           background-color: #fff;
           position: relative;
         }
         .goodImgwarp {
           margin-bottom:10/@rem;
           height: 182/@rem;
           color: #fff;
           img{ width: 100%;height: 100%;display: block;}
           img[lazy=loading]{
             /* display: block;
              height: 100%;
              width: 50px;
              margin: 0 auto;*/
              background-color: #eee;
           } 

           .goodImg.noImg{
             text-align: center;
             font-size: 32/@rem;
             padding-top: 30/@rem;
             font-weight: bold;
             color: #fff;
             text-shadow:2px 2px 4px #fff;
           }
         }
       .name {
          font-size: 14/@rem;
          color: #545352;
          padding: 3/@rem 5/@rem 0 5/@rem;
          font-size: 14/@rem;
          height: 39/@rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
         -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 19/@rem;

           .tag {
             background-color: red;
             color: #fff;
             margin-right: 5/@rem;
             font-size: 11/@rem;
             padding: 0 4/@rem 0 4/@rem; 
             border-radius: 5/@rem; 
             display: inline-block;
             position: relative;
             top:-3/@rem;
          }
       }  
       .xzBox {
         position: absolute;
         right: 20/@rem;
         top: 10/@rem;
         width: 30/@rem;
         color: red;
       }
       }
      .priceWarp {
         text-align: center;
         background-color: #fff;
         padding-bottom: 10/@rem;
         padding-top: 8/@rem;
         .liulan {
           font-size: 18/@rem;
           position: relative;
           top:3/@rem;
         }
         .num {
           font-size: 12/@rem;
         }
      }
    }
</style>