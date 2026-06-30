"use client";

import { useEffect, useState } from "react";

export default function ProjectLink({ href, label = "Demo" }: { href: string; label?: string }) {
  const [isAccessible, setIsAccessible] = useState<boolean | null>(null);

  useEffect(() => {
    // We run the check on mount.
    // If the modal opens, or the component mounts on page load, this will trigger.
    let isMounted = true;

    async function checkUrl() {
      try {
        const response = await fetch(`/api/check-url?url=${encodeURIComponent(href)}`);
        const data = await response.json();
        if (isMounted) {
          setIsAccessible(data.accessible);
        }
      } catch (error) {
        if (isMounted) {
          setIsAccessible(false);
        }
      }
    }

    checkUrl();

    return () => {
      isMounted = false;
    };
  }, [href]);

  if (isAccessible === null) {
    // Optionally render a small loading indicator or nothing
    return null;
  }

  if (isAccessible === false) {
    // If it's down, don't render the demo link
    return null;
  }

  return (
    <li>
      <strong>{label}</strong>:{" "}
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span style={{ textDecoration: "underline" }}>{label} URL</span>
      </a>
    </li>
  );
}
