import React, { Component } from 'react'
import Newsitem from './Newsitem'
import { Spinner } from './spinner'
import PropTypes  from   'prop-types'



export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize: 8,
    category:'genral'
  }
  static propTypes ={
    country:PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string
  }
  articles = []
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title= `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  async componentDidMount() {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=815ccaed069649b193f7d196557b5e55&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    this.setState({ loading: true });
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ 
      articles: parsedData.articles,
       totalResults: parsedData.totalResults, 
       loading: false })
  }
  Handleprev = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=815ccaed069649b193f7d196557b5e55&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parsedData = await data.json()
    
    this.setState({ loading: true });
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }
  Handlenext = async () => {
    console.log('cmd')
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) { }

    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=815ccaed069649b193f7d196557b5e55&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parsedData = await data.json()


    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })


  }



  render() {
    console.log('render')
    return (
      <div className='container my-4'>
        <h2 className='text-center text-emphasis my-5'>Newsmonkey-top {this.capitalizeFirstLetter(this.props.category)} headlines </h2>
     {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage ? element.urlToImage : ""}
                newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}


        </div>
        <div className='container my-3 d-flex justify-content-between'>
          <button disabled={this.state.page <= 1} type="button" className="btn btn-warning " onClick={this.Handleprev}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-warning" onClick={this.Handlenext}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
