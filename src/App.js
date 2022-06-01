
import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const link = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: ['loading'],
      idx:0
    };
  }

  componentDidMount(){
    fetch(link)
        .then(res => res.json())
        .then(
            (result) => {

              this.setState({
                quotes:result.quotes,
                idx:0
              })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              console.log(error);
            }
        )
  }

  getQuote() {
    this.setState({
      idx: (this.state.idx+1)%(this.state.quotes.length)
    })
  }

  render() {
    // console.log(this.state.quotes[this.state.idx])
    var twit = "https://twitter.com/intent/tweet?text="+this.state.quotes[this.state.idx].quote+' '+this.state.quotes[this.state.idx].author

    return (
        <div id='container'>
          <div id='quote-box'>
            <div id='text'> {this.state.quotes[this.state.idx].quote} </div>
            <div id='author'>~ {this.state.quotes[this.state.idx].author}</div>
            <div id='container-buttons'>
              <a id='tweet-quote' href={twit} target="_top"><FontAwesomeIcon icon={brands('twitter')} /></a>
              <button id='new-quote' type='submit' onClick={this.getQuote.bind(this)}>New quote</button>
            </div>
          </div>
          <footer>Coded by Giulia Passoni 2022</footer>
        </div>
    );
  }
}


export default App;
