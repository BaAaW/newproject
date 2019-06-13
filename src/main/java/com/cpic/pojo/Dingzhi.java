package com.cpic.pojo;

public class Dingzhi {
    private Integer dzid;     //定制保险id
    private String who;     //为谁投保
    private String birth;     //出生日期
    private String intention;  //投保意向
    private String budget;    //保费预算
    private String date;      //预约时间
    private String dname;     //姓名
    private String age;       //姓别
    private String phone;     //手机号
    private String site;       //居住地
    private Integer dznum;   //第几位投保人

    @Override
    public String toString() {
        return "Dingzhi{" +
                "dzid=" + dzid +
                ", who='" + who + '\'' +
                ", birth='" + birth + '\'' +
                ", intention='" + intention + '\'' +
                ", budget='" + budget + '\'' +
                ", date='" + date + '\'' +
                ", dname='" + dname + '\'' +
                ", age='" + age + '\'' +
                ", phone='" + phone + '\'' +
                ", site='" + site + '\'' +
                ", dznum=" + dznum +
                '}';
    }

    public Integer getDzid() {
        return dzid;
    }

    public void setDzid(Integer dzid) {
        this.dzid = dzid;
    }

    public String getWho() {
        return who;
    }

    public void setWho(String who) {
        this.who = who;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getIntention() {
        return intention;
    }

    public void setIntention(String intention) {
        this.intention = intention;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDname() {
        return dname;
    }

    public void setDname(String dname) {
        this.dname = dname;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getSite() {
        return site;
    }

    public void setSite(String site) {
        this.site = site;
    }

    public Integer getDznum() {
        return dznum;
    }

    public void setDznum(Integer dznum) {
        this.dznum = dznum;
    }
}
