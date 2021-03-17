package stolexiy.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import stolexiy.model.Point;
import stolexiy.model.PointId;

import java.util.List;
import java.util.Optional;

public interface PointRepository extends CrudRepository<Point, PointId> {
//    Optional<Point> findById(Long id);
//    void deleteById(Long id);
   /* Point findOneByLogin(Long id, String login);
    List<Point> findAllByLogin(String login);*/
    Iterable<Point> findAllByPointId_Login(String login);
    Iterable<Point> findTop1ByPointId_LoginOrderByPointId_IdDesc(String login);

}
