/* ==========================================================================
   STUDENT REPUBLIC - EDITABLE CONTENT FILE   (js/draftsr.js)
   ==========================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO UPDATE THE WEBSITE.
   Written so that ANY future committee / officer can take over. Take your time,
   change one thing, save, and refresh the page to see it.

   WHAT IS IN THIS FILE
     1) FACEBOOK_URL .............. the Facebook page link in the footer
     2) eventsData ................ events (Happening Now / Upcoming / Past / Calendar / Timer)
     3) officersData .............. officers and their photos
     4) NOTIFICATIONS ............. reminders + announcements in the bell
     5) SITE_HOLDER ............... who manages the website (footer credit)
     6) ANALYTICS ................. total views counter (optional)

   ------------------------------------------------------------------------
   STEP-BY-STEP: ADD A NEW EVENT
     1. Scroll to  const eventsData = [
     2. Copy ONE whole event block, from { to }, including the comma after it.
     3. Paste it right below the last event (inside the square brackets).
     4. Change title, start, end, description, location, image.
     5. Dates use  "YYYY-MM-DDTHH:MM"  (24-hour clock), e.g. "2026-11-05T08:00" = Nov 5, 8:00 AM.
     6. Save. The site decides by itself if the event is Upcoming, Happening Now or Past,
        and the timer, calendar and notifications update automatically. Nothing else to do.
     To HIDE an event without deleting it: set  announced: false
     To REMOVE an event: delete its whole { ... } block.

   STEP-BY-STEP: CHANGE OR ADD A PHOTO
     1. Put the photo inside the right folder:
          images/events/    -> event photos
          images/officers/  -> officer photos (portrait, face near the top works best)
     2. File names: all lowercase, no spaces, use dashes. Example: foundation-week.jpg
        IMPORTANT: Netlify is case-sensitive. "Photo.JPG" and "photo.jpg" are DIFFERENT files.
     3. Write the same name in this file, e.g.  image: "images/events/foundation-week.jpg"
        Easiest trick: save the new photo with the SAME name as the old one (replace it)
        and you do not need to edit anything here.
     4. Tip: keep photos under 1 MB so the site stays fast on phones.
     Leave  image: ""  (empty quotes) to show a plain placeholder.
     5. A FACE OR TEXT CUT OFF ON PHONES? Photos are cropped to a fixed shape. Tell the site
        which part to keep by adding  focus  to that line, for example:
            { name: "Juan Cruz", role: "President", photo: "images/officers/cruz.jpg", focus: "center top" },
        Useful values:  "center top"  (keep heads)   "center 20%"  (slightly lower than top)
                        "center"  (middle, the default for events)   "left center" / "right center"

   COMMON MISTAKES  (if the website suddenly looks empty, check these first)
     - A missing comma between two { ... } blocks. Every block needs a comma after its }.
     - A missing or extra quote ".  Text must start and end with a straight quote:  "like this".
       Do NOT paste curly quotes from Word or Facebook. Retype them in VS Code.
     - Dates in the wrong shape. Events: "2026-11-05T08:00".
     - Time written as 5:00 PM. Use the 24-hour clock instead: "17:00".
     - A photo name that does not match the file exactly (capital letters count on Netlify).
     - Forgetting  announced: true  when you want an item to appear.
     Tip: VS Code underlines mistakes in red. Fix every red line before you save.

   STEP-BY-STEP: PUBLISH (VS Code -> GitHub -> Netlify)
     1. Save every file you edited (Ctrl+S).
     2. VS Code > Source Control (left bar) > type a short message > Commit.
     3. Click "Sync Changes" / "Push". Netlify re-publishes by itself in about a minute.
     4. Open your Netlify link and refresh (Ctrl+F5) to see the change.
   ========================================================================== */

/* --------------------------------------------------------------------------
   1) FACEBOOK PAGE LINK  (shown in the footer)
   -------------------------------------------------------------------------- */
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61563801204011";

/* --------------------------------------------------------------------------
   2) EVENTS
   FIELDS
     title       : event name
     start / end : "YYYY-MM-DDTHH:MM"  (end must be AFTER start)
     description : 1-2 short sentences
     location    : where it happens
     image       : "images/events/your-photo.jpg"  or "" for none
     focus       : (optional) which part of the photo to keep when cropped, e.g. "center top"
     announced   : true = visible on the site, false = hidden (draft)
   -------------------------------------------------------------------------- */
