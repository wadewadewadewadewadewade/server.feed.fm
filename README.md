# The Node.js//Express interface to teh get Widget By Tag database code

I used the code in `procedure.sql` to create a stored procedure in my local MySQL DB.

I did this because MySQL caches stored procedures, and this SQL didn't seem too complex logically so the downside of MySQL reportedly not being particularly strong with logical code should be avoided. (General MySQL stored procedure pros/cons)[https://www.mysqltutorial.org/introduction-to-sql-stored-procedures.aspx/]

```
{
  DELIMITER //
  CREATE PROCEDURE findWidgetsWithTag(
    IN tagName VARCHAR(64),
    IN offset INT,
    IN max INT
  )
  BEGIN
    SELECT
      w.id,
      w.name,
      GROUP_CONCAT(DISTINCT tags.tag) AS tags,
      GROUP_CONCAT(DISTINCT dongles.name) AS dongles
    FROM
      tag t
      LEFT JOIN widget_tag_map wtm ON t.id = wtm.tag_id
      LEFT JOIN widget w ON w.id = wtm.widget_id
      LEFT JOIN (
        SELECT
          wtm_t.widget_id,
          t_t.tag
        FROM
          tag t_t
          LEFT JOIN widget_tag_map wtm_t on t_t.id = wtm_t.tag_id
      ) AS tags on tags.widget_id = w.id
      LEFT JOIN (
        SELECT
          dtm_d.widget_id,
          d_d.name
        FROM
          dongle d_d
          LEFT JOIN widget_dongle_map dtm_d on d_d.id = dtm_d.dongle_id
      ) AS dongles on dongles.widget_id = w.id
    WHERE
      t.tag = tagName AND w.deleted = 0
    GROUP BY
      w.id, w.name
    ORDER BY
      w.name
    LIMIT offset, max;
  END //
  DELIMITER ;
}
``` 

Also, so save on network traffic, I joined all of the tag and dongle names into a string on each 'widget' object that the DB returns, and converts those into arrays in the express instance to avoid server back and fourth. I'll probably change that tho because it seems hack-y

# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
