--
-- PostgreSQL database cluster dump
--

\restrict eDvYeXsctYgSaBpl6DxpQOtDacZmaq8qWLuXPaiKbz9er3prQLgQ5ZjbfgIIb8H

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE openmusic;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:jzQUwkUI5vIiH0QxUGdHDw==$3ZEMukMPKVtAi3jO9qI3dE+ak4srn/E2PMM3+FpFg+s=:W6wuiyd1so0l97ne3kI8OTFpfOC9z80OIuMy1oJ4veA=';

--
-- User Configurations
--








\unrestrict eDvYeXsctYgSaBpl6DxpQOtDacZmaq8qWLuXPaiKbz9er3prQLgQ5ZjbfgIIb8H

--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

\restrict yMszWl4CYnLUGExgDaKlkr2ufbEqs8RRk4UryhfIJGQXc7yzF330tuwhrdoyLHq

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\unrestrict yMszWl4CYnLUGExgDaKlkr2ufbEqs8RRk4UryhfIJGQXc7yzF330tuwhrdoyLHq
\connect template1
\restrict yMszWl4CYnLUGExgDaKlkr2ufbEqs8RRk4UryhfIJGQXc7yzF330tuwhrdoyLHq

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\unrestrict yMszWl4CYnLUGExgDaKlkr2ufbEqs8RRk4UryhfIJGQXc7yzF330tuwhrdoyLHq
\connect template1
\restrict yMszWl4CYnLUGExgDaKlkr2ufbEqs8RRk4UryhfIJGQXc7yzF330tuwhrdoyLHq

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict yMszWl4CYnLUGExgDaKlkr2ufbEqs8RRk4UryhfIJGQXc7yzF330tuwhrdoyLHq

--
-- Database "openmusic" dump
--

--
-- PostgreSQL database dump
--

\restrict SfNSzV0XSrdqMUdAsbZuRrCmveXk6Oj7VKdfQbG6IRoiJ587H8pr21eTUhe6hcq

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: openmusic; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE openmusic WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE openmusic OWNER TO postgres;

\unrestrict SfNSzV0XSrdqMUdAsbZuRrCmveXk6Oj7VKdfQbG6IRoiJ587H8pr21eTUhe6hcq
\connect openmusic
\restrict SfNSzV0XSrdqMUdAsbZuRrCmveXk6Oj7VKdfQbG6IRoiJ587H8pr21eTUhe6hcq

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: albums; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.albums (
    id character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    year integer NOT NULL
);


ALTER TABLE public.albums OWNER TO postgres;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    id character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    year integer NOT NULL,
    performer character varying(255) NOT NULL,
    genre character varying(100) NOT NULL,
    duration integer,
    album_id character varying(50)
);


ALTER TABLE public.songs OWNER TO postgres;

--
-- Data for Name: albums; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.albums (id, name, year) FROM stdin;
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (id, title, year, performer, genre, duration, album_id) FROM stdin;
song-RCS9e4ZDHEx9y2z4	Fix You	2008	Coldplay	Pop	120	\N
\.


--
-- Name: albums albums_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.albums
    ADD CONSTRAINT albums_pkey PRIMARY KEY (id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- Name: songs songs_album_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_album_id_fkey FOREIGN KEY (album_id) REFERENCES public.albums(id);


--
-- PostgreSQL database dump complete
--

\unrestrict SfNSzV0XSrdqMUdAsbZuRrCmveXk6Oj7VKdfQbG6IRoiJ587H8pr21eTUhe6hcq

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

\restrict oda7OlEfr7cX3bSoiHCcWKU26BtEBCZGsKyrwhtYLHZ5kpeewREqUSiribfh6eV

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\unrestrict oda7OlEfr7cX3bSoiHCcWKU26BtEBCZGsKyrwhtYLHZ5kpeewREqUSiribfh6eV
\connect postgres
\restrict oda7OlEfr7cX3bSoiHCcWKU26BtEBCZGsKyrwhtYLHZ5kpeewREqUSiribfh6eV

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

\unrestrict oda7OlEfr7cX3bSoiHCcWKU26BtEBCZGsKyrwhtYLHZ5kpeewREqUSiribfh6eV

--
-- PostgreSQL database cluster dump complete
--

