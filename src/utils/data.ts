

export const getWeekDayDetailsIndex = (dataIndex: number) => {
    switch (dataIndex) {
        case 20:
        case 19:
        case 18:
            return 0;
        case 17:
        case 16:
        case 15:
            return 1;
        case 14:
        case 13:
        case 12:
            return 2;
        case 11:
        case 10:
        case 9:
            return 3;
        case 8:
        case 7:
        case 6:
            return 4;
        case 5:
        case 4:
        case 3:
            return 5;
        case 2:
        case 1:
        case 0:
            return 6;
    }
}