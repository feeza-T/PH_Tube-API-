// const isVerified= "";

// // if(isVerified === true)
// // {
// //     console.log("user is verified");
// // }
// // else{
// //     console.log("user is not verified");
// // }

// console.log(`${isVerified === true ? "user is verified" :"user is not verified"}`);

////////////////////////////////////////////////////////////////


function getTime(time)
{
    //get hour ,seconds
    const hour = parseInt(time/3600);
    let remaining = time % 3600;
    const minute =parseInt( remaining/60);
    remaining =remaining % 60;
    return `${hour} hour ${minute} minute ${remaining} seconds ago`;

}