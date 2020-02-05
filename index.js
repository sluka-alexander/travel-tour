const card = tour => {
    return ` <div class="tour-item" id="tours">
            <div class="tour-item__item tour-item__item__category">
                <div class="item-name">Category</div>
                <div>${tour.category}</div>
            </div>
            <div class="tour-item__item tour-item__item__country">
                <div class="item-name">Country</div>
                <div>${tour.country}</div>
            </div>
            <div class="tour-item__item tour-item__item__desc">
                <div class="item-name">Description</div>
                <div>${tour.desc}</div>
            </div>
            <div class="tour-item__item tour-item__item__price">
                <div class="item-name">Price</div>
                <div>${tour.price}</div>
            </div>
            <div class="tour-item__item tour-item__item__date">
                <div class="item-name">Date</div>
                <div>${tour.date}</div>
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
