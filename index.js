/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MyPageViewer from './components/pageViewer/MyPageViewer';
import AddNewFood from './routes/pages/restaurants/Modal/AddNewFood';
import SellingMap from './routes/pages/mapConfiguration/SellingMap';
import LocationModal from './routes/pages/restaurants/LocationModal';

AppRegistry.registerComponent(appName, () => App);
