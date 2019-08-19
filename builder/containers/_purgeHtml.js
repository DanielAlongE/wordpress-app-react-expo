const htmlparser2 = require("htmlparser2");


const purgeHtml = (html) => {

    var collect = '';

    const parser = new htmlparser2.Parser(
        {
            //onopentag(name, attribs) {
                //console.log(name, attribs);
            //},
            ontext(text) {
                //console.log("-->", text);
                collect += text;
            },
            //onclosetag(tagname) {
                    //console.log(">", tagname);
            //}
        },
        { decodeEntities: true }
    );
    parser.write(
        html
    );
    parser.end();

    return collect;
}

export default purgeHtml;