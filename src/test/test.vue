<template>
    <div>
     test.vue
    </div>
</template>

<script type="ecmascript-6">
/*var CryptoJS = require("crypto-js");
import api from '@/api';
function getParam(url,paramsObj){
   var value = "6AE9141B-7939-4EA9-B6AA-1DD7EC7BC852";
   var apikey = "apikey";
   var expires = JSON.stringify(Math.round(new Date().getTime() / 1000)); 
   var method = "POST";
   var token = "6AE9141B-7939-4EA9-B6AA-1DD7EC7BC852";
   var params = paramsObj;
	   params.token =  token;
	   params.apikey = apikey;
	   params.expires = expires;
   var arr = [];
   if (params != null) {
        for (var p in params) {arr.push(p);}
     }
   arr.sort();
   var sortedParameterKeys = '';
       for (var i = 0; i < arr.length; i++) {sortedParameterKeys += arr[i] + "=" + params[arr[i]];}
    var stringToSign = method + url;
          stringToSign += sortedParameterKeys;
          stringToSign += token;
      var hash = CryptoJS.SHA256(stringToSign);
      var signature = hash.toString(CryptoJS.enc.Base64);
       if (signature.lastIndexOf('==')) {
            signature = signature.substring(0, signature.length - 1);
        }
      signature = encodeURIComponent(signature); 
      paramsObj.signature = signature;

      return  {
                 "action": url,
                 "args": params
              }   
}
console.log(getParam("Category/getTowDetailList",{"id":2,"name":"你好吗"}));

    export default {
    name: '',
    data(){
      return {
      	title:"" 
      }
    },
    created:function(){
  api.ajaxLaoding('',"Category/getTowDetailList",{"id":2}).then(res=>{
      console.log(res);
    }).catch(()=>{
      console.log("失败");
    });
    },

    methods:{
    	
    }
  }*/
</script>

<style lang="less" scoped>

    
</style>