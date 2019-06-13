package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.CertTypeMapper;
import com.cpic.pojo.CertType;
import com.cpic.service.CertTypeService;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({CertTypeMapper.class})
public class CertTypeServiceImpl extends ServiceImpl<CertTypeMapper,CertType> implements CertTypeService {
}
