import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import Splash from './pages/splash/Splash';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Home from './pages/home/Home';
import MyModal from '../components/Modal/MyModal';
import Restaurants from './pages/restaurants/Restaurants';
import RestaurantsRegister from './pages/restaurants/RestaurantsRegister';
import RestaurantManagement from './pages/restaurants/RestaurantManagement';
import Menu from '../routes/pages/restaurants/Tabs/Menu';
import Information from '../routes/pages/restaurants/Tabs/Information';
import Menus from './pages/restaurants/Menus';
import EditRestaurantsInformation from './pages/restaurants/EditRestaurantsInformation';
import CategoriesFood from './pages/categories/CategoriesFood';
import SellingMap from './pages/mapConfiguration/SellingMap';
import LocationModal from './pages/restaurants/LocationModal';
import Deliver from './pages/restaurants/Deliver';
import RegisterDeliver from './pages/restaurants/RegisterDeliver';
// const RestaurantsTabs=createBottomTabNavigator({

//   MenuScreen:{
//     screen:Menu,
//   },
//   InformationScreen:{
//     screen:Information
//   }
// })
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
    RestaurantsScreen: {
      screen: Restaurants,
    },
    RestaurantsRegisterScreen: {
      screen: RestaurantsRegister,
    },
    RestaurantsManagementScreen: {
      screen: RestaurantManagement,
    },
    MenusRestaurantScreen: {
      screen: Menus,
    },
    RestaurantEditInformationScreen: {
      screen: EditRestaurantsInformation,
    },
    CategoriesFoodScreen: {
      screen: CategoriesFood,
    },
    SellingMapScreen: {
      screen: SellingMap,
    },
    MapResRegister: {
      screen: LocationModal,
    },
    DeliverScreen: {
      screen: Deliver,
    },
    RegisterDeliverScreen: {
      screen: RegisterDeliver,
    },
  },
  {
    headerMode: 'none',
  },
);
const MyDrawer = createDrawerNavigator({
  MainDrawer: Configuration,
});
export default createAppContainer(Configuration);
