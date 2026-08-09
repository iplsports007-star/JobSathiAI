 const firebaseConfig = {
  apiKey: "AIzaSyDId8t1O9NDGuqTCCp-2UvUsnO74FdMO_s",
  authDomain: "jobsathiai.firebaseapp.com",
  databaseURL: "https://jobsathiai-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jobsathiai",
  storageBucket: "jobsathiai.firebasestorage.app",
  messagingSenderId: "859237560626",
  appId: "1:859237560626:web:d1ac16c2a184e85689a72b"
};
  const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

const jobs = [
  {   id: 1,
    title: "SSC CGL",
    company: "Staff Selection Commission",
    category: "Government",
    location: "All India",
    salary: "As per notification",
    qualification: "Graduate",
    lastDate: "Check official notification",
    description: "Combined Graduate Level recruitment.",
    apply: "https://ssc.gov.in/"
  },

  {
    id: 2,
    title: "RRB Recruitment",
    company: "Railway Recruitment Boards",
    category: "Railway",
    location: "All India",
    salary: "As per notification",
    qualification: "12th / Graduate",
    lastDate: "Check official notification",
    description: "Railway recruitment opportunities.",
    apply: "https://www.rrbapply.gov.in/"
  },

  {
    id: 3,
    title: "Airport Recruitment",
    company: "Airports Authority of India",
    category: "Airport",
    location: "India",
    salary: "As per notification",
    qualification: "12th / Graduate",
    lastDate: "Check official notification",
    description: "Airport and aviation career opportunities.",
    apply: "https://www.aai.aero/en/careers/recruitment"
  },

  {
    id: 4,
    title: "Private Graduate Jobs",
    company: "Private Companies",
    category: "Private",
    location: "Mumbai / India",
    salary: "As per company",
    qualification: "Graduate",
    lastDate: "Check company website",
    description: "Private-sector opportunities for graduates.",
    apply: "https://www.naukri.com/"
  }
];


const jobsContainer =
  document.getElementById("jobsContainer");

const jobCount =
  document.getElementById("jobCount");

const modal =
  document.getElementById("modal");

const modalBody =
  document.getElementById("modalBody");


/* =========================
   DISPLAY JOBS
========================= */

