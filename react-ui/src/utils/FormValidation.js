export const checkTextLength = (text) => {
    let min = 1
    let max = 100
    if(text.length < min || text.length > max){
        return false
    }
    return true
}