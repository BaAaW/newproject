package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.ProtectionMapper;
import com.cpic.pojo.Protection;
import com.cpic.service.ProtectionService;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AutoConfigureAfter({ProtectionMapper.class})
public class ProtectionServiceImpl extends ServiceImpl<ProtectionMapper,Protection> implements ProtectionService {
}
