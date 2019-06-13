package com.cpic.dao;

import com.cpic.pojo.Chexian;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ChexianMapper {

    List<Chexian> selectChexian(@Param(value = "cpnumber") String cpnumber,
                                @Param(value = "cjnumber") String cjnumber,
                                @Param(value = "cxidnumber") String cxidnumber);
}
