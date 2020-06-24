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
