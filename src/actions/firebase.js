export function initFirebase(firebaseApp) {
    return {
        type: 'INIT_FIREBASE',
        firebaseApp
    }
}

export function loginFirebase() {
    return {
        type: 'LOG_IN',
    }
}
export function logoutFirebase() {
    return {
        type: 'LOG_OUT',
    }
}