package com.cpic.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cpic.pojo.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ProductMapper extends BaseMapper<Product> {
    //public IPage<Product> selectallproduct(Page page);
    public Product selectproductbypid(@Param("pid")int pid);
    public List<Product> selectallproduct(@Param("selectcont")int selectcont,@Param("selectfeat")int selectfeat,
                                          @Param("selectage")int selectage,@Param("selecttime")int selecttime);
}
