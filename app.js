const jobs = [
  {
    id: 1,
    title: "Airport Ground Staff",
    company: "Airport Services",
    city: "Mumbai",
    category: "Airport",
    salary: "₹18,000 – ₹28,000",
    qualification: "Graduate",
    type: "Full Time",
    url: "https://www.aiasl.in/"
  },
  {
    id: 2,
    title: "Security Screener",
    company: "Airport Security",
    city: "Mumbai",
    category: "Airport",
    salary: "₹20,000 – ₹32,000",
    qualification: "Graduate",
    type: "Full Time",
    url: "https://www.aai.aero/"
  },
  {
    id: 3,
    title: "SSC CGL Assistant",
    company: "Staff Selection Commission",
    city: "All India",
    category: "Government",
    salary: "₹35,000 – ₹55,000",
    qualification: "Graduate",
    type: "Government",
    url: "https://ssc.gov.in/"
  },
  {
    id: 4,
    title: "Government Clerk / Assistant",
    company: "Government Department",
    city: "India",
    category: "Government",
    salary: "₹25,000 – ₹40,000",
    qualification: "12th / Graduate",
    type: "Government",
    url: "https://ssc.gov.in/"
  },
  {
    id: 5,
    title: "Railway NTPC",
    company: "Indian Railways",
    city: "All India",
    category: "Railway",
    salary: "₹25,000 – ₹40,000",
    qualification: "12th / Graduate",
    type: "Government",
    url: "https://www.rrbapply.gov.in/"
  },
  {
    id: 6,
    title: "Railway Technician",
    company: "Indian Railways",
    city: "All India",
    category: "Railway",
    salary: "₹25,000 – ₹35,000",
    qualification: "ITI / Diploma",
    type: "Government",
    url: "https://www.rrbapply.gov.in/"
  },
  {
    id: 7,
    title: "Customer Support Executive",
    company: "Private Company",
    city: "Mumbai",
    category: "Private",
    salary: "₹18,000 – ₹30,000",
    qualification: "Graduate",
    type: "Private",
    url: "https://www.naukri.com/"
  },
  {
    id: 8,
    title: "Data Entry Executive",
    company: "Private Company",
    city: "Mumbai",
    category: "Private",
    salary: "₹15,000 – ₹25,000",
    qualification: "12th / Graduate",
    type: "Private",
    url: "https://www.naukri.com/"
  }
];

let currentJobs = [...jobs];

/* =========================
   SAFE TEXT
========================= */

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

/* =========================
   SAVED JOBS
========================= */

function getSaved() {
  try {
    return JSON.parse(
      localStorage.getItem("jobsathi_saved") || "[]"
    );
  } catch (error) {
    return [];
  }
}

function setSaved(value) {
  localStorage.setItem(
    "jobsathi_saved",
    JSON.stringify(value)
  );
}

/* =========================
   RENDER JOBS
========================= */

function renderJobs(list = currentJobs) {

  const container =
    document.getElementById("jobsContainer");

  const count =
    document.getElementById("jobCount");

  if (!container || !count) return;

  count.textContent = list.length + " jobs";

  if (!list.length) {

    container.innerHTML = `
      <div class="empty">
        No jobs found.<br>
        Try another search.
      </div>
    `;

    return;
  }

  const saved = getSaved();

  container.innerHTML = list.map(function (job) {

    const isSaved =
      saved.includes(job.id);

    return `
      <article class="job-card">

        <div class="job-top">

          <div>

            <h3>
              ${esc(job.title)}
            </h3>

            <div class="job-company">
              ${esc(job.company)}
            </div>

          </div>

          <b>
            ${esc(job.category)}
          </b>

        </div>

        <div class="job-info">

          📍 ${esc(job.city)}
          <br>

          💰 ${esc(job.salary)}
          <br>

          🎓 ${esc(job.qualification)}
          <br>

          💼 ${esc(job.type)}

        </div>

        <div class="job-actions">

          <a
            class="apply-btn"
            href="${esc(job.url)}"
            target="_blank"
            rel="noopener noreferrer">

            Apply Now →

          </a>

          <button
            class="secondary-btn"
            onclick="toggleSave(${job.id})">

            ${
              isSaved
                ? "❤️ Saved"
                : "♡ Save"
            }

          </button>

        </div>

      </article>
    `;

  }).join("");
}

