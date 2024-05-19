export default function Cards(img, title, descp) {
    return (
        <div className="card w-96 glass">
            <figure><img src={img} alt={title} /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{descp}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Hire!</button>
                </div>
            </div>
        </div>
    )
}
