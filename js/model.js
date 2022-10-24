const modelController = (function(){

    // Конструктор для доходов
    const Income = function(id, descr, value){
        this.id = id
        this.descr = descr
        this.value = value
    }

    // Конструктор для расходов
    const Expense = function(id, descr, value){
        this.id = id 
        this.descr = descr
        this.value = value
        this.percentage = -1
    }

    Expense.prototype.calcPercentage = function(totalIncome){
        if (totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome)*100)
        } else {
            this.percentage = -1
        }
    }

    Expense.prototype.getPercentage = function (){
        return this.percentage
    }

    // Добавление элемента в модель
    const addItem = function(type, descr, value){
        let newItem, id
        
        // Формирование id
        if (data.allItems[type].length > 0){
            const lastIndex = data.allItems[type].length - 1
            id = data.allItems[type][lastIndex].id + 1
        } else {
            id = 0
        }

        // Создаем элемент в зависимости от типа
        if (type === 'inc'){
            newItem = new Income(id, descr, parseFloat(value))
        } else if (type === 'exp'){
            newItem = new Expense(id, descr, parseFloat(value))
        }

        // Добавление элемента в массив
        data.allItems[type].push(newItem)

        return newItem
    }

    // Удаление элемента
    function deleteItem(type, id){

        // Нахожу элемент в массиве 
        const obj = data.allItems[type].find(el => el.id == id)
        // Нахожу индекс
        const indexObj = data.allItems[type].indexOf(obj)
        // Удаление по индексу

        if (indexObj !== -1){
            data.allItems[type].splice(indexObj, 1)
        }
    
    }

    // Подсчёт бюджета
    function calcTotalSum (type){
        let sum = 0

        data.allItems[type].forEach(element => {
            sum += element.value
        })

        return sum
    }

    function calcBudget(){
        // Подсчёт доходов
        data.totalItems.inc = calcTotalSum('inc')
        
        // Подсчёт расходов
        data.totalItems.exp = calcTotalSum('exp')
        
        // Подсчёт разницы
        data.budget = data.totalItems.inc - data.totalItems.exp
        
        // Подсчёт процента 
        if (data.totalItems.inc > 0){
            data.percentage = Math.round(data.totalItems.exp / data.totalItems.inc * 100)
        } else {
            data.percentage = -1
        }
    }

    function getBudget(){
        return{
            budget: data.budget,
            totalInc: data.totalItems.inc,
            totalExp: data.totalItems.exp,
            percentage: data.percentage
        }
    }
    // Функция для подсчёта процента каждого
    function calcAllPercentage(){
        data.allItems.exp.forEach(function(item){
            item.calcPercentage(data.totalItems.exp)
        })
    }

    function getAllIdsAndPercentages(){
        const allPerc = data.allItems.exp.map(function(item){
            return [item.id, item.getPercentage()]
        })

        return allPerc
    }

    let data = {
        allItems: {
            inc:[],
            exp:[],
        },

        totalItems: {
            inc: 0,
            exp: 0,
        },
        budget: 0,
        percentage: -1,
    }

    function test(){
        return data.allItems
    }


    return {
        addItem: addItem,
        test: test,
        calcBudget: calcBudget,
        getBudget: getBudget,
        deleteItem: deleteItem,
        calcAllPercentage: calcAllPercentage,
        getAllIdsAndPercentages: getAllIdsAndPercentages,
    }
})()