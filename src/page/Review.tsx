import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IAvailableData, IReviewData } from "../types/types";
import { WroteReviews } from "../component/review/WroteReviews";
import { ReviewAbles } from "../component/review/Reviewables";


export function Review (){
     // 탭 역활 (작성 가능한 후기, 작성한 후기)
     const [isChk,setChk] = useState<boolean>(true);
     // 목록 갯수를 5개로 지정
     const limit = 5;
     // 페이징
     const [page,setPage] = useState<number>(1);
     const offSetList = (page - 1) * limit;
     // 작성한 후기
     const [wroteReviewsData, setWroteReviews] = useState<IReviewData[]>([]);
     // 작성 가능한 후기
     const [reviewAbleData, setReviewAble] = useState<IAvailableData[]>([]);
     // 스크롤 타겟
     const targetRef = useRef(null);
     
     const loadMore = () => {
        setPage((no) => no + 1);
     }
 
     // 작성가능한 리뷰 api
     const getReviewsAble = async () => {
         const { data } = await axios.get("/data/availableData.json");
         setReviewAble(data);
         moreList();
         getWroteReviews();
     }



     // intersection observer 사용 시 문제점
     // 1. 첫 렌더링 시에 onIntersect가 바로 실행되기때문에 데이타를 불러온 다음 실행으로 수정
     const moreList = () => {
        let observer;
         if (targetRef) {
           const onIntersect = async ([entry]) => {
             if (entry.isIntersecting) {
                 loadMore();
             }
           };
           observer = new IntersectionObserver(onIntersect, { threshold: 1 });
           observer.observe(targetRef.current);
         }
         return () => observer && observer.disconnect();
     }

 
     // 작성한 후기 api
     const getWroteReviews = async () => {
         const { data } = await axios.get("/data/reviewData.json");
         setWroteReviews(data);
     }
 
 
     useEffect(()=>{
         getReviewsAble();
     },[])

     
    
    return(
        <Section>
            <ReviewTitle>후기관리</ReviewTitle>
            <PageUl>
                <PageLi addOn={isChk} onClick={()=> {
                    setChk(true)
                    setPage(1)
                }}>
                    작성가능 후기({reviewAbleData.length})
                </PageLi>
                <PageLi addOn={!isChk} onClick={()=> {
                    setChk(false)
                    setPage(1)
                }}>
                    작성한 후기({wroteReviewsData.length})
                </PageLi>
            </PageUl>

            {
                isChk ? (
                    <Article>
                        {
                            reviewAbleData.slice(0, offSetList + limit).map((item)=>(
                                <ReviewAbles key={item.seq} item={item}/>
                            ))
                        }

                        <NoticeType2>
                            고객님의 이용후기를 사진으로 <br />
                            다양하게 표현해 보세요!
                        </NoticeType2>

                        <NoticeType1>
                            <img src="/images/etc/caution_line_2R_16.svg" />
                            서비스 이용과 무관하거나 저작권 침해, 욕설, 광고, 음란, 불법적인 후기는 통보 없이 삭제 및 적립 혜택이 회수 될 수 있습니다.
                        </NoticeType1>
                        
                    </Article>
                ) : (
                    <Article>
                        {
                            wroteReviewsData.slice(0, offSetList + limit).map((item)=>(
                                <WroteReviews key={item.seq} item={item}/>            
                            ))          
                        }
                    </Article>
                )
            }
           
           <div ref={targetRef}  className="targetBlang" />
        </Section>    
    );
}



const Article = styled.article`
    @media screen and (max-width: 1044px) {
        padding:0px 20px;
    } 
`;


export const Section = styled.section`
    padding:53px 43px;
    width:1045px;
    background:#fff;
    @media screen and (max-width: 1044px) {
        width: 100%;
        padding:30px 0px;
    }    
`;

export const ReviewTitle = styled.h2`
    font-size:2.4rem;
    padding-bottom:20px;
    border-bottom:1px solid #000;
    line-height:34px;
    font-weight:500;
    @media screen and (max-width: 1044px) {
        padding:0px 20px 20px;
    } 
`;

const PageUl = styled.ul`
    display:flex;
    margin-top:24px;
    margin-bottom: 54px;
    gap: 58px;
    @media screen and (max-width: 1044px) {
        justify-content: center;
    }  
`;

const PageLi = styled.li<{addOn:boolean}>`
    font-size:1.6rem;
    font-weight:500;
    line-height:30px;
    color:${props => props.addOn ? "#232323" : "#D8DEE5"};
    cursor: pointer;
`;

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




const NoticeType2 = styled.p`
    color: #BEC2C8;
    font-size: 2rem;
    line-height: 2.9rem;
    font-weight:500;
    text-align: center;
    margin-top:7px;
    margin-bottom:72px;
`;


const NoticeType1 = styled.p`
    background: #F8F9FB;
    border-radius: 4px;
    padding: 10px;
    color: #5E5E5E;
    font-size: 1.3rem;
    line-height: 1.9rem;
    font-weight:400;
    display: flex;
    align-items: center;
    img{
        margin-right: 6px;
    }
`;
