export function ListCard({ listData }) {


    return (
        <div className="card horizontal-card">
            <img src={listData.img} alt="image failed to load" />
            <div className="card-text">
                <h3>{listData.name}</h3>
                <p>{listData.size}</p>
                <p>{listData.description}</p>
            </div>
        </div>
    )
}