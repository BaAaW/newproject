package com.cpic.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cpic.dao.ProductMapper;
import com.cpic.pojo.Product;
import com.cpic.service.ProductService;
import com.github.pagehelper.ISelect;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@AutoConfigureAfter({ProductMapper.class})
public class ProductServiceImpl extends ServiceImpl<ProductMapper,Product> implements ProductService {
    @Autowired
    private ProductMapper productMapper;
//    public IPage<Product> getallproduct(Page<Product> page){
//        return productMapper.selectallproduct(page);
//    }

//    public Page<Product> getallproduct(){
//        Page<Product> page = PageHelper.startPage(1, 5).doSelectPage(new ISelect() {
//            @Override
//            public void doSelect() {
//                //productMapper.selectallproduct();
//                productMapper.selectList(null);
//            }
//        });
//        System.out.println(page.getPages());
//        return page;
//    }
    public Product getproductbypid(int pid){
        return productMapper.selectproductbypid(pid);
    }
    public List<Product> getallproduct(int selectcont,int selectfeat,int selectage,int selecttime){
        return productMapper.selectallproduct(selectcont,selectfeat,selectage,selecttime);
    }
}
