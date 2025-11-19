import React from "react";

export function RecCards({ data }) {
    const recCards = data.map(log => <RecCard key={log.name} logData={log} />)

    return (
        <div className="rec-log container py-5"> 
            <h2 className="log-title">Daily Recommended Logs</h2>
            <div className="row g-4">
                {recCards}
            </div>
        </div>
    )
}

function RecCard({ logData }) {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card horizontal-card card h-100">
                <img className="card-img-left" src={logData.img} alt="a picture of a cafe indoor" />
                <div className="card-body d-flex flex-column text-center justify-content-center">
                    <h2 className="card-title fs-5 fs-md-4">Recommended {logData.category} - {logData.name}</h2>
                    <p className="card-text fs-6 fs-md-5">{logData.rating}/5</p>
                    <button className="btn btn-dark w-100 desc-btn">Review Description</button>
                    <button className="btn btn-dark w-100 add-list">Add to List</button>
                </div>
            </div>
        </div>
    )
}