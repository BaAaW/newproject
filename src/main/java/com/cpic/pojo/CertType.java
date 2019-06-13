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
@TableName("certtype")
public class CertType implements Serializable {
    @TableId(value = "ceid", type = IdType.AUTO)
    private Integer ceid;
    private String cename;
}
