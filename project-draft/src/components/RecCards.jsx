import React from "react";

export function RecCards() {
    return (
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card horizontal-card card h-100">
                <img class="card-img-left" src="img/ugly.jpg" alt="a picture of a cafe indoor" />
                <div class="card-body d-flex flex-column text-center justify-content-center">
                    <h2 class="card-title fs-5 fs-md-4">Recommended Study Space - Ugly Mug Cafe</h2>
                    <p class="card-text fs-6 fs-md-5">❤️❤️❤️🤍🤍</p>
                    <button class="btn btn-dark w-100 desc-btn">Review Description</button>
                    <button class="btn btn-dark w-100 add-list">Add to List</button>
                </div>
            </div>
        </div>
    )
}