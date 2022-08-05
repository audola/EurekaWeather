import * as ew from './EurekaWeather.js';
import { default as EorzeaTime } from './EorzeaTime.js';

let allItem = [];
let allWeatherItem = [];
let localTimeElement = null;
let eorzeaTimeElement = null;

// let initTR1 = null;
let initTR2 = null;

// 天気の定義データ
let rawWeatherList = [
    {
        id: 2,
        name: "晴れ",
        path: "/060000/060202.png"
    },
    {
        id: 6,
        name: "暴風",
        path: "/060000/060206.png"
    },
    {
        id: 8,
        name: "暴雨",
        path: "/060000/060208.png"
    },
    {
        id: 15,
        name: "雪",
        path: "/060000/060215.png"
    },
    {
        id: 4,
        name: "霧",
        path: "/060000/060204.png"
    },
    {
        id: 9,
        name: "雷",
        path: "/060000/060209.png"
    },
    {
        id: 14,
        name: "灼熱波",
        path: "/060000/060214.png"
    },
    {
        id: 16,
        name: "吹雪",
        path: "/060000/060216.png"
    },
    {
        id: 49,
        name: "霊風",
        path: "/060000/060219.png"
    },
    {
        id: 10,
        name: "雷雨",
        path: "/060000/060210.png"
    },
    {
        id: 27,
        name: "妖霧",
        path: "/060000/060256.png"
    },

];


// 実行開始
main();

function main() {
    localTimeElement = document.getElementById("localTime");
    eorzeaTimeElement = document.getElementById("eorzeaTime");

    // initTR1 = document.getElementById("initTR1");
    initTR2 = document.getElementById("initTR2");

    getItems();
    getWeatherItems();

    // setInterval(process, 20 * 1000);
    setInterval(updateTime, 500);
    process();
    updateTime();

    const checkBoxLabels = document.getElementsByTagName("input");
    for (let i = 0; i < checkBoxLabels.length; i++) {
        let tmpElem = checkBoxLabels[i];
        // console.log(tmpElem);

        // tmpElem.setAttribute('onclick', pushCheckbox);
        // tmpElem.onclick = pushCheckbox;
        tmpElem.addEventListener('click', pushCheckbox);
    }

    const groupingChkbxlAndLabel = document.getElementsByClassName("groupingChkbxlAndLabel");
    for (let i = 0; i < groupingChkbxlAndLabel.length; i++) {
        let tmpElem = groupingChkbxlAndLabel[i];
        console.log(tmpElem);
        tmpElem.addEventListener('click', pushCheckbox);
    }


}

function pushCheckbox() {
    process();
}

function getItems() {
    let result = createItems();
    allItem = result;
}

function createItems() {
    const ET_ONE_HOUR = 175 * 1000;
    const ET_EIGHT_HOUR = ET_ONE_HOUR * 8;
    const ET_ONE_DAY = ET_ONE_HOUR * 24;

    var startDate = null;
    var reportNum = 64;

    let result = [];

    for (var i = 0; i < reportNum; i++) {
        if (startDate == null) {
            startDate = new Date(getStartTime(new Date()));

        } else {
            startDate = new Date(startDate.getTime() + ET_EIGHT_HOUR)
        }

        let et = getET(startDate);
        let tmpElem = {};
        // console.log("startDate",startDate);
        // console.log("et",et);

        tmpElem["lt"] = startDate.getTime();
        tmpElem["et"] = et;
        tmpElem["anemos"] = ew.EurekaWeather.getWeather(ew.ZONE_EUREKA_ANEMOS, startDate);
        tmpElem["pagos"] = ew.EurekaWeather.getWeather(ew.ZONE_EUREKA_PAGOS, startDate);
        tmpElem["pyros"] = ew.EurekaWeather.getWeather(ew.ZONE_EUREKA_PYROS, startDate);
        tmpElem["hydatos"] = ew.EurekaWeather.getWeather(ew.ZONE_EUREKA_HYDATOS, startDate);
        tmpElem["dayornight1"] = getDayOrNight(et.getHours(), 0);
        tmpElem["dayornight2"] = getDayOrNight(et.getHours(), 1);
        result.push(tmpElem);
    }

    return result;
}

