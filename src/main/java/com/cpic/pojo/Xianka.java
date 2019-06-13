package com.cpic.pojo;

public class Xianka {
    Integer  xkid;        //保修卡id
    String  xkcard;       //保修卡卡号
    String  xkpass;   //保修卡密码
    String  xkjihuo;       //是否激活（1.激活2.未激活）须激活才能进行保险卡查询
    String  xkrenid;      //被保人身份证
    String  xkname;      //姓名
    String  xkdate;       //办卡日期

    @Override
    public String toString() {
        return "Xianka{" +
                "xkid=" + xkid +
                ", xkcard='" + xkcard + '\'' +
                ", xkpass='" + xkpass + '\'' +
                ", xkjihuo='" + xkjihuo + '\'' +
                ", xkrenid='" + xkrenid + '\'' +
                ", xkname='" + xkname + '\'' +
                ", xkdate='" + xkdate + '\'' +
                '}';
    }

    public Integer getXkid() {
        return xkid;
    }

    public void setXkid(Integer xkid) {
        this.xkid = xkid;
    }

    public String getXkcard() {
        return xkcard;
    }

    public void setXkcard(String xkcard) {
        this.xkcard = xkcard;
    }

    public String getXkpass() {
        return xkpass;
    }

    public void setXkpass(String xkpass) {
        this.xkpass = xkpass;
    }

    public String getXkjihuo() {
        return xkjihuo;
    }

    public void setXkjihuo(String xkjihuo) {
        this.xkjihuo = xkjihuo;
    }

    public String getXkrenid() {
        return xkrenid;
    }

    public void setXkrenid(String xkrenid) {
        this.xkrenid = xkrenid;
    }

    public String getXkname() {
        return xkname;
    }

    public void setXkname(String xkname) {
        this.xkname = xkname;
    }

    public String getXkdate() {
        return xkdate;
    }

    public void setXkdate(String xkdate) {
        this.xkdate = xkdate;
    }

    public Xianka(Integer xkid, String xkcard, String xkpass, String xkjihuo, String xkrenid, String xkname, String xkdate) {
        this.xkid = xkid;
        this.xkcard = xkcard;
        this.xkpass = xkpass;
        this.xkjihuo = xkjihuo;
        this.xkrenid = xkrenid;
        this.xkname = xkname;
        this.xkdate = xkdate;

    }
}
