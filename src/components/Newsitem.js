import React, { Component } from 'react'

export class Newsitem extends Component {
  constructor() {
    super();
    console.log("haalleo i am constuctor")
  }
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props
    return (
      <div>
        <div className="card card-outline-primary" >
          <img src={!imageUrl ? "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202401/this-is-a-crucial-step-in-placing-the-spacecraft-in-its-designated-orbit-around-l1--15-million-kilo-244055679-16x9.jpg?VersionId=dGpxb_yLAKub0mpMmffmXpXUVw13hmcZ" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'80%',zIndex:'1'}}>
              {source}
              
            </span>
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small class="text-body-secondary">By {!author ? 'Unknown' : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-success">Go somewhere</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