function getWeatherItems() {
    allWeatherItem = rawWeatherList;
    // console.log("allWeatherItem", allWeatherItem);

}

function process() {
    const dataTable = document.getElementById("weatherTable");
    let tmpTableInnerHTMLTag = "";

    let checkAnemos1 = document.getElementById("checkBoxAnemos1");
    let checkAnemos2 = document.getElementById("checkBoxAnemos2");
    let checkAnemos3 = document.getElementById("checkBoxAnemos3")
    let checkAnemos4 = document.getElementById("checkBoxAnemos4");
    let checkPagos1 = document.getElementById("checkBoxPagos1");
    let checkPagos2 = document.getElementById("checkBoxPagos2");
    let checkPagos3 = document.getElementById("checkBoxPagos3");
    let checkPagos4 = document.getElementById("checkBoxPagos4");
    let checkPagos5 = document.getElementById("checkBoxPagos5");
    let checkPagos6 = document.getElementById("checkBoxPagos6");
    let checkPyros1 = document.getElementById("checkBoxPyros1");
    let checkPyros2 = document.getElementById("checkBoxPyros2");
    let checkPyros3 = document.getElementById("checkBoxPyros3");
    let checkPyros4 = document.getElementById("checkBoxPyros4");
    let checkPyros5 = document.getElementById("checkBoxPyros5");
    let checkPyros6 = document.getElementById("checkBoxPyros6");
    let checkHydatos1 = document.getElementById("checkBoxHydatos1");
    let checkHydatos2 = document.getElementById("checkBoxHydatos2");
    let checkHydatos3 = document.getElementById("checkBoxHydatos3");
    let checkHydatos4 = document.getElementById("checkBoxHydatos4");
    let checkHydatos5 = document.getElementById("checkBoxHydatos5");

    const checkAnemos1Checked = checkAnemos1.checked;
    const checkAnemos2Checked = checkAnemos2.checked;
    const checkAnemos3Checked = checkAnemos3.checked;
    const checkAnemos4Checked = checkAnemos4.checked;
    const checkPagos1Checked = checkPagos1.checked;
    const checkPagos2Checked = checkPagos2.checked;
    const checkPagos3Checked = checkPagos3.checked;
    const checkPagos4Checked = checkPagos4.checked;
    const checkPagos5Checked = checkPagos5.checked;
    const checkPagos6Checked = checkPagos6.checked;
    const checkPyros1Checked = checkPyros1.checked;
    const checkPyros2Checked = checkPyros2.checked;
    const checkPyros3Checked = checkPyros3.checked;
    const checkPyros4Checked = checkPyros4.checked;
    const checkPyros5Checked = checkPyros5.checked;
    const checkPyros6Checked = checkPyros6.checked;
    const checkHydatos1Checked = checkHydatos1.checked;
    const checkHydatos2Checked = checkHydatos2.checked;
    const checkHydatos3Checked = checkHydatos3.checked;
    const checkHydatos4Checked = checkHydatos4.checked;
    const checkHydatos5Checked = checkHydatos5.checked;

    let currentDate = new Date();


    for (let i = 0; i < allItem.length; i++) {
        const elem = allItem[i];

        const tmpDate = new Date(elem.lt);

        let weatherIdAnemos = getWeatherIdByName(elem.anemos);
        let weatherIdPagos = getWeatherIdByName(elem.pagos);
        let weatherIdPyros = getWeatherIdByName(elem.pyros);
        let weatherIdHydatos = getWeatherIdByName(elem.hydatos);

        let weatherCellClassAnemos = "weatherCell";
        let weatherCellClassPagos = "weatherCell";
        let weatherCellClassPyros = "weatherCell";
        let weatherCellClassHydatos = "weatherCell";

        if (checkAnemos1Checked && weatherCodeMap[checkAnemos1.value] == weatherIdAnemos) weatherCellClassAnemos = "weatherCellSelected"
        if (checkAnemos2Checked && weatherCodeMap[checkAnemos2.value] == weatherIdAnemos) weatherCellClassAnemos = "weatherCellSelected"
        if (checkAnemos3Checked && weatherCodeMap[checkAnemos3.value] == weatherIdAnemos) weatherCellClassAnemos = "weatherCellSelected"
        if (checkAnemos4Checked && weatherCodeMap[checkAnemos4.value] == weatherIdAnemos) weatherCellClassAnemos = "weatherCellSelected"

        if (checkPagos1Checked && weatherCodeMap[checkPagos1.value] == weatherIdPagos) weatherCellClassPagos = "weatherCellSelected"
        if (checkPagos2Checked && weatherCodeMap[checkPagos2.value] == weatherIdPagos) weatherCellClassPagos = "weatherCellSelected"
        if (checkPagos3Checked && weatherCodeMap[checkPagos3.value] == weatherIdPagos) weatherCellClassPagos = "weatherCellSelected"
        if (checkPagos4Checked && weatherCodeMap[checkPagos4.value] == weatherIdPagos) weatherCellClassPagos = "weatherCellSelected"
        if (checkPagos5Checked && weatherCodeMap[checkPagos5.value] == weatherIdPagos) weatherCellClassPagos = "weatherCellSelected"
        if (checkPagos6Checked && weatherCodeMap[checkPagos6.value] == weatherIdPagos) weatherCellClassPagos = "weatherCellSelected"

        if (checkPyros1Checked && weatherCodeMap[checkPyros1.value] == weatherIdPyros) weatherCellClassPyros = "weatherCellSelected"
        if (checkPyros2Checked && weatherCodeMap[checkPyros2.value] == weatherIdPyros) weatherCellClassPyros = "weatherCellSelected"
        if (checkPyros3Checked && weatherCodeMap[checkPyros3.value] == weatherIdPyros) weatherCellClassPyros = "weatherCellSelected"
        if (checkPyros4Checked && weatherCodeMap[checkPyros4.value] == weatherIdPyros) weatherCellClassPyros = "weatherCellSelected"
        if (checkPyros5Checked && weatherCodeMap[checkPyros5.value] == weatherIdPyros) weatherCellClassPyros = "weatherCellSelected"
        if (checkPyros6Checked && weatherCodeMap[checkPyros6.value] == weatherIdPyros) weatherCellClassPyros = "weatherCellSelected"

        if (checkHydatos1Checked && weatherCodeMap[checkHydatos1.value] == weatherIdHydatos) weatherCellClassHydatos = "weatherCellSelected"
        if (checkHydatos2Checked && weatherCodeMap[checkHydatos2.value] == weatherIdHydatos) weatherCellClassHydatos = "weatherCellSelected"
        if (checkHydatos3Checked && weatherCodeMap[checkHydatos3.value] == weatherIdHydatos) weatherCellClassHydatos = "weatherCellSelected"
        if (checkHydatos4Checked && weatherCodeMap[checkHydatos4.value] == weatherIdHydatos) weatherCellClassHydatos = "weatherCellSelected"
        if (checkHydatos5Checked && weatherCodeMap[checkHydatos5.value] == weatherIdHydatos) weatherCellClassHydatos = "weatherCellSelected"

        let timeProcessStyle = "";
        let currentTimeProcessDivTag = "";

        if (currentDate.getTime() < elem.lt) {
            timeProcessStyle = "timeprocessFuture";
        } else if ((currentDate.getTime() >= elem.lt) && (currentDate.getTime() < (elem.lt + 23 * 60 * 1000 + 20 * 1000))) {
            timeProcessStyle = "timeprocessCurrent";
            currentTimeProcessDivTag = "<div id='currentPassed'>&nbsp;</div><div id='currentFuture'>&nbsp;</div>";

        } else {
            timeProcessStyle = "timeprocessPassed";

        }

        let additionalStyleAmemosList = [];
        let additionalStylePagosList = [];
        let additionalStylePyrosList = [];
        let additionalStyleHydatosList = [];
        let additionalStyleList = [];

        if (i % 3 == 2) {
            additionalStyleAmemosList.push("border-bottom:2px #666 dashed");
            additionalStylePagosList.push("border-bottom:2px #666 dashed");
            additionalStylePyrosList.push("border-bottom:2px #666 dashed");
            additionalStyleHydatosList.push("border-bottom:2px #666 dashed");
            additionalStyleList.push("border-bottom:2px #666 dashed");
        }
        if (i % 3 == 1) {
            // additionalStyleList.push("padding-top:0em; padding-bottom:0em");
        }
        if (currentDate.getTime() > (elem.lt + 23 * 60 * 1000 + 20 * 1000)) {

            if (weatherCellClassAnemos != "weatherCellSelected") {
                additionalStyleAmemosList.push("background-color:#BBBBBB");
            }
            if (weatherCellClassPagos != "weatherCellSelected") {
                additionalStylePagosList.push("background-color:#BBBBBB");
            }
            if (weatherCellClassPyros != "weatherCellSelected") {
                additionalStylePyrosList.push("background-color:#BBBBBB");
            }
            if (weatherCellClassHydatos != "weatherCellSelected") {
                additionalStyleHydatosList.push("background-color:#BBBBBB");
            }

            additionalStyleList.push("background-color:#BBBBBB");

        }
        let additionalStyleAnemosTag = "";
        let additionalStylePagosTag = "";
        let additionalStylePyrosTag = "";
        let additionalStyleHydatosTag = "";
        let additionalStyleTag = "";

        // Amemos
        additionalStyleAmemosList.forEach(addStyle => {
            additionalStyleAnemosTag += addStyle + ";";
        });
        additionalStyleAnemosTag = " style='" + additionalStyleAnemosTag + "'";

        //Pagos
        additionalStylePagosList.forEach(addStyle => {
            additionalStylePagosTag += addStyle + ";";
        });
        additionalStylePagosTag = " style='" + additionalStylePagosTag + "'";

        // Pyros
        additionalStylePyrosList.forEach(addStyle => {
            additionalStylePyrosTag += addStyle + ";";
        });
        additionalStylePyrosTag = " style='" + additionalStylePyrosTag + "'";

        // Hydatos
        additionalStyleHydatosList.forEach(addStyle => {
            additionalStyleHydatosTag += addStyle + ";";
        });
        additionalStyleHydatosTag = " style='" + additionalStyleHydatosTag + "'";

        // Others
        additionalStyleList.forEach(addStyle => {
            additionalStyleTag += addStyle + ";";
        });
        additionalStyleTag = " style='" + additionalStyleTag + "'";

        // console.log("elem", elem);
        // console.log("elem.et", elem.et);


        let timeProcess = "<td rowspan='2'" + additionalStyleTag + " class='" + timeProcessStyle + "'>" + currentTimeProcessDivTag + "</td>";
        let ltTdTag = "<td rowspan='2' class='weatherTimeLTCell'" + additionalStyleTag + ">" + spacing(tmpDate.getHours(), " ") + ":" + spacing(tmpDate.getMinutes(), "0") + "</td>";
        let etTdTag = "<td rowspan='2' class='weatherTimeETCell'" + additionalStyleTag + ">" + elem.et.toString().substr(0, 5) + "</td>";
        let NorDTdTag1 = "<td rowspan='1'" + "" + " class='" + (elem.dayornight1 == 0 ? "daycell" : "nightcell") + "'>&nbsp;</td>";
        let NorDTdTag2 = "<td rowspan='1'" + "" + " class='" + (elem.dayornight2 == 0 ? "daycell" : "nightcell") + "'>&nbsp;</td>";
        let anemosTdTag = "<td rowspan='2'" + additionalStyleAnemosTag + " class='" + weatherCellClassAnemos + "'><div class='cellDiv'><img src='icons" + getWeatherDataById(weatherIdAnemos).path + "' class='weatherIcon' />" + elem.anemos + "</div>" + "</td>";
        let pagosTdTag = "<td rowspan='2'" + additionalStylePagosTag + " class='" + weatherCellClassPagos + "'><div class='cellDiv'><img src='icons" + getWeatherDataById(weatherIdPagos).path + "' class='weatherIcon' />" + elem.pagos + "</div>" + "</td>";
        let pyrosTdTag = "<td rowspan='2'" + additionalStylePyrosTag + " class='" + weatherCellClassPyros + "'><div class='cellDiv'><img src='icons" + getWeatherDataById(weatherIdPyros).path + "' class='weatherIcon' />" + elem.pyros + "</div>" + "</td>";
        let hydatosTdTag = "<td rowspan='2'" + additionalStyleHydatosTag + " class='" + weatherCellClassHydatos + "'><div class='cellDiv'><img src='icons" + getWeatherDataById(weatherIdHydatos).path + "' class='weatherIcon' />" + elem.hydatos + "</div>" + "</td>";

        let trTag1 = "<tr>" + timeProcess + ltTdTag + etTdTag + NorDTdTag1 + anemosTdTag + pagosTdTag + pyrosTdTag + hydatosTdTag + "</tr>";
        let trTag2 = "<tr>" + NorDTdTag2 + "</tr>";

        //console.log(trTag1 + trTag2);

        // let trTag1 = "<tr></tr>";
        // let trTag2 = "<tr></tr>";


        tmpTableInnerHTMLTag += trTag1;
        tmpTableInnerHTMLTag += trTag2;
    };


    dataTable.innerHTML = "";

    // dataTable.appendChild(initTR1);
    dataTable.appendChild(initTR2);
    dataTable.innerHTML += tmpTableInnerHTMLTag;

    // checkAnemos1 = document.getElementById("checkBoxAnemos1");
    // checkAnemos2 = document.getElementById("checkBoxAnemos2");
    // checkAnemos3 = document.getElementById("checkBoxAnemos3")
    // checkAnemos4 = document.getElementById("checkBoxAnemos4");
    // checkPagos1 = document.getElementById("checkBoxPagos1");
    // checkPagos2 = document.getElementById("checkBoxPagos2");
    // checkPagos3 = document.getElementById("checkBoxPagos3");
    // checkPagos4 = document.getElementById("checkBoxPagos4");
    // checkPagos5 = document.getElementById("checkBoxPagos5");
    // checkPagos6 = document.getElementById("checkBoxPagos6");
    // checkPyros1 = document.getElementById("checkBoxPyros1");
    // checkPyros2 = document.getElementById("checkBoxPyros2");
    // checkPyros3 = document.getElementById("checkBoxPyros3");
    // checkPyros4 = document.getElementById("checkBoxPyros4");
    // checkPyros5 = document.getElementById("checkBoxPyros5");
    // checkPyros6 = document.getElementById("checkBoxPyros6");
    // checkHydatos1 = document.getElementById("checkBoxHydatos1");
    // checkHydatos2 = document.getElementById("checkBoxHydatos2");
    // checkHydatos3 = document.getElementById("checkBoxHydatos3");
    // checkHydatos4 = document.getElementById("checkBoxHydatos4");
    // checkHydatos5 = document.getElementById("checkBoxHydatos5");

    // checkAnemos1.checked = checkAnemos1Checked;
    // checkAnemos2.checked = checkAnemos2Checked;
    // checkAnemos3.checked = checkAnemos3Checked;
    // checkAnemos4.checked = checkAnemos4Checked;
    // checkPagos1.checked = checkPagos1Checked;
    // checkPagos2.checked = checkPagos2Checked;
    // checkPagos3.checked = checkPagos3Checked;
    // checkPagos4.checked = checkPagos4Checked;
    // checkPagos5.checked = checkPagos5Checked;
    // checkPagos6.checked = checkPagos6Checked;
    // checkPyros1.checked = checkPyros1Checked;
    // checkPyros2.checked = checkPyros2Checked;
    // checkPyros3.checked = checkPyros3Checked;
    // checkPyros4.checked = checkPyros4Checked;
    // checkPyros5.checked = checkPyros5Checked;
    // checkPyros6.checked = checkPyros6Checked;
    // checkHydatos1.checked = checkHydatos1Checked;
    // checkHydatos2.checked = checkHydatos2Checked;
    // checkHydatos3.checked = checkHydatos3Checked;
    // checkHydatos4.checked = checkHydatos4Checked;
    // checkHydatos5.checked = checkHydatos5Checked;

    updateCurrentProcess(currentDate);

}

