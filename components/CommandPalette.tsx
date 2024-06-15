// components/CommandPaletteComponent.tsx
import React, { useState, useEffect } from 'react';
import CommandPalette, { filterItems, getItemIndex } from 'react-cmdk';
import 'react-cmdk/dist/cmdk.css';

const CommandPaletteComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((navigator?.platform?.toLowerCase().includes("mac") ? e.metaKey : e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((current) => !current);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredItems = filterItems(
    [
      {
        heading: "Home",
        id: "home",
        items: [
          {
            id: "home",
            children: "Home",
            icon: "HomeIcon",
            href: "/", 
          },
          {
            id: "CorrectiveActions",
            children: "Corrective Actions",
            icon: "ExclamationTriangleIcon",
            href: "/actionItems/CorrectiveActions", 
          },
          {
            id: "ContinuousImprovement",
            children: "Continuous Improvement",
            icon: "ArrowPathIcon",
            href: "/actionItems/CI", 
          },
          {
            id: "ControlledDocuments",
            children: "Controlled Documents",
            icon: "DocumentTextIcon",
            href: "/documents", 
          },
          {
            id: "InternalAudits",
            children: "Internal Audits",
            icon: "ClipboardDocumentCheckIcon",
            href: "/audits", 
          },
          {
            id: "TrainingPortal",
            children: "Training Portal",
            icon: "AcademicCapIcon",
            href: "/trainingPortal", 
          }
        ],
      },
      {
        heading: "Other",
        id: "advanced",
        items: [
          {
            id: "developer-settings",
            children: "Developer settings",
            icon: "CodeBracketIcon",
            href: "/developer-settings", // Link to developer settings page
          },
          {
            id: "privacy-policy",
            children: "Privacy policy",
            icon: "LifebuoyIcon",
            href: "/privacy-policy", // Link to the privacy policy page
          }
        ],
      },
    ],
    search
  );

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setOpen}
      search={search}
      isOpen={open}
      page="root"
    >
      <CommandPalette.Page id="root">
        {filteredItems.length ? (
          filteredItems.map((list) => (
            <CommandPalette.List key={list.id} heading={list.heading}>
              {list.items.map(({ id, ...rest }) => (
                <CommandPalette.ListItem
                  key={id}
                  index={getItemIndex(filteredItems, id)}
                  {...rest}
                />
              ))}
            </CommandPalette.List>
          ))
        ) : (
          <CommandPalette.FreeSearchAction />
        )}
      </CommandPalette.Page>
    </CommandPalette>
  );
};

export default CommandPaletteComponent;
