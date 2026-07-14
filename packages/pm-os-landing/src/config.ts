// Site-wide configuration.
//
// EMAIL_SIGNUP_ENDPOINT activates the research-preview email form.
// Two zero-backend options (either takes ~5 minutes to set up):
//   Formspree:  create a form at https://formspree.io and paste its endpoint,
//               e.g. "https://formspree.io/f/abcdwxyz"
//   Buttondown: "https://buttondown.com/api/emails/embed-subscribe/<username>"
// While this is empty, the form falls back to a pre-filled mailto: draft so
// no signup is ever lost.
export const EMAIL_SIGNUP_ENDPOINT = "";

export const CONTACT_EMAIL = "vivek@brainally.io";
export const GITHUB_URL = "https://github.com/vivekally/pm-os-landing";
