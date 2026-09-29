import { create } from "zustand";

type UIState = {
  highlightedProject: string | null;
  highlightedTech: string | null;
  activeTerminal: boolean;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  toggleChat: () => void;
  setTerminalOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  highlight: (kind: "project" | "tech", value: string) => void;
  clear: () => void;
  navigate: (section: string) => void;
};

export const useUI = create<UIState>((set) => ({
  highlightedProject: null,
  highlightedTech: null,
  activeTerminal: false,
  chatOpen: false,
  setChatOpen: (open) => set({ chatOpen: open }),
  toggleChat: () => set((state) => ({ chatOpen: !state.chatOpen, activeTerminal: false })),
  setTerminalOpen: (open) => set({ activeTerminal: open }),
  toggleTerminal: () => set((state) => ({ activeTerminal: !state.activeTerminal, chatOpen: false })),
  highlight: (kind, value) => {
    set(
      kind === "project"
        ? { highlightedProject: value, highlightedTech: null }
        : { highlightedTech: value, highlightedProject: null }
    );
    if (kind === "project") {
      const el = document.getElementById(`project-${value}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    // Auto clear after 6s
    setTimeout(() => {
      set((curr) => {
        if (kind === "project" && curr.highlightedProject === value) {
          return { highlightedProject: null };
        }
        if (kind === "tech" && curr.highlightedTech === value) {
          return { highlightedTech: null };
        }
        return {};
      });
    }, 6000);
  },
  clear: () => set({ highlightedProject: null, highlightedTech: null }),
  navigate: (section) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  },
}));
