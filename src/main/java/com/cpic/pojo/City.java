package com.cpic.pojo;

public class City {
    private Integer cid;
    private String cityID;
    private String cityName;
    private Integer proID;

    public City(Integer cid, String cityID, String cityName, Integer proID) {
        this.cid = cid;
        this.cityID = cityID;
        this.cityName = cityName;
        this.proID = proID;
    }

    @Override
    public String toString() {
        return "City{" +
                "cid=" + cid +
                ", cityID='" + cityID + '\'' +
                ", cityName='" + cityName + '\'' +
                ", proID='" + proID + '\'' +
                '}';
    }

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getCityID() {
        return cityID;
    }

    public void setCityID(String cityID) {
        this.cityID = cityID;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public Integer getProID() {
        return proID;
    }

    public void setProID(Integer proID) {
        this.proID = proID;
    }
}
