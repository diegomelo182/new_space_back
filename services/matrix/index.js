'use strict';

function findMatrixItem(matrix, itemToFind) {
    var finded = false;
    for (var index = 0; index < matrix.length; index++) {
        var element = matrix[index];
        if (element[0] == itemToFind[0] && element[1] == itemToFind[1]) {
            finded = true;
            break;
        }
    }
    return finded;
}

var functions = {
    initalizeMatrix: function (rows, cols) {
        var array = [];

        for (var rowIndex = 0; rowIndex < rows; rowIndex++) {
            array[rowIndex] = [];
            for (var colIndex = 0; colIndex < cols; colIndex++) {
                array[rowIndex].push(null);
            }
        }

        return array;
    },
    generateRandomPointsByType: function (matrix, pointNumber, type) {
        var rowNumber = matrix.length;
        var colNumber = matrix[0].length;
        var customMatrix = [];
        var changedMatrix = matrix;
        var charType = {
            airport: 'A',
            cloud: 'C'
        };

        for (var index = 0; index < pointNumber; index++) {
            var randomRow = Math.floor(Math.random() * rowNumber);
            var randomCol = Math.floor(Math.random() * colNumber);
            var continueLoop = true;

            while (continueLoop) {
                if (!findMatrixItem(customMatrix, [randomRow, randomCol]) && matrix[randomRow][randomCol] == null) {
                    customMatrix.push([randomRow, randomCol]);
                    continueLoop = false;
                } else {
                    randomRow = Math.floor(Math.random() * rowNumber);
                    randomCol = Math.floor(Math.random() * colNumber);
                }
            }
        }

        for (let index = 0; index < customMatrix.length; index++) {
            var element = customMatrix[index];
            changedMatrix[element[0]][element[1]] = charType[type] || 'C';
        }

        return changedMatrix;
    }
};

module.exports = functions;
