import React, { Component, useEffect } from "react";
import { Card, CardBody, CardContent } from "../components/Card";
import Picture from "./AddPicture";
import API from "../utils/API";

function Gallery() {
   const [pictureUrl, setPictureUrl] = useState();
   const [caption, setCaption] = useState();
   const {id} = useParams()


   useEffect(() => {
    API.getPictures(id)
    .then(pictureUrl => {
        console.log(pictureUrl)
    })
   });

        return (
            <Container>
                <Card>
                    <CardBody>
                        "Hello World!"
                    </CardBody>
                </Card>
            </Container>
        )
    }


export default Gallery;