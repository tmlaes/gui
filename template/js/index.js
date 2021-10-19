//着色
window.TAB = "    ";
function IsArray(obj) {
    return obj &&
        typeof obj === 'object' &&  typeof obj.length === 'number' && !(obj.propertyIsEnumerable('length'));
}

function Format() {
    var json = $('#json-input').val();
    var html = "";
    try {
        if (json == "") {
            json = '""';
        }
        var obj = eval("[" + json + "]");
        html = ProcessObject(obj[0], 0, false, false, false);
        document.getElementById("Canvas").innerHTML = "<pre class='CodeContainer'>" + html + "</pre>";
    } catch(e) {
        document.getElementById("Canvas").innerHTML = "json语法错误，不能格式化。错误信息:\n" + e.message;
    }
}

function ProcessObject(obj, indent, addComma, isArray, isPropertyContent) {
    var html = "";
    var comma = (addComma) ? "<span class='Comma'>,</span> ": "";
    var type = typeof obj;
    if (IsArray(obj)) {
        if (obj.length == 0) {
            html += GetRow(indent, "<span class='ArrayBrace'>[ ]</span>" + comma, isPropertyContent);
        } else {
            html += GetRow(indent, "<span class='ArrayBrace'>[</span>", isPropertyContent);
            for (var i = 0; i < obj.length; i++) {
                html += ProcessObject(obj[i], indent + 1, i < (obj.length - 1), true, false);
            }
            html += GetRow(indent, "<span class='ArrayBrace'>]</span>" + comma);
        }
    } else {
        if (type == "object" && obj == null) {
            html += FormatLiteral("null", "", comma, indent, isArray, "Null");
        } else {
            if (type == "object") {
                var numProps = 0;
                for (var prop in obj) {
                    numProps++;
                }
                if (numProps == 0) {
                    html += GetRow(indent, "<span class='ObjectBrace'>{ }</span>" + comma, isPropertyContent)
                } else {
                    html += GetRow(indent, "<span class='ObjectBrace'>{</span>", isPropertyContent);
                    var j = 0;
                    for (var prop in obj) {
                        html += GetRow(indent + 1, '<span class="PropertyName">"' + prop + '"</span>: ' + ProcessObject(obj[prop], indent + 1, ++j < numProps, false, true))
                    }
                    html += GetRow(indent, "<span class='ObjectBrace'>}</span>" + comma);
                }
            } else {
                if (type == "number") {
                    html += FormatLiteral(obj, "", comma, indent, isArray, "Number");
                } else {
                    if (type == "boolean") {
                        html += FormatLiteral(obj, "", comma, indent, isArray, "Boolean");
                    } else {
                        if (type == "function") {
                            obj = FormatFunction(indent, obj);
                            html += FormatLiteral(obj, "", comma, indent, isArray, "Function");
                        } else {
                            if (type == "undefined") {
                                html += FormatLiteral("undefined", "", comma, indent, isArray, "Null");
                            } else {
                                html += FormatLiteral(obj, '"', comma, indent, isArray, "String");
                            }
                        }
                    }
                }
            }
        }
    }
    return html;
};

function FormatLiteral(literal, quote, comma, indent, isArray, style) {
    if (typeof literal == "string") {
        literal = literal.split("<").join("<").split(">").join(">");
    }
    var str = "<span class='" + style + "'>" + quote + literal + quote + comma + "</span>";
    if (isArray) {
        str = GetRow(indent, str);
    }
    return str;
}
function FormatFunction(indent, obj) {
    var tabs = "";
    for (var i = 0; i < indent; i++) {
        tabs += window.TAB;
    }
    var funcStrArray = obj.toString().split("\n");
    var str = "";
    for (var i = 0; i < funcStrArray.length; i++) {
        str += ((i == 0) ? "": tabs) + funcStrArray[i] + "\n";
    }
    return str;
}
function GetRow(indent, data, isPropertyContent) {
    var tabs = "";
    for (var i = 0; i < indent && !isPropertyContent; i++) {
        tabs += window.TAB;
    }
    if (data != null && data.length > 0 && data.charAt(data.length - 1) != "\n") {
        data = data + "\n";
    }
    return tabs + data;
};