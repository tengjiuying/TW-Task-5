const allItems = require('./items').loadAllItems();
const promotions = require('./promotions').loadPromotions();

function menuInput(selectedItems) {
  let menuItems = [];
  selectedItems.forEach((item)=>{
    let site=allItems.findIndex((obj)=>{
      return obj.id===item.split('')[0];
    })
  menuItems.push({id:item.split('')[0],count:parseInt(item.split('')[2]),
  name:allItems[site].name,price:allItems[site].price});
  })
  return menuItems;
}
function halfPrice(menuItems) {
  let cost=0;
  let items=[];
  menuItems.forEach((item)=>{
    if(promotions[1].item.includes(item,id)){
      cost += item.price / 2 * item.count;
      item.push(item.name);
  }else{
      cost += item.price*item.count;
  }
  })
  return {type:'指定菜品半价',cost:cost,item:items};
}

function Thirty_six(menuItems) {
  let cost = 0;
  menuItems.forEach((item)=>{
    cost += item.price * item.count;
  })
  if(cost >= 30){
    cost -= 6;
  }
  return {type:'满30减6元',cost:cost,item:[]};
}

function originalPrice(menuItems) {
  let cost = 0;
  menuItems.forEach((item)=>{
    cost += item.count*item.price;
  })
  return {type:'original_price', cost:cost , items:[]};
}

function compareCost(KindsCost) {
  return kindsCost.sort( (a,b)=>{ return a.cost - b.cost; });
}
function countCost(menuItems) {
  let kindsCost = [];
  kindsCost.push(Thirty_six(menuItems));
  kindsCost.push(halfPrice(menuItems));
  kindsCost.push(originalPrice(menuItems));
  kindsCost=compareCost(kindsCost);
  let flag=0;
  if(kindsCost[0].cost - kindsCost[kindsCost.length-1].cost === 0){
    flag = kindsCost.length-1;
  }
  return {type:kindsCost[flag].type,cost:kindsCost[flag].cost,
          save:kindsCost[kindsCost.length-1].cost-kindsCost[flag].cost,
          items:kindsCost[flag].items};
}

function showInfo(menuItems,finalCost) {
  let info = '============= 订餐明细 =============';
  menuItems.forEach((item)=>{
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

exports.bestCharge = function (selectedItems) {
  let menuItems=menuInput(selectedItems);
  let finalCost = countCost(menuItems);
  return showInfo(menuItems,finalCost);
}
