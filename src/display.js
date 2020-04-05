import React, { Component } from 'react';
import {Image,Container,Row,Col,Button} from 'react-bootstrap';
import axios from 'axios';
class Display extends Component {

    constructor(){
        super();

        this.state = {subreddits : [], temporarySubText: '', images : [], currentImage: 'https://moonshine.marketing/wp-content/uploads/2019/08/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA-720x675.png'};
        this.handleSet = this.handleSet.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.processData = this.processData.bind(this);
        this.randomImage = this.randomImage.bind(this);
        this.processData('memes');
    }

    handleChange(event){
        this.setState({temporarySubText : event.target.value});
    }

    handleSet(event) {
      if(this.state.temporarySubText.length > 0 ){
        let tempSubs = this.state.subreddits;
        tempSubs.push(this.state.temporarySubText);
        this.processData(this.state.temporarySubText);  
        this.setState({temporarySubText:''});
        this.setState(tempSubs);
        
      }
    }

    verifyUrl(urlString){
        let split = urlString.split('.');
        if(split.length >= 4) return true;
    }

    processData(subreddit){
        let readyImages = [];
        subreddit = subreddit.replace(/\s+/g, '');

        console.log(subreddit);
        axios.get('https://www.reddit.com/r/' + subreddit + '/.json').then((response)=>{
            let posts = response.data.data.children;

            for(let i = 0; i <= posts.length-1; i++){
                if( this.verifyUrl(posts[i].data.url)) readyImages.push(posts[i].data.url);
            }
          
            let tmpImages = this.state.images;
            console.log(readyImages);
            tmpImages = tmpImages.concat(readyImages);
            console.log(tmpImages);
            this.setState({images : tmpImages});
        });
    }
    
    randomImage(){
        let id = Math.floor(Math.random() * (this.state.images.length - 1 + 1));
        let image = this.state.images[id];
        console.log(id);
        this.setState({currentImage: image});
    }

    getRandomColor() {
        let r = Math.random() * (255 - 0 + 1);
        let g = Math.random() * (255 - 0 + 1);
        let b = Math.random() * (255 - 0 + 1);
       
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }
    render() {
        return (
            <div className="h-100 w-100 text-center ">
               <div className="input-group">
                    <input type="text" onChange={this.handleChange} className="form-control"  />
                    <Button onClick ={this.handleSet}>Add subreddit</Button>
                </div>
                <br/>
                    <Row>
                        {this.state.subreddits.map((sub) =><Col><p style={{color: this.getRandomColor()}}>{sub}</p></Col>)}
                    </Row>
                <br/>
                    <Image onClick={this.randomImage} src={this.state.currentImage}  fluid/>
            </div>
        );
    }
}

export default Display;