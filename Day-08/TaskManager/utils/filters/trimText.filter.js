angular.module("utils").filter("trimText",function(){
        return function(data, trimLength){
            data = data || "";
            trimLength = trimLength || 10;
            return data.length <= trimLength ? data : data.substr(0,trimLength) + "...";
        }
    });
    