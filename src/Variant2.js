import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Variant2 = () => {
  const [photos, setPhotos] = useState([]);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const groupNumber = 5;
  const [itemCount, setItemCount] = useState(groupNumber);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?_limit=100`)
      .then((response) => setPhotos(response.data))
      .then(() => setLoading(true))
  };

  useEffect(() => {
    fetchPhotos();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(loading) {
      addPartVisiblePhotos(itemCount);
    }
    //eslint-disable-next-line
  }, [loading]);

  const addPartVisiblePhotos = (itemCount) => {
    const vp = photos.filter((photo, index) => index >= (itemCount-groupNumber) && index < itemCount)
    setVisiblePhotos(prev => [...prev,...vp]);
    setLoading(false);
    setItemCount(prev => prev + groupNumber);
  };
  
  const pageEnd = useRef();
  useEffect(() => {
    if(loading){
      const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          setLoading(true);
        }
      },{});
      observer.observe(pageEnd.current);
    }
  },[loading])

  return (
    <div className="photo_container">
      {visiblePhotos.map((photo, index) => (
        <div key={index} className="card">
          <div>
            {photo.id}. {photo.title}
          </div>
          <img src={photo.thumbnailUrl} alt="" />
        </div>
      ))}
      <div ref={pageEnd}></div>
    </div>
  );
};

export default Variant2;
