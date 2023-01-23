import { Platform,Dimensions} from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const API_URL = Platform.OS === 'ios' ? 'https://nodejsclusters-56584-0.cloudclusters.net/api' : 'https://nodejsclusters-56584-0.cloudclusters.net/api';
//export const API_URL = Platform.OS === 'ios' ? 'https://citypartyapi.herokuapp.com/api' : 'https://citypartyapi.herokuapp.com/api';
//export const API_URL = Platform.OS === 'ios' ? 'https://3fec-188-43-136-33.ngrok.io' : 'https://3fec-188-43-136-33.ngrok.io';
export const SOCKET_URL = 'https://nodejsclusters-56601-0.cloudclusters.net';
// export const SOCKET_URL = 'http://192.168.111.181:7131';
// export const SOCKET_URL = 'https://pikselpartysocketserver.herokuapp.com';
export const STORAGE_KEY = "@Cityparty:2021";