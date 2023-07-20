import React, { useEffect, useState } from 'react';
import { L } from './StyledPlaceCards';
import { useMutation, useQueryClient } from 'react-query';
import { handleLike } from '../../../api/likes';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../../../firebase';
import { onAuthStateChanged } from '@firebase/auth';

const PlaceCards = () => {
  const data = useSelector((state) => state.places);
  const navigate = useNavigate(null);
  const queryClient = useQueryClient();
  const likeMutation = useMutation(handleLike, {
    onSuccess: () => {
      queryClient.invalidateQueries('placeData');
    }
  });

  // const currentUser = 'user';
  const currentUser = auth.currentUser;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  }, []);
  console.log('curUser', currentUser);

  return (
    <L.Wrap>
      {data.map((place, idx) => {
        return (
          <div
            key={idx}
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
              <div className="like-box">
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
              </div>
            </div>
          </div>
        );
      })}
    </L.Wrap>
  );
};

export default PlaceCards;
