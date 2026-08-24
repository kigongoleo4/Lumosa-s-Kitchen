const COLORS = {

    starch: '#E2A73A',
    protein: '#B5502E',
    veg: '#4C6B45',
    extra: '#2E6C86'

};


const CATEGORY = {

    'Meat': 'protein',
    'Rice': 'starch',
    'Potatoes': 'starch',
    'Chapati': 'starch',

    'Peas': 'protein',
    'White Rice': 'starch',
    'Fruit': 'veg',

    'Beans': 'protein',
    'Greens': 'veg',
    'Posho': 'starch',

    'Chicken': 'protein',
    'Macaroons': 'starch',
    'Matooke': 'starch',

    'Fish': 'protein',
    'Sweet Potatoes': 'starch',

    'Soda': 'extra',
    'Cassava': 'starch',
    'Groundnuts': 'protein',
    'Pilau': 'starch'

};


const DAYS = [

    {
        key: 'mon',
        label: 'Mon',
        full: 'Monday'
    },

    {
        key: 'tue',
        label: 'Tue',
        full: 'Tuesday'
    },

    {
        key: 'wed',
        label: 'Wed',
        full: 'Wednesday'
    },

    {
        key: 'thu',
        label: 'Thu',
        full: 'Thursday'
    },

    {
        key: 'fri',
        label: 'Fri',
        full: 'Friday'
    },

    {
        key: 'sat',
        label: 'Sat',
        full: 'Saturday'
    },

    {
        key: 'sun',
        label: 'Sun',
        full: 'Sunday'
    }

];


const MENUS = {

    lunch: {

        label: 'Semester Lunch Menu',

        note:
        'Matooke can be exchanged for Kalo, on request, for subscribers who need it.',

        days: {

            mon: [
                'Beans',
                'Matooke',
                'White Rice',
                'Chapati'
            ],

            tue: [
                'Chicken',
                'Rice',
                'Matooke',
                'Chapati'
            ],

            wed: [
                'Beans',
                'Greens',
                'Matooke',
                'Posho',
                'Rice'
            ],

            thu: [
                'Chicken',
                'Greens',
                'Matooke',
                'Rice',
                'Chapati',
                'Posho'
            ],

            fri: [
                'Peas',
                'Matooke',
                'Cassava',
                'Chapati'
            ],

            sat: [
                'Matooke',
                'Sweet Potatoes',
                'Chapati',
                'Fish',
                'Groundnuts'
            ],

            sun: [
                'Matooke',
                'Pilau',
                'Chapati',
                'Chicken',
                'Soda'
            ]

        }

    },


    supper: {

        label: 'Supper Menu',

        note:
        'Matooke can be exchanged for Kalo, on request, for subscribers who need it.',

        days: {

            mon: [
                'Meat',
                'Rice',
                'Potatoes',
                'Chapati'
            ],

            tue: [
                'Peas',
                'White Rice',
                'Chapati',
                'Fruit'
            ],

            wed: [
                'Beans',
                'Rice',
                'Chapati',
                'Greens',
                'Posho',
                'Fruit'
            ],

            thu: [
                'Chicken',
                'Macaroons',
                'Rice',
                'Fruit'
            ],

            fri: [
                'Peas',
                'Matooke',
                'Rice',
                'Chapati'
            ],

            sat: [
                'Fish',
                'Rice',
                'Sweet Potatoes',
                'Chapati'
            ],

            sun: [
                'Chicken',
                'Rice',
                'Chapati',
                'Matooke',
                'Soda'
            ]

        }

    }

};


let state = {

    meal: 'lunch',
    day: 'mon'

};


const dayTabs =
    document.getElementById('dayTabs');


DAYS.forEach(day => {

    const button =
        document.createElement('button');

    button.textContent =
        day.label;

    button.dataset.day =
        day.key;

    button.addEventListener('click', () => {

        state.day =
            day.key;

        render();

    });

    dayTabs.appendChild(button);

});


