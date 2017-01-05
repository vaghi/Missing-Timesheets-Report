
if (!String.prototype.includes)
{
    String.prototype.includes = function(str)
    {
	    return (this.indexOf(str) > -1 ? true : false);
    }
}

if (!Array.prototype.removeDuplicates) {
    Array.prototype.removeDuplicates = function() {
        var aArray = this;
        return aArray.filter(
            function(oElem, iPos) {
                return aArray.indexOf(oElem) == iPos;
            }
        );
    }
}

if (!Array.prototype.removeDuplicateObjects) {
    Array.prototype.removeDuplicateObjects = function() {
        var sMetadataProperty = "__metadata";
        var aOriginalArray = this;
        var aUniqueItemsArray = [];
        for (var i in aOriginalArray) {
            if (typeof (aOriginalArray[i]) === 'function')
                continue;

            delete aOriginalArray[i][sMetadataProperty];
            var bDuplicateObject = false;
            var j = parseInt(i) + 1;

            while (j < aOriginalArray.length && !bDuplicateObject) {
                delete aOriginalArray[j][sMetadataProperty];
                var iEqualValues = 0;
                var iTotalProperties = 0;

                for (var key in aOriginalArray[i]) {
                    iTotalProperties++;

                    if (aOriginalArray[i][key] == aOriginalArray[j][key])
                        iEqualValues++;
                }

                bDuplicateObject = bDuplicateObject || (iTotalProperties == iEqualValues);

                j++;
            }

            if (!bDuplicateObject)
                aUniqueItemsArray.push(aOriginalArray[i]);
        }

        return aUniqueItemsArray;
    }
}
