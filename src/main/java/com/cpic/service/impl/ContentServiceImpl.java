package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.ContentMapper;
import com.cpic.dao.FeaturesMapper;
import com.cpic.pojo.Content;
import com.cpic.pojo.Features;
import com.cpic.service.ContentService;
import com.cpic.service.FeaturesService;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({ContentMapper.class})
public class ContentServiceImpl extends ServiceImpl<ContentMapper,Content> implements ContentService {
}
