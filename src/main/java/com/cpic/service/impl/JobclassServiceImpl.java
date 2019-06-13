package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.CertTypeMapper;
import com.cpic.dao.JobclassMapper;
import com.cpic.pojo.CertType;
import com.cpic.pojo.jobclass;
import com.cpic.service.CertTypeService;
import com.cpic.service.JobclassService;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({JobclassMapper.class})
public class JobclassServiceImpl extends ServiceImpl<JobclassMapper,jobclass> implements JobclassService {
}