function spacing(num, spacer) {
    return num < 10 ? spacer + num : num;
}

function getWeatherIdByName(name) {
    for (let i = 0; i < allWeatherItem.length; i++) {
        if (allWeatherItem[i].name == name) {
            return allWeatherItem[i].id;
        }
    }
    return 9999;
}

function getWeatherDataById(id) {
    for (let i = 0; i < allWeatherItem.length; i++) {
        if (allWeatherItem[i].id == id) {
            return allWeatherItem[i];
        }
    }
    return null;
}

function updateTime() {
    showLocalTime();
    showEtTime();
}

function showLocalTime() {
    let currentTime = new Date();
    localTimeElement.innerHTML = "LT：" + spacing(currentTime.getHours(), "0") + ":" + spacing(currentTime.getMinutes(), "0") + ":" + spacing(currentTime.getSeconds(), "0");
    // eorzeaTimeElement.innerHTML = "ET：" + spacing(currentTime.getHours(),"0") + ":" + spacing(currentTime.getMinutes(),"0") + ":" + spacing(currentTime.getSeconds(),"0");

    const eorzeaTime = new EorzeaTime();
    const eorzeaTimeStr = eorzeaTime.toString().substr(0, 5);

    //console.log("eorzeaTimeStr",eorzeaTimeStr);

    if (eorzeaTimeStr == "00:00"
        || eorzeaTimeStr == "08:00"
        || eorzeaTimeStr == "016:00") {
        // console.log("# process() by et from et");
        process();
        //setTimeout(process, 0);

    }

}

