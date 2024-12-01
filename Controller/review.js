const Listing=require("../models/listing");
const Review=require("../models/reviews");
const Sentiment = require('sentiment'); // Import sentiment analysis library

// module.exports.createReview = async (req, res) => {
//     try {
//         let listing = await Listing.findById(req.params.id);
//         if (!listing) {
//             req.flash("error", "Listing not found");
//             return res.redirect(`/listings`);
//         }

//         let newReview = new Review(req.body.review);
//         newReview.author = req.user._id;

//         // Perform sentiment analysis
//         const sentiment = new Sentiment();
//         const result = sentiment.analyze(newReview.comment); // Assuming `text` is the field in review
//         console.log("Review brfore:", newReview);
//         console.log("Review text:", newReview.comment);
//         newReview.sentimentScore=result.score;
//         console.log(result);
//         console.log("Review after:", newReview);

//         newReview.sentiment = result.score; // Store sentiment score or analysis

//         listing.reviews.push(newReview);

//         await newReview.save();
//         await listing.save();
//         req.flash("success", "New Review Created");
//         res.redirect(`/listings/${listing.id}`);
//     } catch (err) {
//         req.flash("error", "Something went wrong");
//         console.error(err);
//         res.redirect(`/listings`);
//     }
// };


module.exports.createReview = async (req, res) => {
    try {
        // Find the listing by ID
        let listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect(`/listings`);
        }

        // Create a new review
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;

        // Perform sentiment analysis on the review comment
        const sentiment = new Sentiment();
        const result = sentiment.analyze(newReview.comment); // Analyze the review's text

        // Log the analysis result for debugging (optional)
        console.log("Review before:", newReview);
        console.log("Review text:", newReview.comment);
        console.log("Sentiment analysis result:", result);

        // Add the sentiment score to the review object
        newReview.sentimentScore = result.score;  // Store the sentiment score
        newReview.sentiment = result.score;  // You can also store the overall sentiment as a field in the review

        // Push the review to the listing's reviews array
        listing.reviews.push(newReview);

        // Save the new review and the listing with the new review
        await newReview.save();
        await listing.save();

        req.flash("success", "New Review Created");
        res.redirect(`/listings/${listing.id}`);
    } catch (err) {
        req.flash("error", "Something went wrong");
        console.error(err);
        res.redirect(`/listings`);
    }
};


// module.exports.createReview=async(req,res)=>{
//     let listing=await Listing.findById(req.params.id);
//     let newReview=new Review(req.body.review);
//     newReview.author=req.user._id;
//     listing.reviews.push(newReview);
 
//     await newReview.save();
//     await listing.save();
//     req.flash("success","New Review Created");
//     // console.log(newReview);
//     // console.log(listing);
//     res.redirect(`/listings/${listing.id}`);
// };

module.exports.destroyReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    // console.log(id);
    // console.log(reviewId);

    await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    
    res.redirect(`/listings/${id}`);
};





// This function ranks products based on the average sentiment score of their reviews
module.exports.recommendListingsBasedOnPositiveReviews = async (req, res) => {
    // try {
    //     // Fetch all listings and their reviews
    //     // console.log("Recommendations route called"); // Debugging log
    //     let listings = await Listing.find({}).populate('reviews');

    //     if (!listings) {
    //         throw new Error("No listings found");
    //     }

    //     // Map listings to count positive reviews
    //     let recommendations = listings.map(listing => {
    //         let positiveReviewCount = listing.reviews.reduce((count, review) => {
    //             return count + (review.sentimentScore > 0 ? 1 : 0);
    //         }, 0);

    //         return {
    //             listing: listing,
    //             positiveReviewCount: positiveReviewCount
    //         };
    //     });

    //     // Sort listings by positive review count (highest first)
    //     recommendations.sort((a, b) => b.positiveReviewCount - a.positiveReviewCount);
    //     console.log(recommendations);

    //     // Get top 5 recommendations
    //     const topRecommendations = recommendations.slice(0, 2);

    //     // Return recommendations as JSON or render a view
    //     // console.log(topRecommendations);
    //     res.render('listings/recommendations', { topRecommendations }); // Or res.json(topRecommendations);
    // } catch (err) {
    //     console.error(err);
    //     req.flash("error", "Failed to generate recommendations");
    //     res.redirect('/listings');
    // }

    try {
        // Fetch all listings and populate reviews
        let listings = await Listing.find({}).populate('reviews').populate('image');
        
        if (!listings) {
            throw new Error("No listings found");
        }

        // Map listings to count positive reviews
        let recommendations = listings.map(listing => {
            let positiveReviewCount = 0;

            // Ensure reviews exist before accessing them
            if (listing.reviews && listing.reviews.length > 0) {
                positiveReviewCount = listing.reviews.reduce((count, review) => {
                    return count + (review.sentimentScore > 0 ? 1 : 0);
                }, 0);
            }

            return {
                listing: listing,
                positiveReviewCount: positiveReviewCount
            };
        });

        // Sort listings by positive review count (highest first)
        recommendations.sort((a, b) => b.positiveReviewCount - a.positiveReviewCount);

        // Get top 5 recommendations
        const topRecommendations = recommendations.slice(0, 3);

        // Render recommendations view
        res.render('listings/recommendations', { recommendations: topRecommendations });
    } catch (err) {
        console.error("Error in recommendations route:", err);
        req.flash("error", "Failed to generate recommendations");
        res.redirect('/listings');
    }
};


