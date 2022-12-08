import styled from "styled-components";
import StarRatings from "react-star-ratings";


const StarRateWrap = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 100px 0 0 15px;
    .star_icon {
        display: inline-flex;
        margin-right: 1px;
    }
      
`

function Star({score,count}) {
    return (
        <>
            <StarRatings
                rating={score}
                starRatedColor="#FFC700"
                starDimension="15px"
                starSpacing="0px"
                starEmptyColor="#464646"
                numberOfStars={count} // 보여질 별점 갯수 5개로할지 3개로할지
            />
        </>
        
    )
}

export default Star;

