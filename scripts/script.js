'use strict';
console.log(jsonFile)

let formFilter = document.querySelector('.dropdovnForm')
document.getElementById('itemFilter').addEventListener('click', ()=>{
   formFilter.classList.toggle('dropdovnForm-active');
})
let arr = [];
//=============================================change CheckBox
formFilter.addEventListener('change', (e)=>{
    formFilter.classList.add('dropdovnForm-active');
    let generHead = document.querySelectorAll('.generHead');
    for(let i of generHead){
        i.setAttribute('data-head', '0');
    }
    arr = [];
    let count = 0;
    searchList.innerHTML = '';
    let inpCheckBox = document.querySelectorAll('.inpCheckBox');
    for(let key of inpCheckBox){
        if(key.checked === true){
            count++;
            let idInput = key.id;
            viewStart(idInput);
        }
    }
    if(count === 0){
        count = 1;
        e.target.checked = true;
        viewStart(e.target.id);
    }
})
//=============================================change CheckBox

let viewStart = (prov)=>{
    searchList.innerHTML = '';
    for(let i = 0; i < jsonFile.data.length; i++){
        if(jsonFile.data[i].provider_name == prov){
            arr.push(jsonFile.data[i])
        }
    }
    view(arr)
}

let showMore = document.getElementById('showMore');
let checkArray = (arr)=>{
    if(arr.length > 25){
        showMore.classList.add('showMore-active');
    }else{
        showMore.classList.remove('showMore-active');
    }
}
let period = 25;
showMore.addEventListener('click', ()=>{
    searchList.innerHTML = '';
    if(period >= arr.length){
        period === arr.length;
        view(arr, 0, period)
        showMore.classList.remove('showMore-active');
        period = 25;
    }else{
        period += 25;
        view(arr, 0, period)
    }
})

let view = (arr, start = 0, stop = 25)=>{
    checkArray(arr)
    let count = 0;
    for(let i = 0; i < arr.length; i++){
        if(count === stop){
            break
        }else{
            count++
        }
        let parsDrive = arr[i].drive_label.split(' ');

        let row = document.createElement('div');
        searchList.appendChild(row);
        row.classList = 'itemRow';
        row.innerHTML = `<div class='provider generUnit'>${arr[i].provider}</div>
        <div class='brand generUnit'>${arr[i].brand}</div>
        <div class='country generUnit'>${arr[i].country}</div>
        <div class='spu generUnit'>${arr[i].cpu}</div>
        <div class='ram generUnit'>
            <div class=ramTop>${arr[i].ram}Gb</div>
            <div class=ramBottom>RAM</div>
        </div>
        <div class='drive generUnit'>
            <div class=driveTop>${parsDrive[0]}</div>
            <div class=driveBottom>${parsDrive[1]}</div>
        </div>
        <div class='price generUnit'>$${arr[i].price}/mo.</div>`
    }
}

// ===================================================sort
let sorter = (atrRool, elementClassList, elemSortObj)=>{
    searchList.innerHTML = '';
    if(atrRool == '0'){
        arr.sort(allSort(elemSortObj))
        let element = document.querySelector(elementClassList)
        element.setAttribute('data-head', '1');
        view(arr)
    }else{
        arr.reverse()
        view(arr)
    }
}
let allSort = (property)=>{
    return function (a,b){
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result 
    }
}
let searchHead = document.querySelector('.searchHead');
searchHead.addEventListener('click', (e)=>{
    let target = e.target;
    let indexHead;
    let generHead = document.querySelectorAll('.generHead');
    for(let i of generHead){
        if(target.getAttribute('data-head') == '1'){
            continue
        }
        i.setAttribute('data-head', '0');
    }
    switch(target.classList[0]){
        case 'providerHead':
            indexHead = target.getAttribute('data-head');
            sorter(indexHead, '.providerHead', 'provider')
        break;
        case 'brandHead':
            indexHead = target.getAttribute('data-head');
            sorter(indexHead, '.brandHead', 'brand')
        break;
        case 'countryHead':
            indexHead = target.getAttribute('data-head');
            sorter(indexHead, '.countryHead', 'country')
        break;
        case 'cpuHead':
            indexHead = target.getAttribute('data-head');
            sorter(indexHead, '.cpuHead', 'cpu')
        break;
        case 'ramHead':
            indexHead = target.getAttribute('data-head');
            sorter(indexHead, '.ramHead', 'ram')
        break;
        case 'driveHead':
            indexHead = target.getAttribute('data-head');
            sorter(indexHead, '.driveHead', 'drive_label')
        break;
        case 'priceHead':
            indexHead = target.getAttribute('data-head');
            sorter(indexHead, '.priceHead', 'price')
        break;
    }
})
// ===================================================sort

//===============================default
let chooseProvider = ()=>{
    let set = new Set();
    for(let key of jsonFile.data){
        set.add(key.provider_name)
    }
    return set
}
let viewDropDownSelect = ()=>{
    let dropdovnForm = document.querySelector('.dropdovnForm');
    let arrayProvider = chooseProvider();
    for(let key of arrayProvider){
        let label = document.createElement('label');
        dropdovnForm.appendChild(label)
        label.classList.add('itemCheckBox')
        label.setAttribute('for', key)
        label.innerHTML = `<input type=checkbox class=inpCheckBox id=${key}>${key}`;
    }
}
viewDropDownSelect()
let inpCheckBox = document.querySelectorAll('.inpCheckBox');
let defaultStart = ()=>{
    for(let key of inpCheckBox){
        key.checked = true;
        let idInput = key.id;
        viewStart(idInput);
    }
}
defaultStart()
//===============================default