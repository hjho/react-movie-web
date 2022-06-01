import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"

function Detail() {
    const {id} = useParams();

    const [isLoading, setLoading] = useState(true);
    const [movie, setMovie] = useState({});

    const getMovie = async() => {
        const json = await (
            await fetch(
                `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
            )
        ).json();
        setMovie(json.data.movie);
        setLoading(false);
    }
    
    useEffect(() => {
        getMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // console.log("Detail Rending:", movie);
    return (
        <div>
            <a href="/react-movie-web/">뒤로 가기</a>
            {
                isLoading ? (
                    <div>
                        <h1>Detail Loading...</h1>
                    </div>
                ) : (
                    <div>
                        <img src={movie.medium_cover_image} alt=""></img>
                        <h1>{movie.title}</h1>
                        <label><b>개봉연도: </b>{movie.year}년</label><br/>
                        <label><b>언어: </b>{movie.language}</label><br/>
                        <label><b>별점: </b>{movie.rating}점</label><br/>
                        <label><b>런닝타임: </b>{movie.runtime}분</label><br/>
                        <label><b>자세한정보: </b><a href={movie.url}>{movie.url}</a></label><br/>
                        <label><b>장르: </b>{movie.genres.toString().replaceAll(",", ", ")}</label><br/>
                        <label><b>다운로드 수: </b>{movie.download_count}건</label><br/>
                    </div>
                )
            }
        </div>
    );
}

export default Detail;