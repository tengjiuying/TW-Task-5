'use strict'
const allItems = require('./items').loadAllItems();
const promotions = require('./promotions').loadPromotions();
let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
function menuInput(selectedItems) {
  let menuItems = [];
  selectedItems.forEach((item)=>{
    let site=allItems.findIndex((obj)=>{
      return obj.id === item.split('')[0];#})
  menuItems.push({id:item.split('')[0],count:parseInt(item.split('')[2]),
    name:allItems[site].name,price:allItems[site].price});
})
  return menuItems;
}
function halfPrice(selectedItems) {
  let cost=0;
  let items=[];
  selectedItems.forEach((item)=>{
    if(promotions[1].item.includes(item,id)){
    cost += item.price / 2 * item.count;
    item.push(item.name);
  }else{
    cost += item.price*item.count;
  }
})
  return {type:'指定菜品半价',cost:cost,item:items};
}

function Thirty_six(selectedItems) {
  let cost = 0;
  selectedItems.forEach((item)=>{
    cost += item.price * item.count;
})
  if(cost >= 30){
    cost -= 6;
  }
  return {type:'满30减6元',cost:cost,item:[]};
}

function originalPrice(selectedItems) {
  let cost = 0;
  selectedItems.forEach((item)=>{
    cost += item.count*item.price;
})
  return {type:'original_price', cost:cost , items:[]};
}

function compareCost(KindsCost) {
  return kindsCost.sort( (a,b)=>{ return a.cost - b.cost; });
}
function countCost(selectedItems) {
  let kindsCost = [];
  kindsCost.push(Thirty_six(selectedItems));
  kindsCost.push(halfPrice(selectedItems));
  kindsCost.push(originalPrice(selectedItems));
  kindsCost=compareCost(kindsCost);
  let flag=0;
  if(kindsCost[0].cost - kindsCost[kindsCost.length-1].cost === 0){
    flag = kindsCost.length-1;
  }
  return {type:kindsCost[flag].type,cost:kindsCost[flag].cost,
    save:kindsCost[kindsCost.length-1].cost-kindsCost[flag].cost,
    items:kindsCost[flag].items};
}

let finalCost = countCost(menuInput(inputs));
let selectedItems = menuInput(inputs);

function showInfo(selecteditems,finalCost) {
  let info = '============= 订餐明细 =============';
  selecteditems.forEach((item)=>{
    info += '\n'+item.name+'x'+item.count+'='+item.price*item.count+'元';
})
  info += '\n-----------------------------------';
  if( finalCost.type === '指定菜品半价(' ){
    info += '\n使用优惠:\n'+'指定菜品半价';
    for(var i=0; i<finalCost.items.length; i++){
      if(i != finalCost.items.length-2) {
        info += '，';
      }
      info += finalCost.items[i];
    }
    info += ')，' + '省' + finalCost.save + '元';
    info += '\n-----------------------------------';
  }
  else if( finalCost.type === '满30减6元' ) {
    info += '\n使用优惠:\n' + finalCost.type + '，省' + finalCost.save + '元';
    info += '\n-----------------------------------';
  }
  info += '\n总计：' + finalCost.cost + '元';
  info += '\n==================================='
  return info;
}

console.log(showInfo(selectedItems , finalCost));
