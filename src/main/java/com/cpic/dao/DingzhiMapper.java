package com.cpic.dao;

import com.cpic.pojo.Dingzhi;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DingzhiMapper {
    //新增投保人信息
    Integer insertDingzhi(Dingzhi dingzhi);

    //查询最后预订成功的人数
    Integer selectMax();

    //按手机号和姓名查询
    List<Dingzhi> selectPhone(@Param(value = "phone") String phone,
                              @Param(value = "dname") String dname);

    //按dzid查询
    List<Dingzhi> selectDzid(Integer dzid);


    //修改定制保单
    Integer updateDingzhi(Dingzhi dingzhi);

}
