import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';
import Splash from './pages/splash/Splash';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Home from './pages/home/Home';
import MyModal from '../components/Modal/MyModal';
const Configuration = createStackNavigator(
  {
    SplashScreen: {
      screen: Splash,
    },
    RegisterScreen: {
      screen: Register,
    },
    LoginScreen: {
      screen: Login,
    },
    HomeScreen: {
      screen: Home,
    },
  },
  {
    headerMode: 'none',
  },
);
const MyDrawer = createDrawerNavigator({
  MainDrawer: Configuration,
});
export default createAppContainer(MyDrawer);
