CREATE TABLE "threads" (
                            "_id" bigserial PRIMARY KEY,
                            "name" varchar NOT NULL,
                            "description" varchar NOT NULL,
                            "author_id" bigint NOT NULL,
                            "dislikes_count" int NOT NULL DEFAULT (0),
                            "likes_count" int NOT NULL DEFAULT (0),
                            "posts_count" int NOT NULL DEFAULT (0),
                            "created_at" timestamptz NOT NULL DEFAULT (now())
);

CREATE TABLE "users" (
                            "_id" bigserial PRIMARY KEY,
                            "name" varchar NOT NULL,
                            "email" varchar NOT NULL,
                            "password" varchar NOT NULL,
                            "description" varchar DEFAULT (NULL),
                            "birth_date" varchar DEFAULT (NULL),
                            "active" boolean DEFAULT (FALSE),
                            "activate_user_code" varchar DEFAULT (NULL),
                            "activate_user_expires" bigint DEFAULT (NULL),
                            "resend_activate_user" bigint DEFAULT (NULL)
);

CREATE INDEX ON "users" ("email");

ALTER TABLE "threads" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("_id");