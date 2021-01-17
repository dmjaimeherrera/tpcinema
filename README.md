# tpcinema
Prueba React (Frontend) + Express (Backend)

Aplicacion creada para la reserva de salas de cine. Para visitar la aplicacion no es necesario ser un usuario registrado pero para la reserva si. En el Inicio de la aplicacion se pueden ver 6 peliculas pero en la seccion Peliculas se pueden ver todas las peliculas que existen en el sistema. Para poder Ingresar y/o Registrarse en el sistema se debe visitar la seccion Ingresar donde sale el formulario de acceso. En caso de no tener cuenta, esta la opcion para Registrarse.

Cuando el Usuario se Registra el sistema automaticamente lo Loguea y lo direcciona a la seccion de Peliculas donde sale el boton para hacer la reserva. Un Usuario puede tener multiples Reservas.

La autenticacion de los Usuarios es persistente y se hizo mediante JWT y Cookies en el servidor, no en el navegador (localStorage).

Se utilizo la libreria de Bootstrap para el responsive y los elementos visuales del sistema.

En la carpeta raiz del branch main estan los scripts de Express (Backend) y en la carpeta client los scripts de React (Frontend). Las funciones de Express estan dentro de routes donde estan los endpoint y los queries a la base de datos. Se debe iniciar (npm start) tanto la carpeta raiz como client.

La base de datos es MySQL integrado con Express para los queries.\

A continuacion la descripcion del motor de base de datos:\
Servidor: 127.0.0.1 via TCP/IP\
Tipo de servidor: MariaDB\
Versión del servidor: 10.1.25-MariaDB - mariadb.org binary distribution\
Versión del protocolo: 10\
Usuario: root@localhost\
Conjunto de caracteres del servidor: UTF-8 Unicode (utf8)\

A continuacion los queries para crear la Base de Datos con las respectivas tablas y contenido demo:
-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-01-2021 a las 08:44:41
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cinema`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `backup`
--

CREATE TABLE `backup` (
  `id` int(3) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT 'placeholder.jpg',
  `description` text NOT NULL,
  `duration` time NOT NULL,
  `genre` varchar(50) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `backup`
--

INSERT INTO `backup` (`id`, `title`, `image`, `description`, `duration`, `genre`, `time`) VALUES
(13, 'Nueva Película', 'placeholder.jpg', 'Probando', '02:00:00', 'Drama', '21:30:00'),
(14, 'Pelicula de Prueba', 'placeholder.jpg', '', '00:00:00', 'Ciencia Ficción', '00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peliculas`
--