function showEtTime() {
    var eorzeaTime = new EorzeaTime();
    eorzeaTimeElement.textContent = "ET：" + eorzeaTime.toString().substr(0, 5);

    updateCurrentProcess(new Date())
}

function getET(date) {
    let result = new EorzeaTime(new Date(date));
    // console.log("getET", result);

    return result;
}

function createEtStr(date) {
    let et = getEt(date);
    eorzeaTimeElement.innerHTML = "ET：" + et.substr(0, 5) + "&nbsp;&nbsp;&nbsp;";
}

function updateCurrentProcess(_currentDate) {

    const currentPassedElement = document.getElementById("currentPassed");
    const currentFutureElement = document.getElementById("currentFuture");

    let passedHeight = "100%";
    let futureHeight = "0%";

    // console.log("_currentDate" , _currentDate);

    const currentDateMills = _currentDate.getTime();
    const startDateMills = getWeatherStartTime(new Date(_currentDate));
    const endDateMills = startDateMills + 23 * 60 * 1000 + 20 * 1000;

    // console.log("currentDateMills", new Date(currentDateMills));
    // console.log("startDateMills", new Date(startDateMills));
    // console.log("endDateMills", new Date(endDateMills));

    const passedMills = currentDateMills - startDateMills;
    const futureMills = endDateMills - currentDateMills;
    // console.log("passedMills", (passedMills / 1000));
    // console.log("futureMills", (futureMills / 1000));

    const fullMills = 23 * 60 * 1000 + 20 * 1000;
    const passedPercent = Math.round(100 * passedMills / fullMills) + "%";
    const futurePercent = Math.round(100 * futureMills / fullMills) + "%";

    // console.log("passed %:", passedPercent);
    // console.log("future %:", futurePercent);

    if (currentPassedElement != undefined) {
        currentPassedElement.style.height = passedPercent;
    }
    if (currentFutureElement != undefined) {
        currentFutureElement.style.height = futurePercent;
    }

}

