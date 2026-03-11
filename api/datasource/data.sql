DROP TABLE IF EXISTS autographs CASCADE;
DROP TABLE IF EXISTS comments_golden_book CASCADE;

DROP TABLE IF EXISTS film_reservations CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS projections CASCADE;
DROP TABLE IF EXISTS films_cast CASCADE;
DROP TABLE IF EXISTS films_genres_request CASCADE;
DROP TABLE IF EXISTS films_genres CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
DROP TABLE IF EXISTS films_request CASCADE;
DROP TABLE IF EXISTS films CASCADE;
DROP TABLE IF EXISTS stands CASCADE;
DROP TABLE IF EXISTS stand_types CASCADE;
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS ticket_prices CASCADE;
DROP TABLE IF EXISTS basket_items CASCADE;
DROP TABLE IF EXISTS baskets CASCADE;
DROP TABLE IF EXISTS goodies_colors CASCADE;
DROP TABLE IF EXISTS goodies_sizes CASCADE;
DROP TABLE IF EXISTS colors CASCADE;
DROP TABLE IF EXISTS sizes CASCADE;
DROP TABLE IF EXISTS goodies CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS provider_requests CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stand_reservation_requests;
DROP TABLE IF EXISTS refresh_tokens CASCADE;

DROP TABLE IF EXISTS votes_category CASCADE;
DROP TABLE IF EXISTS votes CASCADE;
DROP TABLE IF EXISTS votes_score CASCADE;


-- UTILISATEURS
CREATE TABLE IF NOT EXISTS users
(
    id          UUID PRIMARY KEY,
    name        VARCHAR(255),
    login       VARCHAR(100) UNIQUE               NOT NULL,
    password    VARCHAR(255)                      NOT NULL,
    email       VARCHAR(255) UNIQUE               NOT NULL,
    droit       INT CHECK (droit BETWEEN 0 AND 2) NOT NULL,
    session     TEXT,
    type        VARCHAR(100),
    nom_photo   VARCHAR(255),
    description TEXT
);