const eventsData = [
  {
  title: "Orientation",           /* On Going*/ 
  start: "2026-09-3T10:27",
  end: "2026-09-1T11:00",
  description: "Campus-wide orientation for new students.",
  location: "Gymnasium",
  image: "images/events/orientation.jpg",
  announced: true
  },
  {
    title: "General Assembly & Orientation",
    start: "2026-08-20T8:00",
    end:   "2026-08-21T12:30",
    description: "Campus-wide orientation on Student Republic programs, committees, and how to get involved this semester.",
    location: "ISAT-U Dumangas Campus Gymnasium",
    image: "images/events/orientation.jpg",
    announced: true
  },
  {
    title: "Student Leadership Training",  /* upcoming */
    start: "2026-09-21T08:00",
    end:   "2026-09-29T17:00",
    description: "A full-day workshop for class officers and org leaders on leadership, communication, and event planning.",
    location: "ISAT-U Dumangas Multipurpose Hall",
    image: "images/events/student-leadership.jpg",
    announced: true
  },
  {
    title: "Foundation Week Celebration",    
    start: "2026-08-29T13:00",
    end:   "2026-08-30T18:00", /*  Example    */
    description: "A week-long celebration featuring sports, talent competitions, and academic exhibits across all departments.",
    location: "Campus-wide",
    image: "images/events/election.jpg",
    announced: true
  },
  {
    title: "Intramurals Sportsfest",
    start: "2026-08-15T07:00",
    end:   "2026-08-30T18:00",
    description: "Department vs. department sports competition — basketball, volleyball, and more.",
    location: "ISAT-U Dumangas Open Field & Gymnasium",
    image: "",
    announced: false
  },
  {
    title: "Environmental Do-Day",    /* Past */
    start: "2026-08-09T06:30",
    end:   "2026-08-09T10:00",
    description: "Campus and coastal clean-up in partnership with the Environmental Committee. All students welcome.",
    location: "ISAT-U Dumangas Grounds",
    image: "images/events/clean-up-drive.jpg",
    announced: true
  },
  {
    title: "Student Elections",
    start: "2026-08-16T08:00",
    end:   "2026-08-16T16:00",
    description: "Annual election of the next set of Student Republic officers. Every enrolled student may vote.",
    location: "Designated polling areas per department",
    image: "images/events/election.jpg",
    announced: true
  },
  {
    title: "Student Day",
    start: "2026-09-15T08:00",
    end:   "2026-09-19T16:00",
    description: "enjoy students hihi gwapo si paul",
    location: "ISATU Dumangas Gymnasium",
    image: "images/events/election.jpg",
    announced: true
  },

  /* Example of an UNANNOUNCED / draft event (hidden from the site until
     you set announced to true):

  ,{
    title: "Surprise Christmas Party",
    start: "2026-12-18T13:00",
    end:   "2026-12-18T17:00",
    description: "To be revealed soon!",
    location: "TBA",
    image: "",
    announced: false
  }
  */
];

/* --------------------------------------------------------------------------
   3) OFFICERS  -  one line per officer.
        name / role : shown on the card
        photo       : "images/officers/name.jpg"  or ""  for initials only
        focus       : (optional) e.g. "center top" if the head is cut off on phones
   -------------------------------------------------------------------------- */
