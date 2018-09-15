export const SORT_BY_SCORE = 'SORT_BY_SCORE';
export const SORT_BY_DATE = 'SORT_BY_DATE';

export const sortByScore = () => {
    return {
        type: SORT_BY_SCORE
    }
}

export const sortByDate = () => {
    return {
        type: SORT_BY_DATE
    }
}

export const sortByScoreDesc = (oldList) => {
    const newList = [...oldList];
    newList.sort((a, b) => {
        const aScore = parseInt(a.score) || 0;
        const bScore = parseInt(b.score) || 0;
        return bScore - aScore;
    })

    return newList;
}

export const sortByDateDesc = (oldList, dateFormatter) => {
    const newList = [...oldList];
    newList.sort((a, b) => {
        const aTime = parseInt(dateFormatter(a)) || 0;
        const bTime = parseInt(dateFormatter(b)) || 0;
        return bTime - aTime;
    })

    return newList;
}
