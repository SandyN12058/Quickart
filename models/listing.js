const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./reviews.js")

const listingSchema = mongoose.Schema({
    title:{
    type:String,
    required:true
    }
    ,
    description:String,
    image:{
        
       url:String,
       filename:String,
    },
    imageTags:[String],
    price:Number,
    location:String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
            },
        coordinates: {
            type: [Number],
            required: true
        }
    }

});

listingSchema.post("findOneAndDelete",async (listing)=>{
    console.log(listing);
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
    //  console.log("Middleware triggered");
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing; 