CREATE TABLE `peliculas` (
  `id` int(3) NOT NULL,
  `title` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL DEFAULT 'placeholder.jpg',
  `description` text NOT NULL,
  `duration` time NOT NULL,
  `genre` varchar(50) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `peliculas`
--

INSERT INTO `peliculas` (`id`, `title`, `image`, `description`, `duration`, `genre`, `time`) VALUES
(1, 'Soul', 'soul.jpg', 'Soul es una película animada estadounidense de aventura, drama y comedia dirigida por Pete Docter y producida por Pixar Animation Studios. Narra la historia de un profesor de música que sufre un accidente antes de poder cumplir su sueño de convertirse en un reconocido exponente del jazz, por lo que debe embarcarse en un viaje al más allá para volver a la vida. Cuenta con las voces de Jamie Foxx, Tina Fey, Graham Norton, Questlove, Phylicia Rashad y Angela Bassett.', '01:45:00', 'Animada', '16:10:00'),
(2, 'Greeland', 'greenland.jpeg', 'Greenland (conocida en Latinoamérica como Greenland: El día del fin del mundo) es una película de desastres estadounidense de 2020 dirigida por Ric Roman Waugh y escrita por Chris Sparling. La película está protagonizada por Gerard Butler (quien también coprodujo), Morena Baccarin, Roger Dale Floyd, Scott Glenn, David Denman y Hope Davis. La película sigue a una familia que debe luchar por sobrevivir mientras un cometa destructor de planetas corre hacia la Tierra.vv', '02:00:00', 'Acción', '18:00:00'),
(3, 'WW 1984', 'ww1984.jpg', 'La espera llega a su fin. Este viernes 18 de diciembre es la fecha elegida por Warner para estrenar en España \'Wonder Woman 1984\', la esperada secuela centrada en la superheroína de DC interpretada por Gal Gadot. Y es que en su momento se encumbró muchísimo la primera entrega, a mi juicio una buena película lastrada por su tramo final, pero confiaba en que sus responsables hubiesen aprendido de ella para superarse aquí.', '01:30:00', 'Acción', '08:20:00'),
(4, 'The Mandalorian', 'mandalorian.jpg', 'The Mandalorian1? (también conocida como Star Wars: The Mandalorian) es una serie de televisión web de aventura espacial y space western estadounidense que se estrenó en Disney+ el 12 de noviembre de 2019 en EE. UU. En España, la serie se preestrenó en Mediaset España el 24 de marzo de 2020.2? En Latinoamérica se preestrenó el 15 de noviembre de 2020, en transmisión exclusiva de los episodios 1 y 2 por Fox Channel. Ubicada en el universo de Star Wars creado por George Lucas, la serie se sitúa unos años después de los eventos de Return of the Jedi, y sigue a un solitario pistolero más allá de los alcances de la República. Jon Favreau es el guionista, creador y showrunner de la serie, y es productor ejecutivo junto con Dave Filoni y Colin Wilson.', '01:25:00', 'Aventura', '16:00:00'),
(5, 'Mulan', 'mulan.jpg', 'Mulan es una película estadounidense de acción y aventura dirigida por Niki Caro. Es una adaptación en imagen real (live action) de la película animada homónima de 1998, que a su vez está basada en la leyenda china de Hua Mulan. Es protagonizada por Liu Yifei, con Donnie Yen, Jason Scott Lee, Yoson An, Gong Li y Jet Li en papeles secundarios. Su guion fue escrito por Elizabeth Martin, Lauren Hynek, Rick Jaffa y Amanda Silver, y narra la historia de Mulan, una joven que se alista en el ejército disfrazada de hombre para salvar a su padre y proteger a su nación.', '02:15:00', 'Aventura', '17:00:00'),
(6, 'Scooby Doo', 'scooby.jpg', 'La película está dirigida por Tony Cervone, escrita por Kelly Fremon Craig, y cuenta con las voces de Frank Welker, Zac Efron, Will Forte, Amanda Seyfried, Gina Rodriguez y Tracy Morgan.\n\nEs un reinicio de la serie de películas Scooby-Doo y la primera película en el universo cinemático de Hanna-Barbera. Animada por Reel FX para Warner Animation Group y HBO Max,2?3? la película se estrenó en Estados Unidos el 15 de mayo de 2020 en plataformas digitales de vídeo por demanda, a través Warner Bros.\n\nEn HBO Max se estrenó el 26 de junio de 2020 y el 17 de julio se estrenó en los cines abiertos a nivel mundial.', '02:00:00', 'Animada', '17:30:00'),
(7, 'The Midnight Sky', 'midnight.jpg', 'Cielo de medianoche (título original: The Midnight Sky) es una película estadounidense de ciencia ficción dirigida por George Clooney y basada en la novela Good Morning, Midnight, de Lily Brooks-Dalton. Protagonizada por Clooney, Felicity Jones, David Oyelowo, Tiffany Boone, Demián Bichir, Kyle Chandler y Caoilinn Springall, se estrenó en la plataforma Netflix el 23 de diciembre de 2020.1', '01:45:00', 'Ciencia Ficción', '20:00:00'),
(8, 'Witches', 'witches.jpg', 'Las brujas (título original en inglés: The Witches) es una película de comedia de fantasía oscura de 2020 dirigida por Robert Zemeckis y escrita por Zemeckis, Kenya Barris y Guillermo del Toro. Se basa en la novela homónima de 1983 de Roald Dahl y es la segunda adaptación de la novela en un largometraje, tras la película de 1990 del mismo nombre dirigida por Nicolas Roeg. La película está protagonizada por Anne Hathaway, Octavia Spencer y Stanley Tucci, y está narrada por Chris Rock.', '03:00:00', 'Aventura', '17:00:00'),
(9, 'The Batman', 'batman.jpg', 'The Batman es una película estadounidense de superhéroes dirigida por Matt Reeves y basada en el personaje homónimo creado por Bob Kane y Bill Finger para DC Comics. Su guion fue escrito por Reeves y Peter Craig, y narra los acontecimientos del vigilante Batman durante su segundo año luchando contra el crimen y la corrupción en Gotham City, además de enfrentarse al asesino serial Riddler. Es protagonizada por Robert Pattinson como el personaje titular, así como Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis y Colin Farrell.', '02:30:00', 'Aventura', '22:00:00'),
(10, 'Matrix 4', 'matrix.jpg', 'The Matrix 4 es una película estadounidense de ciencia ficción y acción producida, dirigida y coescrita por Lana Wachowski. Protagonizada por Keanu Reeves, Carrie-Anne Moss, Jada Pinkett Smith, Lambert Wilson y Daniel Bernhardt, esta cuarta entrega de la franquicia Matrix será estrenada el 22 de diciembre de 2021 paralelamente en salas de cine y en la plataforma de streaming HBO Max.1?2?', '01:45:00', 'Ciencia Ficción', '18:00:00'),
(11, 'Venom 2', 'venom-2.jpg', 'Durante el largo desarrollo de la película Venom del 2018, se esperaba que el personaje de Carnage apareciera como un antagonista. Durante la preproducción de esa película, el equipo creativo decidió no incluir al personaje para poder centrarse en presentar a los protagonistas, Eddie Brock y Venom.', '03:00:00', 'Ciencia Ficción', '17:15:00'),
(12, 'Escuadrón Suicida 2', '1610867181737.jpg', 'The Suicide Squad (El Escuadrón Suicida o Escuadrón Suicida II en Hispanoamérica) es una próxima película estadounidense de superhéroes basada en el equipo de antihéroes de DC Comics, Escuadrón Suicida. Será distribuida por Warner Bros. Pictures, y está destinada a ser un semi-reinicio y secuela independiente de Escuadrón Suicida (2016), por lo que una parte del elenco original regresan a sus respectivos papeles y será la décima película en el Universo extendido de DC (DCEU).', '03:00:00', 'Acción', '14:00:00'),
(15, 'Mortal Kombat', '1610868069507.jpg', 'Basada en el popular videojuego Mortal Kombat. El reino de la Tierra corre grave peligro debido a la influencia del Mundo Exterior, Raiden y los héroes de la Tierra solo podrán salir victoriosos logrando la victoria contra las fuerzas del mal en el torneo Mortal Kombat.', '03:00:00', 'Acción', '17:20:00');

--
-- Disparadores `peliculas`
--
DELIMITER $$
CREATE TRIGGER `Backup Peliculas` AFTER DELETE ON `peliculas` FOR EACH ROW INSERT INTO backup (id, title, image, description, duration, genre, time) VALUES (OLD.id, OLD.title, OLD.image, OLD.description, OLD.duration, OLD.genre, OLD.time)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(3) NOT NULL,
  `document` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `room` varchar(10) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `document`, `title`, `room`, `time`) VALUES
