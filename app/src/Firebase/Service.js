import firebase, { database } from "./Config";

// MODULE Create user
export const createNewUser = (collection, data) => {
  const query = database.collection(collection);
  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

// MODULE Create rooms
export const createNewRoom = (collection, data) => {
  const query = database.collection(collection);
  query.add({
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
