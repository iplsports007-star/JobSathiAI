
const jobs = [

  {
    id: 1,
    title: "SSC CGL",
    company: "Staff Selection Commission",
    category: "Government",
    location: "All India",
    salary: "As per notification",
    qualification: "Graduate",
    apply: "https://ssc.gov.in/"
  },

  {
    id: 2,
    title: "Railway Recruitment",
    company: "Indian Railways",
    category: "Railway",
    location: "All India",
    salary: "As per notification",
    qualification: "12th / Graduate",
    apply: "https://www.rrbapply.gov.in/"
  },

  {
    id: 3,
    title: "Airport Jobs",
    company: "Airports Authority of India",
    category: "Airport",
    location: "India",
    salary: "As per notification",
    qualification: "12th / Graduate",
    apply: "https://www.aai.aero/en/careers/recruitment"
  },

  {
    id: 4,
    title: "Private Jobs",
    company: "Private Companies",
    category: "Private",
    location: "Mumbai / India",
    salary: "As per company",
    qualification: "Graduate",
    apply: "https://www.naukri.com/"
  }

];


const jobsContainer =
  document.getElementById("jobsContainer");

const modal =
  document.getElementById("modal");

const modalBody =
  document.getElementById("modalBody");


/* =========================
   JOB DISPLAY
========================= */

function displayJobs(list) {

  jobsContainer.innerHTML = "";

  if (list.length === 0) {

    jobsContainer.innerHTML = `
      <div class="empty">
        😔<br><br>
        No matching jobs found.
      </div>
    `;

    return;
  }


  list.forEach((job) => {

    const savedJobs =
      JSON.parse(
        localStorage.getItem("savedJobs")
      ) || [];

    const isSaved =
      savedJobs.some(
        item => item.id === job.id
      );


    const card =
      document.createElement("div");

    card.className = "job-card";


    card.innerHTML = `

      <div class="job-top">

        <div>

          <h3>
            ${job.title}
          </h3>

          <p class="job-company">
            ${job.company}
          </p>

        </div>


        <button
          class="save-btn"
          onclick="saveJob(${job.id})">

          ${isSaved ? "💖" : "❤️"}

        </button>

      </div>


      <div class="job-info">

        <span>
          📍 ${job.location}
        </span>

        <span>
          💰 ${job.salary}
        </span>

        <span>
          🎓 ${job.qualification}
        </span>

        <span>
          🏷️ ${job.category}
        </span>

      </div>


      <button
        class="apply-btn"
        onclick="applyJob(${job.id})">

        Official Apply →

      </button>

    `;


    jobsContainer.appendChild(card);

  });

}


/* =========================
   SEARCH
========================= */

function searchJobs() {

  const input =
    document.getElementById(
      "jobSearch"
    );

  const search =
    input.value
      .toLowerCase()
      .trim();


  if (!search) {

    displayJobs(jobs);

    return;
  }


  const results =
    jobs.filter(job =>

      job.title
        .toLowerCase()
        .includes(search)

      ||

      job.company
        .toLowerCase()
        .includes(search)

      ||

      job.category
        .toLowerCase()
        .includes(search)

      ||

      job.location
        .toLowerCase()
        .includes(search)

      ||

      job.qualification
        .toLowerCase()
        .includes(search)

    );


  displayJobs(results);
}


/* =========================
   CATEGORY
========================= */

function filterJobs(category) {

  const results =
    jobs.filter(
      job => job.category === category
    );

  displayJobs(results);

}


/* =========================
   ALL JOBS
========================= */

function showAllJobs() {

  displayJobs(jobs);

}


/* =========================
   APPLY
========================= */

function applyJob(id) {

  const job =
    jobs.find(
      item => item.id === id
    );


  if (!job) return;


  if (job.apply) {

    window.open(
      job.apply,
      "_blank"
    );

  }

}


/* =========================
   SAVE JOB
========================= */

