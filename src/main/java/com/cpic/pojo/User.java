package com.cpic.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Future;
import javax.validation.constraints.Past;
import java.io.Serializable;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@TableName("users")
public class User implements Serializable {
    @TableId(value = "uid", type = IdType.AUTO)
    private Integer uid;
    @TableField(exist=false)
    private CertType certType;
    private Integer fkceid;
    private String uname;
    private String certnum;
    private Integer sex;
    @Past
    @DateTimeFormat(pattern="yyyy-MM-dd")
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date birthdate;
    private String city;
    private String telnum;
    private String email;
    private String address;
    private String postcode;
}
