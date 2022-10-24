const controller = (function(budgetCtrl, uiCtrl){

    // Функция добавления действий по нажатию на кнопку
    const setupEventListeners = function(){
        let DOM = uiCtrl.getDOMstrings()
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem)

        document.querySelector(DOM.budgetTable).addEventListener('click', deleteItem)
        
        


    }

    // Функция обновления бюджета
    function updateBudget(){
        budgetCtrl.calcBudget()

        const budgetItem = budgetCtrl.getBudget()

        uiCtrl.updateBudget(budgetItem)

    }

    // Функция удаления элемента
    function deleteItem(e){
        e.preventDefault()

        if (e.target.closest('.item__remove')){
            const itemId = e.target.closest('li.budget-list__item').id
            
            const splitId = itemId.split('-')
            const type = splitId[0]
            const id = splitId[1]
            
            budgetCtrl.deleteItem(type, id)
            uiCtrl.deleteItem(type, id)
            updateBudget()
            updatePercentages()
        }
    }

    // Функция обновления процентов
    function updatePercentages(){
        budgetCtrl.calcAllPercentage()


        let idsAndPercentages = budgetCtrl.getAllIdsAndPercentages()

        uiCtrl.updateItemsPercentages(idsAndPercentages)
    }

    // Фукнция добавления элемента
    function ctrlAddItem(e){
        e.preventDefault()

        // Получаем данные из формы
        const input = uiCtrl.getInput()

        if (input.description !== '' && !isNaN(input.value) && input.value > 0){
            // Добавляем элемент в модель
            const newModel = budgetCtrl.addItem(input.type, input.description, input.value)
            
            // Вставка элемента на страницу 
            uiCtrl.insertItem(newModel, input.type)

            // Очистка полей ввода
            uiCtrl.clearFields()

            updateBudget()

            updatePercentages()

            generateTestData.init()
            console.log(budgetCtrl.test())

        }

    }

    return {
        init: function(){
            setupEventListeners()
            uiCtrl.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            })
            uiCtrl.displayMonth()

        }

    }

})(modelController, viewController);

controller.init()