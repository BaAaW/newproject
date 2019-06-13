package com.cpic.service.impl;

import com.cpic.dao.XiankaMapper;
import com.cpic.pojo.Xianka;
import com.cpic.service.XiankaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Service
public class XiankaServiceImpl implements XiankaService {
    @Autowired(required = false)
    private XiankaMapper xiankaMapper;

    @Override
    public String selectMima(String xkcard, String xkpass) {
        return xiankaMapper.selectMima(xkcard,xkpass);
    }

    @Override
    public String selectRenid(String xkrenid) {
        return xiankaMapper.selectRenid(xkrenid);
    }

    @Override
    public Integer updateJihuo(String xkcard, String xkpass) {
        return xiankaMapper.updateJihuo(xkcard,xkpass);
    }

    @Override
    public List<Xianka> selectBd(String xkcard, String xkpass) {
        return xiankaMapper.selectBd(xkcard,xkpass);
    }

    @Override
    public List<Xianka> selectSfz(String xkrenid) {
        return xiankaMapper.selectSfz(xkrenid);
    }
}
