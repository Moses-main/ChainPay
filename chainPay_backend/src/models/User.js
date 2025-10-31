import { db } from '../config/firebase.js';

const usersCollection = db.collection('users');

export const createUser = async (userData) => {
    const userRef = await usersCollection.add({
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });
    return { id: userRef.id, ...userData };
};

export const findUserByPhone = async (phoneNumber) => {
    const snapshot = await usersCollection
        .where('phoneNumber', '==', phoneNumber)
        .limit(1)
        .get();

    if (snapshot.empty) {
        return null;
    }

    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
};
