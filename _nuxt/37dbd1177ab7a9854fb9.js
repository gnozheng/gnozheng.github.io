(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{436:function(t,i,e){"use strict";i.a=[{aid:"work-in-do1",title:"二零一八",date:"20190214",tags:["work"],desc:"关于2018年这一年来的工作痕迹"},{aid:"webpack-optimization",title:"webpack构建速度优化",date:"20180704",tags:["webpack"],desc:"实践是检验真理的唯一标准"},{aid:"trap-in-job",title:"项目中遇到的坑...",date:"20180711",tags:["webpack"],desc:"关于升级到webpack4.x遇到的问题"},{aid:"prerender-spa-plugin",title:"单页面预渲染实践",date:"20181205",tags:["webpack"],desc:"通过prerender-spa-plugin实现单页面预渲染"}]},437:function(t,i,e){t.exports=e.p+"img/489ced3.jpg"},438:function(t,i,e){"use strict";e(73),e(26),e(27),e(17);var l=e(75),n=e.n(l),a={save:function(t,i){var e=new(n.a.Object.extend(t));return i&&i.map(function(t){e.set(t.key,t.value)}),new Promise(function(t,i){e.save().then(function(i){var e={oid:i.id,data:i.attributes};t(e)},function(t){i(t)})})},select:{contains:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=new n.a.Query(t);return a.contains(i.key,i.value),a.limit(e),l&&a.skip(l),this.core(a)},greaterThanOrEqualTo:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=new n.a.Query(t);return a.greaterThanOrEqualTo(i.key,i.value),a.limit(e),l&&a.skip(l),this.core(a)},equalTo:function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"descending",s=new n.a.Query(t);if(i instanceof Array){var c=!0,o=!1,d=void 0;try{for(var u,r=i[Symbol.iterator]();!(c=(u=r.next()).done);c=!0){var f=u.value;s.equalTo(f.key,f.value)}}catch(t){o=!0,d=t}finally{try{c||null==r.return||r.return()}finally{if(o)throw d}}}else s.equalTo(i.key,i.value);return s[a]("createdAt"),s.limit(e),l&&s.skip(l),this.core(s)},countTotal:function(t,i){var e=new n.a.Query(t);if(i instanceof Array){var l=!0,a=!1,s=void 0;try{for(var c,o=i[Symbol.iterator]();!(l=(c=o.next()).done);l=!0){var d=c.value;e.equalTo(d.key,d.value)}}catch(t){a=!0,s=t}finally{try{l||null==o.return||o.return()}finally{if(a)throw s}}}else e.equalTo(i.key,i.value);return new Promise(function(t,i){e.count().then(function(i){t(i)},function(t){i(t)})})},core:function(t){return new Promise(function(i,e){t.find().then(function(t){var e={};e=t.length>0?{ok:!0,data:t.map(function(t){return{oid:t.id,attributes:t.attributes,updatedAt:t.updatedAt.toLocaleString()}})}:{ok:!1},i(e)},function(t){e(t)})})}},update:function(t,i,e){var l=n.a.Object.createWithoutData(t,i);e.map(function(t){l.set(t.key,t.value)}),l.save()},count:function(t,i,e){return new Promise(function(l,a){var s=n.a.Object.createWithoutData(t,i);s.set(e.key,e.value),s.save().then(function(t){return t.increment(e.key,1),t.fetchWhenSave(!0),t.save()}).then(function(t){console.log(123333,t),l(t.attributes[e.key])},function(t){a(t)})})}};i.a=a},439:function(t,i,e){"use strict";e.d(i,"a",function(){return l}),e.d(i,"b",function(){return n}),e.d(i,"c",function(){return a});var l="Articles",n="Comments",a="Likes"},440:function(t,i,e){var l=e(441);"string"==typeof l&&(l=[[t.i,l,""]]),l.locals&&(t.exports=l.locals);(0,e(3).default)("b7743efc",l,!0,{})},441:function(t,i,e){(t.exports=e(2)(!1)).push([t.i,'.articles_module_left,.articles_module_right{float:left}.articles_module_left{width:70%;padding:15px 30px;background:#fff}.articles_module_right{position:relative;width:28%;margin-left:2%}.articles_module_indicator{position:fixed;top:80px;margin-left:-82px;display:inline-block;width:50px}.articles_module_indicator span{display:block;width:inherit;height:40px;line-height:40px;text-align:center;font-size:12px;border-bottom:1px solid #eee;background:#fff}.articles_module_indicator span .dy-icon,.articles_module_indicator span .fa{font-size:14px}.articles_module_indicator span .fa{color:#666}.articles_module_indicator span .fa.is-collected{color:gold}.articles_module_indicator span .indicator_title{display:none}.articles_module_indicator span:hover{cursor:pointer;background:#fcfcfc}.articles_module_indicator span:hover .fa{display:none}.articles_module_indicator span:hover .indicator_title{display:inline;display:initial}.articles_module_navigation{position:relative;height:40px;line-height:40px}.articles_module_navigation:after{content:"";position:absolute;right:-15px;bottom:0;left:-15px;height:1px;background:#eee}.articles_module_navigation span{font-size:16px}.articles_module_navigation ul{float:right}.articles_module_navigation ul li{float:left;margin-left:15px;color:#666}.articles_module_filter_list li{cursor:pointer;padding:15px;border-bottom:1px solid #eee}.articles_module_filter_list li:hover{background:#fafafa}.articles_module_filter_list_tags{margin-right:4px;padding:1px 4px;border-radius:5px;border:1px solid #004766;font-size:12px;color:#004766;background:#fff}.articles_module_filter .articles_desc{margin:5px 0 16px;color:#666}.articles_module_filter time{float:right}.articles_module_block{margin-bottom:15px;padding:15px;background:#fff}.articles_module_block h4 a{float:right;font-size:12px;font-weight:400;color:#666}.articles_module_block_list{margin-top:5px;font-size:12px}.articles_module_block_list a{display:block;padding:5px 15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#088ec7}.articles_module_block_list span{margin-right:8px;padding:0 6px;border-radius:5px;color:#fff;background:#f78e6d}.articles_module_block_list span:hover{cursor:pointer;background:#f77248}.articles_module_introduce{text-align:center}.articles_module_introduce img{width:60px;border-radius:50%}.articles_module_introduce h3{margin-top:5px}.articles_module_introduce p{margin-top:0}.articles_module_introduce_details{padding-left:15px;text-align:left}.articles_module_introduce_details div{margin-top:10px}.articles_module_introduce_details i{margin-right:8px}.actions_content{margin-top:50px;text-align:center}.actions_content .dy-btn{border-radius:100px}.actions_content .fa-heart{color:red}.article_details .comments_content{margin-top:100px}.article_details .comments_content .dy-pagination{margin-top:15px}.article_details .comments_content_list li{padding:10px 15px}.article_details .comments_content_list li img{width:32px;vertical-align:bottom}.article_details .comments_content_list li span{margin:0 12px 0 5px;font-size:16px}.article_details .comments_content_list li time{float:right;margin-top:16px;font-size:12px;color:#999}.article_details .comments_content_list li:not(:last-child){border-bottom:1px solid #eee}.article_details .comments_content_details{padding:10px 15px 10px 42px;word-break:break-all}.article_details .comments_content h3{margin:20px 0 10px}.article_details .comments_content h3 span{font-size:12px;color:#999}.article_details .comments_content img{width:80%;border-radius:50%}.article_details .comments_content .dy-input-placeholder{color:#b7b7b7}.article_details .comments_content .dy-textarea textarea{background:#fcfcfc}',""])},449:function(t,i,e){"use strict";e.r(i);e(73),e(32),e(33);var l=e(6),n=e.n(l),a=(e(440),e(40)),s=e(438),c=e(439),o=e(436),d={name:"articles",fetch:function(t){var i=t.route,e=t.redirect;"/articles"===i.path&&e(301,"/articles/all")},data:function(){return{tagsList:["webpack","es6"],collectionsList:[],likesList:[]}},computed:n()({isArticleDetails:function(){return this.$route.path.includes("articles/details")}},Object(a.b)(["isAuthenticated","loggedUser"]),{pageView:function(){return this.$store.state.articles.pageView},isCollected:{get:function(){return this.$store.state.articles.isCollected},set:function(t){this.$store.commit("articles/setPageCollection",t)}}}),created:function(){this.lcQueryArticlesByUserId()},methods:{handleCollect:function(){if(this.isAuthenticated){var t=this.isCollected,i=this.$store.state.articles.likesTableOid;s.a.update(c.c,i,[{key:"isCollected",value:!this.isCollected}]),t?this.$gnoz.alertMsg("已取消收藏！"):this.$gnoz.alertMsg("已收藏！"),this.isCollected=!t}else this.$gnoz.alertMsg("请先登录！","warning")},lcQueryArticlesByUserId:function(){var t=this;this.isAuthenticated&&s.a.select.equalTo(c.c,{key:"userId",value:this.loggedUser.id}).then(function(i){var e=i.data.map(function(t){var i=o.a.find(function(i){return i.aid===t.attributes.aid});return n()({},i,t.attributes)});t.collectionsList=e.filter(function(t){return t.isCollected}),t.likesList=e.filter(function(t){return t.isLiked})})}}},u=e(1),r=Object(u.a)(d,function(){var t=this,i=t.$createElement,l=t._self._c||i;return l("div",{staticClass:"articles_module t-clearfix"},[l("div",{staticClass:"articles_module_left"},[l("div",{directives:[{name:"show",rawName:"v-show",value:t.isArticleDetails,expression:"isArticleDetails"}],staticClass:"articles_module_indicator"},[l("span",{on:{click:function(i){t.$router.push("/articles/all")}}},[l("dy-icon",{attrs:{type:"angle-single-left"}})],1),t._v(" "),l("span",{attrs:{title:"阅读量"}},[l("i",{staticClass:"fa fa-eye"}),t._v(" "),l("i",{staticClass:"indicator_title"},[t._v(t._s(t.pageView))])]),t._v(" "),l("span",{attrs:{title:"收藏"},on:{click:t.handleCollect}},[l("i",{staticClass:"fa fa-star",class:{"is-collected":t.isCollected}}),t._v(" "),l("i",{staticClass:"indicator_title"},[t._v("\n          "+t._s(t.isCollected?"已收藏":"收藏")+"\n        ")])]),t._v(" "),t._m(0)]),t._v(" "),t.isArticleDetails?t._e():l("div",{staticClass:"articles_module_navigation"},[l("span",[t._v("这些年，走过的路，爬过的坑")]),t._v(" "),l("ul",[l("li",[l("nuxt-link",{attrs:{to:"/articles/all"}},[t._v("全部")])],1),t._v(" "),t.isAuthenticated?l("li",[l("nuxt-link",{attrs:{to:"/articles/likes"}},[t._v("喜欢的")])],1):t._e(),t._v(" "),t.isAuthenticated?l("li",[l("nuxt-link",{attrs:{to:"/articles/collections"}},[t._v("收藏的")])],1):t._e()])]),t._v(" "),l("div",{staticClass:"articles_module_list"},[l("nuxt-child",{attrs:{collections:t.collectionsList,likes:t.likesList}})],1)]),t._v(" "),l("div",{staticClass:"articles_module_right"},[t.isArticleDetails?t._e():l("div",{staticClass:"articles_module_block articles_module_introduce"},[l("img",{attrs:{src:e(437),alt:"avatar"}}),t._v(" "),l("h3",[t._v("小粽")]),t._v(" "),l("p",[t._v("假如我年少有为")]),t._v(" "),t._m(1)]),t._v(" "),t.isAuthenticated?l("div",{staticClass:"articles_module_block articles_module_collections"},[l("h4",[t._v("我的收藏 "),l("nuxt-link",{attrs:{to:"/articles/collections"}},[t._v("更多>>")])],1),t._v(" "),l("div",{staticClass:"articles_module_block_list"},t._l(t.collectionsList,function(i){return l("nuxt-link",{key:i.aid,attrs:{to:{path:"/articles/details/"+i.aid}}},[t._v("\n          "+t._s(i.title)+"\n        ")])}),1)]):t._e(),t._v(" "),t._m(2),t._v(" "),l("div",{staticClass:"articles_module_block articles_module_tags"},[l("h4",[t._v("热门标签")]),t._v(" "),t.tagsList.length>0?l("div",{staticClass:"articles_module_block_list"},t._l(t.tagsList,function(i){return l("nuxt-link",{key:i,attrs:{to:{path:"/articles/"+i},tag:"span"}},[t._v("\n          "+t._s(i)+"\n        ")])}),1):t._e()])])])},[function(){var t=this.$createElement,i=this._self._c||t;return i("span",{attrs:{title:"分享"}},[i("i",{staticClass:"fa fa-share-alt"}),this._v(" "),i("i",{staticClass:"indicator_title"},[this._v("分享")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"articles_module_introduce_details"},[i("div",[i("i",{staticClass:"fa fa-qq"}),this._v("\n          921674302\n        ")]),this._v(" "),i("div",[i("i",{staticClass:"fa fa-github-alt"}),this._v(" "),i("a",{attrs:{href:"https://github.com/littlezong",target:"_blank"}},[this._v("littlezong")])]),this._v(" "),i("div",[i("i",{staticClass:"fa fa-envelope"}),this._v("\n          nybz51@163.com\n        ")])])},function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"articles_module_block articles_module_recomments"},[i("h4",[this._v("阅读推荐")]),this._v(" "),i("div",{staticClass:"articles_module_block_list"})])}],!1,null,null,null);r.options.__file="articles.vue";i.default=r.exports}}]);