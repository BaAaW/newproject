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
@TableName("content")
public class Content implements Serializable {
    @TableId(value = "ctid", type = IdType.AUTO)
    private Integer ctid;
    private String ctname;
}
