import styled from "styled-components";
import ReactStars from "react-stars";
import { getByte, getLimitedByteText } from "../../utils/textChk";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReviewTitle, Section } from "../../page/Review";
import axios from "axios";
import { IAvailableData } from "../../types/types";


export function Write (){
    // 네비게이터
    const history = useNavigate();
    const { seq } = useParams<string>();
    const [data,setData] = useState<IAvailableData[]>([]);

    // 서비스 만족도 state
    const [starScore, setStarScore] = useState<number>(0);

    // 구매 후기 약관 동의
    const [agreeChk,setAgreeChk] = useState(false);
    // 리뷰 관련된 state
    const [reviewTxt, setReviewTxt] = useState<string>("");
    const [reviewTxtByteChk, setReviewTxtByteChk] = useState<number>(0);

    // 판매자에게 남기는 state
    const [sellerTxt, setSellerTxt] = useState<string>("");
    const [sellerTxtByteChk, setSellerTxtByteChk] = useState<number>(0);

    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState([]);


    const getReviewableSeq = async () => {
        const {data} = await axios.get("/data/availableData.json");
        const result = data.filter((item)=> item.seq === Number(seq));
        setData(result);
    }

    useEffect(() =>{
        getReviewableSeq()
    },[])
    


    // 서비스 만족도 스타 점수
    const ratingChanged = (newRating) => {
        setStarScore(newRating)
    }

    // 판매자에게 남기는 글 입력
    const handleChangeSeller = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setSellerTxt(e.target.value);
        setSellerTxtByteChk(getByte(e.target.value));
    }


    // 사용 후기 글 입력
    const handleChangeReview = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setReviewTxt(e.target.value);
        setReviewTxtByteChk(getByte(e.target.value));
    }

    // 삭제 버튼
    const handleListDelete = () => {
        if(window.confirm("삭제하시겠습니까?")){
            alert("삭제되었습니다.");
        }
    }


    // 파일 첨부
    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files.length > 5){
            alert("이미지는 최대 5장입니다.");
            return
        }else{
            setImgFile([...imgFile,e.target.files]);
            setImgBase64([]);
            for(var i=0;i<e.target.files.length;i++){
                if (e.target.files[i]) {
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files[i]); 
                    reader.onloadend = () => {                        
                        const base64 = reader.result;
                        if (base64) {
                            //  images.push(base64.toString())
                            var base64Sub = base64.toString()
                            
                            setImgBase64(imgBase64 => [...imgBase64, base64Sub]);
                        }
                    }
                }
            }
        }
    }

    // 이미지 삭제
    const deleteImg = (index) => {
        const imgArr = imgFile.filter((el,idx) => idx !== index);
        const previewimgArr = imgBase64.filter((el, idx) => idx !== index);
        setImgFile([...imgArr]);
        setImgBase64([...previewimgArr]);
    }



    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(starScore < 1){
            alert ("서비스 만족도를 선택해 주세요.");
            return;
        }
        if(reviewTxt.length < 6){
            alert ("사용후기를 작성해 주세요.");
            return;
        }
        if(!agreeChk){
            alert ("구매후기 약관 동의를 체크해 주세요.");
            return;
        }
    }


    const handleCancelWrote = (e) => {
        e.preventDefault();
        if(window.confirm(`리뷰 작성을 취소하시겠습니까?\n작성중인 리뷰 내용은 저장되지 않습니다.`)){
            history(-1);
        }
    }
    
    
    
    
    

    
    return(
        <Section>
            <ReviewTitle>후기 상세</ReviewTitle>
            <ReviewDelBtn>
                <button onClick={handleListDelete}>
                    삭제
                </button>
            </ReviewDelBtn>
            <article>
                <ReviewWroteProductContainer>
                    <WroteProductbox>
                        <WroteProductImgBox>
                            <Link to="">
                                <img src={data[0]?.product.hostImage}  />
                            </Link>
                        </WroteProductImgBox>
                        <ProductName>
                            <Link to="">
                                <p>{data[0]?.product.hostName}</p>
                            </Link>
                            <span>{data[0]?.product.spaceName}</span>
                        </ProductName>
                    </WroteProductbox>
                    <WroteProductUl>
                        <li>
                            <strong>상품명</strong>
                            <p><span>{data[0]?.product.productType}</span>{data[0]?.product.productName}</p>
                        </li>
                        <li>
                            <strong>예약일자</strong>
                            <p>{data[0]?.review.reserveAt}</p>
                        </li>
                    </WroteProductUl>
                </ReviewWroteProductContainer>

                <Form onSubmit={handleSubmit}>
                    <WroteStarTitle>
                        서비스 만족도를 선택해 주세요<span>*</span>
                    </WroteStarTitle>
                    <WroteRegisterBox>
                        <WroteStarBox>
                            <p>선택하세요.</p>
                            <ReactStars
                                count={5}
                                onChange={ratingChanged}
                                value={starScore}
                                size={50}
                                half={false}
                                color1={'#D6D7D9'}
                                color2={'#ffd700'} 
                            />
                            <p>별점은 1점 이상이어야 합니다.</p>
                        </WroteStarBox>
                    </WroteRegisterBox>



                    <WroteSubTitle>
                        사용후기를 작성해 주세요 (6자 이상)<span>*</span>
                    </WroteSubTitle>
                    <WroteRegisterBox>
                        <WroteTextBox>
                            <textarea 
                                placeholder="서비스 이용과 무관하거나 저작권 침해, 욕설, 광고, 음란, 불법적인 후기는 통보 없이 삭제 및 적립 혜택이 회수 될 수 있습니다."
                                onChange={handleChangeReview}
                                value={getLimitedByteText(reviewTxt,"100")}
                            ></textarea>
                            <p>
                                {
                                    reviewTxt.length < 6 ? <span>후기는 6자 이상 입력해주세요.</span> : <span></span>
                                }
                                <span>{reviewTxtByteChk}/1,000</span>
                            </p>
                        </WroteTextBox>
                    </WroteRegisterBox>


                    <WroteSubTitle>
                        포토 첨부 (최대 5장)    
                    </WroteSubTitle>
                    <WroteRegisterBox>
                        <FilesBox>                        
                            {
                                imgBase64.map((item,index) => (
                                        <PreviewImg key={index}>
                                            <img
                                                src={item}
                                            />
                                            <div onClick={()=>deleteImg(index)}>
                                                <img src="/images/etc/deleteIcon.svg" />
                                            </div>
                                        </PreviewImg>
                                        
                                    )
                                ) 
                            }
                        </FilesBox>
                        <FileControlBox>
                            <FileLabel htmlFor="reviewFile">
                                +
                            </FileLabel>
                            <input 
                                type="file"
                                multiple
                                onChange={handleFileChange} 
                                accept="image/*"
                                id="reviewFile"
                            />
                        </FileControlBox>
                        
                    </WroteRegisterBox>

                    <WroteSubTitle>
                        판매자에게 전달하고 싶은 메시지 
                    </WroteSubTitle>
                    <WroteRegisterBox>
                        <WroteTextBox>
                            <textarea 
                                placeholder="서비스 이용과 무관하거나 저작권 침해, 욕설, 광고, 음란, 불법적인 후기는 통보 없이 삭제 및 적립 혜택이 회수 될 수 있습니다."
                                onChange={handleChangeSeller}
                                value={getLimitedByteText(sellerTxt,"100")}
                            ></textarea>
                            <p>
                                <span></span>
                                <span>{sellerTxtByteChk}/1,000</span>
                            </p>
                        </WroteTextBox>    
                    </WroteRegisterBox>
                    
                    <AgreeBox>
                        <label>
                            <input type="checkbox" onChange={()=> setAgreeChk((prev)=>!prev)} checked={agreeChk} />    
                            구매후기 약관 동의 (필수)
                        </label>
                        <div>
                            <img src="/images/etc/arrowRight.svg"  />
                        </div>        
                    </AgreeBox>

                    <NoticeType3>
                        <p>
                            후기 등록 유의사항
                        </p>
                        <ul>
                            <li>
                                <span>·</span> 후기 작성은 사용 완료 후 6 개월 이내 작성이 가능합니다.
                            </li>
                            <li>
                                <span>·</span> 이미지는 최대 5 개까지 등록 가능하며, 이미지 개수와 상관없이 포인트는 1회만 지급됩니다.
                            </li>
                            <li>
                                <span>·</span> 서비스 이용과 무관하거나 욕설, 광고, 음란, 저작권 침해 내용 등록 시 사전협의 없이 삭제할 수 있습니다.
                            </li>
                            <li>
                                <span>·</span> 작성된 후기 및 사진은 쉐어잇 마케팅에 활용될 수 있습니다.
                            </li>
                            <li>
                                <span>·</span> 고객이 등록하는 게시물로 인해 발생하는 분쟁에 대한 민사 형사 행정상 법적 책임은 게시자에 있고, 쉐어잇은 어떠한 책임도 부담하지 않습니다.
                            </li>
                        </ul>
                    </NoticeType3>        
                    
                    <FormFBtnBox>
                        <CancelBtn onClick={handleCancelWrote}>취소</CancelBtn>
                        <SubmitBtn type="submit">저장</SubmitBtn>
                    </FormFBtnBox>        
                </Form>
            </article>
        </Section>
    );
}

