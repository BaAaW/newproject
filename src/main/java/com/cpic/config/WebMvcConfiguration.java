package com.cpic.config;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInterceptor;
import org.apache.ibatis.plugin.Interceptor;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Properties;

@Configuration
@AutoConfigureAfter(SqlSessionFactoryBean.class)
public class WebMvcConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // super.addViewControllers(registry);
        //浏览器发送 /atguigu 请求来到 success
        //registry.addViewController("/").setViewName("market/rsywbx/list");
        registry.addViewController("/hds/testcert").setViewName("TestCertType");
    }
//    @Bean
//    public PaginationInterceptor paginationInterceptor() {
//        return new PaginationInterceptor();
//    }
//    @Autowired
//    private SqlSessionFactoryBean factory;
//@Bean
//public PageInterceptor pageInterceptor(){
//    //分页插件5.x
//    Properties properties = new Properties();
//    properties.setProperty("helperDialect", "mysql");
//    properties.setProperty("reasonable", "true");
//    properties.setProperty("pageSizeZero", "true");
//
//    PageInterceptor interceptor = new PageInterceptor();
//    interceptor.setProperties(properties);
//    //添加插件
//    factory.setPlugins(new Interceptor[]{interceptor});
//    return interceptor;
//}
}
