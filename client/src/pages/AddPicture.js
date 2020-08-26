import React, { useState } from "react";
import API from "../utils/API";
import { Row, Col, Container } from "../components/Grid"; 
import { Input, Label, FormGroup, FormBtn } from "../components/Form";

function Picture() {

    const [pictureUrl, setPictureUrl] = useState();
    const [caption, setCaption] = useState();

    function uploadPicture() {
        filepicker.pick(
            {
                mimetype: 'image/*',
                container: 'modal',
                services: ['COMPUTER', 'FACEBOOK', 'INSTAGRAM', 'URL', 'IMGUR', 'PICASA'],
                openTo: 'COMPUTER'
            },
            function (Blob) {
                console.log(JSON.stringify(Blob));
                const handler = Blob.url.substring(Blob.url.lastIndexOf('/') + 1);
                document.getElementById('button-upload').dataset.handler = handler;
            },
            function (FPError) {
                console.log(FPError.toString());
            }
        );
    }

    function handleInputChange(event) {
        const { value } = event.target;
        const handler = document.getElementById('button-upload').dataset.handler;
        setCaption(value);
        setPictureUrl(handler);
    }

    function addToGallery(event) {
        event.preventDefault();
        API.addPicture({
            pictureUrl: pictureUrl,
            caption: caption
        })
            .then(res => console.log("Your picture was upload successfully!"))
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Row className='mt-2'>
                <form>
                    <Row>
                        <Col size='md-6'>
                            <FormGroup>
                                <Label text='Add a caption' />
                                <Input
                                    name='caption'
                                    value={caption}
                                    onChange={handleInputChange}
                                    placeholder='Caption This Photo'
                                />
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label text='Picture' />
                                <FormBtn 
                                id="button-upload" 
                                type="button" 
                                className="btn btn-default filepicker" 
                                onClick={() => uploadPicture()}
                                />
                            </FormGroup>
                        </Col>
                        <FormBtn
						text='Upload Picture'
						onClick={addToGallery}
						classes='btn-primary'
					/>
                    </Row>
                </form>
            </Row>
        </Container>
    )

}

export default Picture;