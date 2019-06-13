package com.cpic.service.impl;

import com.cpic.dao.DingzhiMapper;
import com.cpic.pojo.Dingzhi;
import com.cpic.service.DingzhiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class DingzhiServiceImpl implements DingzhiService {
    @Autowired(required = false)
    private DingzhiMapper dingzhiMapper;
    @Override
    public Integer insertDingzhi(Dingzhi dingzhi) {

        return dingzhiMapper.insertDingzhi(dingzhi);
    }

    public Integer selectMax(){
        return dingzhiMapper.selectMax();
    }

    @Override
    public List<Dingzhi> selectPhone(String phone, String dname) {
        return dingzhiMapper.selectPhone(phone, dname);
    }

    @Override
    public List<Dingzhi> selectDzid(Integer dzid) {
        return dingzhiMapper.selectDzid(dzid);
    }

    @Override
    public Integer updateDingzhi(Dingzhi dingzhi) {
        return dingzhiMapper.updateDingzhi(dingzhi);
    }
}
