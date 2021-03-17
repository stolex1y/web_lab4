package stolexiy.model;

import com.google.gson.Gson;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "RESULTS")
public class Point implements Serializable, Cloneable, Comparable<Point> {
    /*@Id
    @GeneratedValue
    private long id;
    @Id
    private String login;*/
    private double x;
    private double y;
    private double r;
    private boolean result;
    @Column(name="lead_time")
    private long leadTime;
    private long dateMs;
    @EmbeddedId
    private PointId pointId;
//    private static final DecimalFormat decimalFormatter = new DecimalFormat("#.##");
//    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);

    /*public Point(int x, double y, int r, boolean result, long leadTime, ZonedDateTime dateMs) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.leadTime = leadTime;
        this.dateMs = dateMs;
    }*/

    public Point() {
        x = 0.0;
        y = 0.0;
        r = 1.0;
        result = false;
    }

    /*public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }*/

    public void setLeadTime(long leadTime) {
        this.leadTime = leadTime;
    }

    public void setLeadTime(long start, long end) {
        leadTime = end - start;
    }

    public long getLeadTime() {
        return leadTime;
    }

    /*public void setDateMs(ZonedDateTime dateMs) {
        this.dateMs = dateMs;
    }

    public ZonedDateTime getDateMs() {
        return dateMs;
    }*/

    public void setDateMs(Long dateMs) {
        this.dateMs = dateMs;
    }

    public Long getDateMs() {
        return dateMs;
    }

    /*public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
*/
//    public String getNowStr() {
//        return dateFormatter.format(dateMs.toLocalDateTime());
//    }

/*
    public String getHitStr() {
        return result ? "Попадание" : "Промах";
    }
*/

    public void setResult(boolean result) {
        this.result = result;
    }

    public boolean getResult() {
        return result;
    }

    public double getR() {
        return r;
    }

    public void setR(double R) {
        this.r = R;
    }

    public void setY(double Y) {
        this.y = Y;
    }

    public double getX() {
        return x;
    }

    public void setX(double X) {
        this.x = X;
    }

    public double getY() {
        return y;
    }

//    public String numberToLocaleString(double n) {
//        return decimalFormatter.format(n);
//    }

/*
    public String toString() {
        return "Point{" +
                "id=" + pointId.getId() +
                ", login='" + pointId.getLogin() + '\'' +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", result=" + result +
                ", leadTime=" + leadTime +
                ", dateMs=" + dateMs +
                '}';
    }
*/



    /*public String toTableRow() {
        return "<tr>" +
                "<td>" + dateFormatter.format(dateMs.toLocalDateTime()) + "</td>" +
                "<td>" + leadTime + "</td>" +
                "<td>" + decimalFormatter.format(x) + "</td>" +
                "<td>" + decimalFormatter.format(y) + "</td>" +
                "<td>" + decimalFormatter.format(r) + "</td>" +
                "<td>" + (result ? "Попадание" : "Промах") + "</td>" +
                "</tr>";
    }*/

/*
    private String toNameValue(String name, String value) {
        return "\"" + name + "\": \"" + value + "\"";
    }
*/

    /*public String toJSON() {
        return "{" +
                toNameValue("1now", dateFormatter.format(dateMs.toLocalDateTime())) + "," +
                toNameValue("2leadTime", String.valueOf(leadTime)) + "," +
                toNameValue("3X", decimalFormatter.format(x)) + "," +
                toNameValue("4Y", decimalFormatter.format(y)) + "," +
                toNameValue("5R", decimalFormatter.format(r)) + "," +
                toNameValue("6hit", (result ? "Попадание" : "Промах")) +
                "}";
    }*/

    public static Point fromJSON(String json) {
        Gson gson = new Gson();
        /*json = json.replaceAll("[{}\\s\"]", "");
        System.out.println("json = " + json);
        String[] fields = json.split(",");
        Point p = new Point();
        Arrays.stream(fields).forEach(s -> {
            String[] arr = s.split(":");

            try {
                Field field = p.getClass().getDeclaredField(arr[0]);
                field.setAccessible(true);
                field.set(p, (arr.length >= 2) ? arr[1] : null);
            } catch (NoSuchFieldException e) {
                System.out.println("Одно из переданных полей не найдено. " + e.getMessage());
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        });*/
        return gson.fromJson(json, Point.class);
    }

    @Override
    public Point clone() {
        Point clone = new Point();
        clone.x = this.x;
        clone.y = this.y;
        clone.r = this.r;
        return clone;
    }

    /*@Override
    public int compareTo(Point o) {
        return Long.compare(this.getId(), o.getId());
    }*/

    public PointId getPointId() {
        return pointId;
    }

    public void setPointId(PointId pointId) {
        this.pointId = pointId;
    }

    @Override
    public int compareTo(Point otherPoint) {
        return Long.compare(this.pointId.getId(), otherPoint.pointId.getId());
    }
}
