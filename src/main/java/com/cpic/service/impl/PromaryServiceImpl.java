package com.cpic.service.impl;

import com.cpic.dao.PromaryMapper;
import com.cpic.service.PromaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class PromaryServiceImpl implements PromaryService {
    @Autowired(required = false)
    private PromaryMapper promaryDao;

    @Override
    public Integer selectProid(String proName) {
       return promaryDao.selectProid(proName);

    }
}
