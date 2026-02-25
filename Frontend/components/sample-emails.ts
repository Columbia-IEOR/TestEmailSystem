// Frontend/components/sample-emails.ts

export type SampleEmail = {
  student_name: string;
  uni: string;
  email: string;
  subject: string;
  body: string;
};

export const SAMPLE_EMAILS: SampleEmail[] = [
  {
    student_name: "Emre Baser 1",
    uni: "eb3514",
    email: "eb3514@columbia.edu",
    subject: "Registration Deadline Question",
    body: "Hi Academic Advising Team,\n\nWhen is the deadline to register for classes? I'm feeling overwhelmed. \n\nBest,\nEmre Baser 1",
  }
];