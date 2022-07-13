-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 22, 2019 at 10:30 AM
-- Server version: 5.7.16
-- PHP Version: 7.1.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xradio_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `configs`
--

CREATE TABLE `configs` (
  `id` int(11) NOT NULL,
  `is_full_bg` int(1) NOT NULL DEFAULT '0',
  `ui_top_chart` int(1) NOT NULL DEFAULT '1',
  `ui_genre` int(1) NOT NULL DEFAULT '1',
  `ui_favorite` int(1) NOT NULL DEFAULT '1',
  `ui_themes` int(1) NOT NULL DEFAULT '2',
  `ui_detail_genre` int(1) NOT NULL DEFAULT '1',
  `ui_player` int(1) NOT NULL DEFAULT '1',
  `ui_search` int(1) NOT NULL DEFAULT '1',
  `app_type` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `configs`
--

INSERT INTO `configs` (`id`, `is_full_bg`, `ui_top_chart`, `ui_genre`, `ui_favorite`, `ui_themes`, `ui_detail_genre`, `ui_player`, `ui_search`, `app_type`) VALUES
(1, 0, 4, 5, 4, 3, 4, 3, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `genres`
--

CREATE TABLE `genres` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `isActive` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `genres`
--

INSERT INTO `genres` (`id`, `name`, `img`, `isActive`) VALUES
(1, 'Rap\'s HipHop', 'genre_17511_hiphop.jpg', 1),
(2, 'Ambient', 'genre_94121_ambient.jpeg', 1),
(3, 'Dubstep', 'genre_86053_dubstep.jpg', 1),
(4, 'Deep House', 'genre_61591_deephouse.jpg', 1),
(5, 'Jazz', 'genre_88902_jazz.jpg', 1),
(6, 'Rock', 'genre_79828_rock.jpg', 1),
(7, 'Country', 'genre_32178_country.jpg', 1),
(8, 'Gospel', 'genre_63332_gospel.jpg', 1),
(9, 'RnB Soul', 'genre_44634_rnb.jpg', 1),
(10, 'Pop', 'genre_94764_pop.jpg', 1),
(11, 'Bitch\'s', '', 1),
(12, 'Bitches\\\'s', '', 1),
(13, 'DCM\'s', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `radios`
--

CREATE TABLE `radios` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `tags` text CHARACTER SET utf8 NOT NULL,
  `bitrate` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `type_radio` varchar(255) CHARACTER SET utf8 NOT NULL,
  `source_radio` varchar(255) CHARACTER SET utf8 NOT NULL,
  `link_radio` varchar(255) CHARACTER SET utf8 NOT NULL,
  `user_agent_radio` varchar(255) CHARACTER SET utf8 NOT NULL,
  `url_facebook` varchar(255) CHARACTER SET utf8 NOT NULL,
  `url_twitter` varchar(255) CHARACTER SET utf8 NOT NULL,
  `url_instagram` varchar(255) CHARACTER SET utf8 NOT NULL,
  `url_website` varchar(255) CHARACTER SET utf8 NOT NULL,
  `isFeatured` int(1) NOT NULL DEFAULT '0',
  `isActive` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `radios`
--

INSERT INTO `radios` (`id`, `name`, `tags`, `bitrate`, `img`, `type_radio`, `source_radio`, `link_radio`, `user_agent_radio`, `url_facebook`, `url_twitter`, `url_instagram`, `url_website`, `isFeatured`, `isActive`) VALUES
(1, 'ZOO Digital Radio', 'zoodigital', '64Kb', 'radio_66959_zoo_splash.jpg', 'AAC', 'Shoutcast', 'http://144.140.228.109:9005/listen.pls?sid=1', '', 'https://www.facebook.com/ZooDigitalRadio', 'https://twitter.com/ZooDigitalRadio', '', 'http://www.zoosuperdigi.com', 1, 1),
(2, 'Zetland FM', 'zetland,zetlandfm', '128 Kb', 'radio_10090_Zetland_FM_logo.jpg', 'MP3', 'Shoutcast', 'http://s4.voscast.com:8288/listen.pls?sid=1', '', 'http://www.facebook.com/zetlandfm', 'http://www.twitter.com/zetlandfm', '', 'http://www.zetlandfm.co.uk', 0, 1),
(3, 'XtraFM Costa Brava', 'xtrafm,costa,brava', '128 Kb', 'radio_35469_ZGTBejYD_400x400.jpg', 'MP3', 'Shoutcast', 'http://151.236.53.8:8000/listen.pls?sid=1', '', 'https://www.facebook.com/xtrafmcostabrava/', 'https://twitter.com/xtrafm?lang=en', '', 'http://radio.xtra.fm', 1, 1),
(4, 'Whippet Radio', 'whippe', '128 Kb', 'radio_6242_hGDli5SL_400x400.jpg', 'MP3', 'Shoutcast', 'http://50.7.130.2:7980/listen.pls?sid=1', '', 'https://www.facebook.com/WhippetRadio/', 'https://twitter.com/whippetradio', '', 'https://www.whippetradio.com', 0, 1),
(5, 'Wasze Radio FM', 'wasze', '128 Kb', 'radio_18241_waze_radio.png', 'AAC', 'Shoutcast', 'http://164.132.194.14:8000/listen.pls?sid=1', '', 'https://www.facebook.com/waszeradiofm/', '', '', 'http://www.waszeradiofm.pl', 0, 1),
(6, 'TTRADiO', 'ttradio', '128 Kb', 'radio_71150_ttradio.jpg', 'MP3', 'Shoutcast', 'http://69.143.103.157/listen.pls?sid=1', '', 'https://www.facebook.com/TTTRADiO/', 'https://twitter.com/TTTRADiO', '', 'http://tttradio.net/content/', 0, 1),
(7, 'RFPRADIO G Spot Pleasure', 'ttradio', '128 Kb', 'radio_1412_rfpradio.png', 'MP3', 'Shoutcast', 'http://184.171.163.20:8084/listen.pls?sid=1', '', 'https://www.facebook.com/rfpradio/', 'https://twitter.com/rfpradio/', '', 'http://rfpradio.com', 0, 1),
(8, 'Radio90', 'Radio90', '96 Kb', 'radio_16229_radio90.png', 'MP3', 'Icecast', 'http://streams.radio90.pl:8000/jura_64kbps_stereo.aac', '', 'http://www.facebook.com/pages/Radio-90/169104289807445', 'https://twitter.com/radio90pl', '', 'https://www.radio90.pl/', 1, 1),
(9, 'RADIO ENERGY', 'radioenergy', '128 Kb', 'radio_45235_energy.jpg', 'MP3', 'Icecast', 'http://stream.radioreklama.bg/bgradio.aac.m3u', '', 'https://www.facebook.com/radioenergy/', 'https://twitter.com/radio_energy?lang=en', '', 'http://radioenergy.bg', 1, 1),
(10, 'JAZZGROOVE', 'jazzgroove', '128 Kb', 'radio_69876_jazzgroove.png', 'MP3', 'Shoutcast', 'http://199.180.75.116/listen.pls?sid=1', '', 'https://www.facebook.com/TheJazzGroove/', 'https://twitter.com/thejazzgroove?lang=en', '', 'https://www.jazzgroove.org/', 1, 1),
(11, 'Rock Radio Beograd', 'beograd', '128 Kb', 'radio_56400_oeCpI8ai_400x400.jpg', 'MP3', 'Shoutcast', 'http://109.206.96.95:8025/listen.pls?sid=1', '', 'https://www.facebook.com/rockradiobeograd/', 'https://twitter.com/rockbeograd', '', 'http://rockradio.rs/', 1, 1),
(12, '113FM Big Kickin Country', '113fm,bigkickin', '128 Kb', 'radio_38467_113fm.jpg', 'MP3', 'Shoutcast', 'http://104.200.142.184/1715_128', '', 'https://www.facebook.com/113fmradio/', 'https://twitter.com/113fmradio', '', 'http://www.113.fm/', 1, 1),
(13, 'Omnia.7', 'omnia7', '192 Kb', 'radio_793_104.jpg', 'MP3', 'Shoutcast', 'http://s10.voscast.com:9498/listen.pls?sid=1', '', 'https://www.facebook.com/xtreme104svg/', 'https://twitter.com/Xtreme104SVG', '', 'http://www.x104fm.com', 1, 1),
(14, 'Ambient Sleeping Pill', 'omnia7', '192 Kb', 'radio_40249_ambient_modern.jpg', 'MP3', 'Shoutcast', 'http://163.172.169.217/listen.pls?sid=1', '', 'https://www.facebook.com/modern.ambient.music/', 'https://twitter.com/ambient?lang=en', 'https://www.instagram.com/ambient', 'https://ambientmodern.com/', 1, 1),
(15, 'Deep House Network', 'deephouse', '192 Kb', 'radio_31373_deephousenetwork.jpg', 'AAC', 'Shoutcast', 'http://198.15.94.34:8030/listen.pls?sid=1', '', 'https://www.facebook.com/thedeephousenetwork/', 'https://twitter.com/deephousenetwrk', 'https://instagram.com/deephousenetwrk', 'http://www.deephousenetwork.tv/', 1, 1),
(16, 'Dubstep.fm', 'dubstepfm', '128 Kb', 'radio_15913_dubstepfm.jpg', 'MP3', 'Shoutcast', 'http://50.117.1.60/listen.pls?sid=1', '', 'https://www.facebook.com/dubstepfm', 'https://www.twitter.com/dubstepfm', 'https://instagram.com/dubstepfm', 'http://www.dubstep.fm/', 1, 1),
(17, 'Gospel Radio', 'gospelradio', '320 Kb', 'radio_12859_s5_logo21.png', 'MP3', 'Shoutcast', 'http://94.23.36.180:5093/listen.pls?sid=1', '', 'https://www.facebook.com/gospelstar.autentico', 'https://twitter.com/gospelstar', 'https://instagram.com/gospelstar', 'http://www.gospelstarradio.com/', 0, 1),
(18, 'Bitch\'s', 'test', '156 Kb', '', 'MP3', 'Shoutcast', 'http://37.187.93.104:8292/', '', '', '', '', '', 0, 1),
(19, ' 104.6 RTL', 'Mix', '156 Kb', 'radio_44351_rtl.jpg', 'MP3', 'Shoutcast', 'http://stream.104.6rtl.com/rtl-live/mp3-128', '', '', '', '', '', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `radios_cat`
--

CREATE TABLE `radios_cat` (
  `id` int(11) NOT NULL,
  `radio_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `radios_cat`
--

INSERT INTO `radios_cat` (`id`, `radio_id`, `genre_id`) VALUES
(1, 1, 10),
(2, 2, 10),
(3, 3, 10),
(5, 5, 10),
(6, 6, 1),
(7, 7, 1),
(8, 8, 10),
(9, 9, 10),
(14, 10, 5),
(15, 4, 10),
(16, 11, 6),
(17, 12, 7),
(18, 13, 9),
(19, 14, 2),
(20, 15, 4),
(21, 16, 3),
(22, 17, 8),
(23, 18, 11),
(24, 18, 12),
(25, 19, 10);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL,
  `app_name` varchar(255) NOT NULL,
  `app_email` varchar(255) NOT NULL,
  `app_copyright` varchar(255) NOT NULL,
  `app_phone` varchar(255) NOT NULL,
  `app_website` varchar(255) NOT NULL,
  `app_facebook` varchar(255) NOT NULL,
  `app_twitter` varchar(255) NOT NULL,
  `app_term_of_use` text NOT NULL,
  `app_privacy_policy` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `app_name`, `app_email`, `app_copyright`, `app_phone`, `app_website`, `app_facebook`, `app_twitter`, `app_term_of_use`, `app_privacy_policy`) VALUES
(1, 'XRadio', 'support@gmail.com', 'Your Company', '+84987654321', 'http://www.yourcompany.com', 'https://www.facebook.com/yourcompany', 'https://twitter.com/yourcompany', '<h2><strong>TERMS AND CONDITIONS</strong></h2>\r\n\r\n<p><strong>Introduction</strong></p>\r\n\r\n<p>These Website Standard Terms and Conditions written on this webpage shall manage your use of this website. These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions.</p>\r\n\r\n<p>Minors or people below 12 years old are not allowed to use this Website.</p>\r\n\r\n<p><strong>Intellectual Property Rights</strong></p>\r\n\r\n<p>Other than the content you own, under these Terms, <strong>Your Company&nbsp;</strong>and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>\r\n\r\n<p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>\r\n\r\n<p><strong>Restrictions</strong></p>\r\n\r\n<p>You are specifically restricted from all of the following</p>\r\n\r\n<ul>\r\n	<li>publishing any Website material in any other media;</li>\r\n	<li>selling, sublicensing and/or otherwise commercializing any Website material;</li>\r\n	<li>publicly performing and/or showing any Website material;</li>\r\n	<li>using this Website in any way that is or may be damaging to this Website;</li>\r\n	<li>using this Website in any way that impacts user access to this Website;</li>\r\n	<li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>\r\n	<li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>\r\n	<li>using this Website to engage in any advertising or marketing.</li>\r\n</ul>\r\n\r\n<p>Certain areas of this Website are restricted from being access by you and <strong>Your Company</strong> may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>\r\n\r\n<p><strong>Your Content</strong></p>\r\n\r\n<p>In these Website Standard Terms and Conditions, &ldquo;Your Content&rdquo; shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant <strong>Your Company</strong> a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>\r\n\r\n<p>Your Content must be your own and must not be invading any third-party&rsquo;s rights. <strong>Your Company&nbsp;</strong>reserves the right to remove any of Your Content from this Website at any time without notice.</p>\r\n\r\n<p><strong>No warranties</strong></p>\r\n\r\n<p>This Website is provided &ldquo;as is,&rdquo; with all faults, and <strong>Your Company</strong> express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>\r\n\r\n<p><strong>Limitation of liability</strong></p>\r\n\r\n<p>In no event shall <strong>Your Company</strong>, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. &nbsp;<strong>Your Company</strong>, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>\r\n\r\n<p><strong>Indemnification</strong></p>\r\n\r\n<p>You hereby indemnify to the fullest extent <strong>Your Company</strong> from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>\r\n\r\n<p><strong>Severability</strong></p>\r\n\r\n<p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>\r\n\r\n<p><strong>Variation of Terms</strong></p>\r\n\r\n<p><strong>Your Company</strong> is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>\r\n\r\n<p><strong>Assignment</strong></p>\r\n\r\n<p>The <strong>Your Company</strong> is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>\r\n\r\n<p><strong>Entire Agreement</strong></p>\r\n\r\n<p>These Terms constitute the entire agreement between <strong>Your Company&nbsp;</strong>and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>\r\n', '<h1><strong>Privacy Policy</strong></h1>\r\n\r\n<p>Last updated: 14th July 2016<br />\r\n<br />\r\nThis privacy policy sets out how&nbsp;<strong>Your Company&nbsp;Apps</strong>&nbsp;uses and protects any information that you give.They are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this app, then you can be assured that it will only be used in accordance with this privacy statement.&nbsp;<strong>Your Company</strong>&nbsp;may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.&nbsp;<br />\r\n<br />\r\nThis policy is effective from 14th of July, 2016.</p>\r\n\r\n<h3><strong>What we collect</strong></h3>\r\n\r\n<p>We may collect the following information, we will always try and ask for the minimum amount of data to give you a good experience. Please check the app&nbsp;<strong>Auth Dialog</strong>&nbsp;or when you installed, you can go to&nbsp;<strong>Setting-&gt;Application Manager</strong>&nbsp;and then select&nbsp;<strong>Our Apps</strong>&nbsp;to see exactly what permission the app needs:<br />\r\n-Device information(Country, Device version, Language, Network type)</p>\r\n\r\n<h3><strong>What we do with the information we gather</strong></h3>\r\n\r\n<p>We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:<br />\r\n- Improve App experience<br />\r\n- Improve our products and services.<br />\r\n- We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</p>\r\n\r\n<h3><strong>Security</strong></h3>\r\n\r\n<p>We are committed to ensuring that your information is secure. In order to prevent unauthorised access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>\r\n\r\n<h3><strong>How we use cookies</strong></h3>\r\n\r\n<p>A cookie is a small file which asks permission to be placed on your phone hard drive. Once you agree, the file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences. We use traffic log cookies to identify which pages are being used. This helps us analyse data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>\r\n\r\n<h3><strong>Controlling your personal information</strong></h3>\r\n\r\n<p>You may choose to restrict the collection or use of your personal information by not accepting access to your details in the Auth Dialog box. You can also withdraw permissions by the app to access your data by going to the settings. We will not sell, distribute or lease your personal information to third parties unless we have your permission or are required by law to do so. We may use your personal information to send you promotional information about our own content which we think you may find interesting. You may request details of personal information which we hold about you under the Data Protection Act 1998. A small fee will be payable. If you would like a copy of the information held on you please contact us. If you believe that any information we are holding on you is incorrect or incomplete, please contact us as soon as possible. We will promptly correct any information found to be incorrect.</p>\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `themes`
--

CREATE TABLE `themes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 NOT NULL,
  `grad_start_color` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `grad_end_color` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '0',
  `grad_orientation` int(11) NOT NULL DEFAULT '0',
  `is_single_theme` int(1) NOT NULL DEFAULT '0',
  `isActive` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `themes`
--

INSERT INTO `themes` (`id`, `name`, `img`, `grad_start_color`, `grad_end_color`, `grad_orientation`, `is_single_theme`, `isActive`) VALUES
(1, 'Warm Flame', '', '#ff9a9e', '#fad0c4', 135, 0, 1),
(2, 'Night Fade', '', '#a18cd1', '#fbc2eb', 90, 0, 1),
(3, 'Winter Neva', '', '#a1c4fd', '#c2e9fb', 315, 0, 1),
(4, 'Dusty Grass', '', '#d4fc79', '#96e6a1', 315, 0, 1),
(5, 'Tempting Azure', '', '#84fab0', '#8fd3f4', 315, 0, 1),
(6, 'Ripe Malinka', '', '#f093fb', '#f5576c', 315, 0, 1),
(7, 'Plum Plate', '', '#667eea', '#764ba2', 315, 0, 1),
(8, 'Happy Fisher', '', '#89f7fe', '#66a6ff', 315, 0, 1),
(9, ' Itmeo Branding', '', '#2af598', '#009efd', 270, 0, 1),
(10, 'Mixed Hopes', '', '#c471f5', '#fa71cd', 90, 0, 1),
(11, 'Amour Amour', '', '#f77062', '#fe5196', 90, 0, 1),
(12, 'High Flight', '', '#0acffe', '#495aff', 0, 0, 1),
(13, 'Passionate Bed', 'theme_79076_bg.jpg', '#ff758c', '#ff7eb3', 0, 0, 1),
(14, 'Lady Lips', '', '#ff9a9e', '#fecfef', 90, 0, 1),
(15, 'Deep Blue', '', '#6a11cb', '#2575fc', 0, 0, 1),
(16, 'Star Wine', '', '#b465da', '#ee609c', 0, 0, 1),
(17, 'Happy Acid', '', '#37ecba', '#72afd3', 90, 0, 1),
(18, 'Strong Bliss', '', '#f78ca0', '#fe9a8b', 0, 0, 1),
(19, 'Fly High', '', '#48c6ef', '#6f86d6', 90, 0, 1),
(20, 'Grown Early', '', '#0ba360', '#3cba92', 90, 0, 1),
(21, 'Sharp Blues', '', '#00c6fb', '#005bea', 45, 0, 1),
(22, 'Great Whale', '', '#a3bded', '#6991c7', 45, 0, 1),
(23, 'Teen Notebook', '', '#9795f0', '#fbc8d4', 90, 0, 1),
(24, 'Aqua Splash', '', '#13547a', '#80d0c7', 90, 0, 1),
(25, 'Summer Games', '', '#92fe9d', '#00c9ff', 0, 0, 1),
(26, 'October Silence', '', '#b721ff', '#21d4fd', 135, 0, 1),
(27, 'Eternal Constance', '', '#09203f', '#537895', 90, 0, 1),
(28, 'Amour Amour', '', '#f77062', '#fe5196', 90, 0, 1),
(29, 'Happy Memories', '', '#ff5858', '#f09819', 135, 0, 1),
(30, 'Le Cocktail', '', '#874da2', '#c43a30', 45, 0, 1),
(31, 'River City', '', '#4481eb', '#04befe', 90, 0, 1),
(32, 'SeashoreGet', '', '#209cff', '#68e0cf', 90, 0, 1),
(33, 'Night Sky', '', '#1e3c72', '#2a5298', 90, 0, 1),
(34, 'Plum Bath', '', '#cc208e', '#6713d2', 90, 0, 1),
(35, 'Orange Juice', '', '#fc6076', '#ff9a44', 135, 0, 1),
(36, 'Smart Indigo', '', '#b224ef', '#7579ff', 90, 1, 1),
(37, 'Aqua Guidance', '', '#007adf', '#00ecbc', 90, 0, 1),
(38, 'Sleepless Night', '', '#5271c4', '#eca1fe', 315, 0, 1),
(39, 'Bitch\'s', '', '#cccccc', '#996699', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_avatar` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `user_password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(120) COLLATE utf8_unicode_ci NOT NULL,
  `user_status` int(1) UNSIGNED NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_avatar`, `user_password`, `user_email`, `user_status`) VALUES
(1, 'admin', 'user_90008_img-thing.jpg', '$2y$12$jlyzr3r68gMdqHT3xgNhYOIfQztJ4gWJh..9yI3aV/2XWPH2tiGP2', 'bl911vn@gmail.com', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genres`
--
ALTER TABLE `genres`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `radios`
--
ALTER TABLE `radios`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `radios_cat`
--
ALTER TABLE `radios_cat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `themes`
--
ALTER TABLE `themes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `configs`
--
ALTER TABLE `configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `genres`
--
ALTER TABLE `genres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `radios`
--
ALTER TABLE `radios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `radios_cat`
--
ALTER TABLE `radios_cat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `themes`
--
ALTER TABLE `themes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
