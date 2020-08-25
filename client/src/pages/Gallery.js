import React from "react";
import Picture from "./AddPicture";

function Gallery() {
    return (
        <Container>
            <div className="card" style="width: 25rem;">
                <img src="..." className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
            </div>
        </Container>
    )
}

export default Gallery;