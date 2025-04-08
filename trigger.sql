CREATE OR REPLACE FUNCTION check_user_progress()
RETURNS TRIGGER AS $$
DECLARE
    user_progress BIGINT;
    question_number BIGINT;
BEGIN
    SELECT progress INTO user_progress FROM users WHERE id = NEW.user_id;
    SELECT no INTO question_number FROM questions WHERE id = NEW.question_id;

    IF user_progress != question_number THEN
        RAISE EXCEPTION 'User progress (%), does not match the question number (%)', user_progress, question_number;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER enforce_user_progress
BEFORE INSERT ON submission
FOR EACH ROW
EXECUTE FUNCTION check_user_progress();