const officersData = [
  { name: "Jose B. Baltero III, Ed. D.",     role: "Chair, SR Board of advisers, ASCOS Coordinator",          photo: "images/officers/baltero.jpg" },
  { name: "Klarc Ceasar B. Corona",      role: "President",                photo: "images/officers/corona.jpg" },
  { name: "Cherrie Mae C. Paguntalan",        role: "Vice President", photo: "images/officers/paguntalan.jpg" },
  { name: "Louie C. de Asis		 ",         role: "Executive Secretary", photo: "images/officers/de-asis.jpg" },
  { name: "Rhea Karel Dula-ogon Buhawi		",      role: "Recording Secretary",         photo: "images/officers/buhawi.jpg" },
  { name: "Karen Jemina Grace D. Soliman 		",        role: "Senate President",                 photo: "images/officers/soliman.jpg" },
  { name: "Nicole Shayne D. Bayona",       role: "Senate Pro Tempore",                   photo: "images/officers/bayona.jpg" },
  { name: "Jessica D. Donaire",      role: "Senator, DOE",      photo: "images/officers/d-jessica.jpg" },
  { name: "Jennelyn D. Donaire",     role: "Senator, DWM",          photo: "images/officers/d-jennelyn.jpg" },
  { name: "Keit Bryan D. Demavivas",     role: "Senator, DENR",          photo: "images/officers/demavivas-k.jpg" },
  { name: "Dwight Denver D. Depliyan",     role: "Senator, SGT, DOJ",          photo: "images/officers/depliyan.jpg" },
  { name: "Jericho D. Defiño",     role: "Senator, DILG",          photo: "images/officers/defino.jpg" },
  { name: "John Paul B. Palma",     role: "Senator, DPIC",          photo: "images/officers/palma.jpg" },
  { name: "Richsha Ella D. Deypalubos",     role: "Senator, DSCA",          photo: "images/officers/deypalubos.jpg" },
  { name: "Ashley Jean P. Demafeliz",     role: "Senator, DPW",          photo: "images/officers/demafeliz.jpg" },
  { name: "Neagen P. Fernandez",     role: "Senator, DEA",          photo: "images/officers/fernandez.jpg" },
  { name: "Jorielle Faye P. Dujali",     role: "Senator, DOH",          photo: "images/officers/dujali.jpg" },
  { name: "Jhun Rhey F. Gabucay",     role: "BSIT Governor",          photo: "images/officers/gabucay.jpg" },
  { name: "Elizer E. Sayo",     role: "BTVTED Governor",          photo: "images/officers/sayo.jpg" },
  { name: "Shahara J. Cabahit",     role: "BSHM Governor",          photo: "images/officers/cabahit.jpg" },   
  { name: "Vennace Jenn M. Demavivas",     role: "BSE Governor",          photo: "images/officers/demavivas-v-j.jpg" },       
  { name: "Edna Faith D. Dequito",     role: "BINDTECH Governor",          photo: "images/officers/dequito.jpg" },
  { name: "Jewel Mamon",     role: " 1st Year Batch Representative",          photo: "" },
  { name: "Queeni",     role: " 1st Year Batch Representative",          photo: "" },
  { name: "Stacey Kaye T. Digdigan",     role: " 2nd Year Batch Representative",          photo: "images/officers/digdigan.jpg" },
  { name: "Crystal Gayle A. Eldo",     role: " 2nd Year Batch Representative",          photo: "images/officers/eldo.jpg" },
  { name: "Eza R. Diosanta",     role: " 3rd Year Batch Representative",          photo: "images/officers/diosanta.jpg" },
  { name: "John Patrick G. Arbis",     role: " 3rd Year Batch Representative",          photo: "images/officers/arbis.jpg" },
  { name: "Alijah A. Balibol",     role: " 4th Year Batch Representative",          photo: "images/officers/balibol.jpg" },
  { name: "John Axel C. Buyco",     role: " 4th Year Batch Representative",          photo: "images/officers/buyco.jpg" },
];


/* --------------------------------------------------------------------------
   4) NOTIFICATIONS  (the bell at the top of the website)
   The site builds event reminders BY ITSELF from eventsData above:
     - "X starts in 3 days / 2 days / 1 day / today"
     - "X is currently being held"
   Clicking a reminder jumps to that event on the page.

   A) NOTIFICATION_SETTINGS  - change the numbers
        remindDaysBefore : how many days before an event the reminder starts
        showOngoing      : true = show "currently being held" while an event is live
        toastDelayMs     : pop-up message appears this many milliseconds after opening
                           the site (the welcome screen lasts 4000)
   B) ANNOUNCEMENTS          - your own messages. Copy a line to add one.
        title / message : the text shown
        link            : section to open when tapped, e.g. "#upcoming" or "#calendar"
        active          : true = show, false = hide
   C) SECURITY_NOTICE        - warning text shown at the bottom of the bell and
                               as a pop-up. Edit the sentence freely.
   -------------------------------------------------------------------------- */
const NOTIFICATION_SETTINGS = {
  remindDaysBefore: 3,
  showOngoing: true,
  toastDelayMs: 5200
};

const ANNOUNCEMENTS = [
  { title: "Stay updated", message: "Tap any reminder to jump straight to the event.", link: "#upcoming", active: true },
  // { title: "Voting reminder", message: "Bring your school ID.", link: "#calendar", active: true },
];

const SECURITY_NOTICE = "Please refrain from suspicious or unnecessary activity on this website, including tampering with, copying or misusing its content.";

/* --------------------------------------------------------------------------
   5) WEBSITE HOLDER  (highlighted credit in the footer and menu)
   When a new person takes over, change the text between the quotes.
   -------------------------------------------------------------------------- */
const SITE_HOLDER = {
  name: "SEN. John Paul B. Palma",
  deptShort: "DPIC",
  deptFull: "Department of Information and Communication"
};

/* --------------------------------------------------------------------------
   6) TOTAL VIEWS / CLICKS COUNTER  (optional, free)
   GitHub and Netlify's free plan do not show visitor counts, so use GoatCounter:
     1. Go to goatcounter.com and sign up (free). Choose a site code, e.g. "srhub".
     2. In GoatCounter > Settings, tick "Allow adding visitor counts on your website".
     3. Put the code below:  goatcounterCode: "srhub"
     4. showPublicCount: true  also prints "Total views" in the footer.
     You then see views per day, per page and Facebook-link clicks inside GoatCounter.
   Leave goatcounterCode as "" to keep the counter OFF.
   -------------------------------------------------------------------------- */
const ANALYTICS = {
  goatcounterCode: "",
  showPublicCount: false
};
