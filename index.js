const card = tour => {
    return `<div class="box-tour">
        <div class="box-tour__img">
            <div class="box-tour__img__delete">
                <i class="fas fa-trash-alt delete"></i>
            </div>
        </div>
        <div class="box-tour__info">
            <div class="box-tour__info__title"><${title}></div>
            <div class="box-tour__info__desc">${desc}
            </div>
            <div class="box-tour__info__place">Place:
                <div class="bold">${place}</div>
            </div>
            <div class="box-tour__info__seats">Seats:
                <div class="bold">${seats}</div>
            </div>
            <div class="box-tour__info__price">Price:
                <div class="bold">${price}$</div>
            </div>
        </div>
    </div>`
};
let tours = [];

class tourAPI {
    static fetch() {
        return fetch('api/tours', {method: 'get'})
            .then(res => res.json())
    }
}

document.addEventListener('DOMContentLoader', () => {
    tourAPI.fetch().then(backendTours => {
        tours = backendTours.concat();
        renderTours(tours);
    })
});

function renderTours(_tours) {
    const $tours = document.quarySelector(#tours)

    if(_tours.length > 0) {

            $posts.innerHTML = _tours.map(tour => card(tour).join(' '));
    }
    else {
        _tours.map(tour => card(tour).join(' '));
            $posts.innerHTML = `<h1>Нет постов</h1>`
    }
}
