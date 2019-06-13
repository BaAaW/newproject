package com.cpic.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cpic.pojo.Features;
import com.cpic.pojo.User;


public interface UserService extends IService<User> {
    public User getuserbyuid(int uid);
}
