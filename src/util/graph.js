module.exports = {
    multipleGraphtoObject: function(graphArrays){
        return graphArrays.map(graphArray => graphArray.toObject());
    },
    graphtoObject: function (graphArray){
        return graphArray ? graphArray.toObject() :graphArray;
    }

};