function saveJob(id) {

  const job =
    jobs.find(
      item => item.id === id
    );


  if (!job) return;


  let savedJobs =
    JSON.parse(
      localStorage.getItem("savedJobs")
    ) || [];


  const exists =
    savedJobs.some(
      item => item.id === id
    );


  if (exists) {

    savedJobs =
      savedJobs.filter(
        item => item.id !== id
      );

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedJobs)
    );

    alert("Job removed from Saved Jobs.");

  }

  else {

    savedJobs.push(job);

    localStorage.setItem(
      "savedJobs",
      JSON.stringify(savedJobs)
    );

    alert("Job saved ❤️");

  }


  displayJobs(jobs);
}


/* =========================
   SAVED JOBS
========================= */

function openSaved() {

  const savedJobs =
    JSON.parse(
      localStorage.getItem("savedJobs")
    ) || [];


  if (savedJobs.length === 0) {

    jobsContainer.innerHTML = `
      <div class="empty">
        ❤️<br><br>
        Abhi koi saved job nahi hai.
      </div>
    `;

    return;
  }


  displayJobs(savedJobs);

}


/* =========================
   AI JOB MATCHER
========================= */

function openMatcher() {

  openModal(`

    <h2 class="form-title">
      🤖 AI Job Matcher
    </h2>

    <div class="form-group">

      <label>
        Qualification
      </label>

      <input
        id="matcherQualification"
        placeholder="Example: Graduate"
      >

    </div>


    <div class="form-group">

      <label>
        Preferred Category
      </label>

      <select
        id="matcherCategory"
        style="width:100%;padding:12px;border:1px solid #dce1eb;border-radius:9px;">

        <option value="">
          Any Category
        </option>

        <option value="Government">
          Government
        </option>

        <option value="Private">
          Private
        </option>

        <option value="Airport">
          Airport
        </option>

        <option value="Railway">
          Railway
        </option>

      </select>

    </div>


    <button
      class="primary-btn"
      onclick="runMatcher()">

      Find Matching Jobs

    </button>

  `);

}


function runMatcher() {

  const qualification =
    document
      .getElementById(
        "matcherQualification"
      )
      .value
      .toLowerCase()
      .trim();


  const category =
    document
      .getElementById(
        "matcherCategory"
      )
      .value;


  const results =
    jobs.filter(job => {

      const qualificationMatch =
        !qualification ||
        job.qualification
          .toLowerCase()
          .includes(qualification);


      const categoryMatch =
        !category ||
        job.category === category;


      return (
        qualificationMatch &&
        categoryMatch
      );

    });


  closeModal();

  displayJobs(results);

}


/* =========================
   RESUME BUILDER
========================= */

function openResume() {

  openModal(`

    <h2 class="form-title">
      📄 Resume Builder
    </h2>


    <div class="form-group">
      <label>Full Name *</label>

      <input
        id="resumeName"
        placeholder="Your full name">
    </div>


    <div class="form-group">
      <label>Mobile Number</label>

      <input
        id="resumePhone"
        placeholder="9876543210"
        type="tel">
    </div>


    <div class="form-group">
      <label>Email</label>

      <input
        id="resumeEmail"
        placeholder="you@email.com"
        type="email">
    </div>


    <div class="form-group">
      <label>Career Objective</label>

      <textarea
        id="resumeObjective"
        placeholder="Your career objective">
      </textarea>
    </div>


    <div class="form-group">
      <label>Education</label>

      <textarea
        id="resumeEducation"
        placeholder="Example: Bachelor Degree - 2026">
      </textarea>
    </div>


    <div class="form-group">
      <label>Skills</label>

      <textarea
        id="resumeSkills"
        placeholder="Communication, MS Office, Excel...">
      </textarea>
    </div>


    <div class="form-group">
      <label>Experience</label>

      <textarea
        id="resumeExperience"
        placeholder="Fresher / Experience details">
      </textarea>
    </div>


    <button
      class="primary-btn"
      onclick="generateResume()">

      Create Resume

    </button>

  `);

}


/* =========================
   GENERATE RESUME
========================= */

