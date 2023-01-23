import { Platform,Dimensions} from 'react-native';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const API_URL = Platform.OS === 'ios' ? 'API_URL' : 'API_URL';
export const SOCKET_URL = 'SOCKET_URL';
export const STORAGE_KEY = "STORAGE_KEY";