/* Задания на урок 1:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* Задания на урок 2:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const promoImages = document.querySelectorAll('.promo__adv img'),
          promo = document.querySelector('.promo__bg'),
          promoGenre = promo.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          form = document.querySelector('form.add'),
          formInput = form.querySelector('.adding__input'),
          checkbox = form.querySelector('[type="checkbox"]');   

    form.addEventListener('submit', event => {
        event.preventDefault();
        
        const movie = ( formInput.value.length < 21 ) ? formInput.value : formInput.value.slice(0, 21) + '...',
              favorite = checkbox.checked;
        
        if (movie) {
            if (favorite) {
                console.log('Добавляем любимый фильм');
            }
            
            movieDB.movies.push(movie);
            sortArr(movieDB.movies);
            createMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };

    const makeChanges = () => {
        promoGenre.textContent = 'драма';

        promo.style.backgroundImage = 'url("img/bg.jpg")';
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    function createMovieList(films, parent) {
        parent.innerHTML = "";
        sortArr(films);

        films.forEach((movie, i) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${movie}
                    <div class="delete"></div>
                </li>
            `;  
        });
        
        document.querySelectorAll('.delete').forEach((el, index) => {
            el.addEventListener('click', () => {            
                el.parentElement.remove();

                movieDB.movies.splice(index, 1);

                createMovieList(movieDB.movies, movieList);
            });
        });
    }

    deleteAdv(promoImages);
    makeChanges();
    createMovieList(movieDB.movies, movieList);
});