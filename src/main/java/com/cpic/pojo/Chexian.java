package com.cpic.pojo;

public class Chexian {
    private Integer cxid;      //车险id
    private String cpnumber;  //车牌号
    private String cjnumber;  //车架号
    private String cxidnumber; //身份证号
    private String cxnumber;  //保单号
    private String cxcity;      //行驶城市
    private String cxbirth;     //车主生日
    private String cxphone;    //手机号
    private String cxprice;     //车险套餐
    private String cxbaoe;     //保额
    private String cxfangan;    //产品方案
    private String cxtime;     //参保时间
    private String cxlimit;     //保险期限
    private String cxage;      //承保年龄
    private String cxquyu;     //销售区域
    private String cxname;   //被保人

    public Chexian(Integer cxid, String cpnumber, String cjnumber, String cxidnumber, String cxnumber, String cxcity, String cxbirth, String cxphone, String cxprice, String cxbaoe, String cxfangan, String cxtime, String cxlimit, String cxage, String cxquyu, String cxname) {
        this.cxid = cxid;
        this.cpnumber = cpnumber;
        this.cjnumber = cjnumber;
        this.cxidnumber = cxidnumber;
        this.cxnumber = cxnumber;
        this.cxcity = cxcity;
        this.cxbirth = cxbirth;
        this.cxphone = cxphone;
        this.cxprice = cxprice;
        this.cxbaoe = cxbaoe;
        this.cxfangan = cxfangan;
        this.cxtime = cxtime;
        this.cxlimit = cxlimit;
        this.cxage = cxage;
        this.cxquyu = cxquyu;
        this.cxname = cxname;
    }

    @Override
    public String toString() {
        return "Chexian{" +
                "cxid=" + cxid +
                ", cpnumber='" + cpnumber + '\'' +
                ", cjnumber='" + cjnumber + '\'' +
                ", cxidnumber='" + cxidnumber + '\'' +
                ", cxnumber='" + cxnumber + '\'' +
                ", cxcity='" + cxcity + '\'' +
                ", cxbirth='" + cxbirth + '\'' +
                ", cxphone='" + cxphone + '\'' +
                ", cxprice='" + cxprice + '\'' +
                ", cxbaoe='" + cxbaoe + '\'' +
                ", cxfangan='" + cxfangan + '\'' +
                ", cxtime='" + cxtime + '\'' +
                ", cxlimit='" + cxlimit + '\'' +
                ", cxage='" + cxage + '\'' +
                ", cxquyu='" + cxquyu + '\'' +
                ", cxname='" + cxname + '\'' +
                '}';
    }

    public Integer getCxid() {
        return cxid;
    }

    public void setCxid(Integer cxid) {
        this.cxid = cxid;
    }

    public String getCpnumber() {
        return cpnumber;
    }

    public void setCpnumber(String cpnumber) {
        this.cpnumber = cpnumber;
    }

    public String getCjnumber() {
        return cjnumber;
    }

    public void setCjnumber(String cjnumber) {
        this.cjnumber = cjnumber;
    }

    public String getCxidnumber() {
        return cxidnumber;
    }

    public void setCxidnumber(String cxidnumber) {
        this.cxidnumber = cxidnumber;
    }

    public String getCxnumber() {
        return cxnumber;
    }

    public void setCxnumber(String cxnumber) {
        this.cxnumber = cxnumber;
    }

    public String getCxcity() {
        return cxcity;
    }

    public void setCxcity(String cxcity) {
        this.cxcity = cxcity;
    }

    public String getCxbirth() {
        return cxbirth;
    }

    public void setCxbirth(String cxbirth) {
        this.cxbirth = cxbirth;
    }

    public String getCxphone() {
        return cxphone;
    }

    public void setCxphone(String cxphone) {
        this.cxphone = cxphone;
    }

    public String getCxprice() {
        return cxprice;
    }

    public void setCxprice(String cxprice) {
        this.cxprice = cxprice;
    }

    public String getCxbaoe() {
        return cxbaoe;
    }

    public void setCxbaoe(String cxbaoe) {
        this.cxbaoe = cxbaoe;
    }

    public String getCxfangan() {
        return cxfangan;
    }

    public void setCxfangan(String cxfangan) {
        this.cxfangan = cxfangan;
    }

    public String getCxtime() {
        return cxtime;
    }

    public void setCxtime(String cxtime) {
        this.cxtime = cxtime;
    }

    public String getCxlimit() {
        return cxlimit;
    }

    public void setCxlimit(String cxlimit) {
        this.cxlimit = cxlimit;
    }

    public String getCxage() {
        return cxage;
    }

    public void setCxage(String cxage) {
        this.cxage = cxage;
    }

    public String getCxquyu() {
        return cxquyu;
    }

    public void setCxquyu(String cxquyu) {
        this.cxquyu = cxquyu;
    }

    public String getCxname() {
        return cxname;
    }

    public void setCxname(String cxname) {
        this.cxname = cxname;
    }
}
