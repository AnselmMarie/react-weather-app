import React from 'react';

export default (props) => {
    return(
        <nav>
            <div className="container-fluid">
                <div className="row">

                    <div className="col">
                        <span className="add-icon" onClick={() => props.showModal()}>+</span>
                        <h1 className="title">Weather Widget Demo</h1>
                    </div>

                </div>
            </div>
        </nav>
    )
}