const FormFBtnBox = styled.div`
    display: flex;
    margin-top: 72px;
    gap: 18px;
`;

const Form = styled.form`
    @media screen and (max-width: 1044px) {
        padding:0px 20px;
    }   
`;

const CancelBtn = styled.button`
    width: 204px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1px solid #D8DEE5;
    border-radius: 4px;
    font-size: 1.8rem;
    line-height: 2.6rem;
    color: #677294;
    cursor: pointer;
`;

const SubmitBtn = styled.button`
    width: 204px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #0077ED;
    border: 1px solid #D8DEE5;
    border-radius: 4px;
    font-size: 1.8rem;
    line-height: 2.6rem;
    color: #fff;
    cursor: pointer;
`;


const NoticeType3 = styled.div`
    background-color: #F4F5F6;
    padding: 24px 18px;
    margin-top: 14px;
    p{
        font-size:1.5rem;
        line-height: 2.2rem;
        color:#232323;
        font-weight:500;
        margin-bottom: 2.5rem;
    }
    li{
        font-size: 1.4rem;
        color: #5E5E5E;
        line-height: 20px;
        margin-bottom: 1.4rem;
        &:last-child{
            margin-bottom: 0;
        }
    }
    
`;


const AgreeBox = styled.div`
    display: flex;
    align-items: center;
    div{
       margin-left: auto;
       margin-top:13px;
    }
    label{
        margin-left:18px;
        margin-top:13px;
        display: flex;
        align-items: center;
        font-size: 1.6rem;
        line-height: 2.2rem;
        color:#232323;
        cursor: pointer;
    }
    input{
        width: 18px;
        height: 18px;
        margin-right: 13px;
        cursor: pointer;
    }
`;


