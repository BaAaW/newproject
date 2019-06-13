package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.FeaturesMapper;
import com.cpic.dao.OrdersMapper;
import com.cpic.pojo.Features;
import com.cpic.pojo.Orders;
import com.cpic.service.FeaturesService;
import com.cpic.service.OrdersService;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({OrdersMapper.class})
public class OrdersServiceImpl extends ServiceImpl<OrdersMapper,Orders> implements OrdersService {
}
