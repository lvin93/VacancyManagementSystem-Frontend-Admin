export interface Question{
    answers:Answer[]
    id: number,
    difficultyLevel: number,
    questionText: string,
    vacancyId: number
}


export interface Answer{
    id:number,
    answerText:string,
    questionId:number
}