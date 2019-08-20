SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
--

-- --------------------------------------------------------

--
-- Table structure for table `EVENT_REGION`
--

CREATE TABLE `EVENT_REGION` (
  `histEventID` int(11) NOT NULL,
  `region` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `EVENT_REGION`
--

INSERT INTO `EVENT_REGION` (`histEventID`, `region`) VALUES
(2, 90002),
(0, 90007);

-- --------------------------------------------------------

--
-- Table structure for table `HISTORICAL_EVENT`
--

CREATE TABLE `HISTORICAL_EVENT` (
  `histID` int(11) NOT NULL,
  `eventName` varchar(255) NOT NULL,
  `startDate` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `HISTORICAL_EVENT`
--

INSERT INTO `HISTORICAL_EVENT` (`histID`, `eventName`, `startDate`, `description`) VALUES
(1, 'Northridge Earthquake', '1965-01-17', ' A magnitude of 6.7 (Mw),earthquake \r\n                                                                                                  that caused serious infrastructure damage.  '),
(2, 'Watts Riot', '1965-08-11', ' Six days of civil unrest in Watts .   '),
(3, 'Hollyweed Sign Name', '1976-01-01', 'Students altered the sign after drug laws were relaxed.'),
(0, 'Test1', '0000-00-00', 'test1');

-- --------------------------------------------------------

--
-- Table structure for table `LOCATION_EVENTS`
--

CREATE TABLE `LOCATION_EVENTS` (
  `socialID` int(11) NOT NULL,
  `histEventID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `LOCATION_EVENTS`
--

INSERT INTO `LOCATION_EVENTS` (`socialID`, `histEventID`) VALUES
(1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `SOCIAL_LOCATION`
--

CREATE TABLE `SOCIAL_LOCATION` (
  `socialID` int(11) NOT NULL,
  `socialName` varchar(255) NOT NULL,
  `priceRange` varchar(255) DEFAULT '0',
  `businessType` varchar(255) DEFAULT NULL,
  `streetAddress` varchar(255) DEFAULT NULL,
  `zipRegion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `SOCIAL_LOCATION`
--

INSERT INTO `SOCIAL_LOCATION` (`socialID`, `socialName`, `priceRange`, `businessType`, `streetAddress`, `zipRegion`) VALUES
(1, 'Watts Tower', '$', 'Point Of Interest', '555 fake street', NULL),
(2, 'Hollywood Sign', '0', 'Point Of Interest', NULL, 90068),
(3, 'Natural History Museum', '$$', 'Point of Interest', '900 W Exposition Blvd ', 90007);

-- --------------------------------------------------------

--
-- Table structure for table `WEATHER`
--

CREATE TABLE `WEATHER` (
  `weatherID` int(11) NOT NULL,
  `currTemp` float NOT NULL DEFAULT '0',
  `barometricPressure` float DEFAULT '0',
  `windMphs` float DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `WEATHER`
--

INSERT INTO `WEATHER` (`weatherID`, `currTemp`, `barometricPressure`, `windMphs`) VALUES
(1, 86, 39, 8),
(2, 85, 30.12, 7),
(3, 92, 30, 18);

-- --------------------------------------------------------

--
-- Table structure for table `ZIP_CODE`
--

CREATE TABLE `ZIP_CODE` (
  `zipID` int(11) NOT NULL,
  `areaName` varchar(255) DEFAULT NULL,
  `weatherArea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ZIP_CODE`
--

INSERT INTO `ZIP_CODE` (`zipID`, `areaName`, `weatherArea`) VALUES
(90007, 'Mid-City', 0),
(90068, 'Hollywood', 0),
(90403, 'Santa Monica', 3),
(91301, 'Agoura/Oak Park', 0),
(91303, 'Calabasas/Hidden Hills', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `SOCIAL_LOCATION`
--
ALTER TABLE `SOCIAL_LOCATION`
  ADD PRIMARY KEY (`socialID`),
  ADD KEY `socialID` (`socialID`),
  ADD KEY `zipRegion` (`zipRegion`);

--
-- Indexes for table `ZIP_CODE`
--
ALTER TABLE `ZIP_CODE`
  ADD PRIMARY KEY (`zipID`),
  ADD KEY `zipID` (`zipID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `SOCIAL_LOCATION`
--
ALTER TABLE `SOCIAL_LOCATION`
  MODIFY `socialID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `SOCIAL_LOCATION`
--
ALTER TABLE `SOCIAL_LOCATION`
  ADD CONSTRAINT `zipCode_ibfk_1` FOREIGN KEY (`zipRegion`) REFERENCES `ZIP_CODE` (`zipID`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
