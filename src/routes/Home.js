import { useEffect, useState } from "react";
import Movie from "../components/Movie";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [orderBy, setOrderBy] = useState("desc");
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const limit = 10;

  function Gennres() {
    const genreChange = (event) => {
      setGenre(event.target.value);
    }
    return (
      <select onChange={genreChange} value={genre}>
        <option value="">전체</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Animation">Animation</option>
        <option value="Biography">Biography</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>	
        <option value="Documentary">Documentary</option>
        <option value="Drama">Drama</option>
        <option value="Family">Family</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Film-Noir">Film Noir</option>
        <option value="History">History</option>	
        <option value="Horror">Horror</option>
        <option value="Music">Music</option>
        <option value="Musical">Musical</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Sport">Sport</option>
        <option value="Superhero">Superhero</option>
        <option value="Thriller">Thriller</option>
        <option value="War">War</option>
        <option value="Western">Western</option>
      </select>
    )
  }
  function SortBy() {
    const sortByChange = (event) => {
      setSortBy(event.target.value);
    }
    return (
        <select onChange={sortByChange} value={sortBy}>
        <option value="rating">별점순</option>
        <option value="date_added">업로드순</option>
        <option value="title">제목순</option>
        <option value="year">연도순</option>
        <option value="download_count">다운로드 건수순</option>
        <option value="like_count">좋아요 순</option>
        </select>
    )
  } 
  function OrderBy() {
    const orderByChange = (event) => {
      setOrderBy(event.target.value);
    }
    return (
      <select onChange={orderByChange} value={orderBy}>
        <option value="desc">내림차순</option>
        <option value="asc">오름차순</option>
      </select>
    )
  }
  function Rating() {
    const ratingChange = (event) => {
      setRating(event.target.value);
    }
    return (
      <select onChange={ratingChange} value={rating}>
        <option value="0">최소별점</option>
        <option value="1">1점</option>
        <option value="2">2점</option>
        <option value="3">3점</option>
        <option value="4">4점</option>
        <option value="5">5점</option>
        <option value="6">6점</option>
        <option value="7">7점</option>
        <option value="8">8점</option>
        <option value="9">9점</option>
      </select>
    )
  }
  function pageUp(inputPage) {
    let nextPage = 0;
    if(inputPage === 0) {
      nextPage = page+1;
    } else {
      nextPage = inputPage;
    }
    if(nextPage <= totalPage) {
      setPage(nextPage);
    } else {
      alert("마지막 페이지 입니다.");
    }
  }
  function pageDown(inputPage) {
    let prevPage = 0;
    if(inputPage === 0) {
      prevPage = page-1;
    } else {
      prevPage = inputPage;
    }
    if(prevPage >= 1) {
      setPage(prevPage);
    } else {
      alert("첫 페이지 입니다.");
    }
  }
  const getMovies = () => {
    // console.log("API RUN");
    let url = "https://yts.mx/api/v2/list_movies.json";
    url += `?genre=${genre}`;
    url += `&sort_by=${sortBy}`;
    url += `&order_by=${orderBy}`;
    url += `&minimum_rating=${rating}`;
    url += `&page=${page}`;
    url += `&limit=${limit}`;
    // console.log(url)
    fetch(url
    ).then((response) => response.json()).then((data) => {
      // console.log(data)
      setMovies(data.data.movies);
      setPage(data.data.page_number);
      let total = Math.round(data.data.movie_count/limit);
      setTotalPage(total);
      setLoading(false);
    });
  }

  useEffect(getMovies, [genre, sortBy, orderBy, rating, page]);

  // console.log("Home Rending");
  return (
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h1>Movie Infomation</h1>
            <Rating />
            <Gennres />
            <SortBy />
            <OrderBy />
            <button onClick={() => pageDown(1)}>[S]</button>
            <button onClick={() => pageDown(0)}>◀</button>
            <span> page[{page}/{totalPage}] </span>
            <button onClick={() => pageUp(0)}>▶</button>
            <button onClick={() => pageUp(totalPage)}>[E]</button>
            <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>year</th>
                    <th>Title</th>
                    <th>Rating</th>
                    <th>Runtime</th>
                  </tr>
                </thead>
                <tbody>
                  {movies.map((movie, index) => (
                    <Movie 
                      key={movie.id}
                      id={movie.id}
                      rownum={(index+1)+((page-1)*limit)}
                      title={movie.title}
                      coverImg={movie.small_cover_image}
                      year={movie.year}
                      runtime={movie.runtime}
                      rating={movie.rating}
                    />
                  ))}
                </tbody>
            </table>
            
          </div>
        )}
      </div>
    );    
}

export default Home;