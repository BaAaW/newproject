package com.cpic.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cpic.pojo.CertType;
import com.cpic.pojo.Orders;
import org.apache.ibatis.annotations.Param;

public interface OrdersMapper extends BaseMapper<Orders> {
    public int insertordertoprotection(@Param("fkptid")int fkptid,@Param("fkoid")int fkoid);
    public Orders selectOrdersbyuuid(@Param("uuid")String uuid);
}
