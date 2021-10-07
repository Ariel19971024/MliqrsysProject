import Vue from 'vue'

//1.引入路由
import VueRouter from 'vue-router'
import { v4 as uuid } from "uuid";
import store from "../store/store";
// import Home from '../views/Home.vue'
//2.
Vue.use(VueRouter)
//3.對應的路徑

const routes = [
  
  {
    path: '/qrysys/layout',
    name: 'Layout',
    meta: {
      name: "Layout"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "login" */ '../views/Layout.vue')
  },
  {
    path: '/qrysys/01',
    name: '01',
    meta: {
      name: "01"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "login" */ '../views/01.vue')
  },
  {
    path: '/qrysys/homepage',
    name: 'HomePage',
    meta: {
      breadcrumb:[{ name: "提示訊息",link:""}],
         
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "homepage" */ '../views/HomePage.vue'),

  },
  {
    path: '/qrysys/inspolicydetails',
    name: 'InsPolicyDetails',
    meta: {
      name:"保單明細",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單內容",
        link:""
      },{
        name:"保單明細",
        link:""
      }]
      
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "insPolicyDetails" */ '../views/InsPolicyDetails.vue')
  },
  {
    path: '/qrysys/medicalnotifs',
    name: 'MedicalNotifs',
    meta: {
      name: "體檢批註告知",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單內容",
        link:""
      },{
        name: "體檢批註告知",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "medicalnotifs" */ '../views/MedicalNotifs.vue')
  },
  {
    path: '/qrysys/relatedpartyinfo',
    name: 'RelatedPartyInfo',
    meta: {
      name: "關係人資料",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單內容",
        link:""
      },{
        name: "關係人資料",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "relatedpartyinfo" */ '../views/RelatedPartyInfo.vue')
  },
  {
    path: '/qrysys/inskindinfo',
    name: 'InsKindInfo',
    meta: {
      name: "保障險種資料",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單內容",
        link:""
      },{
        name: "保障險種資料",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "inskindinfo" */ '../views/InsKindInfo.vue')
  },
  {
    path: '/qrysys/dividendinfo',
    name: 'DividendInfo',
    meta: {
      name: "紅利資料",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單內容",
        link:""
      },{
        name: "紅利資料",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "dividendinfo" */ '../views/DividendInfo.vue')
  },
  {
    path: '/qrysys/increasedvaluefunds',
    name: 'IncreasedValueFunds',
    meta: {
      name: "增值回饋分享金",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單內容",
        link:""
      },{
        name: "增值回饋分享金",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "increasedvaluefunds" */ '../views/IncreasedValueFunds.vue')
  },
  {
    path: '/qrysys/annuitydetails',
    name: 'AnnuityDetails',
   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "annuitydetails" */ '../views/AnnuityDetails.vue'),
    meta: {
      name: "年金提存明細",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單價值",
        link:""
      },{
        name: "年金提存明細",
        link:""
      }]
    },
  },
  {
    path: '/qrysys/principalrepayment',
    name: 'PrincipalRepayment',
    meta: {
      name: "還本金",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單價值",
        link:""
      },{
        name: "還本金",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "principalrepayment" */ '../views/PrincipalRepayment.vue')
  },
  {
    path: '/qrysys/backflowquery',
    name: 'BackflowQuery',
    meta: {
      name: "回流關聯查詢",
      breadcrumb:[{
        name: "保單價值/內容",
        link:""
      },{
        name:"保單價值",
        link:""
      },{
        name: "回流關聯查詢",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/BackflowQuery.vue')
  },
  {

    path: '/qrysys/investmenttargets',
    name: 'Investmenttargets',
    meta: {
      name: "投資標的、餘額",
      breadcrumb:[{
        name: "投資交易",
        link:""
      },{
        name: "投資標的、餘額",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/Investmenttargets.vue')
  },
  {
    path: '/qrysys/transactionrecord',
    name: 'Transactionrecord',
    meta: {
      name: "交易紀錄",
      breadcrumb:[{
        name: "投資交易",
        link:""
      },{
        name: "交易紀錄",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/Transactionrecord.vue')
  },
  {
    path: '/qrysys/cashflow',
    name: 'Cashflow',
    meta: {
      name: "現金流量",
      breadcrumb:[{
        name: "投資交易",
        link:""
      },{
        name: "現金流量",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/Cashflow.vue')
  },
  {
    path: '/qrysys/stopprofit',
    name: 'Stopprofit',
    meta: {
      name: "自動轉換與停利查詢",
      breadcrumb:[{
        name: "投資交易",
        link:""
      },{
        name: "自動轉換與停利查詢",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/Stopprofit.vue')
  },
  
  {
    path: '/qrysys/deductionquery',
    name: 'DeductionQuery',
    meta: {
      name: "每月扣除額查詢",
      breadcrumb:[{
        name: "投資交易",
        link:""
      },{
        name: "每月扣除額查詢",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/DeductionQuery.vue')
  },
  {
    path: '/qrysys/withdrawalquery',
    name: 'WithdrawalQuery',
    meta: {
      name: "約定轉換/提領查詢",
      breadcrumb:[{
        name: "投資交易",
        link:""
      },{
        name: "約定轉換/提領查詢",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/WithdrawalQuery.vue')
  },
  {
    path: '/qrysys/contractchange',
    name: 'Contractchange',
    meta: {
      name: "契約變更紀錄",
      breadcrumb:[{
        name: "保戶服務資料",
        link:""
      },{
        name: "契約變更紀錄",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/Contractchange.vue')
  },
  {
    path: '/qrysys/etf',
    name: 'ETF',
    meta: {
      name: "ETF管理費查詢",
      breadcrumb:[{
        name: "投資交易",
        link:""
      },{
        name: "ETF管理費查詢",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/ETF.vue')
  },
  {
    path: '/qrysys/noterecord',
    name: 'NoteRecord',
    meta: {
      name: "照會紀錄",
      breadcrumb:[{
        name: "保戶服務資料",
        link:""
      },{
        name: "照會紀錄",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/NoteRecord.vue')
  },
  {
    path: '/qrysys/automatedquery',
    name: 'AutomatedQuery',
    meta: {
      name: "自動化查詢",
      breadcrumb:[{
        name: "保戶服務資料",
        link:""
      },{
        name: "自動化查詢",
        link:""
      }]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/AutomatedQuery.vue')
  },
  {
    path: '/qrysys/claimrecord',
    name: 'ClaimRecord',
    meta: {
      name: "理賠紀錄",
      breadcrumb:[{
        name: "理賠/收費",
        link:""
      },{
        name: "理賠資料",
        link:""
      },
      {
        name: "理賠/收費",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/ClaimRecord.vue')
  },
  {
    path: '/qrysys/letterofattorny',
    name: 'LetterofAttorny',
    meta: {
      name: "授權、委託書明細",
      breadcrumb:[{
        name: "理賠/收費",
        link:""
      },{
        name: "收費資料",
        link:""
      },
      {
        name: "授權、委託書明細",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/LetterofAttorny.vue')
  },
  {
    path: '/qrysys/deductiondetails',
    name: 'DeductionDetails',
    meta: {
      name: "扣款明細",
      breadcrumb:[{
        name: "理賠/收費",
        link:""
      },{
        name: "收費資料",
        link:""
      },
      {
        name: "扣款明細",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/DeductionDetails.vue')
  },
  {
    path: '/qrysys/remittanceinquiry',
    name: 'Remittanceinquiry',
    meta: {
      name: "集體彙繳查詢",
      breadcrumb:[{
        name: "理賠/收費",
        link:""
      },{
        name: "收費資料",
        link:""
      },
      {
        name: "集體彙繳查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/Remittanceinquiry.vue')
  },
  {
    path: '/qrysys/returnquery',
    name: 'ReturnQuery',
    meta: {
      name: "退件查詢",
      breadcrumb:[{
        name: "理賠/收費",
        link:""
      },{
        name: "收費資料",
        link:""
      },
      {
        name: "退件查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/ReturnQuery.vue')
  },
  {
    path: '/qrysys/goldawardrecord',
    name: 'GoldAwardRecord',
    meta: {
      name: "送金紀錄查詢",
      breadcrumb:[{
        name: "理賠/收費",
        link:""
      },{
        name: "收費資料",
        link:""
      },
      {
        name: "送金紀錄查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/GoldAwardRecord.vue')
  },
  {
    path: '/qrysys/mediapayment',
    name: 'MediaPayment',
    meta: {
      name: "媒體繳款查詢",
      breadcrumb:[{
        name: "理賠/收費",
        link:""
      },{
        name: "收費資料",
        link:""
      },
      {
        name: "媒體繳款查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/MediaPayment.vue')
  },
  {
    path: '/qrysys/paymentprofile',
    name: 'PaymentProfile',
    meta: {
      name: "付款資料查詢",
      breadcrumb:[{
        name: "付款/保單匯款帳戶查詢",
        link:""
      },
      {
        name: "付款資料查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/PaymentProfile.vue')
  },
  {
    path: '/qrysys/policypaymentquery',
    name: 'PolicyPaymentQuery',
    meta: {
      name: "保單匯款帳戶查詢",
      breadcrumb:[{
        name: "付款/保單匯款帳戶查詢",
        link:""
      },
      {
        name: "保單匯款帳戶查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/PolicyPaymentQuery.vue')
  },
  {
    path: '/qrysys/unpaidquery',
    name: 'UnpaidQuery',
    meta: {
      name: "應付未付查詢",
      breadcrumb:[{
        name: "付款/保單匯款帳戶查詢",
        link:""
      },
      {
        name: "應付未付查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/UnpaidQuery.vue')
  },
  {
    path: '/qrysys/newcontractquery',
    name: 'NewContractQuery',
    meta: {
      name: "新契約查詢",
      breadcrumb:[{
        name: "新契約資料",
        link:""
      },
      {
        name: "新契約查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/NewContractQuery.vue')
  },
  {
    path: '/qrysys/insurancerecord',
    name: 'InsuranceRecord',
    meta: {
      name: "投保紀錄查詢",
      breadcrumb:[{
        name: "新契約資料",
        link:""
      },
      {
        name: "投保紀錄查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/InsuranceRecord.vue')
  },
  {
    path: '/qrysys/samplingrecord',
    name: 'SamplingRecord',
    meta: {
      name: "抽檢紀錄查詢",
      breadcrumb:[{
        name: "新契約資料",
        link:""
      },
      {
        name: "抽檢紀錄查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/SamplingRecord.vue')
  },
  {
    path: '/qrysys/medicalexaminationfee',
    name: 'MedicalExaminationFee',
    meta: {
      name: "體檢費扣擁查詢",
      breadcrumb:[{
        name: "新契約資料",
        link:""
      },
      {
        name: "體檢費扣擁查詢",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/MedicalExaminationFee.vue')
  },
  {
    path: '/qrysys/hospital',
    name: 'Hospital',
    meta: {
      name: "體檢醫院",
      breadcrumb:[{
        name: "新契約資料",
        link:""
      },
      {
        name: "體檢醫院",
        link:""
      },
    ]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "backflowquery" */ '../views/Hospital.vue')
  },
  {
    path: '/qrysys/login',
    name: 'Login',
    meta: {
      name: "登入頁面"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "testpageforremotetabulator" */ '../views/Login.vue')
  },
  {
    path: '/qrysys/testpageforremotetabulator',
    name: 'TestPageForRemoteTabulator',
    meta: {
      name: "測試table"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "testpageforremotetabulator" */ '../views/TestPageForRemoteTabulator.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   store.dispatch("addHistory", {
//     name: from.name,
//     cName: from.meta.name,
//     path: from.path,
//     id: uuid(),
//   });
//   next(()=> {
//     console.log("hello")
//   });
// });


router.afterEach((to, from ) => {//加入history的地方
  store.dispatch("addHistory", {
    name: from.name,
    cName: from.meta.name,
    path: from.path,
    id: uuid(),
  });
});

export default router