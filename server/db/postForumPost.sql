-- INSERT INTO forum_posts (user, content, title, user_profile_pic)
-- select * from forum_posts;

INSERT INTO forum_posts (user_name, content, title, user_profile_pic) VALUES ($1, $2, $3, $4);
SELECT * FROM forum_posts;