function displayJobs(list) {

  jobsContainer.innerHTML = "";

  jobCount.textContent =
    `${list.length} job${list.length !== 1 ? "s" : ""}`;


  if (!list.length) {

    jobsContainer.innerHTML = `
      <div class="empty">
        🔎<br><br>
        <b>No matching jobs found</b>
        <br><br>
        Try another keyword or category.
      </div>
    `;

    return;
  }


  list.forEach(job => {

    const saved =
      isSaved(job.id);


    const card =
      document.createElement("article");

    card.className =
      "job-card";


    card.innerHTML = `

      <div class="job-top">

        <div>

          <h3>
            ${escapeHTML(job.title)}
          </h3>

          <p class="job-company">
            ${escapeHTML(job.company)}
          </p>

        </div>


        <button
          class="save-btn"
          onclick="saveJob(${job.id})"
          aria-label="Save job">

          ${saved ? "💖" : "🤍"}

        </button>

      </div>


      <div class="job-info">

        <span>📍 ${escapeHTML(job.location)}</span>

        <span>💰 ${escapeHTML(job.salary)}</span>

        <span>🎓 ${escapeHTML(job.qualification)}</span>

        <span>🏷️ ${escapeHTML(job.category)}</span>

      </div>


      <button
        class="apply-btn"
        onclick="openJobDetails(${job.id})">

        View Job & Apply →

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
    document.getElementById("jobSearch");

  const query =
    input.value
      .toLowerCase()
      .trim();


  if (!query) {

    displayJobs(jobs);

    return;
  }


  const results =
    jobs.filter(job => {

      const text = [

        job.title,
        job.company,
        job.category,
        job.location,
        job.salary,
        job.qualification,
        job.description

      ]
        .join(" ")
        .toLowerCase();


      return text.includes(query);

    });


  displayJobs(results);
}


/* =========================
   FILTER
========================= */

function filterJobs(category) {

  const results =
    jobs.filter(
      job => job.category === category
    );


  displayJobs(results);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   SHOW ALL
========================= */

function showAllJobs() {

  displayJobs(jobs);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   JOB DETAILS
========================= */

function openJobDetails(id) {

  const job =
    jobs.find(
      item => item.id === id
    );


  if (!job) return;


  const saved =
    isSaved(job.id);


  openModal(`

    <h2 class="detail-title">
      ${escapeHTML(job.title)}
    </h2>

    <p class="detail-company">
      ${escapeHTML(job.company)}
    </p>


    <div class="detail-row">
      📍 <b>Location:</b>
      ${escapeHTML(job.location)}
    </div>


    <div class="detail-row">
      💰 <b>Salary:</b>
      ${escapeHTML(job.salary)}
    </div>


    <div class="detail-row">
      🎓 <b>Qualification:</b>
      ${escapeHTML(job.qualification)}
    </div>


    <div class="detail-row">
      📅 <b>Last Date:</b>
      ${escapeHTML(job.lastDate)}
    </div>


    <div class="detail-row">
      🏷️ <b>Category:</b>
      ${escapeHTML(job.category)}
    </div>


    <h3 class="detail-heading">
      Job Description
    </h3>

    <p style="font-size:13px;line-height:1.6;color:#687386;">
      ${escapeHTML(job.description)}
    </p>


    <button
      class="primary-btn"
      onclick="applyJob(${job.id})">

      🔗 Official Apply

    </button>


    <button
      class="primary-btn"
      onclick="saveJob(${job.id})">

      ${saved ? "💖 Remove Saved Job" : "❤️ Save Job"}

    </button>

  `);

}


/* =========================
   APPLY
========================= */

function applyJob(id) {

  const job =
    jobs.find(
      item => item.id === id
    );


  if (!job || !job.apply) {

    alert(
      "Official application link available nahi hai."
    );

    return;
  }


  window.open(
    job.apply,
    "_blank",
    "noopener,noreferrer"
  );
}


/* =========================
   SAVED JOBS
========================= */

function getSavedJobs() {

  try {

    return JSON.parse(
      localStorage.getItem("savedJobs")
    ) || [];

  } catch {

    return [];

  }

}


function isSaved(id) {

  return getSavedJobs()
    .some(job => job.id === id);

}


function saveJob(id) {

  const job =
    jobs.find(
      item => item.id === id
    );


  if (!job) return;


  let saved =
    getSavedJobs();


  const exists =
    saved.some(
      item => item.id === id
    );


  if (exists) {

    saved =
      saved.filter(
        item => item.id !== id
      );

    alert("Job Saved list se remove ho gayi.");

  } else {

    saved.push(job);

    alert("Job Saved ❤️");

  }


  localStorage.setItem(
    "savedJobs",
    JSON.stringify(saved)
  );


  displayJobs(jobs);
}


/* =========================
   SAVED PAGE
========================= */

function openSaved() {

  const saved =
    getSavedJobs();


  if (!saved.length) {

    jobsContainer.innerHTML = `

      <div class="empty">

        ❤️<br><br>

        <b>No saved jobs yet.</b>

        <br><br>

        Job ke ❤️ button par tap karke
        save karein.

      </div>

    `;

    jobCount.textContent = "";

    return;
  }


  displayJobs(saved);


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   AI JOB MATCHER
========================= */

function openMatcher() {

  openModal(`

    <h2 class="form-title">
      🤖 AI Job Matcher
    </h2>

    <p style="color:#687386;font-size:12px;margin-bottom:16px;">
      Apni qualification aur preferred category
      select karein.
    </p>


    <div class="form-group">

      <label>
        Qualification
      </label>

      <select id="matcherQualification">

        <option value="">
          Any Qualification
        </option>

        <option value="10th">
          10th
        </option>

        <option value="12th">
          12th
        </option>

        <option value="graduate">
          Graduate
        </option>

      </select>

    </div>


    <div class="form-group">

      <label>
        Preferred Category
      </label>

      <select id="matcherCategory">

        <option value="">
          Any Category
        </option>

        <option value="Government">
          Government
        </option>

        <option value="Railway">
          Railway
        </option>

        <option value="Airport">
          Airport
        </option>

        <option value="Private">
          Private
        </option>

      </select>

    </div>


    <button
      class="primary-btn"
      onclick="runMatcher()">

      Find Matching Jobs →

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
      .toLowerCase();


  const category =
    document
      .getElementById(
        "matcherCategory"
      )
      .value;


  const results =
    jobs.filter(job => {

      const qMatch =
        !qualification ||
        job.qualification
          .toLowerCase()
          .includes(qualification);


      const cMatch =
        !category ||
        job.category === category;


      return qMatch && cMatch;

    });


  closeModal();

  displayJobs(results);

}


/* =========================
   RESUME BUILDER
========================= */

function openResume() {

  const oldData =
    getResumeData();


  openModal(`

    <h2 class="form-title">
      📄 Professional Resume Builder
    </h2>


    <div class="form-group">

      <label>
        Full Name *
      </label>

      <input
        id="resumeName"
        value="${escapeAttribute(oldData.name || "")}"
        placeholder="Full Name">

    </div>


    <div class="form-group">

      <label>
        Mobile Number
      </label>

      <input
        id="resumePhone"
        value="${escapeAttribute(oldData.phone || "")}"
        type="tel"
        placeholder="9876543210">

    </div>


    <div class="form-group">

      <label>
        Email
      </label>

      <input
        id="resumeEmail"
        value="${escapeAttribute(oldData.email || "")}"
        type="email"
        placeholder="you@email.com">

    </div>


    <div class="form-group">

      <label>
        Career Objective
      </label>

      <textarea
        id="resumeObjective"
        placeholder="Your career objective">${escapeHTML(oldData.objective || "")}</textarea>

    </div>


    <div class="form-group">

      <label>
        Education
      </label>

      <textarea
        id="resumeEducation"
        placeholder="Example: Bachelor Degree - 2026">${escapeHTML(oldData.education || "")}</textarea>

    </div>


    <div class="form-group">

      <label>
        Skills
      </label>

      <textarea
        id="resumeSkills"
        placeholder="Communication, MS Office, Excel...">${escapeHTML(oldData.skills || "")}</textarea>

    </div>


    <div class="form-group">

      <label>
        Experience
      </label>

      <textarea
        id="resumeExperience"
        placeholder="Fresher / Experience details">${escapeHTML(oldData.experience || "")}</textarea>

    </div>


    <button
      class="primary-btn"
      onclick="generateResume()">

      Create Professional Resume →

    </button>

  `);
}


/* =========================
   RESUME DATA
========================= */

function getResumeData() {

  try {

    return JSON.parse(
      localStorage.getItem("resumeData")
    ) || {};

  } catch {

    return {};

  }
}


/* =========================
   GENERATE RESUME
========================= */

function generateResume() {

  const data = {

    name:
      document
        .getElementById("resumeName")
        .value
        .trim(),

    phone:
      document
        .getElementById("resumePhone")
        .value
        .trim(),

    email:
      document
        .getElementById("resumeEmail")
        .value
        .trim(),

    objective:
      document
        .getElementById("resumeObjective")
        .value
        .trim(),

    education:
      document
        .getElementById("resumeEducation")
        .value
        .trim(),

    skills:
      document
        .getElementById("resumeSkills")
        .value
        .trim(),

    experience:
      document
        .getElementById("resumeExperience")
        .value
        .trim()

  };


  if (!data.name) {

    alert(
      "Please enter your Full Name."
    );

    return;
  }


  localStorage.setItem(
    "resumeData",
    JSON.stringify(data)
  );


  showResumePreview(data);
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

        ${
          data.phone && data.email
            ? " | "
            : ""
        }

        ${escapeHTML(data.email || "")}

      </div>


      <h3>
        CAREER OBJECTIVE
      </h3>

      <p>
        ${escapeHTML(
          data.objective ||
          "Motivated candidate seeking an opportunity to learn, contribute and grow professionally."
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
      onclick="printResume()">

      🖨️ Print / Save as PDF

    </button>


    <button
      class="primary-btn"
      onclick="downloadResumeText()">

      ⬇️ Download Text Backup

    </button>


    <button
      class="primary-btn"
      onclick="shareResume()">

      📤 Share Resume

    </button>

  `;
}


/* =========================
   PRINT / PDF
========================= */

function printResume() {

  window.print();

}


/* =========================
   TEXT BACKUP
========================= */

function downloadResumeText() {

  const data =
    getResumeData();


  const text = `

JOB SATHI AI
PROFESSIONAL RESUME

NAME
${data.name || ""}

MOBILE
${data.phone || ""}

EMAIL
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
    getResumeData();


  const text = `

JobSathi AI Resume

Name: ${data.name || ""}
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

    } catch (error) {

      console.log(error);

    }

  } else {

    downloadFile(
      text,
      "JobSathiAI_Resume.txt",
      "text/plain"
    );

  }
}


/* =========================
   COVER LETTER
========================= */

function openCoverLetter() {

  openModal(`

    <h2 class="form-title">
      ✉️ Cover Letter Builder
    </h2>


    <div class="form-group">

      <label>
        Your Name *
      </label>

      <input
        id="letterName"
        placeholder="Full Name">

    </div>


    <div class="form-group">

      <label>
        Job Position *
      </label>

      <input
        id="letterJob"
        placeholder="Airport Ground Staff">

    </div>


    <div class="form-group">

      <label>
        Company
      </label>

      <input
        id="letterCompany"
        placeholder="Company Name">

    </div>


    <div class="form-group">

      <label>
        Qualification
      </label>

      <input
        id="letterQualification"
        placeholder="Graduate">

    </div>


    <button
      class="primary-btn"
      onclick="generateCoverLetter()">

      Generate Cover Letter →

    </button>

  `);
}


/* =========================
   GENERATE LETTER
========================= */

function generateCoverLetter() {

  const name =
    document
      .getElementById("letterName")
      .value
      .trim();

  const position =
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
      .getElementById("letterQualification")
      .value
      .trim();


  if (!name || !position) {

    alert(
      "Name aur Job Position required hai."
    );

    return;
  }


  const letter = `

Dear Hiring Manager,

I am ${name}, and I am writing to express my interest in the ${position}${company ? " position at " + company : ""}.

I have completed my ${qualification || "education"} and I am eager to contribute my skills, dedication and willingness to learn to your organization.

I am hardworking, responsible and comfortable working as part of a team. I would appreciate the opportunity to discuss my application further.

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
      onclick='downloadFile(${JSON.stringify(letter)}, "Cover_Letter.txt", "text/plain")'>

      ⬇️ Download Cover Letter

    </button>


    <button
      class="primary-btn"
      onclick='shareText(${JSON.stringify(letter)}, "Cover Letter")'>

      📤 Share

    </button>

  `;
}


/* =========================
   PROFILE
========================= */

function openProfile() {

  const data =
    getResumeData();


  if (!data.name) {

    openModal(`

      <div class="profile-box">

        <div class="profile-icon">
          👤
        </div>

        <h2>
          JobSathi Profile
        </h2>

        <p>
          Resume create karke apni profile
          information save karein.
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
        ${escapeHTML(data.name)}
      </h2>


      <p>
        ${escapeHTML(data.email || "Email not added")}
      </p>


      <p>
        ${escapeHTML(data.phone || "Mobile not added")}
      </p>


      <button
        class="primary-btn"
        onclick="openResume()">

        ✏️ Edit Resume

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


window.addEventListener(
  "click",
  function(event) {

    if (
      event.target === modal
    ) {

      closeModal();

    }

  }
);


/* =========================
   DOWNLOAD
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


  setTimeout(
    () => URL.revokeObjectURL(url),
    1000
  );
}


/* =========================
   SHARE TEXT
========================= */

async function shareText(
  text,
  title
) {

  if (
    navigator.share
  ) {

    try {

      await navigator.share({
        title: title,
        text: text
      });

    } catch (error) {

      console.log(error);

    }

  } else {

    downloadFile(
      text,
      "JobSathiAI_Document.txt",
      "text/plain"
    );

  }
}


/* =========================
   SECURITY HELPERS
========================= */

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {

  return escapeHTML(value)
    .replace(/\n/g, " ");
}


/* =========================
   START APP
========================= */

displayJobs(jobs);
