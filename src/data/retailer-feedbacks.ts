export type RetailerFeedback = {
  id: string;
  video?: { src: string; poster?: string; durationSeconds?: number };
  merchantName?: string;
  location?: string;
  quote?: string;
};

// Replace each reserved entry with approved media and authorized attribution.
// No merchant information or testimonial is shown until its video exists.
export const retailerFeedbacks: RetailerFeedback[] = [
  { id: "feedback-01" },
  { id: "feedback-02" },
  { id: "feedback-03" },
];
