
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetched, setActiveFilter } from '../../actions';
import translateFilter from '../../utilites/translateFilter';

const HeroesFilters = () => {

    const {filters, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const btnClasses = ['btn-outline-dark', 'btn-danger', 'btn-primary', 'btn-success', 'btn-secondary'];

    useEffect(() => {
        request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)));
    }, [])

    const btns = filters.map((filter, i) => {
        const active = filter === activeFilter ? 'active' : '';
        return (
            <button className={`btn ${btnClasses[i]} ${active}`}
                    onClick={() => dispatch(setActiveFilter(filter))}>
                {translateFilter(filter)}
            </button>
        )
    })


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {btns}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;