document
.querySelectorAll('.toggle button')
.forEach(button => {

    button.addEventListener('click', () => {

        state.meal =
            button.dataset.meal;

        document
        .querySelectorAll('.toggle button')
        .forEach(btn =>
            btn.classList.remove('active')
        );

        button.classList.add('active');

        render();

    });

});


function buildConicGradient(items) {

    const slice =
        360 / items.length;

    const stops = [];

    items.forEach((item, index) => {

        const category =
            CATEGORY[item];

        const color =
            COLORS[category] || '#999';

        const start =
            (slice * index).toFixed(1);

        const end =
            (slice * (index + 1)).toFixed(1);

        stops.push(
            `${color} ${start}deg ${end}deg`
        );

    });

    return `conic-gradient(${stops.join(',')})`;

}


function render() {

    // =========================
    // ACTIVE DAY
    // =========================

    document
    .querySelectorAll('.day-tabs button')
    .forEach(button => {

        button.classList.toggle(
            'active',
            button.dataset.day === state.day
        );

    });


    // =========================
    // CURRENT MENU
    // =========================

    const menu =
        MENUS[state.meal];

    const items =
        menu.days[state.day];

    const dayFull =
        DAYS.find(
            day => day.key === state.day
        ).full;


    // =========================
    // MENU TITLE
    // =========================

    document
    .getElementById('mealLabel')
    .textContent =
        menu.label;

    document
    .getElementById('dayTitle')
    .textContent =
        dayFull;


    // =========================
    // LUNCH / SUPPER PHOTO
    // =========================

    const mealImage =
        document.getElementById('mealImage');

    const mealImageLabel =
        document.getElementById('mealImageLabel');

    if (state.meal === 'lunch') {

        mealImage.src =
            'imageslunch.jpg';

        mealImage.alt =
            "Lumosa's Kitchen Lunch";

        mealImageLabel.textContent =
            '🍛 Lunch';

    } else {

        mealImage.src =
            'imagessupper.jpg';

        mealImage.alt =
            "Lumosa's Kitchen Supper";

        mealImageLabel.textContent =
            '🍽️ Supper';

    }


    // =========================
    // FOOD LIST
    // =========================

    const list =
        document.getElementById('foodList');

    list.innerHTML = '';

    items.forEach(item => {

        const li =
            document.createElement('li');

        const dot =
            document.createElement('span');

        dot.className =
            'dot';

        dot.style.background =
            COLORS[CATEGORY[item]] || '#999';

        li.appendChild(dot);

        li.appendChild(
            document.createTextNode(item)
        );

        list.appendChild(li);

    });


    // =========================
    // NOTE
    // =========================

    document
    .getElementById('extraNote')
    .innerHTML = `

        <div class="note-box">
            ${menu.note}
        </div>

    `;


    // =========================
    // WEEK TABLE
    // =========================

    const tableBody =
        document.getElementById('weekTableBody');

    tableBody.innerHTML = '';

    DAYS.forEach(day => {

        const row =
            document.createElement('tr');

        row.innerHTML = `

            <td>
                <strong>
                    ${day.full}
                </strong>
            </td>

            <td>
                ${menu.days[day.key].join(' · ')}
            </td>

        `;

        tableBody.appendChild(row);

    });


    // =========================
    // DYNAMIC WHATSAPP ORDER
    // =========================

    const orderButton =
        document.getElementById('orderPlateBtn');

    if (orderButton) {

        const mealName =
            state.meal === 'lunch'
                ? 'lunch'
                : 'supper';

        const foodItems =
            items.join(', ');

        const message =
            `Hello Lumosa's Kitchen, I would like to order ${dayFull} ${mealName}: ${foodItems}.`;

        orderButton.href =
            `https://wa.me/256757026879?text=${encodeURIComponent(message)}`;

    }

}


// =========================
// RUN WHEN PAGE LOADS
// =========================

render();