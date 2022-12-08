import styled from "styled-components";
import { Link } from "react-router-dom";

export function ReviewAbles ({item}){
    return(
        <div>
            <ReviewProductContainer>
                <ReviewProductImgBox>
                    <Link to="">
                        <img src={item.product.hostImage} />
                    </Link>
                </ReviewProductImgBox>         
                <ReviewProductName>
                    <Link to="">
                        <p>{item.product.hostName}</p>
                    </Link>
                    <span>{item.product.spaceName}</span>
                </ReviewProductName>   
            </ReviewProductContainer>
            
            <ReviewProductInfoContainer>
                <RproductInfoUl>
                    <li>
                        <strong>상품명</strong>
                        <p><span>{item.product.productType}</span>{item.product.productName}</p>
                    </li>
                    <li>
                        <strong>예약일자</strong>
                        <p>{item.review.reserveAt}</p>
                    </li>
                    <li>
                        <strong>작성기한</strong>
                        <p>{item.review.deadLine}</p>
                    </li>
                </RproductInfoUl>
            </ReviewProductInfoContainer>

            <ReviewLink to={`/mypage/productview/apply/${item.seq}`}>
                후기 쓰기
            </ReviewLink>
        </div>
    );
}






export const ReviewProductContainer = styled.div`
    display: flex;
    margin-bottom: 2.4rem;
`;

export const ReviewProductImgBox = styled.div`
    img{
        width: 130px;
        height: 97px;
        border-radius: 4px;
    }
`;

export const ReviewProductName = styled.div`
    margin-left:18px;
    p{
        font-size:1.4rem;
        color:#677294;
        font-weight:500;
    }
    span{
        font-size: 1.6rem;
        line-height: 2.3rem;
        font-weight:700;
        color:#232323;
    }
`;

const ReviewProductInfoContainer = styled.div`
    border:1px solid #ECECEC;
    background: #FCFCFC;
    border-radius: 4px;
`;



const RproductInfoUl = styled.ul`
    padding:15px 31px;
    li{
        margin-top:5px;
        display: flex;
        align-items: center;
        &:nth-of-type(1){
            margin-top:0;
            p{
                font-size:1.4rem;
            }
        }
        strong{
            font-size:1.4rem;
            color: #979797;
            line-height: 20px;
            font-weight: 400;
            min-width: 52px;
        }
        p{
            color: #5E5E5E;
            font-size: 1.2rem;
            margin-left: 14px;
            span{
                background: #0077ED;
                color:#fff;
                padding:2px 4px;
                font-size:1rem;
                line-height: 1.4rem;
                font-weight: 500;
                position: relative;
                top: -1px;
                margin-right:10px;
            }
        }

    }
`;


const ReviewLink = styled(Link)`
    display: block;
    text-align:center;
    color: #677294;
    font-size:1.8rem;
    line-height: 2.6rem;
    padding: 15px 0;
    background: #FFFFFF;
    border: 1px solid #D8DEE5;
    border-radius: 4px;
    margin: 2.4rem 0 5.4rem;
`;