package com.cpic.pojo;

public class Lipei {
    Integer lpid;      //理赔id
    String  lpidnumber; //身份证号码
    String  lpnumber;  //报案号
    String  lpbdnumber; //保单号
    String  lpjieguo;    //理赔结果

    @Override
    public String toString() {
        return "Lipei{" +
                "lpid=" + lpid +
                ", lpidnumber='" + lpidnumber + '\'' +
                ", lpnumber='" + lpnumber + '\'' +
                ", lpbdnumber='" + lpbdnumber + '\'' +
                ", lpjieguo='" + lpjieguo + '\'' +
                '}';
    }

    public Integer getLpid() {
        return lpid;
    }

    public void setLpid(Integer lpid) {
        this.lpid = lpid;
    }

    public String getLpidnumber() {
        return lpidnumber;
    }

    public void setLpidnumber(String lpidnumber) {
        this.lpidnumber = lpidnumber;
    }

    public String getLpnumber() {
        return lpnumber;
    }

    public void setLpnumber(String lpnumber) {
        this.lpnumber = lpnumber;
    }

    public String getLpbdnumber() {
        return lpbdnumber;
    }

    public void setLpbdnumber(String lpbdnumber) {
        this.lpbdnumber = lpbdnumber;
    }

    public String getLpjieguo() {
        return lpjieguo;
    }

    public void setLpjieguo(String lpjieguo) {
        this.lpjieguo = lpjieguo;
    }

    public Lipei(Integer lpid, String lpidnumber, String lpnumber, String lpbdnumber, String lpjieguo) {
        this.lpid = lpid;
        this.lpidnumber = lpidnumber;
        this.lpnumber = lpnumber;
        this.lpbdnumber = lpbdnumber;
        this.lpjieguo = lpjieguo;
    }
}
