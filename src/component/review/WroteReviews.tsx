import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IReviewData } from "../../types/types";



type Iprops = {
    item : IReviewData
}

export function WroteReviews ({item} : Iprops){
    const [commentMore, setCommentMore] = useState<boolean>(true);
    const [commentAdminMore, setCommentAdminMore] = useState<boolean>(true);

    return(
        <div>
           <ReviewProductContainer>
                <ReviewProductImgBox>
                    <Link to="">
                        <img src={item.product.hostImage} width="80" height="80"  />
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
                        <strong>작성일자</strong>
                        <p>{item.review.reserveAt}</p>
                    </li>
                </RproductInfoUl>
            </ReviewProductInfoContainer>
            

            <UserComment chkLine={commentMore}>
                <p>
                    작성한 후기
                    <span><img src="/shereit/images/etc/star1.svg" /> {item.product.rating}</span>  
                    <span><img src="/shereit/images/etc/like.svg" /> {item.product.like}</span>
                    <EtcBox>
                        {
                            item.product.isHostPick && (
                            <HostPick>
                                호스트 PICK
                            </HostPick>
                            )
                        }
                        <ArrowBtn onClick={()=> setCommentMore((prev)=>!prev)}>
                            {
                                Boolean(item.product.isHostPick) === true ? (
                                    commentMore ? <img src="/shereit/images/etc/arrowTop.svg"/> : <img src="/shereit/images/etc/arrowBottom.svg"/>
                                ) :(
                                    commentMore ? <img src="/shereit/images/etc/arrowBottom.svg"/> : <img src="/shereit/images/etc/arrowTop.svg"/>
                                )    
                            }
                        </ArrowBtn>
                    </EtcBox>
                </p>

                {
                    Boolean(item.product.isHostPick) === true ? (
                        commentMore ? 
                            <ReviewUCommentBox>
                                {item.review.review}
                            </ReviewUCommentBox>
                        : ""
                    ) : (
                        commentMore ? 
                        "" :
                            <ReviewUCommentBox>
                                {item.review.review}
                            </ReviewUCommentBox>
                    )
                }
                
            </UserComment>

            <AdminComment chkLine={commentAdminMore}>
                <p>
                    판매자 답변
                    <ArrowBtn onClick={()=> setCommentAdminMore((prev)=>!prev)}>
                        {
                            Boolean(item.product.isHostPick) === true ? (
                                commentAdminMore ? <img src="/shereit/images/etc/arrowTop.svg"/> : <img src="/shereit/images/etc/arrowBottom.svg"/>
                            ) :(
                                commentAdminMore ? <img src="/shereit/images/etc/arrowBottom.svg"/> : <img src="/shereit/images/etc/arrowTop.svg"/>
                            ) 
                        }

                    </ArrowBtn>
                </p>

                {
                    Boolean(item.product.isHostPick) === true ? (
                        commentAdminMore ? 
                            <ReviewACommentBox>
                                <strong>{item.product.hostName}</strong>
                                {item.review.reply}
                            </ReviewACommentBox>
                        : ""
                    ) : (
                        commentAdminMore ? 
                        "" :
                            <ReviewACommentBox>
                                <strong>{item.product.hostName}</strong>
                                {item.review.reply}
                            </ReviewACommentBox>
                    )
                }        
            </AdminComment>
        </div>
    );
}

const ReviewProductContainer = styled.div`
    display: flex;
    margin-bottom: 2.4rem;
`;

const ReviewProductImgBox = styled.div`
    img{
        width: 130px;
        height: 97px;
        border-radius: 4px;
    }
`;

const ReviewProductName = styled.div`
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


const UserComment = styled.div<{chkLine : boolean}>`
    margin-top:18px;
    margin-bottom:24px;
    > p{
        position: relative;
        display: flex;
        align-items: center;
        font-size:1.8rem;
        line-height: 2.6rem;
        font-weight: 500;
        color:#232323;
        padding-left: 18px;
        &::before{
            position: absolute;
            bottom:-13px;
            left:0;
            content: "";
            display: block;
            width: 100%;
            height: 1px;
            background-color: #D8DEE5;
        }
        span:nth-of-type(1){
            margin-left:20px;
            font-size: 1.6rem;
            line-height: 2.3rem;
            font-weight: 700;
            margin-right: 6px;
        }
        span:nth-of-type(2){
            display: flex;
            align-items: center;
            font-size: 1.2rem;
            line-height: 1.6rem;
            font-weight: 500;
            color: #AEAEAE;
            background: #ECECEC;
            border: 1px solid #ECECEC;
            border-radius: 18px;
            padding:4px 11px;
            text-align: center;
            img {
                margin-right :6px;
            }
        }
    }
`



const AdminComment = styled.div<{chkLine : boolean}>`
    margin-top: 12px;
    margin-bottom: 62px ;
    > p{
        position: relative;
        padding-left: 18px;
        display: flex;
        align-items: center;
        font-size:1.8rem;
        line-height: 2.6rem;
        font-weight: 500;
        color:#232323;
        &::before{
            position: absolute;
            bottom:-14px;
            left:0;
            content: "";
            display: block;
            width: 100%;
            height: 1px;
            background-color: #D8DEE5;
        }
    }
`

const ReviewUCommentBox = styled.div`
    margin-top:12px;
    padding:24px 18px;
    color: #5E5E5E;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.3rem;
    background: #F8F9FB;
    border-top: 1px solid #D8DEE5;
    border-bottom: 1px solid #D8DEE5;
`; 
const ReviewACommentBox = styled.div`
    margin-top:13px;
    border-top:1px solid #D8DEE5;
    border-bottom:1px solid #D8DEE5;
    background-color: #eee;
    padding:24px 18px;
    margin-bottom: 62px;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: #5E5E5E;
    strong{
        display: block;
        font-size: 1.5rem;
        line-height: 2.2rem;
        color:#232323;
        margin-bottom: 19px;
        font-weight: 500;
    }
`; 


const EtcBox = styled.span`
    margin-left: auto;
    display: flex;
    align-items: center;
`;

const HostPick = styled.span`
    color: #F93737;
    border: 1px solid #F93737;
    border-radius: 1px;
    padding: 1px 3.5px 2px;
    font-size:1.2rem !important;
    margin-right: 2.3rem;
`;

const ArrowBtn = styled.button`
    background: transparent;
    border:none;
    outline: none;
    margin-left: auto;
    cursor: pointer;
`;