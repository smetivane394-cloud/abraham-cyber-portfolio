// Configuration centrale du portfolio : remplissez ces valeurs pour activer les liens.
// Un champ vide masque/désactive le lien correspondant (aucun lien mort).
export const site = {
  name: "Nyambia Abraham ESSO",
  shortName: "Abraham",
  email: "", // ex. "abraham@exemple.com" — active aussi le formulaire de contact (FormSubmit)
  whatsapp: "", // numéro international sans "+", ex. "2250700000000"
  linkedin: "", // URL complète du profil LinkedIn
  github: "", // URL complète du profil GitHub
  cvUrl: "", // URL du CV PDF (ex. "/cv-abraham-esso.pdf" placé dans public/)
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  status: string;
  link?: string;
  github?: string;
};

// Galerie évolutive : ajoutez ou complétez les projets ici.
export const projects: Project[] = [
  {
    title: "Portfolio personnel",
    description: "Ce site : une vitrine de mon parcours et de mes compétences, conçue pour évoluer avec moi.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    status: "En ligne",
  },
  {
    title: "Site web institutionnel",
    description: "Projet de site vitrine institutionnel. Détails publiés dès sa finalisation.",
    tech: ["HTML", "CSS", "JavaScript"],
    status: "À venir",
  },
  {
    title: "Projet de développement web",
    description: "Application web en préparation pour mettre en pratique le Front-End et le Back-End.",
    tech: ["JavaScript", "Back-End"],
    status: "À venir",
  },
  {
    title: "Projet informatique personnel",
    description: "Projet personnel autour des réseaux, de Linux ou de la sécurité. Contenu à venir.",
    tech: ["Linux", "Réseaux", "Sécurité"],
    status: "À venir",
  },
];
