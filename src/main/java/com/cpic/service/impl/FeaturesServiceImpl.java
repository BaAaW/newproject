package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.FeaturesMapper;
import com.cpic.dao.ProductMapper;
import com.cpic.pojo.Features;
import com.cpic.service.FeaturesService;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({FeaturesMapper.class})
public class FeaturesServiceImpl extends ServiceImpl<FeaturesMapper,Features> implements FeaturesService {
}
