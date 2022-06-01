import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Movie({id, rownum, title, year, coverImg, runtime, rating}) {
    // <td><img src={coverImg} alt={title}/></td>
    return (
        <tr>
            <td>{rownum}</td>
            <td>{(year === 0) ? "-" : year}</td>
            <td><Link to={`/movie/${id}`}>{title}</Link></td>
            <td>{(rating === 0) ? "-" : rating + "점"}</td>
            <td>{(runtime === 0) ? "-" : runtime + "분"}</td>
        </tr>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    rownum: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    coverImg: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    runtime: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
    //genres: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default Movie;