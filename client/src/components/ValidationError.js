import React from "react" 

const ValidationError = ({errors})=>{
    return (
        <div className="grid-66">
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
                <ul>
                {
                    errors.map((data,key) => <li key={key}>{data}</li>)
                }
                </ul>
            </div>
        </div>
    )
}

export default ValidationError;