package com.cpic.pojo;

public class Scxz {
    private Integer sxid;   //上传下载id
    private String filePath; //文件路径
    private String path;   //文件名

    @Override
    public String toString() {
        return "Scxz{" +
                "sxid=" + sxid +
                ", filePath='" + filePath + '\'' +
                ", path='" + path + '\'' +
                '}';
    }

    public Integer getSxid() {
        return sxid;
    }

    public void setSxid(Integer sxid) {
        this.sxid = sxid;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Scxz(Integer sxid, String filePath, String path) {
        this.sxid = sxid;
        this.filePath = filePath;
        this.path = path;
    }
}
