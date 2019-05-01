import React from 'react';

export default (props) => {
    return(
        <header>
            <div className="container-fluid">
                <div className="row">

                    <div className="col col-one">
                        <span className="add-icon" onClick={() => props.showModal()}></span>
                    </div>

                    <div className="col col-two">
                        <h1 className="title">Weather Widget Demo</h1>
                    </div>

                </div>
            </div>
        </header>
    )
}
