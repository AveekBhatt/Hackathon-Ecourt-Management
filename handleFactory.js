const catchAsync = require('./catchAsync');
const AppError = require('./appError');
const APIFeatures = require('./apiFeatures');
exports.applydelete = Model =>  catchAsync(async (req,res,next)=>{
    const stats =  await Model.findByIdAndDelete(req.params.id);

    if(!stats){
        return next(new AppError("No ID Found",404));
    }
    else {
    res.status(204).json({
        status : "success" , 
        message : "Tour deleted"
    })
}
   //next();    
 })

exports.applypatch = Model => catchAsync(async (req,res)=>{
    console.log(req.file);
    //req.params.id=req.user.id;
    console.log(req.body);
    if(req.file){
        filtere
    }
    const docs = await Model.findByIdAndUpdate(req.params.id,req.body ,{
      new : true , 
      runValidators : true 
    });
 
 if(!docs){
     return next(new AppError('No ID Found . Document is NOT Updated',404));
 }   
 else {
 res.status(200).json({
     status : "success" ,
 data : {
     docs : docs
  }
 })
 }
})


exports.dopost = Model => catchAsync(async (req , res)=>{
    const newtour = await Model.create(req.body);
    console.log(newtour);
    res.status(201).json({
     status : "success" ,
     data : {
         tours : newtour
     }
  });
 })

 exports.createReview = Model => catchAsync(async (req,res,next) =>{
    if(!req.body.tour){
        req.body.tour = req.params.tourId;
    }
    if(!req.body.user){
        req.body.user = req.user.id;
    }
    const newReview = await Model.create(req.body);

    res.status(200).json({
        status : 'success' , 
        data : {
            review : newReview
        }
    })
})
exports.getOne = (Model , popOptions) => catchAsync(async (req , res , next)=>{
    console.log("NNOOOOOOOOOOOOO");
    if(!req.params.id){
        req.params.id=req.user.id;
    }
    console.log(req.params.id);
    let query =  Model.findById(req.params.id);
    //console.log(query);
    if(popOptions){
        query = query.populate(popOptions);
        console.log("NNOOOOOOOOOOOOO");
    }
    const doc = await query;
    //const tour = await Model.findById(req.params.id).populate('reviews');

    if(!doc){
        return next(new AppError('No ID Found',404));
    }
    else {
    res.status(200).json({
        status : "success" ,
        data : {
            doc
        }
    });
}
})
exports.getAll = Model => catchAsync(async (req,res,next) =>{
    
    let filters = {} ;
    if(req.params.tourId){
        filters = {tour : req.params.tourId};
    }

    let features = new APIFeatures(Model.find(filters) , req.query)
    .filter()
    .sort()
    .limitsfunc()
    .pagination();

    const docs = await features.query;
    res.status(200).json({
        status : 'success',
        requested : req.requestTime ,
        result : docs.length ,
        data : {
           docs
        } 
    });
})