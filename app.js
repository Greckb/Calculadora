const buttons = document.querySelectorAll("button");
const display = document.querySelector('#display');

const calculadora = {
    displayValue: '0',
    firstvalue: false,
    firstOperation: null,
    waitingForSecondOperation: false,
    operator: null,
    operaciones: null,
}

function updateDisplay (){
    display.value = calculadora.displayValue;
}

updateDisplay();

function perfomCalculation (operator){
    var value = parseFloat(calculadora.displayValue)
   console.log(calculadora.operaciones)
    if (calculadora.operaciones===',' ){
        if(value < 0){
            value = Math.abs(value)

            calculadora.firstvalue = false;
            calculadora.firstOperation = null;
            calculadora.waitingForSecondOperation= false;
            calculadora.operaciones= null;
            calculadora.operator= null;
            return calculadora.displayValue=value;
        }else{
        
        var value = "-"+value
        
        //calculadora.firstvalue = false;
        calculadora.firstOperation = null;
        calculadora.waitingForSecondOperation= false;
        calculadora.operaciones= null;
        calculadora.operator= null;
        console.log(calculadora)
        return calculadora.displayValue=value;
        }
    }
   
    if (calculadora.operaciones==='%' && calculadora.firstOperation == null){
        var value = value/100;
        
        calculadora.firstvalue = false;
        calculadora.firstOperation = null;
        calculadora.waitingForSecondOperation= false;
        calculadora.operaciones= null;
        calculadora.operator= null;
        
        return calculadora.displayValue=value;

    }
    if(calculadora.firstOperation == null){
        calculadora.firstOperation = value;
        console.log(calculadora)
        
       
    }else if (calculadora.operator){
        console.log(calculadora)
        const result = calculadora.operator(calculadora.firstOperation, value)
        
        if (calculadora.operaciones==='+' || calculadora.operaciones==='-'){
            var resultDecimal = (result - Math.floor(result)) !== 0;
            if (resultDecimal){
                let v1 = calculadora.firstOperation.toString()
                let v1Length = v1.length
                let v2 = value.toString()
                let v2Length = v2.length
                let findV1 = v1.indexOf(".") + 1;
                let findV2 = v2.indexOf(".") + 1;
                let resultV1= v1Length - findV1;
                let resultV2= v2Length - findV2;
                if(resultV1 > resultV2){
                    var fixed = resultV1
                } else {
                    var fixed = resultV2
                }       
                if(result < 0){
                    
                    var numero = Math.abs(result.toFixed(fixed))
                    var numeroString = numero.toString()
                    var resultString = ('-' + numeroString);
                
                    calculadora.displayValue = resultString;
                    calculadora.firstOperation = resultString;
                    calculadora.waitingForSecondOperation = true;
                }else{

                    calculadora.displayValue = result.toFixed(fixed);
                    calculadora.firstOperation = result;
                    calculadora.waitingForSecondOperation = true;
                }
            }else{
                calculadora.displayValue = result;
                calculadora.firstOperation = result;
                calculadora.waitingForSecondOperation = true;
            }
        }else{
            
            
            calculadora.displayValue = result;
            calculadora.firstOperation = result;
            calculadora.waitingForSecondOperation = true;
        }

    }
    calculadora.waitingForSecondOperation = true
    calculadora.operator = operator
    //calculadora.firstvalue =false
    
    updateDisplay();
    
}

buttons.forEach(buttons =>{
    buttons.addEventListener('click', ()=>{
        var key = buttons.innerText
        if (key === '+/-'){key = ','}
        
            if (key === 'AC'){
                calculadora.displayValue = '0'
                calculadora.firstOperation = null
                calculadora.firstvalue =false
                calculadora.waitingForSecondOperation = false
                calculadora.operator = null
            } else if (key === '='){
                perfomCalculation(calculadora.operator)
                calculadora.firstOperation = null
                calculadora.waitingForSecondOperation = false
            } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key===','){
               
                if (key==='+' || key==='-' || key==='%' || key===','){calculadora.operaciones=key}
                
                calculadora.firstvalue =true
                perfomCalculation( new Function('a', 'b', `return a ${key} b`))
            } else if (key === '.'){
                if (!calculadora.displayValue.includes('.')){
                    if(calculadora.waitingForSecondOperation){
                        calculadora.displayValue = '0.'
                        calculadora.firstvalue =true 
                        calculadora.waitingForSecondOperation = false 
                    }else{
                    calculadora.displayValue += '.'
                    calculadora.firstvalue =true
                    }
                }
            }else {
                if (calculadora.waitingForSecondOperation){
                    calculadora.displayValue = key
                    calculadora.waitingForSecondOperation = false
                    
                } else {
                    if (calculadora.firstvalue===false){
                        calculadora.firstvalue=true;
                        calculadora.displayValue = key
                        updateDisplay();
                    }else{
                    calculadora.displayValue += key
                    }
                }
            }
        
   
        updateDisplay()
    })
})
