package com.cpic.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cpic.pojo.Orders;
import com.cpic.pojo.User;
import org.apache.ibatis.annotations.Param;


public interface OrdersService extends IService<Orders> {
    public int insertordertoprotection(int fkptid, int fkoid);
    public Orders selectOrdersbyuuid(String uuid);
}
