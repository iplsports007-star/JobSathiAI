const jobs = [
  {
    title: "Airport Ground Staff",
    company: "Airport Services",
    category: "Airport",
    location: "Mumbai",
    salary: "₹25,000/month",
    qualification: "Graduate",
    lastDate: "Check Official Notification"
  },
  {
    title: "SSC CGL",
    company: "Staff Selection Commission",
    category: "Government",
    location: "All India",
    salary: "As per post",
    qualification: "Graduate",
    lastDate: "Check Official Notification"
  },
  {
    title: "Railway Recruitment",
    company: "Indian Railways",
    category: "Railway",
    location: "All India",
    salary: "As per post",
    qualification: "12th / Graduate",
    lastDate: "Check Official Notification"
  },
  {
    title: "Private Office Executive",
    company: "Private Company",
    category: "Private",
    location: "Mumbai",
    salary: "₹18,000–₹30,000/month",
    qualification: "Graduate",
    lastDate: "Open"
  }
];

const jobsContainer = document.getElementById("jobsContainer");

function displayJobs(list) {

  jobsContainer.innerHTML = "";

  if (list.length === 0) {
    jobsContainer.innerHTML =
      "<p>No matching jobs found.</p>";
    return;
  }

  list.forEach((job, index) => {

    const card = document.createElement("div");

    card.className = "job-card";

    card.innerHTML = `
      <div class="job-top">

        <div>
          <h3>${job.title}</h3>
          <p class="job-company">${job.company}</p>
        </div>

        <button class="save-btn"
          onclick="saveJob(${index})">
          ❤️
        </button>

      </div>

      <div class="job-info">

        <span>📍 ${job.location}</span>

        <span>💰 ${job.salary}</span>

        <span>🎓 ${job.qualification}</span>

        <span>📅 ${job.lastDate}</span>

      </div>

      <button
        class="apply-btn"
        onclick="applyJob('${job.title}')">

        Apply Now →

      </button>
    `;

    jobsContainer.appendChild(card);

  });
}


// Search jobs
function searchJobs() {

  const search =
    document
      .getElementById("jobSearch")
      .value
      .toLowerCase()
      .trim();

  if (!search) {
    displayJobs(jobs);
    return;
  }

  const results = jobs.filter(job =>
    job.title.toLowerCase().includes(search) ||
    job.company.toLowerCase().includes(search) ||
    job.category.toLowerCase().includes(search) ||
    job.location.toLowerCase().includes(search)
  );

  displayJobs(results);
}


// Category filter
function filterJobs(category) {

  const results =
    jobs.filter(job =>
      job.category === category
    );

  displayJobs(results);

}


// Show all jobs
function showAllJobs() {
  displayJobs(jobs);
}


// Apply button
function applyJob(jobName) {

  alert(
    "Apply Now selected for: " +
    jobName +
    "\n\nOfficial application link hum next version mein add karenge."
  );

}


// Save job
function saveJob(index) {

  const job = jobs[index];

  let saved =
    JSON.parse(
      localStorage.getItem("savedJobs")
    ) || [];

  const alreadySaved =
    saved.some(item =>
      item.title === job.title
    );

  if (!alreadySaved) {

    saved.push(job);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(saved)
    );

    alert("Job saved ❤️");

  } else {

    alert("Job already saved.");

  }

}


// Saved jobs
function openSaved() {

  const saved =
    JSON.parse(
      localStorage.getItem("savedJobs")
    ) || [];

  if (saved.length === 0) {

    alert(
      "Abhi koi saved job nahi hai."
    );

    return;
  }

  displayJobs(saved);

}


// AI Job Matcher
function openMatcher() {

  const qualification =
    prompt(
      "Apni qualification likhein:\nExample: Graduate"
    );

  if (!qualification) return;

  const results =
    jobs.filter(job =>
      job.qualification
        .toLowerCase()
        .includes(
          qualification.toLowerCase()
        )
    );

  if (results.length > 0) {

    displayJobs(results);

    alert(
      results.length +
      " suitable job(s) mili hain."
    );

  } else {

    alert(
      "Abhi matching job nahi mili."
    );

  }

}


// Resume Builder
function openResume() {

  alert(
    "Resume Builder 🚀\n\n" +
    "Next version mein yahan " +
    "professional resume generator banega."
  );

}


// Cover Letter
function openCoverLetter() {

  alert(
    "AI Cover Letter ✉️\n\n" +
    "Next version mein yahan " +
    "automatic cover letter generator banega."
  );

}


// Profile
function openProfile() {

  alert(
    "Profile 👤\n\n" +
    "Profile section next version mein add hoga."
  );

}


// Home
function goHome() {

  displayJobs(jobs);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// Initial jobs
displayJobs(jobs);
