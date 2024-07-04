
import {MDBCarousel, MDBCarouselCaption, MDBCarouselItem} from "mdb-react-ui-kit";
import React from "react";
import hinh from "./img/hinh.jpg";


const Slider = () =>{
    return (
        <div className="container">
            <MDBCarousel showIndicators showControls fade>
                <MDBCarouselItem itemId={1}>
                    <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg' className='d-block w-100'
                         alt='...'/>
                    <MDBCarouselCaption>
                        <h5>First slide label</h5>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>

                <MDBCarouselItem itemId={2}>
                    <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg' className='d-block w-100'
                         alt='...'/>
                    <MDBCarouselCaption>
                        <h5>Second slide label</h5>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>

                <MDBCarouselItem itemId={3}>
                    <img src='https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg' className='d-block w-100'
                         alt='...'/>
                    <MDBCarouselCaption>
                        <h5>Third slide label</h5>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </MDBCarouselCaption>
                </MDBCarouselItem>
            </MDBCarousel>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="list">
                            <div className="list-item media-item hide-right full-left">
                                <div className="media-left">
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/e/a/4/cea474a0f04e7f6f733ac7c55abef969.jpg"
                                        alt="Don't"/>
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">Don't</h5>
                                    <p className="mb-1"><a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">LEE
                                        CHAE YEON</a></p>
                                    <p className="text-muted"><small>Hôm qua</small></p>
                                </div>
                                <div className="media-right">
                                    <button className="btn btn-outline-primary btn-sm"><i
                                        className="icon ic-like"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm"><i
                                        className="icon ic-more"></i> More
                                    </button>
                                    <span className="duration">02:51</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="list">
                            <div className="list-item media-item hide-right full-left">
                                <div className="media-left">
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/e/a/4/cea474a0f04e7f6f733ac7c55abef969.jpg"
                                        alt="Don't"/>
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">Don't</h5>
                                    <p className="mb-1"><a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">LEE
                                        CHAE YEON</a></p>
                                    <p className="text-muted"><small>Hôm qua</small></p>
                                </div>
                                <div className="media-right">
                                    <button className="btn btn-outline-primary btn-sm"><i
                                        className="icon ic-like"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm"><i
                                        className="icon ic-more"></i> More
                                    </button>
                                    <span className="duration">02:51</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="list">
                            <div className="list-item media-item hide-right full-left">
                                <div className="media-left">
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/e/a/4/cea474a0f04e7f6f733ac7c55abef969.jpg"
                                        alt="Don't"/>
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">Don't</h5>
                                    <p className="mb-1"><a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">LEE
                                        CHAE YEON</a></p>
                                    <p className="text-muted"><small>Hôm qua</small></p>
                                </div>
                                <div className="media-right">
                                    <button className="btn btn-outline-primary btn-sm"><i
                                        className="icon ic-like"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm"><i
                                        className="icon ic-more"></i> More
                                    </button>
                                    <span className="duration">02:51</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="list">
                            <div className="list-item media-item hide-right full-left">
                                <div className="media-left">
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/e/a/4/cea474a0f04e7f6f733ac7c55abef969.jpg"
                                        alt="Don't"/>
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">Don't</h5>
                                    <p className="mb-1"><a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">LEE
                                        CHAE YEON</a></p>
                                    <p className="text-muted"><small>Hôm qua</small></p>
                                </div>
                                <div className="media-right">
                                    <button className="btn btn-outline-primary btn-sm"><i
                                        className="icon ic-like"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm"><i
                                        className="icon ic-more"></i> More
                                    </button>
                                    <span className="duration">02:51</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="list">
                            <div className="list-item media-item hide-right full-left">
                                <div className="media-left">
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/e/a/4/cea474a0f04e7f6f733ac7c55abef969.jpg"
                                        alt="Don't"/>
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">Don't</h5>
                                    <p className="mb-1"><a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">LEE
                                        CHAE YEON</a></p>
                                    <p className="text-muted"><small>Hôm qua</small></p>
                                </div>
                                <div className="media-right">
                                    <button className="btn btn-outline-primary btn-sm"><i
                                        className="icon ic-like"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm"><i
                                        className="icon ic-more"></i> More
                                    </button>
                                    <span className="duration">02:51</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="list">
                            <div className="list-item media-item hide-right full-left">
                                <div className="media-left">
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/e/a/4/cea474a0f04e7f6f733ac7c55abef969.jpg"
                                        alt="Don't"/>
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">Don't</h5>
                                    <p className="mb-1"><a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">LEE
                                        CHAE YEON</a></p>
                                    <p className="text-muted"><small>Hôm qua</small></p>
                                </div>
                                <div className="media-right">
                                    <button className="btn btn-outline-primary btn-sm"><i
                                        className="icon ic-like"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm"><i
                                        className="icon ic-more"></i> More
                                    </button>
                                    <span className="duration">02:51</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="list">
                            <div className="list-item media-item hide-right full-left">
                                <div className="media-left">
                                    <img
                                        src="https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/c/e/a/4/cea474a0f04e7f6f733ac7c55abef969.jpg"
                                        alt="Don't"/>
                                </div>
                                <div className="media-body">
                                    <h5 className="mt-0">Don't</h5>
                                    <p className="mb-1"><a href="/nghe-si/Lee-Chae-Yeon" className="text-secondary">LEE
                                        CHAE YEON</a></p>
                                    <p className="text-muted"><small>Hôm qua</small></p>
                                </div>
                                <div className="media-right">
                                    <button className="btn btn-outline-primary btn-sm"><i
                                        className="icon ic-like"></i> Like
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm"><i
                                        className="icon ic-more"></i> More
                                    </button>
                                    <span className="duration">02:51</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


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

    )
}
export default Slider

