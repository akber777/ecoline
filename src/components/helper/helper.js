
import renderHTML from "react-render-html"



export const checkType = (data) => {

    // endResult.push(data.replace(myRegex, `<img src=${item} />`))

    let myRegex = /<img.*?src="(.*?)"[^>]+>/g;


    let result = data.search(myRegex)


    if (result > -1) {


        let myData = data.replaceAll('/storage/', 'http://apiecoline.gocreative.az/storage/')


        return renderHTML(myData)
    }




}