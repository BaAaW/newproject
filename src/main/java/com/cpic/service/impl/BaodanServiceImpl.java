package com.cpic.service.impl;

import com.cpic.dao.BaodanMapper;
import com.cpic.pojo.Baodan;
import com.cpic.service.BaodanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@Service
public class BaodanServiceImpl implements BaodanService {
    @Autowired(required = false)
    private BaodanMapper baodanMapper;
    @Override
    public List<Baodan> selectBaodan(String bdnumber, String bdidnumber) {
        return baodanMapper.selectBaodan(bdnumber,bdidnumber);
    }
}
