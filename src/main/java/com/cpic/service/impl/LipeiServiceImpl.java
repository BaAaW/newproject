package com.cpic.service.impl;

import com.cpic.dao.LipeiMapper;
import com.cpic.service.LipeiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class LipeiServiceImpl implements LipeiService {
    @Autowired(required = false)
    private LipeiMapper lipeiMapper;

    @Override
    public Integer selectLpbaoan(String lpidnumber, String lpnumber) {
        return lipeiMapper.selectLpbaoan(lpidnumber,lpnumber);
    }

    @Override
    public Integer selectLpbaodan(String lpidnumber, String lpbdnumber) {
        return lipeiMapper.selectLpbaodan(lpidnumber,lpbdnumber);
    }

    @Override
    public String selectLpjieguo(Integer lpid) {
        return lipeiMapper.selectLpjieguo(lpid);
    }
}
