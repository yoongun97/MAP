import { collection, getDocs, where, query, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
/**
 *
 * @param {JSON} data {userId, placeId, day1:[{...tourPlace,text}, ... {...tourPlace,text}], day2:[{tourPlace,text}, ]... dan{} ] }
 */
export const savePlan = async (data) => {
  try {
    await addDoc(collection(db, 'plans'), data);
    return { success: true, message: '여행 계획 작성!!' };
  } catch (e) {
    return { success: false, message: 'savePlan > ', e };
  }
};
export const fetchPlans = async (userId) => {
  try {
    const q = query(collection(db, 'plans'), where('userId', '==', userId));
    const qSnap = await getDocs(q);
    let result = [];
    if (!qSnap.empty) {
      result = qSnap.docs.map((place) => {
        return place.data();
      });
      return result;
    }
  } catch (e) {
    console.log('fetchPlans > ', e);
  }
};
