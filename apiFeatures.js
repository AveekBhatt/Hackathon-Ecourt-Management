class APIFeatures{
    constructor(query , queryString){
        this.query=query;
        this.queryString=queryString;
    }
    filter(){
        let queryObj = {...this.queryString};
        const excludedFields = ['page' , 'sort' ,'limit' , 'fields'];
        excludedFields.forEach(el=> delete queryObj[el]);
        let queryStr =  JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => '$' + match);
        this.query = this.query.find(JSON.parse(queryStr));
        //let Query = Tour.find(JSON.parse(queryStr));

        return this;
    }

    sort()
    {
        if(this.queryString.sort)
         {
        const sortBy = this.queryString.sort.split(',').join(' ');
        console.log("Hello " +sortBy);
        this.query = this.query.sort(this.queryString.sort.split(',').join(' '));
         }
        else {
            this.query = this.query.sort("-createdAt");
         }
         return this;
    }

    limitsfunc()
    {
        if(this.queryString.fields){
            let fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else 
        {
            this.query = this.query.select('-__v');
        }
        return this;
    }

     pagination()
    {
        let page = Number(this.queryString.page) ;
        let limits = Number(this.queryString.limit) || 100; 
        let skips = (page-1) * limits;
   
        this.query = this.query.skip(skips).limit(limits);
        
        return this;
    }
}

module.exports=APIFeatures;