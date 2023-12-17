export type ArticleBase = {
    id: string,
    paragraphs: string[],
    postDay: number,
    postMonth: number,
    postYear: number,
    title: string
};

export type ArticleExtended = ArticleBase & { timeOrdering: number };