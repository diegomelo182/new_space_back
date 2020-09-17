'use strict';

function findMatrixItem(matrix, itemToFind) {
    var finded = false;
    for (var index = 0; index < matrix.length; index++) {
        var element = matrix[index];
        if (parseInt(element[0]) == parseInt(itemToFind[0]) && parseInt(element[1]) == parseInt(itemToFind[1])) {
            finded = true;
            break;
        }
    }
    return finded;
}

function checkCloudPosition(rowLength, colLength, rowIndex, colIndex) {
    return {
        up: rowIndex > 0,
        down: rowIndex < (rowLength - 1),
        left: colIndex > 0,
        right: colIndex < (colLength - 1)
    }
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
    },
    generateClouds: function(matrix) {
        var cloudOverAirport = false;
        var changedMatrix = matrix;
        var cloudPoints = [];

        for (var rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
            var row = matrix[rowIndex];
            for (var colIndex = 0; colIndex < row.length; colIndex++) {
                var col = row[colIndex];
                if (col != 'C') continue;

                var addCloud = checkCloudPosition(matrix.length, row.length, rowIndex, colIndex);
                if (addCloud.up && !findMatrixItem(cloudPoints, [rowIndex-1, +colIndex])) {
                    if (matrix[parseInt(rowIndex-1)][parseInt(+colIndex)] === 'A') cloudOverAirport = true;
                    cloudPoints.push([rowIndex-1, +colIndex]);
                }
                if (addCloud.down && !findMatrixItem(cloudPoints, [rowIndex+1, colIndex])) {
                    if (matrix[parseInt(rowIndex+1)][parseInt(colIndex)] === 'A') cloudOverAirport = true;
                    cloudPoints.push([rowIndex+1, +colIndex]);
                }
                if (addCloud.left && !findMatrixItem(cloudPoints, [rowIndex, colIndex-1])) {
                    if (matrix[parseInt(rowIndex)][parseInt(colIndex-1)] === 'A') cloudOverAirport = true;
                    cloudPoints.push([rowIndex, colIndex-1]);
                }
                if (addCloud.right && !findMatrixItem(cloudPoints, [rowIndex, colIndex+1])) {
                    if (matrix[parseInt(rowIndex)][parseInt(colIndex+1)] === 'A') cloudOverAirport = true;
                    cloudPoints.push([rowIndex, colIndex+1]);
                }
            }
        }

        for (var index = 0; index < cloudPoints.length; index++) {
            var element = cloudPoints[index];
            changedMatrix[parseInt(element[0])][parseInt(element[1])] = 'C';
        }

        return { cloudOverAirport: cloudOverAirport, matrix: changedMatrix };
    }
};

module.exports = functions;
