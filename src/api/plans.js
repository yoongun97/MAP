import { collection, getDocs, where, query, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
/**
 *
 * @param {JSON} data {userId, placeId, day1:[{...tourPlace,text}, ... {...tourPlace,text}], day2:[{tourPlace,text}, ]... dan{} ] }
 */
export const savePlan = async (data) => {
  try {
    await addDoc(collection(db, 'plans'), data);
    return { success: true, message: '작성했습니다.' };
  } catch (e) {
    return { success: false, message: 'db오류가 발생' };
  }
};
export const deletePlan = async (planId) => {
  try {
    const check = window.confirm('정말 삭제하시겠습니까?');
    if (check) {
      await deleteDoc(doc(db, 'plans', planId));
      alert('삭제되었습니다!');
    }
  } catch (e) {
    return { success: false, message: 'db오류가 발생' };
  }
};
export const fetchPlans = async (userId) => {
  try {
    const q = query(collection(db, 'plans'), where('userId', '==', userId));
    const qSnap = await getDocs(q);
    let result = [];
    if (!qSnap.empty) {
      result = qSnap.docs.map((place) => {
        return { planId: place.id, ...place.data() };
      });
      return result;
    }
  } catch (e) {
    console.log(e);
  }
};