/* =========================
   SEARCH
========================= */

function searchJobs() {

  const input =
    document.getElementById("jobSearch");

  if (!input) return;

  const query =
    input.value
      .toLowerCase()
      .trim();

  if (!query) {

    currentJobs = [...jobs];

    renderJobs();

    return;
  }

  currentJobs = jobs.filter(function (job) {

    const text = [

      job.title,
      job.company,
      job.city,
      job.category,
      job.salary,
      job.qualification,
      job.type

    ].join(" ").toLowerCase();

    return text.includes(query);

  });

  renderJobs(currentJobs);
}

/* =========================
   CATEGORY FILTER
========================= */

function filterJobs(category) {

  currentJobs =
    jobs.filter(function (job) {

      return job.category === category;

    });

  const input =
    document.getElementById("jobSearch");

  if (input) {
    input.value = "";
  }

  renderJobs(currentJobs);

  const section =
    document.getElementById("jobsSection");

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }
}

/* =========================
   ALL JOBS
========================= */

function showAllJobs() {

  currentJobs = [...jobs];

  const input =
    document.getElementById("jobSearch");

  if (input) {
    input.value = "";
  }

  renderJobs(currentJobs);

  const section =
    document.getElementById("jobsSection");

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }
}

/* =========================
   SAVE JOB
========================= */

function toggleSave(id) {

  let saved = getSaved();

  if (saved.includes(id)) {

    saved =
      saved.filter(function (item) {
        return item !== id;
      });

    toast("Job removed");

  } else {

    saved.push(id);

    toast("Job saved");

  }

  setSaved(saved);

  renderJobs(currentJobs);
}

/* =========================
   SAVED JOBS
========================= */

function openSaved() {

  const saved =
    getSaved();

  const list =
    jobs.filter(function (job) {
      return saved.includes(job.id);
    });

  if (!list.length) {

    openModal(`
      <h2>❤️ Saved Jobs</h2>

      <div class="empty">
        No saved jobs yet.
      </div>
    `);

    return;
  }

  const html =
    list.map(function (job) {

      return `
        <div class="job-card">

          <h3>
            ${esc(job.title)}
          </h3>

          <div class="job-company">
            ${esc(job.company)}
            •
            ${esc(job.city)}
          </div>

          <div class="modal-actions">

            <a
              class="apply-btn"
              href="${esc(job.url)}"
              target="_blank"
              rel="noopener noreferrer">

              Apply Now →

            </a>

            <button
              class="secondary-btn"
              onclick="toggleSave(${job.id}); openSaved()">

              Remove

            </button>

          </div>

        </div>
      `;

    }).join("");

  openModal(`
    <h2>❤️ Saved Jobs</h2>
    ${html}
  `);
}

/* =========================
   AI MATCHER
========================= */

function openMatcher() {

  openModal(`

    <h2>
      🤖 AI Career Assistant
    </h2>

    <label>
      Qualification
    </label>

    <select id="matcherQualification">

      <option value="">
        Any
      </option>

      <option value="Graduate">
        Graduate
      </option>

      <option value="12th">
        12th
      </option>

      <option value="ITI">
        ITI
      </option>

      <option value="Diploma">
        Diploma
      </option>

    </select>


    <label>
      Category
    </label>

    <select id="matcherCategory">

      <option value="">
        Any
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


    <label>
      City
    </label>

    <input
      id="matcherCity"
      placeholder="Mumbai"
    >


    <div class="modal-actions">

      <button
        class="primary"
        onclick="runMatcher()">

        Find My Jobs

      </button>

    </div>

  `);
}

/* =========================
   RUN MATCHER
========================= */

function runMatcher() {

  const qualification =
    document
      .getElementById("matcherQualification")
      .value
      .toLowerCase();

  const category =
    document
      .getElementById("matcherCategory")
      .value;

  const city =
    document
      .getElementById("matcherCity")
      .value
      .toLowerCase()
      .trim();

  currentJobs =
    jobs.filter(function (job) {

      const qualificationMatch =
        !qualification ||
        job.qualification
          .toLowerCase()
          .includes(qualification);

      const categoryMatch =
        !category ||
        job.category === category;

      const cityMatch =
        !city ||
        job.city
          .toLowerCase()
          .includes(city) ||
        job.city === "All India" ||
        job.city === "India";

      return (
        qualificationMatch &&
        categoryMatch &&
        cityMatch
      );

    });

  closeModal();

  renderJobs(currentJobs);

  const section =
    document.getElementById("jobsSection");

  if (section) {

    section.scrollIntoView({
      behavior: "smooth"
    });

  }

  toast(
    currentJobs.length +
    " suitable jobs found"
  );
}

