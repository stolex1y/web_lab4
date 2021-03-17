package stolexiy.rest;

import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import stolexiy.model.*;
import stolexiy.security.jwt.JwtTokenProvider;
import stolexiy.service.PointService;
import stolexiy.service.UserService;


@Controller
@RequestMapping(value = "/points")
public class PointController {
    //проверка на наличие изменений в данных какого-то пользователя
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private PointService pointService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/{index}", method = RequestMethod.GET)
    @ResponseBody
    public Points listByIndex(@PathVariable Long index, @RequestParam Long count, @RequestHeader String authorization) {
        String login = jwtTokenProvider.getUsername(
                jwtTokenProvider.resolveToken(authorization));
        if (count == null || count == 0) count = 10L;
        logger.debug("Get list by index " + index + " and " + count + " points in the one list");

        Points p = new Points(pointService.findAllByLogin(login));
        return p.getList(index, count);
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Point findPointById(@PathVariable Long id, @RequestHeader String authorization) {
        String login = jwtTokenProvider.getUsername(
                jwtTokenProvider.resolveToken(authorization));
        if (id == null || id == 0) id = 1L;
        logger.debug("Get point by id " + id);
        return (pointService.findOne(id, login));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseBody
    public Point create(@RequestBody String s, @RequestHeader String authorization) {
        String login = jwtTokenProvider.getUsername(
                jwtTokenProvider.resolveToken(authorization));
        if (s.equals("")) {
            logger.debug("Request body has a null point.");
            return null;
        }
        Point point = Point.fromJSON(s);
        logger.info("Creating point: " + point);
        return pointService.save(point, login);

    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/id/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public PointResponseDto update(@PathVariable Long id, @RequestBody String pointStr, @RequestHeader String authorization) {
        String login = jwtTokenProvider.getUsername(
                jwtTokenProvider.resolveToken(authorization));
        if (pointStr.equals("")) {
            logger.debug("Request body has a null point.");
            return null;
        }
        Point point = Point.fromJSON(pointStr);
        if (id == null || id == 0 || point == null) {
            logger.debug("Try to update point with the null or 0 id or null request body.");
            return null;
        }
        logger.info("Updating point: " + point);
        return new PointResponseDto(pointService.update(point, login));
    }

    @ResponseStatus(HttpStatus.OK)
    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public void delete(@PathVariable Long id, @RequestHeader String authorization) {
        String login = jwtTokenProvider.getUsername(
                jwtTokenProvider.resolveToken(authorization));
        if (id == null || id == 0) {
            logger.debug("Try to delete point with the null or 0 id.");
            return;
        }
        logger.info("Deleting point: " + id);
        pointService.delete(id, login);
    }

}
