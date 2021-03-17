package stolexiy.service;

import com.google.common.collect.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import stolexiy.model.Point;
import stolexiy.model.PointId;
import stolexiy.model.User;
import stolexiy.repository.PointRepository;

import java.util.Iterator;
import java.util.List;

@Service
@Transactional
public class PointServiceImpl implements PointService {
    @Autowired
    private PointRepository pointRepository;

    @Transactional(readOnly = true)
    @Override
    public List<Point> findAllByLogin(String login) {
        return Lists.newArrayList(pointRepository.findAllByPointId_Login(login));
    }

    @Transactional(readOnly = true)
    @Override
    public Point findOne(Long id, String login) {
        return pointRepository.findOne(new PointId(id, login));
    }

    @Override
    public Point save(Point point, String login) {
        Iterator<Point> iterator = pointRepository
                .findTop1ByPointId_LoginOrderByPointId_IdDesc(login).iterator();
        long id = 1;
        if (iterator.hasNext()) {
            Point lastPoint = pointRepository
                    .findTop1ByPointId_LoginOrderByPointId_IdDesc(login).iterator().next();
            id = lastPoint.getPointId().getId() + 1;
        }
        point.setPointId(new PointId(id, login));
        return pointRepository.save(point);
    }

    @Override
    public Point update(Point point, String login) {
        point.getPointId().setLogin(login);
        return pointRepository.save(point);
    }

    @Override
    public Long delete(Long pointId, String login) {
        pointRepository.delete(new PointId(pointId, login));
        return pointId;
    }
}
