package com.cpic.service;

import org.apache.ibatis.annotations.Param;

public interface ScxzService {
    //新增上传信息
    Integer insertScxz(@Param(value = "filePath") String filePath,
                       @Param(value = "path") String path);
}
