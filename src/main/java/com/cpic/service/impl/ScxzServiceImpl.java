package com.cpic.service.impl;

import com.cpic.dao.ScxzMapper;
import com.cpic.service.ScxzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
public class ScxzServiceImpl implements ScxzService {

    @Autowired(required = false)
    private ScxzMapper scxzMapper;
    @Override
    public Integer insertScxz(String filePath,String path)
    {
        return scxzMapper.insertScxz(filePath,path);
    }
}
