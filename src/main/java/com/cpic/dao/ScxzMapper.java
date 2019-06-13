package com.cpic.dao;

import org.apache.ibatis.annotations.Param;

public interface ScxzMapper {
    //新增上传信息
    Integer insertScxz(@Param(value = "filePath") String filePath,
                       @Param(value = "path") String path);

}
