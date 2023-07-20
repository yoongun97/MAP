import React from 'react';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { L } from './StyledLikedCard';
import { useMutation, useQueryClient } from 'react-query';
import { handleLike } from '../../api/likes';

function LikedCard() {
  const [likedPlaces, setLikedPlaces] = useState([]);
  const currentUser = auth.currentUser.uid;
  //   const params = useParams();
  const navigate = useNavigate;
  const queryClient = useQueryClient();
  const likeMutation = useMutation(handleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('placeData');
    }
  });
  //   const places = useSelector((state) => state.places);
  //   const likedPlaces = places.filter(places.uid)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user.uid);
    });
  }, []);
  console.log('curUser', currentUser.uid);

  useEffect(() => {
    const fetchLikedPlaces = async () => {
      try {
        // 현재 사용자의 uid와 일치하는 문서들을 likes 컬렉션에서 쿼리
        const likedPlacesRef = collection(db, 'likes');
        const q = query(likedPlacesRef, where('uid', '==', currentUser));
        const querySnapshot = await getDocs(q);

        const likedPlaceIds = [];

        // likes 컬렉션에서 가져온 문서들의 placeId를 배열에 저장
        querySnapshot.forEach((doc) => {
          likedPlaceIds.push(doc.data().placeId);
        });

        const fetchedLikedPlaces = [];

        // likes 컬렉션에서 가져온 placeId를 사용하여 places 컬렉션에서 해당 문서들을 쿼리
        for (const placeId of likedPlaceIds) {
          const placeDocRef = doc(db, 'places', placeId);
          const placeDocSnapshot = await getDoc(placeDocRef);

          if (placeDocSnapshot.exists()) {
            fetchedLikedPlaces.push(placeDocSnapshot.data());
          }
        }

        setLikedPlaces(fetchedLikedPlaces);
      } catch (error) {
        console.error('Error fetching liked places:', error);
      }
    };

    fetchLikedPlaces();
  }, [currentUser]);

  return (
    <div>
      <L.Wrap>
        {likedPlaces.map((place) => {
          return (
            <div
              key={place.placeId}
              className="card-container"
              onClick={() => {
                navigate(`/${place.id}`);
              }}
            >
              <div className="img-div">
                <img src={place.imgUrl} alt="이미지"></img>
              </div>
              <div className="info-box">
                <span>
                  {place.placeName}
                  <p>{place.content}</p>
                </span>
                {/* <div className="like-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    onClick={(e) => {
                      e.stopPropagation(); // 이벤트버블링 방지
                      likeMutation.mutate({ placeId: place.id, uid: currentUser });
                    }}
                  >
                    <path
                      d="M10 18.6c-0.3 0-0.6-0.2-0.8-0.4-1.5-1.5-6.4-6.1-6.4-8.7 0-2.5 1.5-4.5 4.2-4.6 1.2 0 3.6 0.2 3.8 2.4C10.4 6.0 13.1 5.0 14.9 5.0c3.0 0 4.5 2 4.5 4.5 0 2.9-4.4 7.1-6.7 8.5C11 19.3 10.3 18.8 10 18.6z"
                      fill={place.likedUsers.includes(currentUser) ? '#ff5c5c' : 'none'}
                      stroke={place.likedUsers.includes(currentUser) ? '#ff5c5c' : 'black'}
                      strokeWidth="0.3"
                    />
                  </svg>
                  <p>{place.likes}</p>
                </div> */}
              </div>
            </div>
          );
        })}
      </L.Wrap>
    </div>
  );
}

export default LikedCard;