/* =========================
   PROFILE
========================= */

function getProfile() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "jobsathi_profile"
      ) || "{}"
    );

  } catch (error) {

    return {};

  }
}


function openProfile() {

  const profile =
    getProfile();

  openModal(`

    <h2>
      👤 My Profile
    </h2>


    <label>
      Full Name
    </label>

    <input
      id="profileName"
      value="${esc(profile.name || "")}"
      placeholder="Your full name"
    >


    <label>
      City
    </label>

    <input
      id="profileCity"
      value="${esc(profile.city || "")}"
      placeholder="Mumbai"
    >


    <label>
      Qualification
    </label>

    <input
      id="profileQualification"
      value="${esc(profile.qualification || "")}"
      placeholder="Graduate"
    >


    <div class="modal-actions">

      <button
        class="primary"
        onclick="saveProfile()">

        Save Profile

      </button>

    </div>

  `);
}


function saveProfile() {

  const name =
    document
      .getElementById("profileName")
      .value
      .trim();

  const city =
    document
      .getElementById("profileCity")
      .value
      .trim();

  const qualification =
    document
      .getElementById("profileQualification")
      .value
      .trim();

  localStorage.setItem(
    "jobsathi_profile",
    JSON.stringify({
      name,
      city,
      qualification
    })
  );

  closeModal();

  toast(
    "Profile saved successfully"
  );
}

/* =========================
   RESUME BUILDER
========================= */

function openResume() {

  const profile =
    getProfile();

  openModal(`

    <h2>
      📄 Resume Builder
    </h2>


    <label>
      Full Name *
    </label>

    <input
      id="resumeName"
      value="${esc(profile.name || "")}"
      placeholder="Full Name"
    >


    <label>
      Mobile Number
    </label>

    <input
      id="resumePhone"
      placeholder="9876543210"
    >


    <label>
      Email
    </label>

    <input
      id="resumeEmail"
      placeholder="you@email.com"
    >


    <label>
      Qualification
    </label>

    <textarea
      id="resumeQualification"
      placeholder="Example: B.A., University, 2025">
    </textarea>


    <label>
      Skills
    </label>

    <textarea
      id="resumeSkills"
      placeholder="Communication, MS Office, Teamwork">
    </textarea>


    <label>
      Experience
    </label>

    <textarea
      id="resumeExperience"
      placeholder="Fresher / Experience details">
    </textarea>


    <div class="modal-actions">

      <button
        class="primary"
        onclick="generateResume()">

        Create Resume

      </button>

    </div>

  `);
}


function generateResume() {

  const name =
    document
      .getElementById("resumeName")
      .value
      .trim();

  const phone =
    document
      .getElementById("resumePhone")
      .value
      .trim();

  const email =
    document
      .getElementById("resumeEmail")
      .value
      .trim();

  const qualification =
    document
      .getElementById("resumeQualification")
      .value
      .trim();

  const skills =
    document
      .getElementById("resumeSkills")
      .value
      .trim();

  const experience =
    document
      .getElementById("resumeExperience")
      .value
      .trim();


  if (!name) {

    alert(
      "Please enter Full Name."
    );

    return;
  }


  const resumeData = {

    name,
    phone,
    email,
    qualification,
    skills,
    experience

  };


  localStorage.setItem(
    "jobsathi_resume",
    JSON.stringify(resumeData)
  );


  openModal(`

    <h2>
      Resume Preview
    </h2>


    <div
      id="resumePreview"
      class="preview">

      <h1>
        ${esc(name)}
      </h1>

      <p>
        ${esc(phone)}
        ${
          phone && email
            ? " | "
            : ""
        }
        ${esc(email)}
      </p>


      <h3>
        CAREER OBJECTIVE
      </h3>

      <p>
        Motivated candidate seeking
        an opportunity to learn,
        contribute and grow professionally.
      </p>


      <h3>
        EDUCATION
      </h3>

      <p>
        ${esc(qualification)}
      </p>


      <h3>
        SKILLS
      </h3>

      <p>
        ${esc(skills)}
      </p>


      <h3>
        EXPERIENCE
      </h3>

      <p>
        ${esc(
          experience || "Fresher"
        )}
      </p>

    </div>


    <div class="modal-actions">

      <button
        class="primary"
        onclick="printElement('resumePreview')">

        Print / Save PDF

      </button>


      <button
        class="secondary-btn"
        onclick="openResume()">

        Edit

      </button>

    </div>

  `);
}

