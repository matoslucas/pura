import ReactDOM from 'react-dom';
/**
 * Handles the errors received and determines the first element
 * containing the error as the 'key' element, so that,
 * it's positions can be determined
 * Scrolls the page that element to bring into visibility
 * And focuses on the element
 * Requires developers to use 'ref' attribute with 'name' in form fields
 * @param  {[object]} errors
 * @return {[undefined]}
 */

export function handleSubmitFail(errors) {
    console.info('teste', refsKeys);
    if (!this.refs) {
        return;
    }
    const refsKeys = Object.keys(this.refs);
    const keys = Object.keys(errors);
    let key = null;
    let matchfound = false;

    

    refsKeys.filter(item => {
        if (keys.indexOf(item) > -1 && !matchfound) {
            key = item;
            matchfound = true;
            return false;
        } else { // eslint-disable-line no-else-return
            return true;
        }
    });

    this.targetNode = this.refs[key];

    if (this.targetNode) {
        const node = ReactDOM.findDOMNode(this.targetNode);
        const parentNode = ReactDOM.findDOMNode(this);
        const xy = node.getBoundingClientRect();
        this.x = xy.right + window.scrollX;
        this.y = xy.top + window.scrollY - 60;
        parentNode && parentNode.scrollTo && parentNode.scrollTo(this.x, this.y) || 
        (parentNode && parentNode.scrollTop && (parentNode.scrollTop = this.y) ) || 
        window && window.scrollTo(this.x, this.y); // eslint-disable-line no-unused-expressions
    }
}