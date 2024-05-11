
export const getCurrentWeekDay = (number: number) => {
    switch (number) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        default:
            return ''
    }
}

export const  getPastWeekDays = (today: string) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayIndex = daysOfWeek.indexOf(today);
    const reorderedDays = [];

    for (let i = 0; i < 7; i++) {
        const index = (currentDayIndex - i + 7) % 7;
        reorderedDays.push(daysOfWeek[index]);
    }

    return reorderedDays;
}