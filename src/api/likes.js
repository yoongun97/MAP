import { addDoc, collection, deleteDoc, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase';

const handleLike = async (likeData) => {
  if (!likeData.uid) {
    alert('로그인 해주세요!');
  } else {
    const likesCollectionRef = collection(db, 'likes');
    //받아온 likeData의 uid와 placeId가 같은 문서가 있는지 확인하여 있다면 delete, 없다면 add
    const q = query(likesCollectionRef, where('uid', '==', likeData.uid), where('placeId', '==', likeData.placeId));
    const querySnapshot = await getDocs(q);

    const likeDocSnapShot = querySnapshot.docs[0];

    if (likeDocSnapShot?.exists()) {
      await deleteDoc(likeDocSnapShot.ref);
    } else {
      await addDoc(likesCollectionRef, likeData);
    }
  }
};

export { handleLike };
