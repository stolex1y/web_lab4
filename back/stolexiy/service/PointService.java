package stolexiy.service;

import stolexiy.model.Point;

import java.util.List;

public interface PointService {
    Point findOne(Long id, String login);
    List<Point> findAllByLogin(String login);
    Point save(Point point, String login);
    Long delete(Long pointId, String login);
    Point update(Point point, String login);
    // поиск по параметру,
}
