function getParam() {
    // var currentUrl = location.href;
    // var urlText = "";
    // var parameterText = "";
    // if (currentUrl.indexOf('?') !== -1) {
    //     urlText = currentUrl.substring(0, currentUrl.indexOf('?'));
    //     parameterText = currentUrl.substring(currentUrl.indexOf('?') + 1, currentUrl.length);
    // } else {
    //     urlText = currentUrl;
    // }
    // document.getElementById("urlText").innerHTML = urlText;
    //
    // var parameterList = parameterText.split('&');
    // var innerHtml = "";
    // var paramIndex = 0;
    // for (var i_1 = 0; i_1 < parameterList.length; i_1++) {
    //     if (parameterList[i_1] !== '') {
    //         var paramKV = parameterList[i_1].split('=');
    //         var paramK = paramKV[0];
    //         var paramV = (paramKV[1]) ? decodeURIComponent(paramKV[1]) : "";
    //         innerHtml += "\n" +
    //             "                <tr scope=\"row\">\n" +
    //             "                    <th scope=\"row\">\n" +
    //             "                        <input type=\"checkbox\" id=\"c_" + paramIndex + "\" checked/>\n" +
    //             "                    </th>\n" +
    //             "                    <td><input type=\"text\" id=\"k_" + paramIndex + "\" value=\"" + paramK + "\" style='width: 100px'/></td>\n" +
    //             "                    <td><input type=\"text\" id=\"v_" + paramIndex + "\" value=\"" + paramV + "\" style='width: 250px'/></td>\n" +
    //             "                </tr>";
    //         paramIndex++;
    //     }
    // }
    // document.getElementById("parameterList").innerHTML = innerHtml;


    chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
        var url = tabs[0].url;

        var currentUrl = url;
        var urlText = "";
        var parameterText = "";
        if (currentUrl.indexOf('?') !== -1) {
            urlText = currentUrl.substring(0, currentUrl.indexOf('?'));
            parameterText = currentUrl.substring(currentUrl.indexOf('?') + 1, currentUrl.length);
        } else {
            urlText = currentUrl;
        }
        document.getElementById("urlText").innerHTML = urlText;

        var parameterList = parameterText.split('&');
        var innerHtml = "";
        var paramIndex = 0;
        for (var i_1 = 0; i_1 < parameterList.length; i_1++) {
            if (parameterList[i_1] !== '') {
                var paramKV = parameterList[i_1].split('=');
                var paramK = paramKV[0];
                var paramV = (paramKV[1]) ? decodeURIComponent(paramKV[1]) : "";
                innerHtml += "\n" +
                    "                <tr scope=\"row\">\n" +
                    "                    <th scope=\"row\">\n" +
                    "                        <input type=\"checkbox\" id=\"c_" + paramIndex + "\" checked/>\n" +
                    "                    </th>\n" +
                    "                    <td><input type=\"text\" id=\"k_" + paramIndex + "\" value=\"" + paramK + "\" style='width: 100px'/></td>\n" +
                    "                    <td><input type=\"text\" id=\"v_" + paramIndex + "\" value=\"" + paramV + "\" style='width: 250px'/></td>\n" +
                    "                </tr>";
                paramIndex++;
            }
        }
        document.getElementById("parameterList").innerHTML = innerHtml;
    });
}

function allCehck() {
    checkboxParamList = document.querySelectorAll('input[id^="c_"]');
    for (var i = 0; i < checkboxParamList.length; i++) {
        if (document.getElementById("allCheck").checked) {
            checkboxParamList[i].checked = true;
        } else {
            checkboxParamList[i].checked = false;
        }
    }
}

function makeURI() {
    var url = document.getElementById("urlText").innerHTML;
    var paramString = "?";
    checkboxParamList = document.querySelectorAll('input[id^="c_"]');
    var paramCount = 0;
    for (var i = 0; i < checkboxParamList.length; i++) {
        if (checkboxParamList[i].checked) {
            var key = document.getElementById("k_" + i).value;
            var value = document.getElementById("v_" + i).value;
            if (paramCount !== 0) paramString += '&';
            paramString += key + "=" + encodeURIComponent(value);
            paramCount++;
        }
    }
    document.getElementById("makeURI").value = url + paramString;
}

function paramPlus() {
    var insertIndex = document.querySelectorAll('input[id^="c_"]').length;
    var innerHtml = "";
    innerHtml += "\n" +
        "                <tr scope=\"row\">\n" +
        "                    <th scope=\"row\">\n" +
        "                        <input type=\"checkbox\" id=\"c_" + insertIndex + "\" checked/>\n" +
        "                    </th>\n" +
        "                    <td><input type=\"text\" id=\"k_" + insertIndex + "\" value=\"\" style='width: 100px'/></td>\n" +
        "                    <td><input type=\"text\" id=\"v_" + insertIndex + "\" value=\"\" style='width: 250px'/></td>\n" +
        "                </tr>";
    appendHtml(document.getElementById("parameterList"), innerHtml);
}

function appendHtml(el, str) {
    var table = document.createElement('table');
    table.innerHTML = str;
    var tbody = table.children[0];
    while (tbody.children.length > 0) {
        el.appendChild(tbody.children[0]);
    }
}

window.onload = function () {
    getParam();
};

document.getElementById("allCheck").onclick = function () {
    allCehck()
};

document.getElementById("makeURIButton").onclick = function () {
    makeURI()
};

document.getElementById("paramPlusButton").onclick = function () {
    paramPlus()
};