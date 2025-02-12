export interface Question {
    title: string;
    id: string;
    no: number;
    question: string | null;
    flag: string | null;
    score: number;
    assets?: {
        type: "audio" | "video" | "image" | "zip" | "pdf";
        id: string;
        url: string;
        name: string;
        question_id: string;
        downloadable: boolean;
    }[];
}

export interface submission {
    id: string;
    time: string;
    position: number;
    question_id: string;
    user_id: string;
    question: Question;
}