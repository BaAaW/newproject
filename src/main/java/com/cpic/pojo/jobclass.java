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
@TableName("jobclassification")
public class jobclass {
    @TableId(value = "cid", type = IdType.AUTO)
    private Integer cid;
    private String cname;
    private Integer cgrade;
    private Integer cparent;
    private Integer ctype;
}
