import Router from "next/router";

const ThankYou = () => {
    return <div className="thanks">
        <div>{`Thank You!`}</div>
        <span>{`Payment done Successfully`}</span>
        <span>{`Click here to return to home page`}</span>
        <input type="button" value="Return to store" onClick={()=>{
            Router.push("/")
        }}/>
    </div>
}

export default ThankYou