function generateResume() {

  const name =
    document
      .getElementById("resumeName")
      .value
      .trim();


  if (!name) {

    alert(
      "Please enter your full name."
    );

    return;
  }


  const phone =
    document
      .getElementById("resumePhone")
      .value;


  const email =
    document
      .getElementById("resumeEmail")
      .value;


  const objective =
    document
      .getElementById("resumeObjective")
      .value;


  const education =
    document
      .getElementById("resumeEducation")
      .value;


  const skills =
    document
      .getElementById("resumeSkills")
      .value;


  const experience =
    document
      .getElementById("resumeExperience")
      .value;


  const resumeData = {

    name,
    phone,
    email,
    objective,
    education,
    skills,
    experience

  };


  localStorage.setItem(
    "resumeData",
    JSON.stringify(resumeData)
  );


  showResumePreview(
    resumeData
  );

}


/* =========================
   RESUME PREVIEW
========================= */

function showResumePreview(data) {

  modalBody.innerHTML = `

    <h2 class="form-title">
      👀 Resume Preview
    </h2>


    <div
      id="resumePreview"
      class="resume-preview">

      <h1>
        ${escapeHTML(data.name)}
      </h1>


      <div class="contact">

        ${escapeHTML(data.phone || "")}

        ${data.phone && data.email ? " | " : ""}

        ${escapeHTML(data.email || "")}

      </div>


      <h3>
        CAREER OBJECTIVE
      </h3>

      <p>
        ${escapeHTML(
          data.objective ||
          "Motivated candidate looking for an opportunity to learn, contribute and grow professionally."
        )}
      </p>


      <h3>
        EDUCATION
      </h3>

      <p>
        ${escapeHTML(
          data.education ||
          "Education details not provided."
        )}
      </p>


      <h3>
        SKILLS
      </h3>

      <p>
        ${escapeHTML(
          data.skills ||
          "Skills not provided."
        )}
      </p>


      <h3>
        EXPERIENCE
      </h3>

      <p>
        ${escapeHTML(
          data.experience ||
          "Fresher"
        )}
      </p>

    </div>


    <button
      class="primary-btn"
      onclick="downloadResume()">

      ⬇️ Download Resume

    </button>


    <button
      class="primary-btn"
      onclick="shareResume()">

      📤 Share Resume

    </button>

  `;

}


function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/* =========================
   DOWNLOAD RESUME
========================= */

function downloadResume() {

  const data =
    JSON.parse(
      localStorage.getItem("resumeData")
    );


  if (!data) {

    alert("Resume data not found.");

    return;
  }


  const text = `

JOB SATHI AI
PROFESSIONAL RESUME

Name:
${data.name}

Mobile:
${data.phone || ""}

Email:
${data.email || ""}


CAREER OBJECTIVE

${data.objective || ""}


EDUCATION

${data.education || ""}


SKILLS

${data.skills || ""}


EXPERIENCE

${data.experience || "Fresher"}

  `;


  downloadFile(
    text,
    "JobSathiAI_Resume.txt",
    "text/plain"
  );

}


/* =========================
   SHARE RESUME
========================= */

async function shareResume() {

  const data =
    JSON.parse(
      localStorage.getItem("resumeData")
    );


  if (!data) return;


  const text = `
JobSathi AI Resume

Name: ${data.name}
Mobile: ${data.phone || ""}
Email: ${data.email || ""}

Education:
${data.education || ""}

Skills:
${data.skills || ""}
`;


  if (
    navigator.share
  ) {

    try {

      await navigator.share({

        title: "My Resume",
        text: text

      });

    }

    catch (error) {

      console.log(error);

    }

  }

  else {

    alert(
      "Sharing is not supported on this browser."
    );

  }

}


/* =========================
   COVER LETTER
========================= */

