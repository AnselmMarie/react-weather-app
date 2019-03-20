import React from "react";

export default (props) => {
    return <div className="close-button" onClick={() => props.closeButton()}>X</div>;
}
