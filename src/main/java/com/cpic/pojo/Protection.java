package com.cpic.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@TableName("protection")
public class Protection implements Serializable {
    @TableId(value = "ptid", type = IdType.AUTO)
    private Integer ptid;
    private String ptname;
    private Integer amount;
    @TableField(exist=false)
    private String content;
    private Integer maxctype;
    @TableField(exist=false)
    private Integer ptbelong;
    @TableField(exist=false)
    private Integer ptgrade;
}
