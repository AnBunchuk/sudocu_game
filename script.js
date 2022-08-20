'use strict'

// const level_1 = {
//     level:1,
//     sticks: ['avto.jpg', '2.jpg', '3.jpg'],
//     fontGame: './fon/6.jpg',
//     stocks: '3',
//     positionStick: [3, 5, 6],
// }


class Sudocu {
    constructor() {
        this.wrapper = document.querySelector('main')
        this.user = this.wrapper.querySelector('.user')
        this.level = this.wrapper.querySelector('.level')
        this.section2 = this.wrapper.querySelector('.stocks')
        this.UlStock = this.section2.querySelector('ul')
        this.stockLi = this.section2.querySelectorAll('li')
        this.section3 = this.wrapper.querySelector('.playing_fields')
        this.UlFields = document.querySelector('.ul_field')
        this.flag = false;
        this.imgTarget;


    }

    ////////// ........ПЕРВОНАЧАЛЬНОЕ РАЗМЕЩЕНИЕ ЭЛЕМЕНТОВ................../////
    // генерим элнменты на складе
    genStock(level) {
        //  изменяем количество мест для елементов li на складе
        this.UlStock.setAttribute('Style', 'grid-template-columns: repeat(' + level.stocks + ', 1fr)');
        // забиваем склад элементами li исходя из уровня игры используя  level.sticks
        level.sticks.forEach(elem => {
            this.UlStock.insertAdjacentHTML('beforeend', '<li class="stock" ><img class="stock" src="./sticker/' + elem + '" alt=" "></li>');
            // выделяем добавленный li
            let allLi = this.UlStock.querySelectorAll('li')
            //  исходя из размера поля добавляем img в выбранный li. Учитываем что по одному елементу на поле добавим за раннее
            let calcImg = level.sticks.length - 1
            while (--calcImg) {
                allLi[allLi.length - 1].insertAdjacentHTML('beforeend', '<img class="stock" src="./sticker/' + elem + '" alt=" ">');
            }
        })
    }
    // генерим игровое поле
    genField(level) {
        // изменяем к-во элементов в квадрате в зависимости от уровня
        this.UlFields.setAttribute('Style', 'grid-template-columns: repeat(' + level.stocks + ', 1fr); grid-template-rows: repeat(' + level.stocks + ', 1fr); width: ' + level.stocks * 5 + 'em; height: ' + level.stocks * 5 + 'em; ');

        // this.UlFields.setAttribute('Style', 'grid-template-columns: repeat(' + level.stocks + ', 1fr); grid-template-rows: repeat(' + level.stocks + ', 1fr)');
        //генерируем нужное количество li
        let count = level.stocks * level.stocks
        let i = 0
        while (i++ < count) {
            this.UlFields.insertAdjacentHTML('beforeend', '<li class="field" value="' + i + '"></li>')
        }

    }
    // генерим случайные элементы по количеству картинок в пределах чисел по количеству li
    genStickRandom(level) {
        let mass = []
        // количество добавляемых картинок равно level.stocks
        while (mass.length < level.stocks) {
            // генерим массив с длиной по количеству картинок и числами по количеству li
            let number = Math.floor(Math.random() * ((level.stocks * level.stocks) - 1) + 1)
            if (mass.indexOf(number) === -1) {
                mass.push(number);
            }
        }
        level.positionStick = mass
        // console.log(level.positionStick)

        return mass
    }
    // добавляем картинки на поле исп. массив genStickRandom для определения в какое место поля 
    addSticker(level) {
        this.fieldLi = this.UlFields.querySelectorAll('li')
        console.log(level.positionStick)
        this.fieldLi.forEach(li => {
            if (level.positionStick.includes(li.value)) {
                // console.log(level.positionStick.indexOf(li.value))
                li.insertAdjacentHTML('beforeend', '<img src="./sticker/' + level.sticks[level.positionStick.indexOf(li.value)] + '" alt=" ">')
            }
        })
    }
    // добавляем всем картинкам на поле атрибут драгабл draggable, 
    // чтобы в момент начала движение не перехватывал обработчик браузера
    addDraggableImg() {
        let imgDrag = document.querySelectorAll('img')
        imgDrag.forEach(img => {
            img.setAttribute('draggable', 'false')
        })

    }


    //////////////////....................ПЕРЕТАКСИВАНИЕ.................//////////////////////////
    mouseDown() {
        this.wrapper.addEventListener('mousedown', (event) => {
            this.imgTarget = event.target;
            let attribute = this.imgTarget.classList.contains('stock')
            console.log(attribute)
            if (attribute) {
                this.flag = true;


                console.log(this.imgTarget)
            }

        })
    }
    mouseMove() {
        this.wrapper.addEventListener('mousemove', (event) => {
            // let img = el.target

            if (this.flag) {
                // console.log(event.target)
                this.imgTarget.style.position = 'absolute';
                this.imgTarget.style.left = event.pageX + 'px';
                this.imgTarget.style.top = event.pageY + 'px';
                this.imgTarget.style.transform = 'translate(-50%, -50%)';

            }
        })
    }
    mouseUp() {
        this.wrapper.addEventListener('mouseup', (el) => {
            console.log(el.target); 
            this.flag = false;
            let point = document.elementsFromPoint(el.clientX, el.clientY)
            console.log(point)
            this.imgTarget.removeAttribute('style')
            point[1].append(el.target)


        })
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    init() {
        console.log(this)
        this.genStock(level_1)
        this.genField(level_1)
        this.genStickRandom(level_1)
        this.addSticker(level_1)
        this.addDraggableImg()
        this.mouseDown()
        this.mouseMove()
        this.mouseUp()


    }
}