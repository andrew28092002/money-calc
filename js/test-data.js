const generateTestData = (function (){
    const exampleItem = function(type, desc, sum){
        this.type = type
        this.desc = desc
        this.sum = sum
    }
    
    const arrayItems = [
        new exampleItem('inc', 'Зарплата', 12340),
        new exampleItem('inc', 'Фриланс', 1234),
        new exampleItem('inc', 'Партнерская программа', 324),
        new exampleItem('exp', 'Рента', 342),
        new exampleItem('exp', 'Бензин', 234),
    ]
    
    function getRandomNum(max){
        return Math.floor(Math.random()*max)
    }
    
    
    function insertInUI(){
        const randomNum = getRandomNum(arrayItems.length)
        const randomItem = arrayItems[randomNum]
    
        document.querySelector('#input__type').value = randomItem.type
        document.querySelector('#input__description').value = randomItem.desc
        document.querySelector('#input__value').value = randomItem.sum
    }
    
    return {
        init: insertInUI,
    }
})()

generateTestData.init()
