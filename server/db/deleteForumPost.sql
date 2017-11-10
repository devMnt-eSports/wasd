DELETE FROM forum_posts
WHERE id = $1;
SELECT * FROM forum_posts
WHERE user_name = $2;
