const datbase = require('./datbase');
function printInventory(inputs) {
    var loadAllItems;
    var allItems;
    var item;
    var list='***<没钱赚商店>购物清单***';
    var sum=0;
    var item_list=[];
    var cart_list=[];
    var barcode_list=[];
    loadAllItems = datbase.loadAllItems;
    var allItems = loadAllItems();
    var item_barcode;
    var Promotion='挥泪赠送商品：';
    var save=0;
    for(var i=0;i<inputs.length;i++){
        item_barcode=inputs[i];
        if(inputs[i].length == 10){
            barcode_list.push(item_barcode);
        }
        else{

            item_barcode=inputs[i].substr(0,10);
            barcode_list.push(item_barcode);
            barcode_list.push(item_barcode);
        }
    }

    for(var j=0;j<barcode_list.length;j++)
    {
        for(var k=0;k<allItems.length;k++){
            item=allItems[k];
            if(allItems[k].barcode==barcode_list[j]){
                cart_list.push(item);
            }
        }
    }

    for(var l=0;l<cart_list.length;l++){
        item=cart_list[l];
        if(item_list.length===0){
            item.count=1;
            item_list.push(item);
        }
        else{
            for(var n=0;n<item_list.length;n++){
                if(cart_list[l]==item_list[n]){
                    item.count++;
                }
                else if(n==item_list.length-1){
                    item_list.push(item);
                    item.count=0;
                }
            }
        }
    }
    for(var m=0;m<item_list.length;m++)
    {

        if(item_list[m].count>=3)
        {
            Promotion+='\n'+'名称：'+item_list[m].name+'，'+'数量：'+parseInt(item_list[m].count/3)+item_list[m].unit;
            save+=parseInt(item_list[m].count/3)*item_list[m].price;
        }
        list=list+'\n'+'名称：'+item_list[m].name+'，'+'数量：'+item_list[m].count+item_list[m].unit+'，'+'单价：'+item_list[m].price.toFixed(2)+'(元)'+'，'+'小计：'+(item_list[m].count-parseInt(item_list[m].count/3))*item_list[m].price+'.00(元)';

        sum+=(item_list[m].count-parseInt(item_list[m].count/3))*item_list[m].price;
    }
    list=list+'\n'+'----------------------'+'\n'+Promotion+'\n'+'----------------------'+'\n'+'总计：'+sum.toFixed(2)+'(元)'+'\n'+'节省：'+save.toFixed(2)+'(元)'+'\n'+'**********************';
    console.log(list);
}

module.exports=printInventory;