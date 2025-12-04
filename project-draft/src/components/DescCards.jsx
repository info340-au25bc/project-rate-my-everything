import React from "react";

export function DescCards({ data }) {
    const descCards = data.map(log => <RecCar key={log.name} logData={log}/>);
    
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card horizontal-card card h-100">
                <img className="card-img-left" src={descCards.img} alt="a picture of a cafe indoor" />
                <div className="card-body d-flex flex-column text-center justify-content-center">
                    <section class="card-header-section">
                        <h2 className="card-title fs-5 fs-md-4">Recommended {descCards.category} - {descCards.name}</h2>
                    </section>
                    <p className="card-text fs-6 fs-md-5">{descCards.rating}/5</p>

                    <button className="btn btn-dark w-100 add-list">Add to List</button>
                </div>
            </div>
        </div>
    )
}