function getParam() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
        let url = tabs[0].url;

        let currentUrl = url;
        let urlText = "";
        let parameterText = "";
        if (currentUrl.indexOf('?') !== -1) {
            urlText = currentUrl.substring(0, currentUrl.indexOf('?'));
            parameterText = currentUrl.substring(currentUrl.indexOf('?') + 1, currentUrl.length);
        } else {
            urlText = currentUrl;
        }
        document.getElementById("urlText").innerHTML = urlText;

        let parameterList = parameterText.split('&');
        let innerHtml = "";
        let paramIndex = 0;
        for (let i_1 = 0; i_1 < parameterList.length; i_1++) {
            if (parameterList[i_1] !== '') {
                let paramKV = parameterList[i_1].split('=');
                let paramK = (paramKV[0]) ? decodeURIComponent(paramKV[0]) : "";
                let paramV = (paramKV[1]) ? decodeURIComponent(paramKV[1]) : "";
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
    let checkboxParamList = document.querySelectorAll('input[id^="c_"]');
    for (let i = 0; i < checkboxParamList.length; i++) {
        if (document.getElementById("allCheck").checked) {
            checkboxParamList[i].checked = true;
        } else {
            checkboxParamList[i].checked = false;
        }
    }
}

function makeURI() {
    let url = document.getElementById("urlText").innerHTML;
    let paramString = "?";
    let checkboxParamList = document.querySelectorAll('input[id^="c_"]');
    let paramCount = 0;
    for (let i = 0; i < checkboxParamList.length; i++) {
        if (checkboxParamList[i].checked) {
            let key = document.getElementById("k_" + i).value;
            let value = document.getElementById("v_" + i).value;
            if (paramCount !== 0) paramString += '&';
            paramString += encodeURIComponent(key) + "=" + encodeURIComponent(value);
            paramCount++;
        }
    }
    document.getElementById("makeURI").value = url + paramString;

    // url redirect
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
        chrome.tabs.update(
            {url: url + paramString}
        );
    });
}

function paramPlus() {
    let insertIndex = document.querySelectorAll('input[id^="c_"]').length;
    let innerHtml = "";
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
    let table = document.createElement('table');
    table.innerHTML = str;
    let tbody = table.children[0];
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