import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
// import loading from './Loader.gif'


const Doc = () => {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = (pageNumber) => {
    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=6&_page=${pageNumber}`)
         .then((response) => setPhotos(photo => [...photo, ...response.data]));
    setLoading(true);
  };
  
  useEffect(() => {
    fetchPhotos(pageNumber);
    //eslint-disable-next-line
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
  }
  
  const pageEnd = useRef();
  let num = 1;
  
  useEffect(() => {
    if(loading){
      const observer = new IntersectionObserver(entries => {
        if(entries[0].isIntersecting){
          num++;
          loadMore();
          if(num>=5){
            observer.unobserve(pageEnd.current);
          }
        }
      },{});
      observer.observe(pageEnd.current);
    }
  },[loading, num])
  
  return (
    <div>
      {photos.map( (photo,index) => 
        <div key={index} className="card">
          <div>
            {photo.id}. {photo.title}
          </div>
          <img src={photo.thumbnailUrl} alt="" />
        </div>
      )}
      {/* <div className='loading'>
        <img src={loading} alt=''/>
      </div>  */}
      <h3>PhotoLength: {photos.length}</h3>
      <button onClick={loadMore} ref={pageEnd}>Load More</button>
    </div>
  );
}

export default Doc;
