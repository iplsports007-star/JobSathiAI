const jobs = [
  {
    title: "SSC CGL",
    company: "Staff Selection Commission",
    category: "Government",
    location: "All India",
    salary: "As per post",
    qualification: "Graduate",
    apply: "https://ssc.gov.in/"
  },
  {
    title: "Railway Recruitment",
    company: "Indian Railways",
    category: "Railway",
    location: "All India",
    salary: "As per post",
    qualification: "12th / Graduate",
    apply: "https://www.rrbapply.gov.in/"
  },
  {
    title: "Airport Jobs",
    company: "AAI Careers",
    category: "Airport",
    location: "India",
    salary: "As per post",
    qualification: "12th / Graduate",
    apply: "https://www.aai.aero/en/careers/recruitment"
  },
  {
    title: "Private Jobs",
    company: "Private Companies",
    category: "Private",
    location: "Mumbai / India",
    salary: "As per company",
    qualification: "Graduate",
    apply: "https://www.naukri.com/"
  }
];

const jobsContainer = document.getElementById("jobsContainer");

function displayJobs(list) {
  jobsContainer.innerHTML = "";

  if (list.length === 0) {
    jobsContainer.innerHTML = "<p>No matching jobs found.</p>";
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

        <button class="save-btn" onclick="saveJob(${index})">
          ❤️
        </button>
      </div>

      <div class="job-info">
        <span>📍 ${job.location}</span>
        <span>💰 ${job.salary}</span>
        <span>🎓 ${job.qualification}</span>
      </div>

      <button class="apply-btn"
        onclick="applyJob(${index})">
        Official Apply →
      </button>
    `;

    jobsContainer.appendChild(card);
  });
}

function searchJobs() {
  const search = document
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

function filterJobs(category) {
  const results = jobs.filter(
    job => job.category === category
  );

  displayJobs(results);
}

function showAllJobs() {
  displayJobs(jobs);
}

function applyJob(index) {
  const job = jobs[index];

  if (job.apply) {
    window.open(job.apply, "_blank");
  }
}

function saveJob(index) {
  const job = jobs[index];

  let saved =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  const exists = saved.some(
    item => item.title === job.title
  );

  if (!exists) {
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

function openSaved() {
  const saved =
    JSON.parse(localStorage.getItem("savedJobs")) || [];

  if (saved.length === 0) {
    alert("Abhi koi saved job nahi hai.");
    return;
  }

  displayJobs(saved);
}

function openMatcher() {
  const qualification = prompt(
    "Apni qualification likhein:\nExample: Graduate"
  );

  if (!qualification) return;

  const results = jobs.filter(job =>
    job.qualification
      .toLowerCase()
      .includes(qualification.toLowerCase())
  );

  if (results.length > 0) {
    displayJobs(results);

    alert(
      results.length +
      " suitable job(s) mili hain."
    );
  } else {
    alert("Matching job nahi mili.");
  }
}

function openResume() {
  const name = prompt("Apna full name likhein:");
  if (!name) return;

  const phone = prompt("Mobile number:");
  const email = prompt("Email:");
  const education = prompt("Education:");
  const skills = prompt("Skills:");
  const objective = prompt("Career Objective:");

  const resume = `
JOB SATHI AI - RESUME

Name:
${name}

Mobile:
${phone || ""}

Email:
${email || ""}

Career Objective:
${objective || ""}

Education:
${education || ""}

Skills:
${skills || ""}

Generated with JobSathi AI
`;

  const blob = new Blob([resume], {
    type: "text/plain"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = name.replace(/\s+/g, "_") + "_Resume.txt";

  link.click();

  URL.revokeObjectURL(url);

  alert("Resume ready ✅");
}

function openCoverLetter() {
  const name = prompt("Apna naam:");
  if (!name) return;

  const job = prompt("Kis job ke liye cover letter chahiye?");
  const company = prompt("Company/Department name:");

  const letter = `
COVER LETTER

Dear Hiring Manager,

I am ${name}. I am interested in applying for the
${job || "available position"} at ${company || "your organization"}.

I have completed my education and I am eager to start
my professional career. I am hardworking, responsible
and willing to learn new skills.

I would appreciate the opportunity to be considered
for this position.

Thank you for your time and consideration.

Sincerely,
${name}
`;

  const blob = new Blob([letter], {
    type: "text/plain"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "Cover_Letter.txt";

  link.click();

  URL.revokeObjectURL(url);

  alert("Cover Letter ready ✅");
}

function openProfile() {
  alert(
    "Profile section 🚀\n\n" +
    "Full profile system next update mein add karenge."
  );
}

function goHome() {
  displayJobs(jobs);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

displayJobs(jobs);
