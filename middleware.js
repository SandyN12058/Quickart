const ExpressError=require("./utils/ExpressError.js"); 
const {listingSchema,reviewSchema}=require("./schema.js");
const Listing = require("./models/listing");
const Review = require("./models/reviews.js");


module.exports.isLoggedin=(req,res,next)=>{
    // console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must be logged in to create new listings");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async(req,res,next)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to Edit this Listing!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing=(req,res,next)=>{  //1st MW we used
    console.log(req.body);
    let {error}=listingSchema.validate(req.body);
    if(error){
        console.log(error);
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{ // 2nd MW we used
    let {error}=reviewSchema.validate(req.body);
    if(error){
        console.log(error);
        throw new ExpressError(400,error);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async(req,res,next)=>{ 
    let{id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to Edit this Listing!!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};