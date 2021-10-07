import axios from "axios";
export default function () {
  const res = async function (url, params, headers) {
    let starttime=new Date().getTime();
    try {
      const responseData = await axios.get(url, {params: params}, {headers});
      
      let data = responseData.data;
      //200
      let status = responseData.status;
      //423
      let endtime=new Date().getTime();
      let totaltime=endtime - starttime;
      return {
        totaltime,
        data,
        status
      };
    } catch (e) {
      console.log(e);
      //   alert("無法查詢資料，請洽系統管理人員。");
    }
  };

  return {
    res
  };
}