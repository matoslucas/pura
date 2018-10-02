export function getXmlData(xml) {
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(xml, "text/xml");
    return xmlDoc
}

export function getInnerHTML(xml, tag) {
    let toReturn = false;
        
    if (getXmlData(xml).getElementsByTagName(tag).length) {
        toReturn = getXmlData(xml).getElementsByTagName(tag)[0].innerHTML;
    }
    
    return toReturn;
}