/* =========================
   COVER LETTER
========================= */

function openCoverLetter() {

  openModal(`

    <h2>
      ✉️ Cover Letter
    </h2>


    <label>
      Your Name
    </label>

    <input
      id="coverName"
      placeholder="Your Name"
    >


    <label>
      Job Title
    </label>

    <input
      id="coverJob"
      placeholder="Airport Ground Staff"
    >


    <label>
      Company
    </label>

    <input
      id="coverCompany"
      placeholder="Company Name"
    >


    <div class="modal-actions">

      <button
        class="primary"
        onclick="generateCoverLetter()">

        Generate

      </button>

    </div>

  `);
}


function generateCoverLetter() {

  const name =
    document
      .getElementById("coverName")
      .value
      .trim() ||
    "Applicant";

  const job =
    document
      .getElementById("coverJob")
      .value
      .trim() ||
    "the advertised position";

  const company =
    document
      .getElementById("coverCompany")
      .value
      .trim() ||
    "your organization";


  const letter = `Dear Hiring Manager,

I am writing to apply for the ${job} position at ${company}. I am a motivated candidate with strong communication skills, willingness to learn and a sincere commitment to my responsibilities.

I would appreciate the opportunity to discuss my application and demonstrate my suitability for the role.

Thank you for your time and consideration.

Sincerely,
${name}`;


  openModal(`

    <h2>
      Cover Letter
    </h2>


    <div
      id="coverPreview"
      class="preview">

      <p>
        ${esc(letter)}
      </p>

    </div>


    <div class="modal-actions">

      <button
        class="primary"
        onclick="printElement('coverPreview')">

        Print / Save PDF

      </button>

    </div>

  `);
}

/* =========================
   PRINT
========================= */

function printElement(id) {

  const element =
    document.getElementById(id);

  if (!element) return;

  const content =
    element.outerHTML;

  const printWindow =
    window.open(
      "",
      "_blank"
    );

  if (!printWindow) {

    alert(
      "Please allow pop-ups to print."
    );

    return;
  }


  printWindow.document.write(`

    <!DOCTYPE html>

    <html>

    <head>

      <title>
        JobSathi AI
      </title>

      <style>

        body {
          font-family: Arial, sans-serif;
          padding: 35px;
          line-height: 1.5;
        }

        h1 {
          margin-bottom: 5px;
        }

        h3 {
          border-bottom: 2px solid #111827;
          padding-bottom: 4px;
          margin-top: 20px;
        }

        p {
          white-space: pre-line;
        }

      </style>

    </head>

    <body>

      ${content}

    </body>

    </html>

  `);


  printWindow.document.close();

  printWindow.focus();

  setTimeout(
    function () {
      printWindow.print();
    },
    300
  );
}

/* =========================
   MODAL
========================= */

function openModal(html) {

  const modal =
    document.getElementById("modal");

  const body =
    document.getElementById("modalBody");

  if (!modal || !body) return;

  body.innerHTML = html;

  modal.classList.add("show");
}


function closeModal() {

  const modal =
    document.getElementById("modal");

  if (modal) {

    modal.classList.remove("show");

  }
}


/* =========================
   TOAST
========================= */

function toast(message) {

  const element =
    document.getElementById("toast");

  if (!element) return;

  element.textContent = message;

  element.classList.add("show");

  setTimeout(
    function () {
      element.classList.remove("show");
    },
    1800
  );
}


/* =========================
   HOME
========================= */

function goHome() {

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  showAllJobs();
}


/* =========================
   CLOSE MODAL OUTSIDE
========================= */

window.addEventListener(
  "click",
  function (event) {

    const modal =
      document.getElementById("modal");

    if (
      modal &&
      event.target === modal
    ) {

      closeModal();

    }

  }
);


/* =========================
   START APP
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    renderJobs();

  }
);
