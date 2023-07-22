import { collection, getDocs, where, query, getDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
/**
 *
 * @param {JSON} data {userId, placeId, day1:[{...tourPlace,text}, ... {...tourPlace,text}], day2:[{tourPlace,text}, ]... dan{} ] }
 */
export const savePlan = async (data) => {
  try {
    await addDoc(collection(db, 'Plans'), data);
  } catch (e) {
    console.log(e);
  }
};
export const fetchPlans = async (userId) => {
  try {
    const q = query(collection(db, 'Plans'), where('userId', '==', userId));
    const qSnap = await getDocs(q);
    let result = [];
    if (!qSnap.empty) {
      result = qSnap.docs.map((place) => {
        return place.data();
      });
      return result;
    }
  } catch (e) {
    console.log(e);
  }
};