const FilesBox = styled.div`
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
`;

const FileControlBox = styled.div`
    input{
        width: 0px;
        height: 0px;
        display: none;
    }
`;

const FileLabel = styled.label`
    width: calc(20% - 30px);
    height: calc(20% - 30px);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border:1px dashed #D8DEE5;
    color:#D8DEE5;
    font-size:2rem;
    cursor: pointer;
    &::after{
        display: block;
        content: "";
        padding-bottom: 100%;
    }
`;

const PreviewImgBox = styled.div`
    display: flex;
    
`;

const PreviewImg = styled.div`
    position: relative;
    width: calc(20% - 30px);
    position: relative;
    &::after{
        display: block;
        content: "";
        padding-bottom: 100%;
    }
    > img{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }
    > div{
        position: absolute;
        right:-20px;
        top:-20px;
        z-index: 5;
        cursor: pointer;
        img{
            width: 42px;
            height: 42px;
        }
    }
    
`;


const WroteStarBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    p:nth-of-type(1){
        margin-top:4rem;
        font-size: 1.6rem;
        line-height: 2rem;
        color: #878787;
    }
    p:nth-of-type(2){
        font-size: 1.2rem;
        line-height: 2rem;
        color: #FF7070;
        margin-top:1rem;
    }
`;

const WroteTextBox = styled.div`
    margin-top: 2rem;
    textarea{
        resize: none;
        border: 1px solid #D8DEE5;
        border-radius: 4px;
        padding: 12px 14px;
        width: 100%;
        height: 113px;
        &::placeholder{
            color: #BEC2C8;
            font-size:1.5rem;
            line-height: 2.2rem;
            font-weight: 400;
        }
    }
    p{
        margin-top:8px;
        display: flex;
        font-size:1.2rem;
        span:nth-of-type(1){
            color: #FF7070;
        }
        span:nth-of-type(2){
            color: #AEAEAE;
            margin-left: auto;
        }
    }
`;

const WroteRegisterBox = styled.div`
    border-bottom: 1px solid #EBEFF7;
    padding-bottom: 66px;

    
`;

const WroteStarTitle = styled.p`
    margin-top:66px;
    position: relative;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.4rem;
    color: #232323;
    span {
        position: relative;
        top:0px;
        color:#F93737;
    }
`;

const WroteSubTitle = styled.p`
    margin-top:66px;
    position: relative;
    font-weight: 700;
    font-size: 1.8rem;
    line-height: 2.4rem;
    color: #232323;
    span {
        position: relative;
        top:0px;
        color:#F93737;
    }
`;



const WroteProductUl = styled.ul`
    padding:30px 0px 0px;
    li{
        margin-top:5px;
        display: flex;
        align-items: center;
        &:nth-of-type(1){
            margin-top:0;
            p{
                font-size:1.2rem;
            }
        }
        strong{
            font-size:1.2rem;
            color: #979797;
            line-height: 1.7rem;
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



const ReviewWroteProductContainer = styled.div`
    padding:20px 30px;
    background: #F8F9FB;
`;

const WroteProductbox = styled.div`
    display: flex;
    position: relative;
    &::after{
        position: absolute;
        content: "";
        display: block;
        height: 1px;
        width: 100%;
        left:0;
        top:80px;
        background-color:#D8DEE5;
    }
`;

const WroteProductImgBox = styled.div`
    position: relative;
    img{
        width: 80px;
        height: 60px;
        border-radius: 4px;
    }
`;

const ProductName = styled.div`
    margin-left:18px;
    p{
        font-size:1.4rem;
        color:#878787;
        font-weight:500;
    }
    span{
        font-size: 1.6rem;
        line-height: 2.3rem;
        font-weight:700;
        color:#878787;
    }
`;


const ReviewDelBtn = styled.div`
   display :flex ;
   justify-content: flex-end;
   margin-top:22px;
   margin-bottom: 20px;;
   button{
        color: #677294;
        font-size:1.3rem;
        line-height: 1.9rem;
        font-weight: 500;
        padding:5px 11px;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #D8DEE5;
        cursor: pointer;
   }
`;