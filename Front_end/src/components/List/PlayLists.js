
import hinh from "./img/hinh.jpg"
import React from 'react';
import { MDBCarousel, MDBCarouselItem, MDBCarouselCaption } from 'mdb-react-ui-kit';

export function PlayList() {

    return (
        <>
            <div className="container">
                <MDBCarousel showIndicators showControls fade>
                    <MDBCarouselItem itemId={1}>
                        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100' alt='...' />
                        <MDBCarouselCaption>
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId={2}>
                        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100' alt='...' />
                        <MDBCarouselCaption>
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>

                    <MDBCarouselItem itemId={3}>
                        <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100' alt='...' />
                        <MDBCarouselCaption>
                            <h5>Third slide label</h5>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </MDBCarouselCaption>
                    </MDBCarouselItem>
                </MDBCarousel>

                <h1>Play List</h1>
                <div className="card-deck">
                    <div className="card-deck">
                        <div className="card">
                            <img className="card-img-top" src={hinh} alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src="..." alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This card has supporting text below as a natural lead-in to
                                    additional content.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src="..." alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This card has even longer content than the first to
                                    show
                                    that equal height action.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src="..." alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This card has even longer content than the first to
                                    show
                                    that equal height action.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <img className="card-img-top" src="..." alt="Card image cap"/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This card has even longer content than the first to
                                    show
                                    that equal height action.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}