const LIFF_ID="YOUR_LIFF_ID";


async function startLIFF(){


await liff.init({
liffId:LIFF_ID
});



if(!liff.isLoggedIn()){

liff.login();

return;

}



const profile =
await liff.getProfile();



document.getElementById("name")
.innerHTML=profile.displayName;



document.getElementById("avatar")
.src=profile.pictureUrl;



loadDashboard(profile.userId);



}




async function loadDashboard(userId){


const res =
await fetch(
"/api/massager/dashboard/"+userId
);



const data =
await res.json();



document.getElementById("income")
.innerHTML=
"฿"+data.income;



document.getElementById("job-count")
.innerHTML=
data.jobs+" งาน";



renderJobs(
"today-job",
data.today
);



renderJobs(
"tomorrow-job",
data.tomorrow
);



}




function renderJobs(id,jobs){


let box=document.getElementById(id);


box.innerHTML="";


jobs.forEach(job=>{


box.innerHTML+=`

<div class="job-card">


<div class="job-time">

${job.time}

</div>


<div class="job-name">

${job.type}

</div>


<div class="job-detail">

👤 ${job.customer}

<br>

📍 ${job.location}

<br>

💰 ${job.price}

</div>


<div class="job-btn">


<button>
ถึงแล้ว
</button>


<button>
ปิดงาน
</button>


</div>


</div>

`;


});


}




startLIFF();