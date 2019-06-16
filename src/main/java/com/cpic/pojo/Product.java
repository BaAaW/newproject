package com.cpic.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cpic.dao.FeaturesMapper;
import lombok.*;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@TableName("product")
public class Product implements Serializable {
    @TableId(value = "pid", type = IdType.AUTO)
    private Integer pid;
    private String pname;
    private String description;
    private Integer minduration;
    private String unit1;
    private Integer maxduration;
    private String unit2;
    private Integer minage;
    private Integer maxage;
    private String salearea;
    private String picsrc;
    private Integer vipprice;
    private Integer score;
    @TableField(exist=false)
    private List<Features> featurelist;
    @TableField(exist=false)
    private List<Protection> protectionlist;
    @TableField(exist=false)
    private String scheme;
    @TableField(exist=false)
    private String suitpeople;
    @TableField(exist=false)
    private List<HashMap> details;
    @TableField(exist=false)
    private List<String> detailpics;
    @TableField(exist=false)
    private List<String> needknows;
    @TableField(exist=false)
    private List<String> needknowpics;
    @TableField(exist=false)
    private List<String> producttype;
    private List<String> fkpdid;
}
