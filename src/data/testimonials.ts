export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Md. Rahim Uddin",
    role: "Senior Instructor",
    organization: "Mymensingh Polytechnic Institute",
    content:
      "Mahfuz is one of the most dedicated students in our CST department. His ability to grasp complex full-stack concepts and deliver working projects consistently sets him apart from his peers.",
    rating: 5,
  },
  {
    id: "2",
    name: "Karim Hassan",
    role: "Project Client",
    organization: "Local Business Owner",
    content:
      "Mahfuz built our business website from scratch with a clean, modern design. He was responsive, met deadlines, and explained everything clearly. Highly recommended for web development work.",
    rating: 5,
  },
  {
    id: "3",
    name: "Sadia Akter",
    role: "Fellow Developer",
    organization: "Programming Hero Community",
    content:
      "Working with Mahfuz on group projects was a great experience. He writes clean code, communicates well, and always goes the extra mile to solve problems. A reliable team player.",
    rating: 5,
  },
];
