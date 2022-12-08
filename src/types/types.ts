
export interface IAvailableData {
    seq : number;
    review :{
        reserveAt : string;
        deadLine : string;
    };
    product : {
        hostName : string;
        hostImage : string;
        spaceName : string;
        productName : string;
        productType : string;
    }
}

export interface IReviewData{
    seq: number;
    review: {
        reserveAt: string;
        createAt: string;
        review: string;
        reply: string;
    },
    product: {
        hostName: string;
        hostImage: string;
        spaceName: string;
        productName: string;
        productType: string;
        isHostPick: string;
        rating: number;
        like: number;
    }
}

