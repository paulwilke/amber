exports.libPath = __dirname;

exports.nodeShebang = "#!/usr/bin/env node";

exports.nodeWrap = function (id) {
    var wrap = exports.nodeWrapWithoutShebang(id);
    wrap.start = exports.nodeShebang + "\n" + wrap.start;
    return wrap;
};

exports.nodeWrapWithoutShebang = function (id) {
    var wrapSource = JSON.stringify('_wrap_' + id),
        idSource = JSON.stringify(id);
    return {
        start: "(function(define){\n" +
        "define(" + wrapSource + ", function (require) {\n",
        end: "require(" + idSource + ");\n" +
        "});\n" +
        "define.require(" + wrapSource + ");\n" +
        "}(" +
        require("amdefine") +
        "(module)));"
    };
};
