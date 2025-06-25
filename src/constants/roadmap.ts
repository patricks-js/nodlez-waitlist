type Roadmap = {
  title: string;
  subtitle: string;
  state: "em progresso" | "em planejamento";
};

export const roadmap: Roadmap[] = [
  {
    title: "Geração de flashcards",
    subtitle: "Transforme textos em flashcards inteligentes",
    state: "em progresso",
  },
  {
    title: "Geração de quizzes",
    subtitle: "Transforme textos em quizzes interativos",
    state: "em progresso",
  },
  {
    title: "Open Source",
    subtitle: "Projeto aberto para colaboração e transparência",
    state: "em progresso",
  },
  {
    title: "Aceitar outros tipos de materiais",
    subtitle: "Geração de conteúdo a partir de PDF, DOCX, etc.",
    state: "em planejamento",
  },
  {
    title: "Assistente de IA para estudar",
    subtitle: "Obtenha ajuda inteligente para qualquer conteúdo",
    state: "em planejamento",
  },
  {
    title: "Geração de resumos",
    subtitle: "Resumos automáticos de materiais longos",
    state: "em planejamento",
  },
  {
    title: "Aplicativo mobile",
    subtitle: "Acesso fácil e rápido no celular",
    state: "em planejamento",
  },
];
