

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

//Formik X
// Yup X
// Проверка имени (Не меньше 2 букв) X
// Форма из фильтра X
// Отправка в стейт
// Отправка на сервер
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup  from 'yup';
import { v4 as idCreator} from 'uuid';
import translateFilter from "../../utilites/translateFilter";
import { addNewHeroe } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

const HeroesAddForm = () => {

    const {filters, newHeroe} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        if(newHeroe){
            request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHeroe));
        }
    }, [newHeroe]);

    const createHeroe = (value) => {
        const id = idCreator();
        dispatch(addNewHeroe({id, ...value}));
    }

    const options = filters.filter(item => item !== 'all').map(filter => {
        return <option value={filter}>{translateFilter(filter)}</option>
    })

    return (
        <Formik 
            initialValues={
               {
                name: "",
                description: "",
                element: ''
               }
            }
            validationSchema={Yup.object({
                name: Yup.string()
                         .min(2, 'Минимум 2 символа!')
                         .required('Обязательное поле!'),
                description: Yup.string()
                         .min(10, 'Не менее 10 символов')
                         .required('Обязательное поле!'),
                element: Yup.string().required('Обязательное поле!')
            })}
            onSubmit={(values, {resetForm}) => {
                createHeroe(values);
                resetForm();
            }}>

            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        id="name"
                        name="name"  
                        className="form-control"
                        type="text" 
                        placeholder="Как меня зовут?"/>
                </div>
                <ErrorMessage component="div" className="error" name="name"/>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        id="description"
                        name="description" 
                        className="form-control"  
                        style={{"height": '130px'}}
                        as="textarea"
                        placeholder="Что я умею?"/>
                </div>
                <ErrorMessage component="div" className="error" name="description"/>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        id="element" 
                        name="element"
                        className="form-select" 
                        as="select">
                        <option >Я владею элементом...</option>
                        {options}
                    </Field>
                </div>
                <ErrorMessage component="div" className="error" name="element"/>

                <button type="submit" className="btn btn-primary">Создать</button>
             </Form>
        </Formik>
    )
}

export default HeroesAddForm;