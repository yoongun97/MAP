import { collection, getDocs, where, query, getDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
/**
 *
 * @param {JSON} data {userId, placeId, day1:[{...tourPlace,text}, ... {...tourPlace,text}], day2:[{tourPlace,text}, ]... dan{} ] }
 */
export const savePlans = async (data) => {
  try {
    await addDoc(collection(db, 'Plans'), data);
  } catch (e) {
    console.log(e);
  }
};
export const fetchPlans = async (userId, placeId) => {
  try {
    const q = query(collection(db, 'plans'), where('userId', '==', userId), where('placeId', '==', placeId));
    const qSnap = await getDoc(q);
    if (!qSnap.empty) {
      console.log(qSnap.data());
    }
  } catch (e) {
    console.log(e);
  }
};
