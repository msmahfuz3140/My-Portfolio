"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectFilterProps {
  projects: Project[];
  onFilteredProjects: (filtered: Project[]) => void;
}

export default function ProjectFilter({ projects, onFilteredProjects }: ProjectFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map((p) => p.category))];
    return ["All", ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query)) ||
          p.techStack.some((t) => t.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [projects, selectedCategory, searchQuery]);

  // Update parent when filter changes
  useState(() => {
    onFilteredProjects(filteredProjects);
  });

  // Update parent
  useMemo(() => {
    onFilteredProjects(filteredProjects);
  }, [filteredProjects, onFilteredProjects]);

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects by name, tech, or description..."
          className="w-full bg-surface-container border border-outline-variant rounded-xl pl-10 pr-10 py-3 text-sm text-on-background placeholder:text-muted/50 focus:border-primary outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-on-background transition-colors"
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-label-caps transition-all ${
              selectedCategory === cat
                ? "bg-primary text-on-primary"
                : "glass-card text-muted hover:text-on-background hover:border-primary/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted">
        Showing <strong className="text-on-background">{filteredProjects.length}</strong> of{" "}
        <strong className="text-on-background">{projects.length}</strong> projects
      </p>
    </div>
  );
}