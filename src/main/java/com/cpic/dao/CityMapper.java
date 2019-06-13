package com.cpic.dao;

import com.cpic.pojo.City;

import java.util.List;

public interface CityMapper {
    //根据proID查询cityName
    List<City> selectCityname(Integer proID);
}
