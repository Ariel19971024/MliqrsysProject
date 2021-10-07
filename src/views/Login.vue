<template>
    <body id="canvas" class="page-login">
    <div class="page-login-inner">
        <div class="login-container">
            <!-- login-header -->
            <div class="login-header">
                <div class="login-header-logo">
                    <img src="../assets/logo_30.svg">
                </div>
            </div>
            <!-- login-content -->
            <div class="login-content">
                <div class="login-panel">
                    <div class="login-panel-header">
                        <div class="panel-title">主機交易查詢系統</div>
                        <div class="panel-sub-title">Trade Inquire System</div>
                    </div>
                    <div class="login-panel-form">
                        <form action="" @submit.prevent="submitHandler">
                            <div class="login-form-field">
                                <div class="login-field-title">帳號</div>
                                <div class="login-field-input"><input type="text" v-model="account" ></div>
                            </div>
                            <div class="login-form-field">
                                <div class="login-field-title">密碼</div>
                                <div class="login-field-input"><input type="text" v-model="password"></div>
                            </div>
                            <div class="login-form-field login-form-send">
                                <button>登 入</button>
                            </div>
                        </form>
                    </div>
                    <div class="login-panel-footer">IT專線：<span>1234</span><span>5678</span></div>
                </div>
            </div>
            <!-- login-footer -->
            <div class="login-footer">版權所有 © 2021 三商美邦人壽 </div>
        </div>
    </div>
</body>
</template>
<script>
export default {
name:"LoginPage",
data(){
    return{
        account:"",
        password:"",
}   
},
methods:{
    submitHandler(){
        //call api
        let menu = [
        {
          href: {
            path: "",
          },
          title: "保單價值／內容",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-01",
          child: [
            {
              href: {
                path: "",
              },
              title: "保單內容",
              icon: "",
              child: [
                {
                  href: "/qrysys/inspolicydetails",
                  title: "保單明細",
                  icon: "",
                },
                {
                  href: "/qrysys/medicalnotifs",
                  title: "體檢批註告知",
                  icon: "",
                  class: "",
                },
                {
                  href: "/qrysys/relatedpartyinfo",
                  title: "關係人資料",
                  icon: "",
                },
                {
                  href: "/qrysys/inskindinfo",
                  title: "保障險種資料",
                  icon: "",
                },
                {
                  href: "/qrysys/dividendinfo",
                  title: "紅利資料",
                  icon: "",
                },
                {
                  href: "/qrysys/increasedvaluefunds",
                  title: "增值回饋分享金",
                  icon: "",
                },
              ],
            },
            {
              href: {
                path: "",
              },
              title: "保單價值",
              icon: "",
              child: [
                {
                  href: "/qrysys/annuitydetails",
                  title: "年金提存明細",
                  icon: "",
                },
                {
                  href: "/qrysys/principalrepayment",
                  title: "還本金",
                  icon: "",
                },
                {
                  href: "/qrysys/backflowquery",
                  title: "回流關聯查詢",
                  icon: "",
                },
              ],
            },
          ],
        },

        // -------SecondPart

        {
          href: {
            path: "",
          },
          title: "投資交易",
          icon: "",
          hiddenOnCollapse: true,

          class: "menu-unit-02",

          child: [
            {
              href: "/qrysys/investmenttargets",
              title: "投資標的、餘額",
              icon: "",
            },
            {
              href: "/qrysys/transactionrecord",
              title: "交易紀錄",
              icon: "",
            },
            {
              href: "/qrysys/cashflow",
              title: "現金流量",
              icon: "",
            },
            {
              href: "/qrysys/stopprofit",
              title: "自動轉換與停利查詢",
              icon: "",
            },
            {
              href: "/qrysys/deductionquery",
              title: "每月扣除額查詢",
              icon: "",
            },
            {
              href: "/qrysys/withdrawalquery",
              title: "約定轉換/提領查詢",
              icon: "",
            },
            {
              href: "/qrysys/etf",
              title: "ETF管理費查詢",
              icon: "",
            },
          ],
        },

        // ------------
        // ThirdPart------
        {
          href: {
            path: "",
          },
          title: "保戶服務資料",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-03",

          child: [
            {
              href: "/qrysys/contractchange",
              title: "契約變更紀錄",
              icon: "",
            },
            {
              href: "/qrysys/noterecord",
              title: "照會紀錄",
              icon: "",
            },
            {
              href: "/qrysys/automatedquery",
              title: "自動化查詢",
              icon: "",
            },
          ],
        },

        // --------------
        // ForthPart----
        {
          href: {
            path: "",
          },
          title: "理賠／收費",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-04",
          child: [
            {
              href: {
                path: "",
              },
              title: "理賠資料",
              icon: "",
              child: [
                {
                  href: "/qrysys/claimrecord",
                  title: "理賠紀錄",
                  icon: "",
                },
              ],
            },

            {
              href: {
                path: "",
              },
              title: "收費資料",
              icon: "",
              child: [
                {
                  href: "/qrysys/letterofattorny",
                  title: "授權、委託書明細",
                  icon: "",
                },
                {
                  href: "/qrysys/deductiondetails",
                  title: "扣款明細",
                  icon: "",
                },
                {
                  href: "/qrysys/remittanceinquiry",
                  title: "集體彙繳查詢",
                  icon: "",
                },
                {
                  href: "/qrysys/returnquery",
                  title: "退件查詢",
                  icon: "",
                },
                {
                  href: "/qrysys/goldawardrecord",
                  title: "送金紀錄查詢",
                  icon: "",
                },
                {
                  href: "/qrysys/mediapayment",
                  title: "媒體繳款查詢",
                  icon: "",
                },
              ],
            },
          ],
        },

        // -------------
        // FifthPart--------
        {
          href: {
            path: "",
          },
          title: "付款/保單匯款帳戶查詢",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-05",
          child: [
            {
              href: "/qrysys/paymentprofile",
              title: "付款資料查詢",
              icon: "",
            },
            {
              href: "/qrysys/policypaymentquery",
              title: "保單匯款帳戶查詢",
              icon: "",
            },
            {
              href: "/qrysys/unpaidquery",
              title: "應付未付查詢",
              icon: "",
            },
          ],
        },
        //-------------

        {
          href: {
            path: "",
          },
          title: "新契約資料",
          icon: "",
          hiddenOnCollapse: true,
          class: "menu-unit-06",
          child: [
            {
              href: "/qrysys/newcontractquery",
              title: "新契約查詢",
              icon: "",
            },
            {
              href: "/qrysys/insurancerecord",
              title: "投保紀錄查詢",
              icon: "",
            },
            {
              href: "/qrysys/samplingrecord",
              title: "抽檢紀錄查詢",
              icon: "",
            },
            {
              href: "/qrysys/medicalexaminationfee",
              title: "體檢費扣擁查詢",
              icon: "",
            },
            {
              href: "/qrysys/hospital",
              title: "體檢醫院",
              icon: "",
            },
          ],
        },
      ];
    function findkeyword(arr,keyID,path){
      console.log(path)
      for(let key in arr){
        if(arr[key].child){
          findkeyword(arr[key].child,"保");
        }else{
          if(arr[key].title.includes(keyID)){
            console.log(arr[key])
            console.log(path)
          }
          
        }
      }
      
      }
      findkeyword(menu,"保",[])
      console.log(menu)
    }
},
}
</script>


