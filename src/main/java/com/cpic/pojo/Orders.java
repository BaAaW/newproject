package com.cpic.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Future;
import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@TableName("orders")
public class Orders implements Serializable,Cloneable{
    @TableId(value = "oid", type = IdType.AUTO)
    private Integer oid;
    private String uuid;
    @TableField(exist=false)
    private User inuser;
    @TableField(exist=false)
    private User asuser;
    @TableField(exist=false)
    private jobclass jobclass;

    private Integer fkinid;
    private Integer fkasid;
    private Integer fkjobcid;

    private String relation;
    @Future
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date ostart;
    @Future
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date oend;
    private String benefitway;
    private String distribution;
    private double premium;
    private Integer copies;

    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}