function getStartTime(_date) {
    const msec = _date.getTime() - 2 * (70 * 60 * 1000);
    const startMsec = msec - (_date.getTime() % (2 * 70 * 60 * 1000));

    // console.log("startMsec", startMsec);
    // console.log("new Date(startMsec)", new Date(startMsec));
    return startMsec;
};

function getWeatherStartTime(_date) {
    const oneHour = 175 * 1000;
    let msec = _date.getTime();

    const bell = (msec / oneHour) % 8;
    const startMsec = msec - Math.round(oneHour * bell);
    return startMsec;
};


// /**
//  * 0:day
//  * 1:nigiht
//  */
function getDayOrNight(et, code) {
    // console.log("et is " + et);
    if (et == "00") {
        return code == 0 ? 1 : 0;
    } else if (et == "08") {
        return 0;
    } else if (et == "16") {
        return code == 0 ? 0 : 1;
    } else {
        console.error("ETが不正です");
    }
    return 9;
}


const weatherCodeMap = {
    "11": 2,
    "12": 15,
    "13": 8,
    "14": 6,
    "21": 2,
    "22": 15,
    "23": 16,
    "24": 4,
    "25": 9,
    "26": 14,
    "31": 2,
    "32": 15,
    "33": 16,
    "34": 49,
    "35": 9,
    "36": 14,
    "41": 2,
    "42": 15,
    "43": 8,
    "44": 10,
    "45": 27,

}

