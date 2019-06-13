package com.cpic.service;

import com.cpic.pojo.City;

import java.util.List;

public interface CityService {
    //根据proID查询cityName
    List<City> selectCityname(Integer proID);
}
