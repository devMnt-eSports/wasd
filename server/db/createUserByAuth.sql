INSERT INTO users (name, passport_id) VALUES ($1, $2) RETURNING name, passport_id;
