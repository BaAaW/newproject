package com.cpic.service;

import com.cpic.pojo.Baodan;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BaodanService {
    //按保单号和身份证号码查询
    List<Baodan> selectBaodan(@Param(value = "bdnumber")String bdnumber,
                              @Param(value = "bdidnumber")String bdidnumber);
}
