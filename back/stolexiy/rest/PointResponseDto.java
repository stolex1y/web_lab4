package stolexiy.rest;

import stolexiy.model.Point;
import stolexiy.model.PointId;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;

public class PointResponseDto {
    private long id;
    private String login;
    private double x;
    private double y;
    private double r;
    private boolean result;
    private long leadTime;
    private long dateMs;

    public PointResponseDto(Point p) {
        this.id = p.getPointId().getId();
        this.login = p.getPointId().getLogin();
        this.x = p.getX();
        this.y = p.getY();
        this.r = p.getR();
        this.result = p.getResult();
        this.leadTime = p.getLeadTime();
        this.dateMs = p.getDateMs();

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public long getLeadTime() {
        return leadTime;
    }

    public void setLeadTime(long leadTime) {
        this.leadTime = leadTime;
    }

    public long getDateMs() {
        return dateMs;
    }

    public void setDateMs(long dateMs) {
        this.dateMs = dateMs;
    }
}
