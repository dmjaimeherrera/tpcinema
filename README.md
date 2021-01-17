# tpcinema
Prueba React (Frontend) + Express (Backend)

Aplicacion creada para la reserva de salas de cine. Para visitar la aplicacion no es necesario ser un usuario registrado pero para la reserva si. En el Inicio de la aplicacion se pueden ver 6 peliculas pero en la seccion Peliculas se pueden ver todas las peliculas que existen en el sistema. Para poder Ingresar y/o Registrarse en el sistema se debe visitar la seccion Ingresar donde sale el formulario de acceso. En caso de no tener cuenta, esta la opcion para Registrarse.

Cuando el Usuario se Registra el sistema automaticamente lo Loguea y lo direcciona a la seccion de Peliculas donde sale el boton para hacer la reserva. Un Usuario puede tener multiples Reservas.

La autenticacion de los Usuarios es persistente y se hizo mediante JWT y Cookies en el servidor, no en el navegador (localStorage).

Se utilizo la libreria de Bootstrap para el responsive y los elementos visuales del sistema.

En la carpeta raiz del branch master estan los scripts de Express (Backend) y en la carpeta client los scripts de React (Frontend). Las funciones de Express estan dentro de routes donde estan los endpoint y los queries a la base de datos. Se debe iniciar (npm start) tanto la carpeta raiz como client.

La base de datos es MySQL integrado con Express para los queries. A continuacion la descripcion del motor de base de datos:
Servidor: 127.0.0.1 via TCP/IP
Tipo de servidor: MariaDB
Versión del servidor: 10.1.25-MariaDB - mariadb.org binary distribution
Versión del protocolo: 10
Usuario: root@localhost
Conjunto de caracteres del servidor: UTF-8 Unicode (utf8)

A continuacion los queries para crear la Base de Datos con las respectivas tablas y contenido demo:
-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-01-2021 a las 13:52:36
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
(1, 'Soul', 'soul.jpg', 'Una pelicula de Pixar', '01:45:00', 'Animada', '16:10:00'),
(2, 'Greeland', 'greenland.jpeg', 'Sobre meteoritos', '02:00:00', 'Acción', '18:00:00'),
(3, 'WW 1984', 'ww1984.jpg', '', '01:30:00', 'Acción', '08:20:00'),
(4, 'The Mandalorian', 'mandalorian.jpg', '', '01:25:00', 'Aventura', '16:00:00'),
(5, 'Mulan', 'mulan.jpg', '', '02:15:00', 'Aventura', '17:00:00'),
(6, 'Scooby Doo', 'scooby.jpg', '', '02:00:00', 'Animada', '17:30:00'),
(7, 'The Midnight Sky', 'midnight.jpg', '', '01:45:00', 'Ciencia Ficción', '20:00:00'),
(8, 'Witches', 'witches.jpg', '', '03:00:00', 'Aventura', '17:00:00'),
(9, 'The Batman', 'batman.jpg', '', '02:30:00', 'Aventura', '22:00:00'),
(10, 'Matrix 4', 'matrix.jpg', '', '01:45:00', 'Ciencia Ficción', '18:00:00'),
(11, 'Venom 2', 'placeholder.jpg', 'Durante el largo desarrollo de la película Venom del 2018, se esperaba que el personaje de Carnage apareciera como un antagonista. Durante la preproducción de esa película, el equipo creativo decidió no incluir al personaje para poder centrarse en presentar a los protagonistas, Eddie Brock y Venom.', '03:00:00', 'Ciencia Ficción', '17:15:00'),
(12, 'Escuadrón Suicida 2', 'placeholder.jpg', 'The Suicide Squad (El Escuadrón Suicida o Escuadrón Suicida II en Hispanoamérica) es una próxima película estadounidense de superhéroes basada en el equipo de antihéroes de DC Comics, Escuadrón Suicida. Será distribuida por Warner Bros. Pictures, y está destinada a ser un semi-reinicio y secuela independiente de Escuadrón Suicida (2016), por lo que una parte del elenco original regresan a sus respectivos papeles y será la décima película en el Universo extendido de DC (DCEU).', '03:00:00', 'Aventura', '14:00:00');

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
(1, '14621457', 'Soul', '2', '00:00:00');

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
(4, 010, 75, 'Normal');

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
(2, '14621457', '3172993369', 'jaime@3erojo.com', '123456'),
(3, '53012149', '3107676918', 'ruby@3erojo.com', '123456');

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
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `salas`
--
ALTER TABLE `salas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
