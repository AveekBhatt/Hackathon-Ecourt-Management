
const registerinfo = async({CaseType , CourtType , CarriedOn , Attorneyname , Attorneyemail , Name , email , phonenumber , Address , cityname , Pincode}) =>{
    try{
        const response = await fetch("/Ecourt/JudgementPortal/postal" , {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                   CaseType: CaseType , 
                   CourtType: CourtType,
                   CarriedOn: CarriedOn, 
                   Attorneyname: Attorneyname,
                   Attorneyemail: Attorneyemail, 
                   name: Name,
                   email: email, 
                   phonenumber: phonenumber, 
                   Address: Address,
                   cityname: cityname , 
                   Pincode: Pincode
                   })  
        });
        if (!response.ok) throw  response;
        const data = await response.json();
        console.log("ERRORS");
        console.log(data);
     }catch(err){
        console.log("ERRORS : " + " " + err);
     }
}
document.querySelector('.submit-info').addEventListener('submit' , e=>{
    e.preventDefault();
    const CaseType = document.getElementById('casetype').value;
    const CourtType = document.getElementById('courttype').value;
    const CarriedOn = document.getElementById('carryon').value;
    const Attorneyname = document.getElementById('attorney-name').value;
    const Attorneyemail= document.getElementById('attorney-emailinfo').value;
    const Name = document.getElementById('name').value;
    const email=document.getElementById('emailinfo').value;
    const phonenumber=document.getElementById('phone').value;
    const Address = document.getElementById('address').value;
    const cityname = document.getElementById('city').value;
    const Pincode = document.getElementById('pincode').value;
    const Ppncode = document.getElementById('pincode').value;
    // geturl();
    registerinfo({CaseType , CourtType , CarriedOn , Attorneyname , Attorneyemail ,  Name , email , phonenumber , Address , cityname ,  Pincode});  
})