(1, '14621457', 'Soul', '003', '16:10:00'),
(2, '14621457', 'Greeland', '003', '18:00:00'),
(3, '53012149', 'The Mandalorian', '003', '16:00:00'),
(4, '53012149', 'The Midnight Sky', '002', '20:00:00'),
(5, '53012149', 'Venom 2', '002', '17:15:00'),
(6, '14621457', 'WW 1984', '001', '08:20:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salas`
--

CREATE TABLE `salas` (
  `id` int(3) NOT NULL,
  `number` int(3) UNSIGNED ZEROFILL NOT NULL,
  `capacity` bigint(3) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `salas`
--

INSERT INTO `salas` (`id`, `number`, `capacity`, `type`) VALUES
(1, 001, 25, 'Normal'),
(2, 002, 5, '3D'),
(3, 003, 25, 'Normal'),
(4, 010, 75, 'Normal'),
(5, 005, 100, 'Imax');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(6) NOT NULL,
  `document` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `document`, `mobile`, `email`, `password`) VALUES
(1, '111222333', '', '', 'root'),
(2, '14621457', '3172993369', 'dm.jaime.herrera@gmail.com', '123456789'),
(3, '53012149', '3107676918', 'ruby@gmail.com', '123456789');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salas`
--
ALTER TABLE `salas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `document` (`document`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `peliculas`
--
ALTER TABLE `peliculas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
