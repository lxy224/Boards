const object ={}
object.handleCookie=() =>{
       return document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    }


export default object