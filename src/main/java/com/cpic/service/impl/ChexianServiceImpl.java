package com.cpic.service.impl;

import com.cpic.dao.ChexianMapper;
import com.cpic.pojo.Chexian;
import com.cpic.service.ChexianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@Service
public class ChexianServiceImpl implements ChexianService {
    @Autowired(required = false)
    private ChexianMapper chexianMapper;
    @Override
    public List<Chexian> selectChexian(String cpnumber, String cjnumber, String cxidnumber) {
        return chexianMapper.selectChexian(cpnumber,cjnumber,cxidnumber);
    }
}