function openCoverLetter() {

  openModal(`

    <h2 class="form-title">
      ✉️ AI Cover Letter
    </h2>


    <div class="form-group">

      <label>Your Name *</label>

      <input
        id="letterName"
        placeholder="Full Name">

    </div>


    <div class="form-group">

      <label>Job Position *</label>

      <input
        id="letterJob"
        placeholder="Airport Ground Staff">

    </div>


    <div class="form-group">

      <label>Company</label>

      <input
        id="letterCompany"
        placeholder="Company Name">

    </div>


    <div class="form-group">

      <label>Your Qualification</label>

      <input
        id="letterQualification"
        placeholder="Graduate">

    </div>


    <button
      class="primary-btn"
      onclick="generateCoverLetter()">

      Generate Cover Letter

    </button>

  `);

}


function generateCoverLetter() {

  const name =
    document
      .getElementById("letterName")
      .value
      .trim();


  const job =
    document
      .getElementById("letterJob")
      .value
      .trim();


  const company =
    document
      .getElementById("letterCompany")
      .value
      .trim();


  const qualification =
    document
      .getElementById(
        "letterQualification"
      )
      .value
      .trim();


  if (!name || !job) {

    alert(
      "Name aur Job Position required hai."
    );

    return;
  }


  const letter = `

Dear Hiring Manager,

I am ${name}, and I am writing to express my interest in the ${job} position${company ? " at " + company : ""}.

I have completed my ${qualification || "education"} and I am eager to contribute my skills and dedication to your organization.

I am hardworking, responsible, willing to learn and able to work effectively as part of a team.

I would appreciate the opportunity to discuss my application further.

Thank you for your time and consideration.

Sincerely,

${name}

  `;


  modalBody.innerHTML = `

    <h2 class="form-title">
      ✉️ Cover Letter Preview
    </h2>


    <div class="resume-preview">

      <p style="white-space:pre-line;">
        ${escapeHTML(letter)}
      </p>

    </div>


    <button
      class="primary-btn"
      onclick="downloadFile(
        ${JSON.stringify(letter)},
        'Cover_Letter.txt',
        'text/plain'
      )">

      ⬇️ Download Letter

    </button>

  `;

}


/* =========================
   PROFILE
========================= */

function openProfile() {

  const resume =
    JSON.parse(
      localStorage.getItem("resumeData")
    );


  if (!resume) {

    openModal(`

      <div class="profile-box">

        <div class="profile-icon">
          👤
        </div>

        <h2>
          JobSathi Profile
        </h2>

        <p style="margin:10px 0;color:#687386;">
          Resume create karke apna profile
          automatically save karein.
        </p>

        <button
          class="primary-btn"
          onclick="openResume()">

          Create Resume

        </button>

      </div>

    `);

    return;
  }


  openModal(`

    <div class="profile-box">

      <div class="profile-icon">
        👤
      </div>

      <h2>
        ${escapeHTML(resume.name)}
      </h2>

      <p style="margin:8px 0;color:#687386;">
        ${escapeHTML(resume.email || "")}
      </p>

      <p style="color:#687386;">
        ${escapeHTML(resume.phone || "")}
      </p>


      <button
        class="primary-btn"
        onclick="openResume()">

        Edit Resume

      </button>

    </div>

  `);

}


/* =========================
   HOME
========================= */

function goHome() {

  displayJobs(jobs);

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


/* =========================
   MODAL
========================= */

function openModal(content) {

  modalBody.innerHTML =
    content;

  modal.style.display =
    "block";

  document.body.style.overflow =
    "hidden";

}


function closeModal() {

  modal.style.display =
    "none";

  document.body.style.overflow =
    "auto";

}


window.onclick =
  function(event) {

    if (
      event.target === modal
    ) {

      closeModal();

    }

  };


/* =========================
   DOWNLOAD FILE
========================= */

function downloadFile(
  content,
  filename,
  type
) {

  const blob =
    new Blob(
      [content],
      { type: type }
    );


  const url =
    URL.createObjectURL(blob);


  const link =
    document.createElement("a");


  link.href = url;

  link.download =
    filename;


  document.body.appendChild(
    link
  );


  link.click();


  link.remove();


  URL.revokeObjectURL(
    url
  );

}


/* =========================
   START APP
========================= */

displayJobs(jobs);
