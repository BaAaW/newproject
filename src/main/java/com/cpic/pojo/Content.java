package com.cpic.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@TableName("content")
public class Content {
    @TableId(value = "ctid", type = IdType.AUTO)
    private Integer ctid;
    private String ctname;
}
