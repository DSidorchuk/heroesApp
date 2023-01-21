
const translateFilter = (filter) => {
    switch (filter) {
        case 'all':
            return 'Все'
        case 'fire':
            return 'Огонь'
        case 'water':
            return 'Вода'
        case 'wind':
            return 'Ветер'
        case 'earth':
            return 'Земля'
        default: return filter
    }
}


export default translateFilter;