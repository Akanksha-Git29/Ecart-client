import React from "react";
import reactDom from "react-dom";
import App from '../App'

it("renders without cashes",()=>{
    const div = document.createElement("div")
    reactDom.render(<App/>,div)
    reactDom.unmountComponentAtNode(div)
})