-- DEMANDES DE PRESTATAIRES
CREATE TABLE IF NOT EXISTS provider_requests
(
    id       UUID PRIMARY KEY,
    name     VARCHAR(255),
    login    VARCHAR(100) UNIQUE               NOT NULL,
    password VARCHAR(255)                      NOT NULL,
    email    VARCHAR(255) UNIQUE               NOT NULL,
    email2   VARCHAR(255) UNIQUE               NOT NULL,
    droit    INT CHECK (droit BETWEEN 0 AND 1) NOT NULL,
    date     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- NOTES / AVIS

CREATE TABLE IF NOT EXISTS notes
(
    id      SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    value   DECIMAL(2, 1) CHECK (value BETWEEN 0 AND 5),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


-- GOODIES

CREATE TABLE IF NOT EXISTS goodies
(
    id       SERIAL PRIMARY KEY,
    owner_id UUID           NOT NULL,
    name     VARCHAR(100)   NOT NULL,
    price    DECIMAL(10, 2) NOT NULL,
    quantity INT            NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sizes
(
    id    SERIAL PRIMARY KEY,
    label VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS colors
(
    id    SERIAL PRIMARY KEY,
    label VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS goodies_sizes
(
    goodie_id INT,
    size_id   INT,
    PRIMARY KEY (goodie_id, size_id),
    FOREIGN KEY (goodie_id) REFERENCES goodies (id) ON DELETE CASCADE,
    FOREIGN KEY (size_id) REFERENCES sizes (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS goodies_colors
(
    goodie_id INT,
    color_id  INT,
    PRIMARY KEY (goodie_id, color_id),
    FOREIGN KEY (goodie_id) REFERENCES goodies (id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES colors (id) ON DELETE CASCADE
);


-- PANIER / COMMANDES

CREATE TABLE IF NOT EXISTS baskets
(
    id      UUID PRIMARY KEY,
    user_id UUID                                           NOT NULL,
    date    DATE                                           NOT NULL,
    state   VARCHAR(20) CHECK (state IN ('wait', 'payed')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS basket_items
(
    basket_id UUID,
    goodie_id INT,
    color_id  INT,
    size_id   INT,
    count     INT NOT NULL,
    PRIMARY KEY (basket_id, goodie_id, color_id, size_id),
    FOREIGN KEY (basket_id) REFERENCES baskets (id) ON DELETE CASCADE,
    FOREIGN KEY (goodie_id) REFERENCES goodies (id),
    FOREIGN KEY (color_id) REFERENCES colors (id),
    FOREIGN KEY (size_id) REFERENCES sizes (id)
);


-- BILLETS

CREATE TABLE IF NOT EXISTS ticket_prices
(
    id    UUID PRIMARY KEY,
    name  VARCHAR(50)    NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets
(
    id        UUID PRIMARY KEY,
    user_id   UUID      NOT NULL,
    date_from TIMESTAMP NOT NULL,
    date_to   TIMESTAMP NOT NULL,
    price_id  UUID      NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (price_id) REFERENCES ticket_prices (id)
);


-- STANDS

CREATE TABLE IF NOT EXISTS stand_types
(
    id   SERIAL PRIMARY KEY,
    type VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS stands
(
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    x        INT          NOT NULL,
    y        INT          NOT NULL,
    width    INT          NOT NULL,
    height   INT          NOT NULL,
    type_id  INT          NOT NULL,
    owner_id UUID,
    FOREIGN KEY (type_id) REFERENCES stand_types (id),
    FOREIGN KEY (owner_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS autographs
(
    id         SERIAL PRIMARY KEY,
    stand_id   INT       NOT NULL REFERENCES stands (id) ON DELETE CASCADE,
    user_id    UUID      NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    begin_date TIMESTAMP NOT NULL,
    duration   INT       NOT NULL
);


-- FILMS
CREATE TABLE IF NOT EXISTS films
(
    id           UUID PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    director_id  UUID         NOT NULL,
    release_date DATE,
    duration     INT,
    description  TEXT,
    poster       VARCHAR(255),
    FOREIGN KEY (director_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS films_request
(
    id           UUID PRIMARY KEY,
    title        VARCHAR(255) NOT NULL,
    director_id  UUID         NOT NULL,
    release_date DATE,
    duration     INT,
    description  TEXT,
    poster       VARCHAR(255),
    FOREIGN KEY (director_id) REFERENCES users (id)
    );

CREATE TABLE IF NOT EXISTS genres
(
    id    SERIAL PRIMARY KEY,
    label VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS films_genres
(
    film_id  UUID,
    genre_id INT,
    PRIMARY KEY (film_id, genre_id),
    FOREIGN KEY (film_id) REFERENCES films (id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS films_genres_request
(
    film_id  UUID,
    genre_id INT,
    PRIMARY KEY (film_id, genre_id),
    FOREIGN KEY (film_id) REFERENCES films_request (id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres (id) ON DELETE CASCADE
    );

CREATE TABLE IF NOT EXISTS films_cast
(
    film_id  UUID,
    actor_id UUID,
    PRIMARY KEY (film_id, actor_id),
    FOREIGN KEY (film_id) REFERENCES films (id) ON DELETE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES users (id) ON DELETE CASCADE
);


-- PROJECTIONS

CREATE TABLE IF NOT EXISTS projections
(
    id       SERIAL PRIMARY KEY,
    stand_id INT       NOT NULL,
    film_id  UUID      NOT NULL,
    date     TIMESTAMP NOT NULL,
    FOREIGN KEY (stand_id) REFERENCES stands (id),
    FOREIGN KEY (film_id) REFERENCES films (id)
);


-- RÉSERVATIONS (SPÉCIALISATION)

CREATE TABLE IF NOT EXISTS reservations
(
    id       SERIAL PRIMARY KEY,
    user_id  UUID                                              NOT NULL,
    date     TIMESTAMP                                         NOT NULL,
    stand_id INT                                               NOT NULL,
    type     VARCHAR(20) CHECK (type IN ('film', 'autograph')) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (stand_id) REFERENCES stands (id)
);

CREATE TABLE IF NOT EXISTS film_reservations
(
    reservation_id INT PRIMARY KEY,
    projection_id  INT NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations (id) ON DELETE CASCADE,
    FOREIGN KEY (projection_id) REFERENCES projections (id)
);


-- LIVRE D’OR
CREATE TABLE IF NOT EXISTS comments_golden_book
(
    id          UUID PRIMARY KEY,
    user_id     UUID      NOT NULL,
    content TEXT      NOT NULL,
    date        TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS stand_reservation_requests
(
    id           SERIAL PRIMARY KEY,
    request_date TIMESTAMP                                                         NOT NULL,
    stand_id     INT                                                               NOT NULL,
    user_id      UUID                                                              NOT NULL,
    status       VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'rejected')) NOT NULL DEFAULT 'pending',
    FOREIGN KEY (stand_id) REFERENCES stands (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


-- VOTES
CREATE TABLE IF NOT EXISTS votes_category
(
    id            UUID PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS votes
(
    id          UUID PRIMARY KEY,
    user_id     UUID NOT NULL,
    film_id     UUID NOT NULL,
    category_id UUID NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_film FOREIGN KEY (film_id) REFERENCES films (id) ON DELETE CASCADE,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES votes_category (id) ON DELETE CASCADE,
    CONSTRAINT unique_user_category UNIQUE (user_id, category_id)
);

CREATE TABLE IF NOT EXISTS votes_score
(
    film_id     UUID NOT NULL,
    category_id UUID NOT NULL,
    total_score INT DEFAULT 0 CHECK (total_score >= 0),
    CONSTRAINT pk_votes_score PRIMARY KEY (film_id, category_id),
    CONSTRAINT fk_score_film FOREIGN KEY (film_id) REFERENCES films (id) ON DELETE CASCADE,
    CONSTRAINT fk_score_category FOREIGN KEY (category_id) REFERENCES votes_category (id) ON DELETE CASCADE
);

-- REFRESH TOKEN
CREATE TABLE IF NOT EXISTS refresh_tokens
(
    id         SERIAL PRIMARY KEY,
    iduser     UUID        NOT NULL,
    session_id UUID        NOT NULL,
    jti        UUID UNIQUE NOT NULL,
    token_hash TEXT        NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    user_agent TEXT,
    ip         INET,
    FOREIGN KEY (iduser) REFERENCES users (id) ON DELETE CASCADE

);





INSERT INTO users (id, name, login, password, email, droit, session, type, nom_photo, description) VALUES
                                                                                                       ('a2b1c8c4-2e53-4c37-a4de-3c4fc35b18fa', '', 'admin', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'admin@festival.com', 2, '', '', '', ''),
                                                                                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Martin Scorsese', 'presta', '$2b$10$oBOSkf4UkKpVRyIBBDeNIua6jk3Yx7VOkuYTqnTT0t.MyBVO2fJdy', 'scorsese@cinema.com', 1, '', 'Réalisateur', 'scorsese.jpg', 'Réalisateur légendaire oscarisé, maître du cinéma américain'),
                                                                                                       ('c38acd4c-d6fc-4a19-bd24-98a7c18fa414', '', 'client', '$2b$10$CjrQ9uGIL0gcGUHoMtrTg.nes0YUwP6XHsrdqYvuR/UAiSdJ5xNo6', 'client@mail.com', 0, '', '', 'producteur.jpg', ''),
                                                                                                       ('d4e9116b-e3e8-4e0e-8a3b-6a93e1d6c4f4', '', 'client2', '$2b$10$gHSeue6UuDAjfug1k.UOGuvp0dtn63I2sKwrlWb7ZqhMeXZcWjXWK', 'client2@mail.com', 0, '', '', '', ''),
                                                                                                       ('e55733ef-f3d2-447d-94db-9e3aaef624c1', 'Quentin Tarantino', 'presta2', '$2b$10$NQkgKPXfAR/kJr/VmVEPdehppx.GUT9UtcNsplnC7H04BK19rK9be', 'tarantino@pulp.com', 1, '', 'Réalisateur', 'tarantino.jpg', 'Créateur de Pulp Fiction et Kill Bill, style unique et référencé'),
                                                                                                       ('f68ab44a-557b-4d44-b1df-a38f894c2dca', 'Christopher Nolan', 'prestaknaghui V2', '$2b$10$cmp4RThxAuj5Zk3zPa2GxeHBXm8/66b4/e6AYgbUryn8PgCSzUo2m', 'nolan@inception.com', 1, '', 'Réalisateur', 'nolan.jpg', 'Génie des films à intrigue complexe et effets visuels innovants'),
                                                                                                       ('f68ab44a-557b-4d44-b1df-a34f891c2d0a', 'Johan Lançon', 'goat', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'goat@gmail.com', 1, '', 'Réalisateur', 'null.jpg', 'L''honoré en personne'),
                                                                                                       ('a81699b9-94d1-4f72-9df4-1588dc1b2cc5', 'Leonardo DiCaprio', 'cityxl', '$2b$10$jFOrTLJiX/uBRgcAicI4c.Uhk881i4sjzkQWshGuhG02VvxL8sIoK', 'dicaprio@actor.com', 1, '', 'Acteur', 'dicaprio.jpg', 'Acteur oscarisé, star internationale'),
                                                                                                       ('bd2adbd5-67b5-4e0e-a06a-7fab0d2e391c', 'Meryl Streep', 'mstreep', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'streep@actress.com', 1, '', 'Actrice', 'streep.jpg', 'L''actrice la plus nominée aux Oscars'),
                                                                                                       ('c92c742a-baf6-4cc0-9a50-941ddfe55f8c', 'Denis Villeneuve', 'dvilleneuve', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'villeneuve@sci-fi.com', 1, '', 'Réalisateur', 'villeneuve.jpg', 'Maître de la science-fiction moderne'),
                                                                                                       ('db7a70fa-ff5e-421b-987e-7ca4ab65eb31', 'Cate Blanchett', 'cblanchett', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'blanchett@actress.com', 1, '', 'Actrice', 'blanchett.jpg', 'Actrice australienne doublement oscarisée'),
                                                                                                       ('e1fbdadd-fd8f-4a6d-b0cb-f8c77b3e7238', 'Steven Spielberg', 'sspielberg', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'spielberg@films.com', 1, '', 'Réalisateur', 'spielberg.jpg', 'Légende du cinéma'),
                                                                                                       ('fa1b7ea7-c35c-488d-b7e1-7fb893b97590', 'Marion Cotillard', 'mcotillard', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'cotillard@actress.com', 1, '', 'Actrice', 'cotillard.jpg', 'Actrice française oscarisée'),
                                                                                                       ('b2533589-a4f4-476b-bdc9-1cdebbcb5e06', 'Al Pacino', 'apacino', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'pacino@actor.com', 1, '', 'Acteur', 'pacino.jpg', 'Icône du cinéma'),
                                                                                                       ('c0debc4d-c621-4b4d-9404-97d59a653d4b', 'Jane Campion', 'jcampioni', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'campion@director.com', 1, '', 'Réalisatrice', 'campion.jpg', 'Réalisatrice néo-zélandaise'),
                                                                                                       ('dcded2e8-4c67-4b2b-b369-d0c13bec2c0c', 'Joaquin Phoenix', 'jphoenix', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'phoenix@actor.com', 1, '', 'Acteur', 'phoenix.jpg', 'Acteur oscarisé'),
                                                                                                       ('eac2c01b-937f-4b14-a48c-7d9b4ab5c236', 'Greta Gerwig', 'ggerwig', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'gerwig@director.com', 1, '', 'Réalisatrice', 'gerwig.jpg', 'Réalisatrice acclamée'),
                                                                                                       ('f1b92326-1e85-49af-8cf7-2270e2e725e8', 'Tom Hanks', 'thanks', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'hanks@actor.com', 1, '', 'Acteur', 'hanks.jpg', 'Acteur emblématique'),
                                                                                                       ('003f7a03-fbc7-48d3-a9a7-6fa949e88cdd', 'Acteur A', 'acteur_a', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'acteur_a@cast.com', 1, '', 'Acteur', '', ''),
                                                                                                       ('3952f2aa-8d02-4306-b814-f5b4405ed2a3', 'Acteur B', 'acteur_b', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'acteur_b@cast.com', 1, '', 'Acteur', '', ''),
                                                                                                       ('4287f507-81a0-4c98-9b50-5df6bc60aa89', 'Acteur C', 'acteur_c', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'acteur_c@cast.com', 1, '', 'Acteur', '', ''),
                                                                                                       ('cf64a893-fe05-44ea-bf3a-d86e6f39dc55', 'Acteur D', 'acteur_d', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'acteur_d@cast.com', 1, '', 'Acteur', '', ''),
                                                                                                       ('83830343-26a0-400d-b491-8fd6c4d4bc80', 'Acteur E', 'acteur_e', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'acteur_e@cast.com', 1, '', 'Acteur', '', ''),
                                                                                                       ('9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66', 'Acteur F', 'acteur_f', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'acteur_f@cast.com', 1, '', 'Acteur', '', ''),
                                                                                                       ('7b8c9d0e-1a2b-4c3d-8f4a-5b6c7d8e9f01', 'Acteur G', 'acteur_g', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'acteur_g@cast.com', 1, '', 'Acteur', '', '');

INSERT INTO notes (user_id, value) VALUES
                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 5),
                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 4.5),
                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 5),
                                       ('c38acd4c-d6fc-4a19-bd24-98a7c18fa414', 3.5),
                                       ('c38acd4c-d6fc-4a19-bd24-98a7c18fa414', 4),
                                       ('e55733ef-f3d2-447d-94db-9e3aaef624c1', 3);

INSERT INTO goodies (id, owner_id, name, price, quantity) VALUES
                                                              (1, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'T-shirt', 20, 37),
                                                              (2, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Tasse', 15, 40),
                                                              (3, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Casquette', 12, 12),
                                                              (4, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Sweat', 35, 66);

INSERT INTO sizes (id, label) VALUES
                                  (1, 'XS'), (2, 'S'), (3, 'M'), (4, 'L'), (5, 'XL');

INSERT INTO colors (id, label) VALUES
                                   (1, 'Rouge'), (2, 'Bleu'), (3, 'Vert'), (4, 'Noir'), (5, 'Blanc');

INSERT INTO goodies_sizes (goodie_id, size_id) VALUES
                                                   (1, 1), (1, 2), (1, 3), (1, 4),
                                                   (2, 1),
                                                   (3, 4),
                                                   (4, 5);

INSERT INTO goodies_colors (goodie_id, color_id) VALUES
                                                     (1, 1), (1, 2),
                                                     (2, 3),
                                                     (3, 4),
                                                     (4, 5);

INSERT INTO ticket_prices (id, name, price) VALUES
                                                ('93b0592a-922d-4b39-9227-b5f7d84c95ff', 'adult',   11),
                                                ('0936df09-1754-448f-8b09-f6c794c6b251', 'student',  9),
                                                ('9e671b84-9b15-4543-bc2b-bf7892e0247d', 'child',    5);

INSERT INTO tickets (id, user_id, date_from, date_to, price_id) VALUES
                                                                    ('4c3bfa40-79f0-4f27-9af0-8bc4f606e0c4', 'a2b1c8c4-2e53-4c37-a4de-3c4fc35b18fa', '2023-05-02 00:00:00', '2023-05-02 23:59:59', '93b0592a-922d-4b39-9227-b5f7d84c95ff'),
                                                                    ('8a1fd033-04a0-4a48-b274-8b6a15caf6ad', 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2023-05-03 00:00:00', '2023-05-03 23:59:59', '0936df09-1754-448f-8b09-f6c794c6b251'),
                                                                    ('859407b1-e711-4fc7-8ef0-9b0a67661134', 'c38acd4c-d6fc-4a19-bd24-98a7c18fa414', '2023-05-04 00:00:00', '2023-05-04 23:59:59', '9e671b84-9b15-4543-bc2b-bf7892e0247d');

INSERT INTO baskets (id, user_id, date, state) VALUES
    ('0f8fad5b-d9cb-469f-a165-70867728950e', 'c38acd4c-d6fc-4a19-bd24-98a7c18fa414', '2025-03-18', 'wait');

INSERT INTO basket_items (basket_id, goodie_id, color_id, size_id, count) VALUES
    ('0f8fad5b-d9cb-469f-a165-70867728950e', 1, 2, 3, 1);

INSERT INTO stand_types (id, type) VALUES
                                       (1, 'cinema'),
                                       (2, 'autograph');

INSERT INTO stands (id, name, x, y, width, height, type_id, owner_id) VALUES
                                                                          (1, 'cinema 1',  25,   32,   481, 620, 1, 'f68ab44a-557b-4d44-b1df-a34f891c2d0a'),
                                                                          (2, 'cinema 2',  25,   670,  481, 620, 1, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018'),
                                                                          (3, 'cinema 3',  25,   1303, 481, 620, 1, NULL),
                                                                          (4, 'dedicace1', 886,  348,  65,  164, 2, NULL),
                                                                          (5, 'dedicace2', 781,  348,  65,  164, 2, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018'),
                                                                          (6, 'dedicace3', 886,  1002, 65,  164, 2, NULL),
                                                                          (7, 'dedicace4', 781,  1002, 65,  164, 2, NULL);

INSERT INTO genres (id, label) VALUES
                                   (1,  'Drame'),
                                   (2,  'Crime'),
                                   (3,  'Thriller'),
                                   (4,  'Biographie'),
                                   (5,  'Science-Fiction'),
                                   (6,  'Aventure'),
                                   (7,  'Western'),
                                   (8,  'Musical'),
                                   (9,  'Famille'),
                                   (10, 'Romance'),
                                   (11, 'Action'),
                                   (12, 'Fantasy'),
                                   (13, 'Comédie');

INSERT INTO films (id, title, director_id, release_date, duration, description, poster) VALUES
                                                                                            ('6f207e95-5400-471f-a933-d01d817b0608', 'Killers of the Flower Moon',                    'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2023-10-20', 206, 'Une sombre histoire de meurtres dans la nation Osage dans les années 1920', 'killers_moon.jpg'),
                                                                                            ('a0b1c2d3-e4f5-4a6b-8c7d-9e0f1a2b3c4d', 'Avatar: Fire and Ashes',                       'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2025-12-17', 160, 'Troisième volet de la saga Avatar, concluant l''histoire épique de Pandora.', 'avatar_fire_and_ashes.jpg'),
                                                                                            ('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 'Borderlands',                                  'e1fbdadd-fd8f-4a6d-b0cb-f8c77b3e7238', '2026-01-09', 115, 'Adaptation cinématographique du jeu vidéo à succès mêlant action et humour.', 'borderlands.jpg'),
                                                                                            ('b58b41e4-7f5d-452b-af72-9301dafa7896',  'Pulp Fiction',                                 'e55733ef-f3d2-447d-94db-9e3aaef624c1', '1994-10-14', 154, 'Histoires entrelacées de gangsters à Los Angeles', 'pulp_fiction.jpg'),
                                                                                            ('6cec5c18-d60b-4372-916a-482bb4facaa0',  'Oppenheimer',                                  'f68ab44a-557b-4d44-b1df-a38f894c2dca', '2023-07-21', 180, 'L''histoire du père de la bombe atomique', 'oppenheimer.jpg'),
                                                                                            ('9b4ced38-53ef-4a87-89f3-a791ce326093',  'Inception',                                    'f68ab44a-557b-4d44-b1df-a38f894c2dca', '2010-07-16', 148, 'Un voleur qui s''infiltre dans les rêves', 'inception.jpg'),
                                                                                            ('e0f3b1c2-16b9-4504-8593-872d92b6f892',  'Dune',                                         'c92c742a-baf6-4cc0-9a50-941ddfe55f8c', '2021-09-15', 155, 'L''épopée de Paul Atréides sur la planète désertique Arrakis', 'dune.jpg'),
                                                                                            ('2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913',  'The Power of the Dog',                         'f68ab44a-557b-4d44-b1df-a38f894c2dca', '2021-11-17', 126, 'Un rancher cruel dont la vie bascule avec l''arrivée de sa belle-soeur', 'power_dog.jpg'),
                                                                                            ('f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44', 'E.T. l''extra-terrestre',                      'e1fbdadd-fd8f-4a6d-b0cb-f8c77b3e7238', '1982-06-11', 115, 'Un enfant aide un extraterrestre à rentrer chez lui', 'et.jpg'),
                                                                                            ('c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77', 'La Vie en Rose',                               'fa1b7ea7-c35c-488d-b7e1-7fb893b97590', '2007-02-14', 140, 'La vie tumultueuse d''Édith Piaf', 'lavieenrose.jpg'),
                                                                                            ('e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22', 'The Godfather',                                'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '1972-03-24', 175, 'L''histoire de la famille mafieuse Corleone', 'godfather.jpg'),
                                                                                            ('f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f', 'Barbie',                                       'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2023-07-21', 114, 'Barbie quitte Barbie Land pour le monde réel', 'barbie.jpg'),
                                                                                            ('a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c', 'Joker',                                        'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2019-10-04', 122, 'La transformation d''Arthur Fleck en célèbre vilain', 'joker.jpg'),
                                                                                            ('b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e', 'Forrest Gump',                                 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '1994-07-06', 142, 'L''histoire extraordinaire d''un homme simple au grand coeur', 'forrestgump.jpg'),
                                                                                            ('c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f', 'The Dark Knight',                              'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2008-07-18', 152, 'Batman affronte le chaos du Joker à Gotham City', 'darkknight.jpg'),
                                                                                            ('d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a', 'Titanic',                                      'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '1997-12-19', 195, 'Histoire d''amour à bord du paquebot maudit', 'titanic.jpg'),
                                                                                            ('e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b', 'The Silence of the Lambs',                     'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '1991-02-14', 118, 'Une jeune agent du FBI consulte un tueur en série emprisonné', 'silence_lambs.jpg'),
                                                                                            ('f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c', 'The Shawshank Redemption',                     'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '1994-10-14', 142, 'L''histoire de l''amitié entre deux prisonniers', 'shawshank.jpg'),
                                                                                            ('a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', 'The Lord of the Rings: The Return of the King','bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2003-12-17', 201, 'La conclusion de l''épopée de la Terre du Milieu', 'lotr_return.jpg');

INSERT INTO films_genres (film_id, genre_id) VALUES
                                                 ('b1c2d3e4-f5a6-4b7c-8d9e-0f1a2b3c4d5e', 5),
                                                 ('a0b1c2d3-e4f5-4a6b-8c7d-9e0f1a2b3c4d', 5),
                                                 ('6f207e95-5400-471f-a933-d01d817b0608',  1),
                                                 ('6f207e95-5400-471f-a933-d01d817b0608',  2),
                                                 ('b58b41e4-7f5d-452b-af72-9301dafa7896',  2),
                                                 ('b58b41e4-7f5d-452b-af72-9301dafa7896',  3),
                                                 ('6cec5c18-d60b-4372-916a-482bb4facaa0',  4),
                                                 ('6cec5c18-d60b-4372-916a-482bb4facaa0',  1),
                                                 ('9b4ced38-53ef-4a87-89f3-a791ce326093',  5),
                                                 ('9b4ced38-53ef-4a87-89f3-a791ce326093',  3),
                                                 ('e0f3b1c2-16b9-4504-8593-872d92b6f892',  5),
                                                 ('e0f3b1c2-16b9-4504-8593-872d92b6f892',  6),
                                                 ('2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913',  7),
                                                 ('2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913',  1),
                                                 ('f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44', 5),
                                                 ('f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44', 9),
                                                 ('c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77', 4),
                                                 ('c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77', 8),
                                                 ('e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22', 2),
                                                 ('e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22', 1),
                                                 ('f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f', 13),
                                                 ('f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f', 9),
                                                 ('a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c', 3),
                                                 ('a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c', 1),
                                                 ('b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e', 1),
                                                 ('b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e', 10),
                                                 ('c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f', 11),
                                                 ('c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f', 3),
                                                 ('d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a', 10),
                                                 ('d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a', 1),
                                                 ('e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b', 3),
                                                 ('e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b', 2),
                                                 ('f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c', 1),
                                                 ('f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c', 2),
                                                 ('a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', 12),
                                                 ('a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', 6);

INSERT INTO films_cast (film_id, actor_id) VALUES
                                               ('6f207e95-5400-471f-a933-d01d817b0608',  '003f7a03-fbc7-48d3-a9a7-6fa949e88cdd'),
                                               ('6f207e95-5400-471f-a933-d01d817b0608',  '3952f2aa-8d02-4306-b814-f5b4405ed2a3'),
                                               ('b58b41e4-7f5d-452b-af72-9301dafa7896',  '3952f2aa-8d02-4306-b814-f5b4405ed2a3'),
                                               ('b58b41e4-7f5d-452b-af72-9301dafa7896',  '003f7a03-fbc7-48d3-a9a7-6fa949e88cdd'),
                                               ('6cec5c18-d60b-4372-916a-482bb4facaa0',  '4287f507-81a0-4c98-9b50-5df6bc60aa89'),
                                               ('6cec5c18-d60b-4372-916a-482bb4facaa0',  'cf64a893-fe05-44ea-bf3a-d86e6f39dc55'),
                                               ('9b4ced38-53ef-4a87-89f3-a791ce326093',  '003f7a03-fbc7-48d3-a9a7-6fa949e88cdd'),
                                               ('9b4ced38-53ef-4a87-89f3-a791ce326093',  '83830343-26a0-400d-b491-8fd6c4d4bc80'),
                                               ('e0f3b1c2-16b9-4504-8593-872d92b6f892',  '4287f507-81a0-4c98-9b50-5df6bc60aa89'),
                                               ('e0f3b1c2-16b9-4504-8593-872d92b6f892',  '83830343-26a0-400d-b491-8fd6c4d4bc80'),
                                               ('2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913',  '4287f507-81a0-4c98-9b50-5df6bc60aa89'),
                                               ('2a4d9a5f-fd9c-4d26-a65a-0ef0f1b2a913',  'cf64a893-fe05-44ea-bf3a-d86e6f39dc55'),
                                               ('f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44', '9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66'),
                                               ('f1b1c4d9-5e3f-4d4a-bc85-9c8e1a5b0d44', 'cf64a893-fe05-44ea-bf3a-d86e6f39dc55'),
                                               ('c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77', '7b8c9d0e-1a2b-4c3d-8f4a-5b6c7d8e9f01'),
                                               ('c1d4f2b3-4e7a-42a9-bf3d-0a9f5b3c6e77', '83830343-26a0-400d-b491-8fd6c4d4bc80'),
                                               ('e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22', '3952f2aa-8d02-4306-b814-f5b4405ed2a3'),
                                               ('e8f2d3c1-5b6a-4f3d-9c7f-2d8e5a6b7c22', '003f7a03-fbc7-48d3-a9a7-6fa949e88cdd'),
                                               ('f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f', '83830343-26a0-400d-b491-8fd6c4d4bc80'),
                                               ('f3b1c2d4-5e6f-4d7a-b8c9-1a2b3c4d5e6f', '9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66'),
                                               ('a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c', '4287f507-81a0-4c98-9b50-5df6bc60aa89'),
                                               ('a1b2c3d4-5e6f-4f7a-8b9c-0d1e2f3a4b5c', '7b8c9d0e-1a2b-4c3d-8f4a-5b6c7d8e9f01'),
                                               ('b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e', '9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66'),
                                               ('b2c3d4e5-6f7a-4b8c-9d0e-1f2a3b4c5d6e', 'cf64a893-fe05-44ea-bf3a-d86e6f39dc55'),
                                               ('c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f', '003f7a03-fbc7-48d3-a9a7-6fa949e88cdd'),
                                               ('c3d4e5f6-7a8b-4c9d-0e1f-2a3b4c5d6e7f', '3952f2aa-8d02-4306-b814-f5b4405ed2a3'),
                                               ('d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a', '003f7a03-fbc7-48d3-a9a7-6fa949e88cdd'),
                                               ('d4e5f6a7-8b9c-4d0e-1f2a-3b4c5d6e7f8a', 'cf64a893-fe05-44ea-bf3a-d86e6f39dc55'),
                                               ('e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b', 'cf64a893-fe05-44ea-bf3a-d86e6f39dc55'),
                                               ('e5f6a7b8-9c0d-4e1f-2a3b-4c5d6e7f8a9b', '3952f2aa-8d02-4306-b814-f5b4405ed2a3'),
                                               ('f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c', '9a8b7c6d-5e4f-4a3b-8c2d-1f0e9d8c7b66'),
                                               ('f6a7b8c9-0d1e-4f2a-3b4c-5d6e7f8a9b0c', '3952f2aa-8d02-4306-b814-f5b4405ed2a3'),
                                               ('a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', '4287f507-81a0-4c98-9b50-5df6bc60aa89'),
                                               ('a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', '83830343-26a0-400d-b491-8fd6c4d4bc80');

INSERT INTO projections (id, stand_id, film_id, date) VALUES
                                                          (1, 1, '6f207e95-5400-471f-a933-d01d817b0608', '2025-12-23 14:00:00'),
                                                          (2, 1, '6f207e95-5400-471f-a933-d01d817b0608', '2025-12-24 17:00:00'),
                                                          (3, 1, '6cec5c18-d60b-4372-916a-482bb4facaa0', '2025-01-05 20:00:00'),
                                                          (4, 1, '6cec5c18-d60b-4372-916a-482bb4facaa0', '2025-12-24 17:00:00'),
                                                          (5, 2, '6f207e95-5400-471f-a933-d01d817b0608', '2025-12-23 16:00:00'),
                                                          (6, 2, '6cec5c18-d60b-4372-916a-482bb4facaa0', '2025-12-23 16:00:00');

INSERT INTO autographs (id, stand_id, user_id, begin_date, duration) VALUES
                                                                         (1, 4, 'a81699b9-94d1-4f72-9df4-1588dc1b2cc5', '2025-12-23 18:00:00', 120),
                                                                         (2, 4, 'a81699b9-94d1-4f72-9df4-1588dc1b2cc5', '2025-12-23 21:00:00', 60),
                                                                         (3, 5, 'a81699b9-94d1-4f72-9df4-1588dc1b2cc5', '2025-12-27 21:00:00', 120);

INSERT INTO reservations (id, user_id, date, stand_id, type) VALUES
                                                                 (1, 'c38acd4c-d6fc-4a19-bd24-98a7c18fa414', '2025-12-23 14:00:00', 1, 'film'),
                                                                 (2, 'c38acd4c-d6fc-4a19-bd24-98a7c18fa414', '2025-12-23 14:00:00', 4, 'autograph');

INSERT INTO film_reservations (reservation_id, projection_id) VALUES
    (1, 1);

INSERT INTO stand_reservation_requests (id, request_date, stand_id, user_id, status) VALUES
                                                                                         (1, '2025-12-23 14:00:00', 4, 'f1b92326-1e85-49af-8cf7-2270e2e725e8', 'pending'),
                                                                                         (2, '2025-12-23 17:00:00', 3, 'f1b92326-1e85-49af-8cf7-2270e2e725e8', 'pending');

INSERT INTO comments_golden_book (id, user_id, content, date) VALUES
                                                                  ('1a8d8f63-3ef8-4c5f-a482-97afaa1c3d93', 'c38acd4c-d6fc-4a19-bd24-98a7c18fa414', 'Super festival, j''ai adoré les projections.',      '2023-05-05 14:32:00'),
                                                                  ('c4b708ef-47b2-47c0-a548-4bb9dcbe8b92', 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Organisation impeccable et invités prestigieux.',  '2023-05-06 10:12:00'),
                                                                  ('f15c8bfa-2e11-4d44-86cf-dbc665bf0d59', 'fa1b7ea7-c35c-488d-b7e1-7fb893b97590', 'Ambiance incroyable, j''ai passé un super moment.', '2023-05-07 18:44:00');

INSERT INTO provider_requests (id, name, login, password, email, email2, droit, date) VALUES
    ('11111111-1111-1111-1111-111111111111', 'prestatest', 'prestatest', '$2b$10$cDBTIciOleUTBMyrox0ZouQsmCipWI8.JtzwCc1VN/njj35Qv44Mi', 'prestatest@prestatest.com', 'prestatest@prestatest.com', 1, '2023-05-02 23:59:59');

INSERT INTO films_request (id, title, director_id, release_date, duration, description, poster) VALUES
    ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'Proposition', 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', '2023-10-20', 120, 'C''est une proposition comme une autre', '');

INSERT INTO films_genres_request (film_id, genre_id) VALUES
                                                         ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 1),
                                                         ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 2);

INSERT INTO votes_category (id, category_name) VALUES
                                                   ('9f1c8b2e-7d3a-4c6f-9e2b-5a8d4f1c3b7e', 'Meilleur scénario'),
                                                   ('3a6d9e1f-2b7c-4f8a-9c5d-7e3a1f6b9d2c', 'Meilleurs effets visuels'),
                                                   ('d4f1c3b7-e9a2-4c6f-8b2e-9f1c8b2e7d3a', 'Prix du public');

INSERT INTO votes (id, user_id, film_id, category_id) VALUES
                                                          ('b8e2f1c4-7d3a-4c9b-8f1e-2d7c5a9b3e6f', 'c38acd4c-d6fc-4a19-bd24-98a7c18fa414', 'a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', '3a6d9e1f-2b7c-4f8a-9c5d-7e3a1f6b9d2c'),
                                                          ('e1f7d4c2-a9b3-4c9a-1b7e-2d3f5a8c9e6b', 'c38acd4c-d6fc-4a19-bd24-98a7c18fa414', 'a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', 'd4f1c3b7-e9a2-4c6f-8b2e-9f1c8b2e7d3a');

INSERT INTO votes_score (film_id, category_id, total_score) VALUES
                                                                ('a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', '3a6d9e1f-2b7c-4f8a-9c5d-7e3a1f6b9d2c', 1),
                                                                ('a7b8c9d0-1e2f-4a3b-5c6d-7e8f9a0b1c2d', 'd4f1c3b7-e9a2-4c6f-8b2e-9f1c8b2e7d3a', 1);