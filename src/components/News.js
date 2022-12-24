import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { border } from "@mui/system";
// import { IconButton } from '@mui/material';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete'
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("Hello i am a constructor form news component")
    this.state = {
        articles: [],
        loading: true,
        page: 1,
        disabled: true,
        totalResults: 0
        // border: "contained bg-black text-white"
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - The Headliner`
  }
  
  async updateNews(){
    this.props.setProgress(0)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    this.props.setProgress(30)
    let parseData = await data.json();
    this.props.setProgress(70)
    console.log(parseData)
    this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
    this.props.setProgress(100);
  }

  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a10a1962b4714c32b1b132ee6b31e3ea&page=1&pagesize=${this.props.pagesize}`;
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData)
    // this.setState({articles: parseData.articles, totalResults: parseData.totalResults, loading: false})
    this.updateNews();
  }
  
  handledPrevClicked = async ()=>{
    // console.log("prev page clicked")
    // this.setState({loading:true})
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a10a1962b4714c32b1b132ee6b31e3ea&page= ${this.state.page-1}&pagesize=${this.props.pagesize}`;
    // let data = await fetch(url);
    // let parseData = await data.json();
    // // console.log(parseData)
    // // this.setState = ({articles: parseData.articles})
    // this.setState({
    //   page: this.state.page-1,
    //   articles: parseData.articles,
    //   loading: false
    // })
    await this.setState({page: this.state.page-1})
    this.updateNews()
  }
  
  handledNextClicked = async ()=>{
    // if (this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)) {
      
    // }
    // else{
    //   console.log("next page clicked ")
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a10a1962b4714c32b1b132ee6b31e3ea&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    //   this.setState({loading:true})
    //   let data = await fetch(url);
    //   let parseData = await data.json();
    //   // console.log(parseData)
    //   // this.setState = ({articles: parseData.articles})
    //   this.setState({
    //     page: this.state.page+1,
    //     articles: parseData.articles,
    //     loading: false
    //   })
    // }
    await this.setState({page: this.state.page+1})
    this.updateNews()
  }
  
  // if (this.state.page+1>Math.ceil(this.state.totalResults/20) || this.state.page<=1) {
  //   this.setState({border: "outlined border-black text-black"})
  // }



  fetchMoreData = async () => {
    this.setState({page: this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pagesize=${this.props.pagesize}`;
    this.setState({loading: true})
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData)
    this.setState({
      articles: this.state.articles.concat(parseData.articles), 
      totalResults: parseData.totalResults,
      loading: false,
    })
  };
  // fetchMoreData = () => {
  //   // a fake async api call like which sends
  //   // 20 more records in 1.5 secs
  //   setTimeout(() => {
  //     this.setState({
  //       items: this.state.articles.concat(Array.from({ length: 20 }))
  //     });
  //   }, 1500);
  // };
  
  render() {
    return (
      <div className="bg-light" style={{ marginTop: 71 }}>
        <h2 className="text-center mb-4 p-3">The Headliner - Top {`${this.capitalizeFirstLetter(this.props.category)}`} Headlines</h2>
        {this.state.loading && <Spinner/>}
        {/* map using for higher order array */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
            {this.state.articles.map((element)=>{
              return <div className="col-md-4 " style={{marginBottom: 25}}>
                <NewsItem
                  key ={element.url}
                  title={element.title?element.title.slice(0, 65):""}
                  description={element.description?element.description.slice(0, 127): ""}
                  author={element.author?element.author: "Unknown"}
                  publishedAt = {element.publishedAt}
                  source = {element.source.name} 
                  // description={element.description}
                  imageUrl={element.urlToImage?element.urlToImage: "https://bl-i.thgim.com/public/incoming/hzxfnt/article66123120.ece/alternates/FREE_1200/2022-09-12T131718Z_1380052448_RC2SAW9AS34C_RTRMADP_3_RUSSIA-ECONOMY-FORUM-FESCO.JPG"}
                  newsUrl={element.url}
                />
              </div>
            })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between my-3">
          <Button disabled={this.state.page<=1} onClick={this.handledPrevClicked} variant="contained bg-black text-white"> &larr; Previous</Button>
          <Button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pagesize)} onClick={this.handledNextClicked} variant="contained bg-black text-white">Next &rarr;</Button>
        </div> */}
      </div>
    );
  }
}

export default News;
