
export const getCurrentWeekDay = (number: number) => {
    switch (number) {
        case 0:
            return 'Sun';
        case 1:
            return 'Mon';
        case 2:
            return 'Tue';
        case 3:
            return 'Wed';
        case 4:
            return 'Thu';
        case 5:
            return 'Fri';
        case 6:
            return 'Sat';
        default:
            return ''
    }
}

export const  getPastWeekDays = (today: string) => {
    console.log(today)
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentDayIndex = daysOfWeek.indexOf(today);
    const reorderedDays = [];

    for (let i = 0; i < 7; i++) {
        const index = (currentDayIndex - i + 7) % 7;
        reorderedDays.push(daysOfWeek[index]);
    }

    return reorderedDays;
}