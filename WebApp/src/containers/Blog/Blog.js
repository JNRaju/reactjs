import React, { Component } from 'react';
import BlogItem from '../../components/BlogItem/BlogItem';
import FeaturedBlogItem from '../../components/FeaturedBlogItem/FeaturedBlogItem';
import { Grid, Fade } from '@material-ui/core';
import firebase from "../../firebase";
import classes from './Blog.css';

class Blog extends Component {
    state = {
        isLoading: false,
        posts: []
    }

    // postsRef = firebase.firestore().collection("posts");

    // componentDidMount() {
    //     this.setState({ isLoading: true });
    //     this.postsRef.onSnapshot((querySnapshot) => {
    //         const items = [];
    //         querySnapshot.forEach((doc) => {
    //             const data = doc.data()
    //             console.log(data)
    //             const item = {
    //                 ...data,
    //                 date: new Date(data.date.seconds * 1000), //format data as it comes in from firebase
    //                 id: doc.id
    //             }
    //             items.push(item);
    //         });
    //         this.setState({ isLoading: false, posts: items });
    //     });
    // }

    state = {
        list: [
            {id:1,title:'Stroy1',summary:"tale1",date:new Date()},
            {id:2,title:'Stroy2',summary:"tale2",date:new Date()},
            {id:3,title:'Stroy3',summary:"tale3",date:new Date()},
            {id:4,title:'Stroy4',summary:"tale4",date:new Date()},
            {id:5,title:'Stroy5',summary:"tale5",date:new Date()},
            {id:6,title:'Stroy6',summary:"tale1",date:new Date()},
            {id:7,title:'Stroy7',summary:"tale2",date:new Date()},
            {id:8,title:'Stroy8',summary:"tale3",date:new Date()},
            {id:9,title:'Stroy9',summary:"tale4",date:new Date()},
            {id:10,title:'Stroy10',summary:"tale5",date:new Date()},
        ],
      };


    createBlogFeed() {
        // const sortedPosts = this.state.posts.sort((a, b) => b.date - a.date)
        const sortedPosts = this.state.list;
        console.log(sortedPosts)
        const blogItems = sortedPosts.map((post) => {
            const p = {
                ...post
            }

            return (
                <Grid item xs={12} md={6} key={p.id}>
                    <BlogItem item={p} clickHandler={this.handleBlogItemClicked} />
                </Grid>
            )
        });

        //set featured post to most recent post
        if (blogItems.length > 0 && sortedPosts.length > 0) blogItems[0] =
            <Grid item xs={12} key={sortedPosts[0].id}>
                <FeaturedBlogItem item={sortedPosts[0]} clickHandler={this.handleBlogItemClicked} />
            </Grid>

        return blogItems;
    }

    //Show detail
    handleBlogItemClicked = (item) => {
        this.props.history.push({ pathname: `/blog/detail/${item.id}`, state: { item: item } });
    }

    render() {
        return (
            <Fade in timeout={{ enter: 1000 }}>
                <div className={classes.Container}>
                    <Grid container spacing={3}>
                        {this.createBlogFeed()}
                    </Grid >
                    <div className={classes.Footer} />
                </div>
            </Fade>
        );
    }
}
export default Blog;
