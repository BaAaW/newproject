package com.cpic.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cpic.pojo.Orders;
import com.cpic.pojo.Product;
import com.cpic.pojo.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper extends BaseMapper<User> {
    public User selectuserbyuid(@Param("uid")int uid);
}
