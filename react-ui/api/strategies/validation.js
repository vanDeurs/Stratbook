
  
function validateStrategy(strategy){
    
    const strategyFieldType = {
        id: 'required',
        nameValue: 'required',
        mapValue: 'required',
        typeValue: 'required',
        summaryValue: 'required',
        explanationValue: 'required'
    };

    for (const field in strategyFieldType){
        const type = strategyFieldType[field];
        if (!type){
            delete strategy[field];
            return false;
        } else if (type === 'required' && !strategy[field]){
            return `${field} is required.`;
        }
        return true;
    }
}

module.exports = validateStrategy;