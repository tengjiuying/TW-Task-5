function main(number){
    if (number === 1){
        return "1 bottle of beer on the wall, 1 bottle of beer.\n" +
            " Take one down and pass it around, no more bottles of beer on the wall.\n" +
            " No more bottles of beer on the wall, no more bottles of beer.\n" +
            " Go to the store and buy some more, 99 bottles of beer on the wall.";
    }
    if (number === 2){
        return "2 bottles of beer on the wall, 2 bottles of beer.\n" +
            "Take one down and pass it around, 1 bottle of beer on the wall.\n"
    }
    if (number === 3){
        let array = "";
        for (var i = 99; i >= 3; i--) {
            array += i;
            array += " bottles of beer on the wall, ";
            array += i;
            array += " bottles of beer.\n";
            array += "Take one down and pass it around, ";
            array += (i-1);
            array += " bottles of beer on the wall.\n";
        }

        array = array + "2 bottles of beer on the wall, 2 bottles of beer.\n" +
            "Take one down and pass it around, 1 bottle of beer on the wall.\n" +
            "1 bottle of beer on the wall, 1 bottle of beer.\n" +
            "Take one down and pass it around, no more bottles of beer on the wall.\n" +
            "No more bottles of beer on the wall, no more bottles of beer.\n" +
            "Go to the store and buy some more, 99 bottles of beer on the wall.";

        return array;
    }
}

module.exports = main;

