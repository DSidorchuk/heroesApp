import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHeroe } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import '../../styles/index.scss';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE
// анимация появления персонажей


const HeroesList = () => {
    const {heroes, heroesLoadingStatus, lastDeletedHeroe, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);
    

    useEffect(() => {
        if(lastDeletedHeroe){
            request(`http://localhost:3001/heroes/${lastDeletedHeroe}`, 'DELETE');
        }
    }, [lastDeletedHeroe])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        const list = activeFilter === 'all' 
            ? arr 
            : arr.filter(item => item.element === activeFilter);

        if (list.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return list.map(({id, ...props}) => {
            return <CSSTransition timeout={500} 
                                  classNames="animate" 
                                  appear>
                        <HeroesListItem key={id} {...props} 
                                        removeHeroe={() => dispatch(deleteHeroe(id))}/>
                   </CSSTransition>

        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            <TransitionGroup component={null}>
                {elements} 
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;