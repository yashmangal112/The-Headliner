import React, { Component } from 'react'
import Navbar from './components/Navbar'
import LoadingBar from 'react-top-loading-bar'

import News from './components/News'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
  pagesize = 5;

  apikey = process.env.REACT_APP_NEWS_API

  state={
    progress: 10
  }

  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {

    return (
      <>
      <div>
          {/* <Router>
          <Navbar/> */}
      <LoadingBar
      height={3}
        color='#f11946'
        progress={this.state.progress}
      />

        <Router>
          <Navbar/>
          <Switch>
            <Route exact path="/"> <News setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={this.pagesize} country='in' category="general"/> </Route>
            <Route exact path="/business"> <News setProgress={this.setProgress} apikey={this.apikey} key="business" pagesize={this.pagesize} country='in' category="business"/> </Route>
            <Route exact path="/entertainment"> <News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pagesize={this.pagesize} country='in' category="entertainment"/> </Route>
            <Route exact path="/general"> <News setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={this.pagesize} country='in' category="general"/> </Route>
            <Route exact path="/health"> <News setProgress={this.setProgress} apikey={this.apikey} key="health" pagesize={this.pagesize} country='in' category="health"/> </Route>
            <Route exact path="/science"> <News setProgress={this.setProgress} apikey={this.apikey} key="science" pagesize={this.pagesize} country='in' category="science"/> </Route>
            <Route exact path="/sports"> <News setProgress={this.setProgress} apikey={this.apikey} key="sports" pagesize={this.pagesize} country='in' category="sports"/> </Route>
            <Route exact path="/technology"> <News setProgress={this.setProgress} apikey={this.apikey} key="technology" pagesize={8} country='in' category="technology"/> </Route>

            {/* <Route exact path="/science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pagesize={8} country='in' category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pagesize={8} country='in' category="sports"/>}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pagesize={8} country='in' category="technology"/>}/> */}
          </Switch>
        </Router>
        </div>
      </>
    )
  }
}
