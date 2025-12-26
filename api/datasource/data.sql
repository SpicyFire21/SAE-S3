DROP TABLE IF  EXISTS autographs CASCADE;
DROP TABLE IF EXISTS comments_golden_book CASCADE;
DROP TABLE IF EXISTS autograph_reservations CASCADE;
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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


CREATE TABLE IF NOT EXISTS autograph_reservations
(
    reservation_id INT PRIMARY KEY,
    artist_id      UUID NOT NULL,
    FOREIGN KEY (reservation_id) REFERENCES reservations (id) ON DELETE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES users (id)
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
