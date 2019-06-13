package com.cpic.dao;

import org.apache.ibatis.annotations.Param;

public interface LipeiMapper {
    //按报案号查询
    Integer selectLpbaoan(@Param(value = "lpidnumber") String lpidnumber,
                          @Param(value = "lpnumber") String lpnumber);


    //按保单号查询
    Integer selectLpbaodan(@Param(value = "lpidnumber") String lpidnumber,
                          @Param(value = "lpbdnumber") String lpbdnumber);



    //按lpid查询结果
    String selectLpjieguo(Integer lpid);



}
