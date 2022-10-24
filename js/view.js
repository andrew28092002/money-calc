const viewController = (function(){
    
    const DOMstrings = {
        form: '#budget-form',
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        incomeContainer: '#income__list',
        expenseContainer: '#expenses__list',
        expenseLabel: '#expense-label',
        incomeLabel: '#income-label',
        budgetValue: '#budget-value',
        expensePercentLabel: '#expensePercentLabel',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#yearc'
    }

    // Отображение месяца и даты
    function displayMonth(){
        let now, month, year

        monthArr = [
            'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
            'Октябрь', 'Ноябрь', 'Декабрь'
        ]

        now = new Date()
        month = monthArr[now.getMonth()]
        year = now.getFullYear()

        document.querySelector('#month').textContent = month
        document.querySelector('#year').textContent = year
    }

    //  DOM-элементы
    function getDOMStrings(){
        return DOMstrings
    }

    // Пользовательский ввод
    function getInput(){
        return{
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: parseInt(document.querySelector(DOMstrings.inputValue).value)
        }
    }

    // Рендеринг элемента на страницу
    function insertItem(obj, type){
        let containerElement, html

        if (type === 'exp'){
            containerElement = DOMstrings.expenseContainer
            html = `
            <li id="exp-${obj.id}" class="budget-list__item item item--expense">
                <div class="item__title">${obj.descr}</div>
                <div class="item__right">
                    <div class="item__amount">
                        ${formatterNum(obj.value, 'exp')}
                        <div class="item__badge">
                            <div class="item__percent badge badge--dark">
                                15%
                            </div>
                        </div>
                    </div>
                    <button class="item__remove">
                        <img src="./img/circle-red.svg" alt="delete" />
                    </button>
                </div>
            </li>
            `
        } else {
            containerElement = DOMstrings.incomeContainer
            html = `
            <li id="inc-${obj.id}" class="budget-list__item item item--income">
                        <div class="item__title">${obj.descr}</div>
                        <div class="item__right">
                            <div class="item__amount">${formatterNum(obj.value, 'inc')}</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
            </li>
            `
        }
        document.querySelector(containerElement).insertAdjacentHTML('beforeend', html)
    }

    // Очистка полей после ввода
    function clearFields(){
        let inputDescr = document.querySelector(DOMstrings.inputDescription)
        let inputValue = document.querySelector(DOMstrings.inputValue)

        inputDescr.value = ''
        inputDescr.focus()

        inputValue.value = ''
    }
    
    // Удаление элемента со страницы
    function deleteItem(type, id){
        let element = document.querySelector(`#${type}-${id}`)
        element.remove()
    }

    // Форматирование числа
    function formatterNum(num, type){
        num = Math.abs(num)
        num = num.toFixed(2)

        let numSplit = num.split('.')
        let int = numSplit[0]
        let dec = numSplit[1]

        let newInt = ''

        if (int.length > 3){
            for (let i = 0; i < int.length/3; i++){
                newInt = ',' + int.substring(int.length - 3*(i+1), int.length - 3*i) + newInt
            }
        } else if( int == 0){
            newInt = 0
        } else {
            newInt = int
        }

        if (newInt[0] === ','){
            newInt = newInt.substring(1)
        }

        if (type === 'inc'){
            newInt = '+' + newInt
        } else if (type === 'exp'){
            newInt = '-' + newInt
        }
        
        return newInt


    }

    // Обновление бюджета
    function updateBudget(item){
        let type = ''

        if (item.budget > 0){
            type = 'inc'
        } else if (item.budget < 0){
            type = 'exp'
        }

        document.querySelector(DOMstrings.budgetValue).textContent = formatterNum(item.budget, type)
        document.querySelector(DOMstrings.incomeLabel).textContent = formatterNum(item.totalInc, 'inc')
        document.querySelector(DOMstrings.expenseLabel).textContent = formatterNum(item.totalExp, 'exp')
        document.querySelector(DOMstrings.expensePercentLabel).textContent = item.percentage
    }

    // Обновление процента
    function updateItemsPercentages(items){
        items.forEach(element => {
            let li = document.querySelector(`#exp-${element[0]}`)

            let items = li.querySelector('.item__percent')
            items.textContent = element[1] + '%'
        })
    }

    return {
        DOM: DOMstrings,
        insertItem: insertItem,
        clearFields: clearFields,
        getDOMstrings: getDOMStrings,
        getInput: getInput,
        updateBudget: updateBudget,
        deleteItem: deleteItem,
        updateItemsPercentages: updateItemsPercentages,
        displayMonth: displayMonth,
    }
})()