package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.FeaturesMapper;
import com.cpic.dao.OrdersMapper;
import com.cpic.dao.ProductMapper;
import com.cpic.pojo.Features;
import com.cpic.pojo.Orders;
import com.cpic.service.FeaturesService;
import com.cpic.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({OrdersMapper.class})
public class OrdersServiceImpl extends ServiceImpl<OrdersMapper,Orders> implements OrdersService {
    @Autowired
    private OrdersMapper ordersMapper;
    public Orders selectOrdersbyuuid(String uuid){
        return ordersMapper.selectOrdersbyuuid(uuid);
    }
    public int insertordertoprotection(int fkptid, int fkoid){
        return ordersMapper.insertordertoprotection(fkptid,fkoid);
    }
}
