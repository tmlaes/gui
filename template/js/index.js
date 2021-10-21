$(function() {
    function setSize() {
        let div_content= document.getElementById('json-content');
        let div_input = document.getElementById('json-input');
        div_input.clientWidth=div_content.clientWidth
        div_input.clientHeight=div_content.clientHeight
    };
    setSize()
    function renderJson() {
        try {
            var input = $('#json-input').val()
            if (!input) {
                $('#json-renderer').html("");
                return
            }
            var json = eval('[' + input + ']');
            return $('#json-renderer').jsonViewer(json);
        }
        catch (error) {
            return $('#json-renderer').html("json格式错误:\n" + error.message);
        }
    }
    $("#format_btn").click(function(){
        renderJson();
    });
    $("#compress_btn").click(function(){
        let json = $('#json-input').val();
        let html = json.replace(/\s*/g,"");
        $('#json-renderer').html("<pre class='TextContainer'>" + html + "</pre>");
    });
    $("#decode_btn").click(function(){
        let json = $('#json-input').val();
        let html = decodeURI(json.replace(/\s*/g,""));
        $('#json-renderer').html("<pre class='TextContainer'>" + html + "</pre>");
    });
    $("#json-input").on("change keyup paste", function() {
        renderJson()
    });
});