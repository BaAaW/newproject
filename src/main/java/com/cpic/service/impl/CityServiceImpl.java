package com.cpic.service.impl;

import com.cpic.dao.CityMapper;
import com.cpic.pojo.City;
import com.cpic.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Transactional
@Service
public class CityServiceImpl implements CityService {
   @Autowired(required = false)
   private CityMapper cityDao;

    @Override
    public List<City> selectCityname(Integer proID) {
        return cityDao.selectCityname(proID);
    }
}
