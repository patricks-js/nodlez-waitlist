type Roadmap = {
  title: string;
  subtitle: string;
  state: "em progresso" | "em planejamento";
};

export const roadmap: Roadmap[] = [
  {
    title: "Geração de flashcards",
    subtitle: "Melhoria na criação de flashcards",
    state: "em progresso",
  },
  {
    title: "Geração de quizzes",
    subtitle: "Transforme textos em quizzes interativos",
    state: "em progresso",
  },
  {
    title: "Aceitar outros tipos de conteúdo",
    subtitle: "Geração de conteúdo a partir de PDF, DOCX, etc.",
    state: "em planejamento",
  },
  {
    title: "Assistente de IA para estudar",
    subtitle: "Obtenha ajuda inteligente para qualquer conteúdo",
    state: "em planejamento",
  },
];
