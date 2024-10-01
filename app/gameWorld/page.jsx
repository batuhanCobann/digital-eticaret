import Image from "next/image";

export default function GameWorld(){
    const cards = Array.from({length: 50})
    return (
        <div className="row">
      {cards.map((_, index) => (
        <div className="col-xl-3 col-md-4 col-sm-6" key={index}>
          <div className="card" style={{ width: "18rem" }}>
            <Image 
              src="/react--image.jpg" 
              className="card-img-top" 
              width={100} 
              height={200} 
              alt={`Card image ${index}`}
            />
            <div className="card-body">
              <h5 className="card-title text-center">Card title {index + 1}</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">An item</li>
              <li className="list-group-item">A second item</li>
              <li className="list-group-item">A third item</li>
            </ul>
            <div className="card-body">
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        </div>
      ))}
    </div>
    )
}