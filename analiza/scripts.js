var inputData;
var editData = [];
var showArray1 = "";
var pos = 0;

/* AHP */
var wyniki = [];
var wektor = [];
var sumaWektorow = 0;
var wektorKolumn = [];
var lambda = 0;
var ci = 0;
var cr = 0;

window.onload = function() {

    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');

    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

/* TUTAJ */


            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result; // wyświetl

                /* PODZIAŁ */

                inputData = reader.result.split(",");
                showArray1 = "";

                wyniki = [];
                wektor = [];
                sumaWektorow = 0;
                wektorKolumn = [];
                lambda = 0;
                ci = 0;
                cr = 0;
                document.getElementById("wskazniki").innerHTML = "";

                /* TABLICA 2D 0/1 */

                for (var i = 0; i < 12; i++){
                    editData[i] = [];
                    for (var j = 0; j < 12; j++){
                        if(i == j){
                            editData[i][j] = 1;
                        }
                        else{
                            editData[i][j] = 0;
                        }
                    }
                }

                /* TABLICA 2D Z WARTOŚCIAMI Z PLIKU */

                for (var i = 0; i < 12; i++){
                    for (var j = i+1; j < 12; j++){
                        inputData[pos] = Number(inputData[pos].slice(4));
                        if(inputData[pos] < 0){
                            inputData[pos] = -1/inputData[pos];
                        }
                        editData[i][j] = inputData[pos];
                        pos++;
                    }
                }
                pos = 0;
                for (var i = 0; i < 12; i++){
                    for (var j = 0; j < i; j++){
                        editData[i][j] = 1/editData[j][i]
                        pos++;
                    }
                }
                pos = 0;
                wyniki = editData;

                /* MNOŻENIE MACIERZY DO 6 POTĘGI*/

                for(var i = 0; i < 4; i++){
                    editData = math.multiply(editData, editData)
                }

                /* SUMA WIERSZY JAKO WEKTOR */

                for(var i = 0; i < editData.length; i++){
                    wektor.push(math.sum(editData[i]));
                }

                /* SKRACANIE WEKTORA POPRZEZ WEKTOR[X]/SUMA WEKTOROW */

                sumaWektorow = math.sum(wektor);
                for(var i = 0; i < wektor.length; i++){
                    wektor[i] /= sumaWektorow;
                }

                /* SUMA WARTOSCI W KOLUMNACH */

                for(var i = 0; i < 12; i++){
                    wektorKolumn.push(0);
                }

                for(var i = 0; i < 12; i++){
                    for(var j = 0; j < 12; j++){
                        wektorKolumn[j] += wyniki[i][j];
                    }
                }

                /* AHP */

                lambda = math.multiply(wektor, wektorKolumn);
                ci = (lambda-12)/(12-1);
                cr = ci/1.52;

                /* DRUKUJ MACIERZ */
                showArray1 += "<table>"
                for (var i = 0; i < wyniki.length; i++){
                    showArray1 += "<tr>"
                        for(var j = 0; j < wyniki[i].length; j++){
                            showArray1 += "<td>" + Math.round(10000*wyniki[i][j])/10000 + "</td>";
                        }
                    showArray1 += "</tr>"
                }
                showArray1 += "</table>"
                document.getElementById("matrix1").innerHTML = showArray1;

                document.getElementById("wskazniki").innerHTML = "lambda: " + lambda + "<br>" + "ci: " + ci + "<br>" + "cr: " + cr;
            }


/* TUTAJ */

            reader.readAsText(file);	
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });
}
