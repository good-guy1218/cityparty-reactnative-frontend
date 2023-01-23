import { SETUSER, SETUSERPROFILE, SETSOCKETINSTANCE } from '../constants';
export function setUser(user) {
    return {
        type: SETUSER,
        payload: user
    }
}

export function setUserProfile(userProfile) {
    return {
        type: SETUSERPROFILE,
        payload: userProfile
    }
}

export function setSocketInstance(socketIns) {
    return {
        type: SETSOCKETINSTANCE,
        payload: socketIns
    }
}