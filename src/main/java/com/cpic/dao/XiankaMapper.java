package com.cpic.dao;

import com.cpic.pojo.Xianka;

import java.util.List;

public interface XiankaMapper {

    //按卡号和密码查询是否激活
    String selectMima(String xkcard,String xkpass);


    //按身份证号码查询是否激活
    String selectRenid(String xkrenid);


    //根据卡号和密码修改激活码
    Integer updateJihuo(String xkcard,String xkpass);


    //按卡号和密码查询所有
    List<Xianka> selectBd(String xkcard, String xkpass);


    //按身份证号码查询所有
    List<Xianka> selectSfz(String xkrenid);

}
