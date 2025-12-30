DROP TABLE IF  EXISTS autographs CASCADE;
DROP TABLE IF EXISTS comments_golden_book CASCADE;

DROP TABLE IF EXISTS film_reservations CASCADE;
DROP TABLE IF EXISTS reservations CASCADE;
DROP TABLE IF EXISTS projections CASCADE;
DROP TABLE IF EXISTS films_cast CASCADE;
DROP TABLE IF EXISTS films_genres CASCADE;
DROP TABLE IF EXISTS genres CASCADE;
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
    id         SERIAL PRIMARY KEY,
    user_id    UUID NOT NULL,
    value      DECIMAL(2, 1) CHECK (value BETWEEN 0 AND 5),
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
    commentaire TEXT      NOT NULL,
    date        TIMESTAMP NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS stand_reservation_requests
(
    id            SERIAL PRIMARY KEY,
    request_date  TIMESTAMP NOT NULL,
    stand_id      INT       NOT NULL,
    user_id       UUID      NOT NULL,
    status        VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'rejected')) NOT NULL DEFAULT 'pending',
    FOREIGN KEY (stand_id) REFERENCES stands (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);




-- INSERT
INSERT INTO users (id, name, login, password, email, droit, session, type, nom_photo, description) VALUES
                                                                                                       ('a2b1c8c4-2e53-4c37-a4de-3c4fc35b18fa', '', 'admin', 'admin', 'admin@festival.com', 2, '', '', '', ''),
                                                                                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Martin Scorsese', 'presta', 'presta', 'scorsese@cinema.com', 1, '', 'Réalisateur', 'scorsese.jpg', 'Réalisateur légendaire oscarisé, maître du cinéma américain'),
                                                                                                       ('c38acd4c-d6fc-4a19-bd24-98a7c18fa414', '', 'client', 'client', 'client@mail.com', 0, '', '', 'producteur.jpg', ''),
                                                                                                       ('d4e9116b-e3e8-4e0e-8a3b-6a93e1d6c4f4', '', 'client2', 'client2', 'client2@mail.com', 0, '', '', '', ''),
                                                                                                       ('e55733ef-f3d2-447d-94db-9e3aaef624c1', 'Quentin Tarantino', 'presta2', 'presta2', 'tarantino@pulp.com', 1, '', 'Réalisateur', 'tarantino.jpg', 'Créateur de Pulp Fiction et Kill Bill, style unique et référencé'),
                                                                                                       ('f68ab44a-557b-4d44-b1df-a38f894c2dca', 'Christopher Nolan', 'prestaknaghui V2', 'prestakhnaghui V2', 'nolan@inception.com', 1, '', 'Réalisateur', 'nolan.jpg', 'Génie des films à intrigue complexe et effets visuels innovants'),
                                                                                                       ('a81699b9-94d1-4f72-9df4-1588dc1b2cc5', 'Leonardo DiCaprio', 'cityxl', 'cityxl', 'dicaprio@actor.com', 1, '', 'Acteur', 'dicaprio.jpg', 'Acteur oscarisé, star internationale');
INSERT INTO notes (user_id, value) VALUES
                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 5),
                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 4.5),
                                       ('bb4b684c-0c67-4d19-ac21-b225b3e5c018', 5),
                                       ('c38acd4c-d6fc-4a19-bd24-98a7c18fa414', 3.5),
                                       ('c38acd4c-d6fc-4a19-bd24-98a7c18fa414', 4);
INSERT INTO goodies (id, owner_id, name, price, quantity) VALUES
                                                              (1, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'T-shirt', 20, 37),
                                                              (2, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Tasse', 15, 40),
                                                              (3, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Casquette', 12, 12),
                                                              (4, 'bb4b684c-0c67-4d19-ac21-b225b3e5c018', 'Sweat', 35, 66);
INSERT INTO sizes (id, label) VALUES
                                  (1,'XS'),(2,'S'),(3,'M'),(4,'L'),(5,'XL');

INSERT INTO colors (id, label) VALUES
                                   (1,'Rouge'),(2,'Bleu'),(3,'Vert'),(4,'Noir'),(5,'Blanc');
INSERT INTO goodies_sizes VALUES
                              (1,1),(1,2),(1,3),(1,4),(2,1),(3,4),(4,5);

INSERT INTO goodies_colors VALUES
                               (1,1),(1,2),(2,3),(3,4),(4,5);
INSERT INTO baskets (id, user_id, date, state) VALUES
    ('0f8fad5b-d9cb-469f-a165-70867728950e','c38acd4c-d6fc-4a19-bd24-98a7c18fa414','2025-03-18','wait');

INSERT INTO basket_items VALUES
    ('0f8fad5b-d9cb-469f-a165-70867728950e',1,2,3,1);
INSERT INTO ticket_prices (id, name, price) VALUES
                                                ('93b0592a-922d-4b39-9227-b5f7d84c95ff','adult',11),
                                                ('0936df09-1754-448f-8b09-f6c794c6b251','student',9),
                                                ('9e671b84-9b15-4543-bc2b-bf7892e0247d','child',5);

INSERT INTO tickets (id, user_id, date_from, date_to, price_id) VALUES
    ('4c3bfa40-79f0-4f27-9af0-8bc4f606e0c4','a2b1c8c4-2e53-4c37-a4de-3c4fc35b18fa','2023-05-02','2023-05-02 23:59:59','93b0592a-922d-4b39-9227-b5f7d84c95ff');
INSERT INTO stand_types (id,type) VALUES
                                      (1,'cinema'),(2,'autograph');

INSERT INTO stands (id,name,x,y,width,height,type_id,owner_id) VALUES
                                                                   (1,'cinema 1',25,32,481,620,1,'f68ab44a-557b-4d44-b1df-a38f894c2dca'),
                                                                   (2,'cinema 2',25,670,481,620,1,NULL),
                                                                   (4,'adamdedicace1',886,348,65,164,2,NULL);
INSERT INTO films (id,title,director_id,release_date,duration,description,poster) VALUES
                                                                                      ('6f207e95-5400-471f-a933-d01d817b0608','Killers of the Flower Moon','bb4b684c-0c67-4d19-ac21-b225b3e5c018','2023-10-20',206,'Une sombre histoire de meurtres','killers_moon.jpg'),
                                                                                      ('6cec5c18-d60b-4372-916a-482bb4facaa0','Oppenheimer','f68ab44a-557b-4d44-b1df-a38f894c2dca','2023-07-21',180,'Le père de la bombe atomique','oppenheimer.jpg');
INSERT INTO projections (id,stand_id,film_id,date) VALUES
    (1,1,'6f207e95-5400-471f-a933-d01d817b0608','2025-12-23 14:00:00');

INSERT INTO reservations (id,user_id,date,stand_id,type) VALUES
    (1,'c38acd4c-d6fc-4a19-bd24-98a7c18fa414','2025-12-23 14:00:00',1,'film');

INSERT INTO film_reservations VALUES (1,1);
INSERT INTO autographs (id,stand_id,user_id,begin_date,duration) VALUES
    (1,4,'a81699b9-94d1-4f72-9df4-1588dc1b2cc5','2025-12-23 18:00:00',120);
INSERT INTO comments_golden_book (id,user_id,commentaire,date) VALUES
    ('1a8d8f63-3ef8-4c5f-a482-97afaa1c3d93','c38acd4c-d6fc-4a19-bd24-98a7c18fa414','Super festival, j’ai adoré les projections.','2023-05-05 14:32:00');
