import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Details",
  description: "Detailed view of project implementation and features",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
