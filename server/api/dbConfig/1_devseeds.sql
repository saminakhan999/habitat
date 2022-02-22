INSERT INTO users (username, email, password_digest)
VALUES
('ewhite', 'ewhite@gmai.com', 'noplease'),
('rhi', 'rhi@gmail.com', 'yesplease');

INSERT INTO habits (name, frequency_id, complete, streak, user_id)
VALUES
('Drink water', 1, 0, 5, 1),
('Eat veg', 1, 0, 5, 1),
('Work out', 2, 0, 3, 1),
('Work out', 2, 0, 8, 2);

INSERT INTO frequency (monday, tuesday, wednesday, thursday, friday, saturday, sunday)
VALUES
(TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
(TRUE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE);

INSERT INTO subhabits (name, complete, habit_id)
VALUES
('9am', 0, 1),
('10am', 0, 1),
('9am', 0, 2);
