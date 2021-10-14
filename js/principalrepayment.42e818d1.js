(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["principalrepayment"],{"67f9":function(e,a,t){"use strict";t.r(a);var l=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",[t("SectionTitle",{attrs:{title:e.sectionTitle}}),t("div",{staticClass:"content-card"},[t("div",{staticClass:"card-inner"},[t("div",{staticClass:"card-detail"},[t("Accordion",{attrs:{id:"annuitydetails-acc1",title:"給付資料"}},[t("Table",{attrs:{colNum:4,table:e.acc1NTableData}}),t("TabulatorTable",{attrs:{tableId:e.acc1TableId,columns:e.acc1TableColumns,tableData:e.acc1TableData,checkId1:"annuitydetails-acc1-table-check1",checkId2:"annuitydetails-acc1-table-check2"}})],1)],1)])]),t("Tabs",{attrs:{titles:e.titles,tabLen:e.tabLen},scopedSlots:e._u([{key:"1",fn:function(){return[t("Accordion",{attrs:{id:"tab1-acc1",title:"明細資料"}},[t("Table",{attrs:{colNum:4,table:e.tab1Acc1NTableData}})],1),t("Accordion",{attrs:{id:"tab1-acc2",title:"給付項目"}},[t("TabulatorTable",{attrs:{tableId:e.tab1Acc2TableId,columns:e.tab1Acc2TableColumns,tableData:e.tab1Acc2TableData,checkId1:"annuitydetails-tab1acc2-table-check1",checkId2:"annuitydetails-tab1acc2-table-check2"}})],1),t("Accordion",{attrs:{id:"tab1-acc3",title:"抵繳保單"}},[t("TabulatorTable",{attrs:{tableId:e.tab1Acc3TableId,columns:e.tab1Acc3TableColumns,tableData:e.tab1Acc3TableData,checkId1:"annuitydetails-tab1acc3-table-check1",checkId2:"annuitydetails-tab1acc3-table-check2"}})],1)]},proxy:!0},{key:"2",fn:function(){return[t("Accordion",{attrs:{id:"tab2-acc1",title:"回覆情形"}},[t("TabulatorTable",{attrs:{tableId:e.tab2Acc1TableId,columns:e.tab2Acc1TableColumns,tableData:e.tab2Acc1TableData,checkId1:"annuitydetails-tab2acc1-table-check1",checkId2:"annuitydetails-tab2acc1-table-check2"}})],1),t("Accordion",{attrs:{id:"tab2-acc2",title:"缺件資料"}},[t("Table",{attrs:{colNum:1,table:e.tab2Acc2NTableData}})],1),t("Accordion",{attrs:{id:"tab2-acc3",title:"註記內容"}},[t("Table",{attrs:{colNum:1,table:e.tab2Acc3NTableData}})],1)]},proxy:!0},{key:"3",fn:function(){return[t("Accordion",{attrs:{id:"tab3-acc1",title:"回覆明細"}},[t("Table",{attrs:{colNum:3,table:e.tab3Acc1NTableData}})],1),t("Accordion",{attrs:{id:"tab3-acc2",title:"給付明細"}},[t("TabulatorTable",{attrs:{tableId:e.tab3Acc2TableId,columns:e.tab3Acc2TableColumns,tableData:e.tab3Acc2TableData,checkId1:"annuitydetails-tab3acc2-table-check1",checkId2:"annuitydetails-tab3acc2-table-check2"}})],1),t("Accordion",{attrs:{id:"tab3-acc3",title:"抵繳保單"}},[t("TabulatorTable",{attrs:{tableId:e.tab3Acc3TableId,columns:e.tab3Acc3TableColumns,tableData:e.tab3Acc3TableData,checkId1:"annuitydetails-tab3acc3-table-check1",checkId2:"annuitydetails-tab3acc3-table-check2"}})],1)]},proxy:!0}])})],1)},c=[],i=t("1da1"),b=(t("96cf"),t("99af"),{name:"PrincipalRepayment",mounted:function(){console.log(this.insPolicyNumber)},computed:{insPolicyNumber:function(){return this.$store.state.insPolicyNumber}},watch:{insPolicyNumber:function(e,a){this.watchApiCall(),console.log("newVal: ".concat(e," \n oldVal: ").concat(a))}},methods:{watchApiCall:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log("callApi");case 1:case"end":return e.stop()}}),e)})))()}},data:function(){return{sectionTitle:"還本金",titles:["明細資料","回覆情形及註記","還本未回回覆"],tabLen:3,acc1TableId:"acc1TableId",acc1TableColumns:[{title:"還本週年日",field:"a"},{title:"還本產品簡名",field:"b"},{title:"還本版數",field:"c"},{title:"註記",field:"d"},{title:"還本狀況",field:"e"},{title:"支票兌現",field:"f"},{title:"應付金額",field:"g"},{title:"加項金額",field:"h"},{title:"減項金額",field:"i"},{title:"實付金額",field:"j"},{title:"還本種類",field:"k"},{title:"回流專案回覆時間",field:"l"}],acc1TableData:[],acc1NTableData:[{key:"保單號碼",keyId:0,value:""},{key:"保單狀態(中文)",keyId:1,value:""},{key:"生效日",keyId:2,value:""},{key:"作帳日",keyId:3,value:""},{key:"保單狀態",keyId:4,value:""},{key:"收費方式",keyId:5,value:""},{key:"保費到期日",keyId:6,value:""},{key:"",keyId:7,value:""}],tab1Acc1NTableData:[{key:"還本週年日",keyId:0,value:""},{key:"回覆指示",keyId:1,value:""},{key:"郵寄地址",keyId:2,value:""},{key:"電匯指示",keyId:3,value:""},{key:"給付方式",keyId:4,value:""},{key:"超借指示",keyId:5,value:""},{key:"領取人",keyId:6,value:""},{key:"電匯日期",keyId:7,value:""},{key:"業務員",keyId:8,value:""},{key:"還款指示",keyId:9,value:""},{key:"領取人ID",keyId:10,value:""},{key:"",keyId:11,value:""},{key:"未兌支票",keyId:12,value:""},{key:"ID影本檢付",keyId:13,value:""},{key:"領取地點",keyId:14,value:""},{key:"",keyId:15,value:""},{key:"給付變更",keyId:16,value:""},{key:"註記",keyId:17,value:""},{key:"受益人",keyId:18,value:""},{key:"",keyId:19,value:""}],tab1Acc2TableId:"tab1Acc2TableId",tab1Acc2TableColumns:[{title:"順序",field:"a"},{title:"受領人",field:"b"},{title:"比率(%)",field:"c"},{title:"實付金額",field:"d"},{title:"付款號碼",field:"e"},{title:"電匯帳號",field:"f"}],tab1Acc2TableData:[],tab1Acc3TableId:"tab1Acc3TableId",tab1Acc3TableColumns:[{title:"保單號碼",field:"a"},{title:"保單狀態",field:"b"},{title:"收費方式",field:"c"},{title:"繳費終日",field:"d"}],tab1Acc3TableData:[],tab2Acc1TableId:"tab2Acc1TableId",tab2Acc1TableColumns:[{title:"回覆序號",field:"a"},{title:"回覆日期",field:"b"},{title:"回覆情形",field:"c"},{title:"處理情形",field:"d"},{title:"承辦者(中文)",field:"e"},{title:"承辦單位",field:"f"}],tab2Acc1TableData:[],tab2Acc2NTableData:[{key:"缺件資料",keyId:0,value:""},{key:"缺件資料",keyId:1,value:""},{key:"缺件資料",keyId:2,value:""},{key:"缺件資料",keyId:3,value:""},{key:"缺件資料",keyId:4,value:""},{key:"缺件資料",keyId:5,value:""},{key:"缺件資料",keyId:6,value:""}],tab2Acc3NTableData:[{key:"註記內容",keyId:0,value:""},{key:"註記內容",keyId:1,value:""},{key:"註記內容",keyId:2,value:""},{key:"註記內容",keyId:3,value:""},{key:"註記內容",keyId:4,value:""}],tab3Acc1NTableData:[{key:"週年日",keyId:0,value:""},{key:"付款方式",keyId:1,value:""},{key:"建檔者",keyId:2,value:""},{key:"郵件地址",keyId:3,value:""},{key:"",keyId:4,value:""},{key:"",keyId:5,value:""}],tab3Acc2TableId:"tab3Acc2TableId",tab3Acc2TableColumns:[{title:"支票號碼",field:"a"},{title:"原受領人ID",field:"b"},{title:"原受領人姓名",field:"c"},{title:"新受領人ID",field:"d"},{title:"新受領人姓名",field:"e"},{title:"匯款銀行",field:"f"},{title:"匯款帳號",field:"g"},{title:"說明",field:"h"}],tab3Acc2TableData:[],tab3Acc3TableId:"tab3Acc3TableId",tab3Acc3TableColumns:[{title:"保單號碼",field:"a"}],tab3Acc3TableData:[]}}}),d=b,n=t("2877"),u=Object(n["a"])(d,l,c,!1,null,null,null);a["default"]=u.exports}}]);
//# sourceMappingURL=principalrepayment.42e818d1.js.map