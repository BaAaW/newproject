package com.cpic.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@TableName("features")
public class Features implements Serializable {
    @TableId(value = "fid", type = IdType.AUTO)
    private Integer fid;
    private String feature;
}
