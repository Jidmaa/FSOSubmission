const blog = require("../models/blog");

const dummy = (blogs) => {
    return 1;
  }
const totalLikes = (blogs) => {
    if (blogs.length ===1) {
        return blogs[0].likes;
    }
    if (blogs.length ===0) {
        return 0;
    }
    const reducer = (accumulator, currentValue) => { return accumulator + currentValue.likes};
    const likes = blogs.reduce(reducer,0)
    return likes;
}
  module.exports = {
    dummy, 
    totalLikes
  }
