package stolexiy.model;

import java.io.Serializable;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class Points implements Serializable {
    private List<Point> points;

    public Points() {
    }

    public Points(List<Point> list) {
        points = list;
        points = points.stream().sorted(Comparator.reverseOrder()).collect(Collectors.toList());
    }

    /*public Points(List<Point> list, Comparator<? super Point> c) {
        points = list;
        points.sort(c);
    }*/

    public void setPoints(List<Point> points) {
        this.points = points;
    }

    public List<Point> getPoints() {
        return points;
    }

    public Points getList(Long index, Long count) {
        if (points == null) return null;
        List<Point> list;
        list = this.points.stream()
                .skip(count * (index - 1))
                .limit(count)
                .collect(Collectors.toList());
        return new Points(list);
    }
}
