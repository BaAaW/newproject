package com.cpic.pojo;

public class Promary {
      private Integer proID;
      private String proName;

      public Integer getProID() {
            return proID;
      }

      public String getProName() {
            return proName;
      }

      public void setProID(Integer proID) {
            this.proID = proID;
      }

      public void setProName(String proName) {
            this.proName = proName;
      }

      public Promary(Integer proID, String proName) {
            this.proID = proID;
            this.proName = proName;
      }

      @Override
      public String toString() {
            return "Promary{" +
                    "proID=" + proID +
                    ", proName='" + proName + '\'' +
                    '}';
      }
}
