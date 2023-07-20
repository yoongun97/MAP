import { collection, getDocs, where, query, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const getPlaceData = async () => {
  const placesRef = collection(db, 'places');
  const querySnapshot = await getDocs(placesRef);
  const placePromises = querySnapshot.docs.map(async (document) => {
    const likesCollectionRef = collection(db, 'likes');
    const q = query(likesCollectionRef, where('placeId', '==', document.id));
    const likesDocSnapShot = await getDocs(q);
    const likedUsers = likesDocSnapShot.docs.map((document) => document.data().uid);
    const likesCount = likesDocSnapShot.size;

    return {
      id: document.id,
      likes: likesCount,
      likedUsers,
      ...document.data()
    };
  });

  const places = await Promise.all(placePromises);

  return places;
};

const getDetailPlaceData = async (id) => {
  console.log(id);
  const docRef = doc(db, 'places', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return {
      ...docSnap.data()
    };
  } else {
    console.log('No such document!');
  }
};

export { getPlaceData, getDetailPlaceData };
