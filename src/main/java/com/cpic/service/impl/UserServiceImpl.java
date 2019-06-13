package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.UserMapper;
import com.cpic.pojo.User;
import com.cpic.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({UserMapper.class})
public class UserServiceImpl extends ServiceImpl<UserMapper,User> implements UserService {
    @Autowired
    private UserMapper userMapper;
    public User getuserbyuid(int uid){
        return userMapper.selectuserbyuid(uid);
    }
}
