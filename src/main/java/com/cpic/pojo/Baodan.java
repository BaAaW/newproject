package com.cpic.pojo;

public class Baodan {
    private Integer bdid;        //保单id
    private String  bdidnumber; //身份证号
    private String  bdnumber;  //保单号
    private String  bdcontent;  //保障内容
    private String  bdfeature;  //保障特色
    private String  bdage;     //承保年龄
    private String  bdlimit;    //保单期限
    private String  bdprice;    //价格
    private String  bdbaoe;    //保额
    private String  bdtime;    //参保时间
    private String  bdphone;  //手机号
    private String  bdsex;     //性别
    private String  bdname;   //被保人

    public Baodan(Integer bdid, String bdidnumber, String bdnumber, String bdcontent, String bdfeature, String bdage, String bdlimit, String bdprice, String bdbaoe, String bdtime, String bdphone, String bdsex, String bdname) {
        this.bdid = bdid;
        this.bdidnumber = bdidnumber;
        this.bdnumber = bdnumber;
        this.bdcontent = bdcontent;
        this.bdfeature = bdfeature;
        this.bdage = bdage;
        this.bdlimit = bdlimit;
        this.bdprice = bdprice;
        this.bdbaoe = bdbaoe;
        this.bdtime = bdtime;
        this.bdphone = bdphone;
        this.bdsex = bdsex;
        this.bdname = bdname;
    }

    @Override
    public String toString() {
        return "Baodan{" +
                "bdid=" + bdid +
                ", bdidnumber='" + bdidnumber + '\'' +
                ", bdnumber='" + bdnumber + '\'' +
                ", bdcontent='" + bdcontent + '\'' +
                ", bdfeature='" + bdfeature + '\'' +
                ", bdage='" + bdage + '\'' +
                ", bdlimit='" + bdlimit + '\'' +
                ", bdprice='" + bdprice + '\'' +
                ", bdbaoe='" + bdbaoe + '\'' +
                ", bdtime='" + bdtime + '\'' +
                ", bdphone='" + bdphone + '\'' +
                ", bdsex='" + bdsex + '\'' +
                ", bdname='" + bdname + '\'' +
                '}';
    }

    public Integer getBdid() {
        return bdid;
    }

    public void setBdid(Integer bdid) {
        this.bdid = bdid;
    }

    public String getBdidnumber() {
        return bdidnumber;
    }

    public void setBdidnumber(String bdidnumber) {
        this.bdidnumber = bdidnumber;
    }

    public String getBdnumber() {
        return bdnumber;
    }

    public void setBdnumber(String bdnumber) {
        this.bdnumber = bdnumber;
    }

    public String getBdcontent() {
        return bdcontent;
    }

    public void setBdcontent(String bdcontent) {
        this.bdcontent = bdcontent;
    }

    public String getBdfeature() {
        return bdfeature;
    }

    public void setBdfeature(String bdfeature) {
        this.bdfeature = bdfeature;
    }

    public String getBdage() {
        return bdage;
    }

    public void setBdage(String bdage) {
        this.bdage = bdage;
    }

    public String getBdlimit() {
        return bdlimit;
    }

    public void setBdlimit(String bdlimit) {
        this.bdlimit = bdlimit;
    }

    public String getBdprice() {
        return bdprice;
    }

    public void setBdprice(String bdprice) {
        this.bdprice = bdprice;
    }

    public String getBdbaoe() {
        return bdbaoe;
    }

    public void setBdbaoe(String bdbaoe) {
        this.bdbaoe = bdbaoe;
    }

    public String getBdtime() {
        return bdtime;
    }

    public void setBdtime(String bdtime) {
        this.bdtime = bdtime;
    }

    public String getBdphone() {
        return bdphone;
    }

    public void setBdphone(String bdphone) {
        this.bdphone = bdphone;
    }

    public String getBdsex() {
        return bdsex;
    }

    public void setBdsex(String bdsex) {
        this.bdsex = bdsex;
    }

    public String getBdname() {
        return bdname;
    }

    public void setBdname(String bdname) {
        this.bdname = bdname;
    }
}
